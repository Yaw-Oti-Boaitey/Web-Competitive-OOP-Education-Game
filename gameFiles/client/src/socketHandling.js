/*
This javascript is responsible for handling the socket calls from the server
*/

let socket = io();

socket.on('Receive Total Score', function (totalScore) {

    $('#player-total-score').html(totalScore);

    //To play with Java questions, players need a total score of 2000
    if (totalScore > 2000) {
        $('#java-btn').prop('disabled', false);
    }

    //To play with Python questions, players need a total score of 4000
    if (totalScore > 4000) {
        $('#python-btn').prop('disabled', false);
    }
})

socket.on('Room Added', function (room) {
    roomCode = room;
    if (closedRoom == true) {
        socket.emit('Close the room', roomCode);
    }
    hostLobby(roomCode);
});

socket.on('Available Room', function () {
    enterRoom(roomCodeInput.value);
    joinRoomToGameRoom();
});

socket.on('Available Open Room', function (gameRoomCode) {
    enterRoom(gameRoomCode);
    quickPlayToGameRoom();
});

socket.on('Previous Session', function () {
    alert('Your account is already in a room.');
})

socket.on('Unavailable Room', function () {
    alert('This room is currently unavailable');
});

socket.on('Unavailable Open Room', function () {
    alert('No open rooms available. Please try again later');
});

//When the usernames have been updated on the server, add them to a list and output the players
socket.on('Output Players', function (gamePlayers) {

    listContainer.innerHTML = '';//Empty the list container
    players = gamePlayers;

    //Add all the players back into the container
    for (var i = 0; i < players.length; i++) {
        let user = document.createElement('li');
        user.classList.add('list-group-item');

        user.innerHTML = players[i];

        listContainer.appendChild(user);
    }

});

//Runs if there is only one person in the room
socket.on('One Player Error', function () {
    alert('You need at least two people in a room before you can play');
});


//Signal to present the "start button" to the host
socket.on('Current Host', function () {
    startButton = document.querySelector('#game-start-button');

    startButton.style.display = (
        startButton.style.display == "none" ? "block" : "none"
    );
});

//Signal to start the 'start game' countdown timer
socket.on('Game Start', function () {
    gameCountdownScreen();

});

//Signal to update the countdown timer for all players
socket.on('Update Countdown', function (num) {
    timerspace.innerHTML = num;
});

//Signal to start the game
socket.on('End Countdown', function () {
    mainGameScreen();
});

socket.on('Update Question Countdown', function(timerVal){
    $('#gameTimer').html(timerVal);
})


socket.on('Receive Questions', function (receivedQuestions) {
    gameQuestions = receivedQuestions;
    showQuestion();
});


//When someone answers, give their name an effect
socket.on('Display Answered Player', function (answeredUser) {
    let playersList = roomPlayers.getElementsByTagName('li');
    for (var i = 0; i < playersList.length; i++) {
        if (playersList[i].innerHTML == answeredUser) {
            playersList[i].classList.add('btn', 'btn-info');
        }
    }
});

//Reveal if the answer was correct or wrong
socket.on('Reveal Answers', function () {

    clearInterval(questionTimer);
    $('.btn').prop('disabled', true);

    nextQuestionContainer.style.display = (
        nextQuestionContainer.style.display == "none" ? "block" : "none"
    );

    if (selectedButton == null) {
        return;
    }

    if (selectedButton != null || selectedButton.classList.contains('btn-warning')) {
        selectedButton.classList.remove('btn-warning');
        selectedButton.classList.add(answerResult);
    }

});

socket.on('Update Next Question Count', function (count) {
    nextQuestionCounter.innerHTML = count;
});

socket.on('Present Next Question', function () {
    //Removes the previous buttons
    resetState();

    //Find the host to get the next question
    socket.emit('Find Host');

    //Hide that alert
    nextQuestionContainer.style.display = (
        nextQuestionContainer.style.display == "none" ? "block" : "none"
    );
});

socket.on('Answer Check', function (validity) {
    answerResult = validity;
});

socket.on('Show Scores', function (player_Scores) {
    //Ensures that players arent redirected if host leaves
    endgame = true;

    scoreTableBody = document.querySelector('#score-table-body');

    for (i = 0; i < player_Scores.length; i++) {

        let row = document.createElement('tr');

        let cell1 = document.createElement('th');
        cell1.innerHTML = player_Scores[i].username;
        cell1.scope = 'row';

        let cell2 = document.createElement('td');
        cell2.innerHTML = player_Scores[i].score;

        row.appendChild(cell1);
        row.appendChild(cell2);

        scoreTableBody.appendChild(row);
    }

    $('.mainnav').show();//Show the main navbar

    //Enable the 'back to menu' button
    document.getElementById('back-to-menu').disabled = false;

    //Hide the navbar
    $('#players-bar').hide();

    //Present the 'score' screen
    $('#game-container').hide();
    $('#score-screen').show();

})

socket.on('Host Left', function () {
    if (endgame == false) {
        alert('The host has left.');
        location.reload();
    }
})

socket.on('Player Left', function (deletedPlayerName) {

    //Remove the player from the navbar
    for (var i = 0; i < roomPlayers.children.length; i++) {
        if (roomPlayers.children[i].innerHTML == deletedPlayerName) {
            roomPlayers.removeChild(roomPlayers.children[i]);
            break;
        }
    }

    //If there is only one player in the game
    if (players.length == 1 && endgame == false) {
        alert('All players have left. Returning to the first page...');
        backToStart();
    }
})