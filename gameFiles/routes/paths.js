/**
 * This holds the router calls needed for moving through the website's pages 
 */
let registerAuth = require('../controller/registerController');
let loginAuth = require('../controller/loginController');
let menuAuth = require('../controller/menuController');
let gameAuth = require('../controller/gameController');
let leaderboardAuth = require('../controller/leaderboardController');
let tutorialAuth = require('../controller/tutorialController');

let initPassportLocal = require('../controller/localPassportController');

initPassportLocal();

let express = require('express');
let router = express.Router();

//Main Menu
router.get('/', menuAuth.getHomePage);

//How to play
router.get('/tutorial', tutorialAuth.getFirstTutorialPage);
router.get('/tutorial2', tutorialAuth.getSecondTutorialPage);
router.get('/tutorial3', tutorialAuth.getThirdTutorialPage);
router.get('/tutorial4', tutorialAuth.getFourthTutorialPage);
router.get('/tutorial5', tutorialAuth.getFifthTutorialPage);
router.get('/tutorial6', tutorialAuth.getSixthTutorialPage);


//Register Page
router.get('/register', registerAuth.getRegisterPage);
router.post('/register-new-user', registerAuth.createNewUser);

//Login Page
router.get('/login', loginAuth.getloginPage);
router.post('/login', loginAuth.handleLogin);

//Game Page
router.get('/game', gameAuth.checkifLoggedIn, gameAuth.getGamePage);

//Leaderboard Page
router.get('/leaderboard', gameAuth.checkifLoggedIn, leaderboardAuth.getLeaderboardPage);
router.post('/leaderboard', leaderboardAuth.getScores);
router.post('/worldleaderboard', leaderboardAuth.getWorldScores);

//Logging out
router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy(function(err){
        return res.redirect('/');
    });
    
})

module.exports = router;