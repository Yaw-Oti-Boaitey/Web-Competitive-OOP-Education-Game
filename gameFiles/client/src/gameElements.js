/*
This javascript holds the elements used in various screens in the game page
*/

/*
G E N E R A L  V A R I A B L E S
*/

//Holds data for all the users
let players = [];

//Username of the player
let username = null;

//Room code the player is in.
let roomCode = null;

//Checks if the room is closed or not
let closedRoom = false;

//Holds the id of the question type the user chose
let questionType = null;

let gameQuestions = [];

let selectedButton = null;
let selectedAnswer = null;

/* Variable that tells the server that we reached the end, 
so do not redirect if the host leaves or all other players leave the room */
let endgame = false;

/*
J O I N  S P E C I F I C  R O O M
*/

//The player's room code textbox
let roomCodeInput = document.querySelector('#room-code');

/*
L O B B Y  R O O M
*/

// The start button, only visible to the host
let startButton = document.querySelector('#game-start-button');

//Code display container
let codeDisplay = document.querySelector('#room-code-display');

//The <ul> of players currently in the room
let listContainer = document.getElementById('players-list');

/*
S T A R T   G A M E  C O U N T D O W N
*/

//The container for the start game countdown
let timerspace = document.getElementById("timer");

/*
G A M E  S C R E E N
 */

//The <ul> of players in the game being displayed
//on the player bar at the top of the page
let roomPlayers = document.getElementById('room-players-list');

//The navbar that appears at the top when a game starts
let playerBar = document.getElementById('players-bar');

//The container where the question appears
let questionSpace = document.querySelector('#question');

//The <ul> of answer buttons
let answerButtons = document.getElementById('answer-buttons');

//The button used to lock in the answers
let lockButton = document.getElementById('lock-button');

//Countdown container
let nextQuestionContainer = document.getElementById('nq-alert-container');

//The countdown for the next question
let nextQuestionCounter = document.getElementById('nq-timer');

//Timer for the game
let questionTimer = null;

let gameTimer = document.getElementById('gameTimer');


/*
S C O R E  S C R E E N
 */

let scoreTableBody = document.querySelector('#score-table-body');

