/*
This javascript holds function calls for all the game page operations
*/

let gameService = require('../services/gameService');


//Sends the user to the game page
let getGamePage = function (req, res) {
    res.render('game', { username: req.user.username });
}

//If someone tries to access the game page without logging in, they will be returned to the home page
let checkifLoggedIn = (req, res, next) => {
    if (res.locals.isAuthenticated == false) {
        return res.redirect("/");
    }
    next();
}

//Puts the received questions in a format appropriate for the quiz
function organiseQuestions(questions) {
    let questionList = [];
    let questionAnswers = [];

    //Gets all the questions
    for (var i = 0; i < questions.length; i++) {
        if (!questionList.includes(questions[i].Question)) {
            questionList.push(questions[i].Question);
        }
    }

    //Get all the answers
    //i) Loop through all the questions in the local question list
    for (var i = 0; i < questionList.length; i++) {
        let allAnswers = [];

        
        for (var j = 0; j < questions.length; j++) {

            //ii) Get all the answers associated with the current question
            if (questions[j].Question == questionList[i]) {
                let elemInList = false;
                for (var elem in allAnswers) {
                    
                    elem = elem.replace('/\r?\n|\r/g', '')//Replace all newlines with nothing

                    if (elem.text == questions[j].Answer) {
                        elemInList = true;
                    }

                }
                if (elemInList == false) {
                    let correctstatus;

                    if (questions[j].Correct == 0) correctstatus = false;
                    else correctstatus = true;

                    let ans = {
                        text: questions[j].Answer,
                        correct: correctstatus
                    }

                    allAnswers.push(ans);
                }
            }

        }
        questionAnswers.push(allAnswers);
    }

    let orgQuestions = [];


    for (var i = 0; i < questionList.length; i++) {

        let questionFormat = {
            question: questionList[i],
            answers: questionAnswers[i]
        }

        orgQuestions.push(questionFormat);
    }

    return orgQuestions;
}

//Get questions from the database
let retrieveQuestions = async (catNum) => {
    try {
        let rawQuestions = await gameService.getQuestions(catNum);
        let refinedQuestions = organiseQuestions(rawQuestions);

        return refinedQuestions;

    } catch (e) {
        console.log(e);
    }
}

//Upload the score from the current game to the database
let uploadScore = async (username, userScore, category) => {
    try {

        //Get today's date
        let todaysDate = new Date();
        let yyyy = todaysDate.getFullYear();
        let mm = String(todaysDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        let dd = String(todaysDate.getDate()).padStart(2, '0');

        todaysDate = yyyy + '-' + mm + '-' + dd;

        //locate the user's ID
        let playerID = await gameService.findUserID(username);

        let scoreData = {
            userID: playerID,
            Category_ID: category,
            Score: userScore,
            Date: todaysDate
        };

        //Upload the scores to the database
        await gameService.sendScore(scoreData);
    } catch (e) {
        console.log(e);
    }


}

let getTotalScore = async(username) => {

    //locate the user's ID
    let playerID = await gameService.findUserID(username);//get that user's ID
    let allScores = await gameService.getAllScores(playerID);//get all the scores the user has

    let playerTotalScore = 0;

    for(var i = 0; i < allScores.length; i++){
        playerTotalScore += allScores[i].Score;
    }

    return playerTotalScore;

}


module.exports = {
    getGamePage: getGamePage,
    checkifLoggedIn: checkifLoggedIn,
    retrieveQuestions: retrieveQuestions,
    uploadScore: uploadScore,
    getTotalScore: getTotalScore
}