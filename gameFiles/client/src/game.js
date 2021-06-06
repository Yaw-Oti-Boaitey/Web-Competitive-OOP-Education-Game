/*
This JavaScript hold the client functions used for the program
*/


//Hold info that changes button color depending on it
let answerResult = null;

//Outputs this user's room code
function displayRoomCode(code) {
    codeDisplay = document.querySelector('#room-code-display');
    codeDisplay.innerHTML = code;
}

//Make server get this players' total score
function getTotalScore() {
    socket.emit('Get Total Score', $('#player-username').html());
}


//Change screen from 'main menu' to game room
function quickPlayToGameRoom() {

    $('.mainnav').hide();

    $('#main-menu').hide();
    $('#game-lobby').show();

}

//Change screen from 'join room' menu to game room
function joinRoomToGameRoom() {

    $('.mainnav').hide();

    $('#game-lobby').show();
    $('#join-specific-room').hide();
}

//Tells the server to create a room with a code
function createRoom() {
    socket.emit('Add Room', questionType, $('#player-username').html());
}

//Tells the server to create a closed room
function createClosedRoom() {
    closedRoom = true;
    createRoom();
}

//Navigates the host to the lobby page
function hostLobby(room) {
    $('.mainnav').hide();//Hide the main navbar

    $('#room-type').hide();//Hide the "Room Type" page
    $('#game-lobby').show();//Show the "Game Lobby" page

    displayRoomCode(room);

    //Get the host's username
    username = $('#player-username').html();

    let obj = { p1: username, p2: room };
    socket.emit('Join Room', obj);
}

//Check if a specified room is available
function checkAvailability() {
    socket.emit('Room Availability', roomCodeInput.value, questionType, $('#player-username').html());
}

//Check if there are any 'open' rooms available
function checkOpenRoomAvailability() {
    socket.emit('Open Room Availability', questionType, $('#player-username').html());
}

//Enter the room specified/found (only visible in backend)
function enterRoom(gameRoom) {
    username = $('#player-username').html();

    displayRoomCode(gameRoom);

    var obj = { p1: username, p2: gameRoom };
    socket.emit('Join Room', obj);
}


//Navigate to Countdown Screen
function gameCountdownScreen() {

    //Change the time to 3
    timerspace.innerHTML = 3;

    $('#game-lobby').hide();
    $('#countdown').show();

}

//Send a signal to the server to start the game
function requestGameStart() {
    socket.emit('Request Game Start', roomCode);

    if (players.length > 1) {
        //Starts the countdown timer on the server
        socket.emit('Start Game Countdown');
    }
}


//Switches to the game screen and displays the players bar 
function mainGameScreen() {

    $('#countdown').hide();
    $('#game-container').show();

    //Display the players bar and add the current players
    for (var i = 0; i < players.length; i++) {
        let player = document.createElement('li');
        player.innerHTML = players[i];

        $('#room-players-list').append(player);
    }

    playerBar.style.display = (
        playerBar.style.display == "none" ? "block" : "none"
    );

}

//Output the question and create the answer buttons
function showQuestion() {
    questionSpace.innerHTML = gameQuestions.question;

    var dn = 1;
    gameQuestions.answers.forEach(answer => {

        let button = document.createElement('button')
        button.innerHTML = answer

        button.dataset['number'] = dn;
        dn++

        button.classList.add('btn')
        button.classList.add('btn-outline-primary')


        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

//Remove the question and all the previous buttons
function resetState() {

    //Clear the interface of the current answers
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }

    //Enable the 'lock' button again
    $('#lock-button').prop('disabled', false);

    //Remove the 'answered' status from all users
    let playersList = roomPlayers.getElementsByTagName('li');

    for (var i = 0; i < playersList.length; i++) {
        playersList[i].classList.remove('btn', 'btn-info');
    }

    //Set the timer back to 20
    $('#gameTimer').html(20);

}


//Event after a button is clicked
function selectAnswer(e) {

    selectedButton = e.target;

    //Removes the selection from the previously selected button
    var previousHighlights = document.getElementsByClassName('selected');
    for (var i = 0; i < previousHighlights.length; i++) {
        previousHighlights[i].classList.remove('selected', 'btn-secondary', 'text-light');
    }

    //If previously clicked on, unselect it
    if (selectedButton.classList.contains('selected')) {
        selectedButton.classList.remove('selected', 'btn-secondary', 'text-light');
    }
    //else select it
    else {
        selectedButton.classList.add('selected', 'btn-secondary', 'text-light')
    }

}

//Lock in the answer selected, or alert the user they haven't selected an answer
function lockAnswer() {

    //Output message if lock button isn't clicked
    if (selectedButton.classList.contains('selected')) {

        $('#lock-reminder').hide();
        selectedButton.classList.add('btn-warning');
        selectedButton.classList.remove('selected', 'btn-outline-primary', 'text-light');

        //disable all buttons
        $('.btn').prop('disabled', true);

        //Sends the username, the locked answer and the timer value to the server,
        socket.emit('Answered Question', selectedButton.innerHTML, username, $('#gameTimer').html());
    } else {
        $('#lock-reminder').show();
    }

}


//Send the player back to the question type page
function backToStart() {
    socket.emit('Back to Start', endgame);

    //Refresh the page, giving the user a new socketid
    location.reload();

}

$(document).ready(function () {

    //By default Java and Python are locked
    $('#java-btn').prop('disabled', true);
    $('#python-btn').prop('disabled', true);


    //Change the question type to '1' and navigate to the room page
    $('#oop-btn').click(function () {
        questionType = 1;
        $('#question-type').hide();
        $('#main-menu').show();
    })

    //Change the question type to '2' and navigate to the room page
    $('#java-btn').click(function () {
        questionType = 2;
        $('#question-type').hide();
        $('#main-menu').show();
    })

    //Change the question type to '3' and navigate to the room page
    $('#python-btn').click(function () {
        questionType = 3;
        $('#question-type').hide();
        $('#main-menu').show();
    })

    //Navigate back to the "Question Type" page
    $('#main-menu-btm').click(function () {
        $('#main-menu').hide();
        $('#question-type').show();
    })

    //Navigate the user to the 'Room Type' page
    $('#create-room-btn').click(function () {
        $('#main-menu').hide();
        $('#room-type').show();
    })

    //Navigate the user back to the start from the 'Room Type' page
    $('#roomtype-btm').click(function () {
        $('#room-type').hide();
        $('#main-menu').show();
    })

    //Navigate the user to the 'Join Room' page
    $('#join-room-btn').click(function () {
        $('#main-menu').hide();
        $('#join-specific-room').show();
    })

    //Navigate the user back to the start from the 'Join Room' page
    $('#joinroom-btm').click(function () {
        $('#join-specific-room').hide();
        $('#main-menu').show();
    })

    //Check if there are any 'open' rooms available
    $('#quick-play-btn').click(function () {
        checkOpenRoomAvailability();
    })

    //Leave the room
    $('#leave-room').click(function () {
        if (confirm('WARNING: You are about to leave the room')) {
            location.reload();
        }

    })




})