/*
This javascript holds function calls to the database regarding getting scores from the leaderboard
*/
let dbConnect = require('../config/dbConnect')

let retrieveScores = (details) => {
    return new Promise(async (resolve, reject) => {
        try{
            dbConnect.query('SELECT user_login.username, user_score.Score, user_score.Date FROM user_login INNER JOIN user_score ON user_login.userID = user_score.UserID WHERE user_score.Category_ID = ? AND user_login.username = ? ORDER BY user_score.Score DESC', [details.Category_ID, details.username], (error, results) => {
                if (error) reject(error);
                resolve(results);
            })
        }catch(e){
            reject(e);
        }
    })
}

let retrieveWorldwideScores = (catNum) => {

    return new Promise(async (resolve, reject) => {
        try{
            dbConnect.query('SELECT user_login.username, user_score.Score, user_score.Date FROM user_login INNER JOIN user_score ON user_login.userID = user_score.UserID WHERE user_score.Category_ID = ? ORDER BY user_score.Score DESC', catNum, (error, results) => {
                if (error) reject(error);

                let topPlayersList = results.slice(0,20);
                resolve(topPlayersList);
            })
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    retrieveScores: retrieveScores,
    retrieveWorldwideScores: retrieveWorldwideScores
}