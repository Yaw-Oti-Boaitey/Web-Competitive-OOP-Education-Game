/*
* This is the main server file
*/

let express = require('express');
let app = express();

let dotenv = require('dotenv');
dotenv.config({ path: './.env' });

let viewEngine = require('./config/viewEngine');
let router = require('./routes/paths');

let gameController = require('./controller/gameController');

let cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport');

app.use(cookieParser("secret"));

//Config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

//Config view engine
viewEngine(app);

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Checks every page if a user has logged in or not.
app.use(function (req, res, next) {
    if (req.isAuthenticated) {
        res.locals.isAuthenticated = req.isAuthenticated();
        next();
    }
})

//Initialize all routes
app.use(router);

let server = app.listen(8080, function () {
    console.log("Server started on port 8080");
});

let io = require('socket.io')(server);

/*
G A M E  C O D E  B E L O W
*/

//Stores the details of all online players in a dictionary format
let playerData = {};

//Stores the rooms, and all the players in each room
let roomMap = new Map();

//Stores the closed rooms and the players in them
let closedRoomsList = [];

//Stores the rooms, and the question type id
let roomQuestionType = new Map();

//Gets the number of people who have answered in each room
let answeredPlayers = new Map();

//Stores the correct answers for the current question in each game room
let questionAnswers = new Map();

//Stores rooms that are currently in a game
let busyRooms = [];


//Takes input as number of questions to be asked in the game and gets random questions
async function selectedQuestions(numberofQuestions, questionType) {

    let questions = await gameController.retrieveQuestions(questionType);

    let qList = [];

    for (var i = 0; i < numberofQuestions; i++) {

        let randomQuestion = Math.floor(Math.random() * questions.length | 0);
        let locatedQuestion = false;

        //If the question is already in the list, do not add it
        if (qList.length != 0) {
            for (var c = 0; c < qList.length; c++) {
                if (qList[c].question == questions[randomQuestion].question) {
                    locatedQuestion = true;
                }
            }

            if (locatedQuestion == false) {
                qList.push(questions[randomQuestion]);
            }
            else i--;
        }
        else qList.push(questions[randomQuestion]);
    }

    let mixedQuestions = properQuestionFormat(qList);

    return mixedQuestions;
}

//Get only 4/2 answer options with each question and randomise the order
function properQuestionFormat(sessionQuestions) {
    let finalQuestionsList = [];

    for (var i = 0; i < sessionQuestions.length; i++) {
        let newAnswerSet = [];
        let mixedAnswerSet = [];

        //If there are more than 4 answers...
        if (sessionQuestions[i].answers.length > 4) {

            //Get the correct answer first
            for (var j = 0; j < sessionQuestions[i].answers.length; j++) {
                if (sessionQuestions[i].answers[j].correct == true) {
                    newAnswerSet.push(sessionQuestions[i].answers[j]);
                }
            }

            //Get 3 random wrong answers
            for (var j = 0; j < 3; j++) {

                let randomAnswer = Math.floor(Math.random() * sessionQuestions[i].answers.length | 0);
                let locatedAnswer = false;

                //If the answer is already in the list, do not add it
                for (var k = 0; k < newAnswerSet.length; k++) {
                    if (newAnswerSet[k].text == sessionQuestions[i].answers[randomAnswer].text) {
                        locatedAnswer = true;
                    }
                }

                if (locatedAnswer == false) {
                    newAnswerSet.push(sessionQuestions[i].answers[randomAnswer]);
                }
                else j--;
            }

        } else {

            for (var j = 0; j < sessionQuestions[i].answers.length; j++) {
                newAnswerSet.push(sessionQuestions[i].answers[j]);
            }
        }

        //Shuffle the answers
        for (var j = 0; j < newAnswerSet.length; j++) {
            let randomAnswer = Math.floor(Math.random() * newAnswerSet.length | 0);
            let locatedAnswer = false;

            if (mixedAnswerSet.length != 0) {
                for (var k = 0; k < mixedAnswerSet.length; k++) {
                    if (mixedAnswerSet[k].text == newAnswerSet[randomAnswer].text) {
                        locatedAnswer = true;
                    }
                }

                if (locatedAnswer == false) {
                    mixedAnswerSet.push(newAnswerSet[randomAnswer]);
                }
                else j--;
            } else mixedAnswerSet.push(newAnswerSet[randomAnswer]);
        }

        let questionOrder = {
            question: sessionQuestions[i].question,
            answers: mixedAnswerSet
        }

        finalQuestionsList.push(questionOrder);
    }

    return finalQuestionsList;

}

