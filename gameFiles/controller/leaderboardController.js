/*
This javascript holds function calls to get the scores for various players
*/
let leaderboardService = require('../services/leaderboardService');

let getLeaderboardPage = function (req, res) {
    res.render('leaderboard', { username: req.user.username });
}

//Get the scores for the specified player for the specified question type
let getScores = async function (req, res) {
    try{
        let leaderboardDetails = {
            Category_ID: req.body.catNum,
            username: req.body.playerUsername
        }

        let scoreData = await leaderboardService.retrieveScores(leaderboardDetails);
        return res.status(200).json(scoreData);

    }catch(e){
        return res.status(500).json(e);
    }
}

//Gets the top 20 scores for the selected category
let getWorldScores = async function (req, res) {
    try{
        let scoreData = await leaderboardService.retrieveWorldwideScores(req.body.catNum);
        return res.status(200).json(scoreData);
    }catch(e){
        return res.status(500).json(e);
    }
}

module.exports = {
    getLeaderboardPage: getLeaderboardPage,
    getScores: getScores,
    getWorldScores: getWorldScores
}