//Takes the time the player answered in and uses it to get a score
function addToScore(userScore, timerTime) {
    let extraPoints = timerTime * 5;
    let totalScore = userScore + 100 + extraPoints;
    return totalScore;
}

//Generates a random set of characters to be used as the room code
function getRandomCode(charnum) {

    let finalString = new String;
    let lettersAndNumbers = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    for (var i = 0; i < charnum; i++) {
        let character = Math.floor(Math.random() * lettersAndNumbers.length);
        finalString = finalString + lettersAndNumbers[character];
    }
    return finalString;

}

//Makes a room a "Closed" room
function closeRoom(room) {
    closedRoomsList.push(room);
}

//Gets the next question to be asked
function getQuestion(questionDetails) {

    //Get all the answers
    let gameAnswers = [];

    for (var i = 0; i < questionDetails.answers.length; i++) {
        gameAnswers.push(questionDetails.answers[i].text);
    }

    //Organise the info and send it to the clients in the room
    let nextQuestion = {
        question: questionDetails.question,
        answers: gameAnswers
    }

    return nextQuestion;
}

//Takes the question and gets the correct answer out of all the ones in the list
function currentQuestionCorrectAnswer(questionAndAnswers) {

    //Gets the current question's correct answer
    for (var i = 0; i < questionAndAnswers.answers.length; i++) {

        if (questionAndAnswers.answers[i].correct == true) {
            correctAnswer = questionAndAnswers.answers[i].text;
        }
    }
    return correctAnswer;
}

//Creates a new room
function newRoomCreation(questionType) {
    let existingRoom = true;
    let newRoom;

    //Create a room code
    //Check if it is already available
    do {
        newRoom = getRandomCode(4);
        if (!roomMap.get(newRoom)) {
            roomMap.set(newRoom, []);
            roomQuestionType.set(newRoom, questionType);
            existingRoom = false;
        }
    } while (existingRoom == true);

    return newRoom;
}

//Reveals the answer results and reset the answered players count
function revealAnswer(answeredPlayersCount, room) {
    //Reset the answered players count for the next round
    answeredPlayersCount.set(room, 0);

    //Reveal if the players' answers are right or wrong
    io.sockets.to(room).emit('Reveal Answers');
}

//Start the countdown for the next question
function countToNextQuestion(room) {
    let preparationCount = 4;
    let nextQuestionCounter = setInterval(function () {

        if (preparationCount == 0) {
            clearInterval(nextQuestionCounter);
            nextQuestionCounter = null;

            io.sockets.to(room).emit('Present Next Question');
            return;
        }
        preparationCount--
        io.sockets.to(room).emit('Update Next Question Count', preparationCount);


    }, 1000);
}





io.on('connection', function (socket) {

    //Will hold the questions used for the session
    let gameSessionQuestions = null;

    //Holds the current question
    let currentQuestion = null;

    //Holds the correct answer to the current question
    let currentQuestionAnswer = null;

    //Give the socket player details
    //and add this player to the dictionary
    playerData[socket.id] = {
        name: null,
        room: null,
        host: false,
        score: 0
    };

    let gameTimer = null; //The question countdown timer for the room this player is currently in
    let timerValue = 19;


    /*
    SOCKET OPERATIONS
    */

    socket.on('Get Total Score', async function (playerUsername) {
        let playerTotalScore = await gameController.getTotalScore(playerUsername);
        socket.emit('Receive Total Score', playerTotalScore);
    })


    //Adds a room to the list of rooms
    socket.on('Add Room', function (questionType, playerUsername) {
        //Check if the player is already in the game somewhere
        let foundUser = false;
        roomMap.forEach(function (value) {
            if (value.includes(playerUsername)) {
                socket.emit('Previous Session');
                foundUser = true;
            }
        })

        if (foundUser == true) {
            return;
        }


        let newRoom = newRoomCreation(questionType);

        //Since this player created the room, assign them the host value
        playerData[socket.id].host = true;
        playerData[socket.id].room = newRoom;

        socket.join(newRoom);

        io.sockets.to(newRoom).emit('Room Added', newRoom);

    })

    //Make the specified room a closed room
    socket.on('Close the room', function (room) {
        closeRoom(room);
    })

    socket.on('Room Availability', function (roomCode, questionType, playerUsername) {
        let foundUser = false;
        roomMap.forEach(function (value) {
            if (value.includes(playerUsername)) {
                socket.emit('Previous Session');
                foundUser = true;
            }
        })

        if (foundUser == true) {
            return;
        }


        //If the room doesn't exist, or it is busy...
        if (!roomMap.get(roomCode) || busyRooms.includes(roomCode)) {
            socket.emit('Unavailable Room');
        }
        else {
            //Check if the room has the question type the user chose
            if (roomQuestionType.get(roomCode) == questionType) {
                socket.emit('Available Room');
            } else {
                socket.emit('Unavailable Room');
            }

        }

    })


    socket.on('Open Room Availability', function (questionType, playerUsername) {
        //Check if the player is already in the game somewhere
        let foundUser = false;
        roomMap.forEach(function (value) {
            if (value.includes(playerUsername)) {
                socket.emit('Previous Session');
                foundUser = true;
            }
        })

        if (foundUser == true) {
            return;
        }

        let roomFound = false;

        for (let room of roomMap.keys()) {
            if (!closedRoomsList.includes(room) && !busyRooms.includes(room)) {//If the current room isn't a closed room and it isn't busy...
                if (roomQuestionType.get(room) == questionType) {
                    roomFound = true;
                    socket.emit('Available Open Room', room);
                }
            }
        }

        if (roomFound == false) {
            socket.emit('Unavailable Open Room');
        }
    })

    socket.on('Join Room', function (values) {

        //Give this player's 'name' variable a value
        playerData[socket.id].name = values.p1;

        //Give this player's 'room' variable a value
        playerData[socket.id].room = values.p2;

        //Put this player in the new room
        socket.join(values.p2);

        //Add the player's socketID and Name to the Room Map
        let playersList = roomMap.get(values.p2);
        playersList.push(values.p1);

        //If the room is full(8 players), close it
        if (playersList.length >= 8) {
            closeRoom(values.p2);
        }

        io.sockets.to(values.p2).emit('Output Players', playersList);

        if (playerData[socket.id].host == true) {
            io.sockets.to(playerData[socket.id].room).emit('Current Host');
        }
    })

    socket.on('Request Game Start', async function (room) {

        //Checks if the user who started the game truly is the host
        if (playerData[socket.id].host == false) {
            return;
        }

        if (roomMap.get(room).length == 1) {
            socket.emit('One Player Error');
            return;
        }

        //Holds all the questions to be asked and their answers
        gameSessionQuestions = await selectedQuestions(10, roomQuestionType.get(room));

        //Reset the 'answered player' count
        answeredPlayers.set(playerData[socket.id].room, 0);

        //Adds this room to the 'busy' list
        busyRooms.push(room);

        io.sockets.to(room).emit('Game Start');
    })

    socket.on('Start Game Countdown', function () {

        let pos = 0;
        let countArr = ["2", "1", "Go"];

        let gameStartCountdown = setInterval(function () {
            //Update the count for all those in the room
            io.sockets.to(playerData[socket.id].room).emit('Update Countdown', countArr[pos]);

            if (pos == countArr.length) {
                clearInterval(gameStartCountdown);
                gameStartCountdown = null;

                io.sockets.to(playerData[socket.id].room).emit('End Countdown');

                currentQuestion = getQuestion(gameSessionQuestions[0], playerData[socket.id].room);

                io.sockets.to(playerData[socket.id].room).emit('Receive Questions', currentQuestion);

                //Holds the answer for the current question
                currentQuestionAnswer = currentQuestionCorrectAnswer(gameSessionQuestions[0], playerData[socket.id].room);

                //The answer to the question presented in this room is stored here
                questionAnswers.set(playerData[socket.id].room, currentQuestionAnswer);

                //Should prevent the countdown from running twice
                if (gameTimer != null) return;

                gameTimer = setInterval(function () {
                    if (timerValue < 0) {
                        clearInterval(gameTimer);
                        gameTimer = null;//Reset the timer
                        timerValue = 19;//Reset the value

                        revealAnswer(answeredPlayers, playerData[socket.id].room);
                        countToNextQuestion(playerData[socket.id].room);
                    } else {
                        io.sockets.to(playerData[socket.id].room).emit('Update Question Countdown', timerValue);
                        timerValue--;
                    }
                }, 1000);

                return;

            } else {
                pos++;
            }

        }, 1000);
    })

    socket.on('Answered Question', function (userAnswer, answeredPlayerUsername, timeAnswered) {

        socket.broadcast.to(playerData[socket.id].room).emit('Display Answered Player', answeredPlayerUsername);

        let answerResult;

        if (questionAnswers.get(playerData[socket.id].room) === userAnswer) {
            answerResult = "btn-success";

            //Add to the person's overall score
            playerData[socket.id].score = addToScore(playerData[socket.id].score, timeAnswered);

            socket.emit('Answer Check', answerResult);

        }
        else {
            answerResult = "btn-danger";
            socket.emit('Answer Check', answerResult);
        }

        //Add 1 to the number of people who have answered in this room
        answeredPlayers.set(playerData[socket.id].room, (answeredPlayers.get(playerData[socket.id].room)) + 1)
    })

    //Get the next question from the host
    socket.on('Find Host', async function () {

        if (playerData[socket.id].host == true) {

            //Remove the question just asked
            gameSessionQuestions.shift();

            //If there are still questions to be asked, send the next question and set the new correct answer
            if (gameSessionQuestions.length != 0) {

                //Get the next question and send it
                currentQuestion = getQuestion(gameSessionQuestions[0], playerData[socket.id].room);
                io.sockets.to(playerData[socket.id].room).emit('Receive Questions', currentQuestion);

                //Get this question's correct answer
                currentQuestionAnswer = currentQuestionCorrectAnswer(gameSessionQuestions[0], playerData[socket.id].room);
                questionAnswers.set(playerData[socket.id].room, currentQuestionAnswer);

                //Should prevent the countdown from running twice
                if (gameTimer != null) return;

                gameTimer = setInterval(function () {
                    if (timerValue < 0) {
                        clearInterval(gameTimer);
                        gameTimer = null;//Reset the timer
                        timerValue = 19;//Reset the value

                        revealAnswer(answeredPlayers, playerData[socket.id].room);
                        countToNextQuestion(playerData[socket.id].room);
                    } else {
                        io.sockets.to(playerData[socket.id].room).emit('Update Question Countdown', timerValue);
                        timerValue--;
                    }
                }, 1000);

            } else {

                //Holds the username and scores for all users in this room
                let players_Scores = [];

                let roomCode = playerData[socket.id].room;

                let playerKeys = Object.keys(playerData);

                for (let i = 0; i < playerKeys.length; i++) {
                    if (playerData[playerKeys[i]].room == roomCode) {

                        let scoreDetails = {
                            username: playerData[playerKeys[i]].name,
                            score: playerData[playerKeys[i]].score
                        }

                        players_Scores.push(scoreDetails)

                        await gameController.uploadScore(playerData[playerKeys[i]].name, playerData[playerKeys[i]].score, roomQuestionType.get(roomCode));
                    }
                }

                io.sockets.to(roomCode).emit('Show Scores', players_Scores);

            }
        }

    })

    //Remove details while reloading the menu page
    socket.on('Back to Start', function () {

        //Remove the player from the room in socketio
        socket.leave(playerData[socket.id].room);

        //If this is the host, delete the room
        if (playerData[socket.id].host == true) {
            clearInterval(gameTimer);
            gameTimer = null;

            roomMap.delete(playerData[socket.id].room);
            roomQuestionType.delete(playerData[socket.id].room);
            questionAnswers.delete(playerData[socket.id].room);
            answeredPlayers.delete(playerData[socket.id].room);
        }

        //Remove this player's details
        delete playerData[socket.id];

    })

    socket.on('disconnect', function () {

        //If they have information, and their name is in a room...
        if (playerData[socket.id] && roomMap.get(playerData[socket.id].room) != undefined) {

            //If the room had 8 people in it, remove the room from the 'closed room' list
            if (roomMap.get(playerData[socket.id].room).length == 8) {
                closedRoomsList.splice(closedRoomsList.indexOf(playerData[socket.id].room), 1);
            }


            //Remove that player from the roomMap and update everyone's lists
            let playerList = roomMap.get(playerData[socket.id].room);
            playerList.splice(playerList.indexOf(playerData[socket.id].name), 1);

            io.sockets.to(playerData[socket.id].room).emit('Output Players', playerList);//For if we are on the lobby page

            //If the game has started, output this
            if (answeredPlayers.get(playerData[socket.id].room) != undefined) {
                io.sockets.to(playerData[socket.id].room).emit('Player Left', playerData[socket.id].name);
            }


            /*If this is the host,
            * stop the 'game' timer if it was running
            * alert all the players in the room,
            * delete the room they were in
            * */
            if (playerData[socket.id].host == true) {

                if (gameTimer != null) {
                    clearInterval(gameTimer);
                    gameTimer = null;
                    timerValue = 19;
                }

                socket.broadcast.to(playerData[socket.id].room).emit('Host Left');
                roomMap.delete(playerData[socket.id].room);
                roomQuestionType.delete(playerData[socket.id].room);
                questionAnswers.delete(playerData[socket.id].room);
                answeredPlayers.delete(playerData[socket.id].room);
            }

            //Remove the player from the room in socketio
            socket.leave(playerData[socket.id].room);

            //Delete the players' data
            delete playerData[socket.id];

        }

    })

})