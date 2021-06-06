/*
This javascript holds function calls to the database regarding game services
*/
let dbConnect = require('../config/dbConnect')

let findUserID = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            dbConnect.query('SELECT userID FROM user_login WHERE username = ?', username, (error, results) => {
                if (error) reject(error);
                resolve(results[0].userID);
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllScores = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            dbConnect.query('SELECT user_score.Score FROM user_score WHERE user_score.UserID = ?', userID, (error, results) => {
                if (error) reject(error);
                resolve(results);
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getQuestions = (categoryNum) => {
    return new Promise(async (resolve, reject) => {
        try {
            dbConnect.query('SELECT quiz_questions.Question, quiz_questions_answers.Answer, quiz_questions_answers.Correct FROM quiz_questions INNER JOIN quiz_questions_answers ON quiz_questions.Question_ID = quiz_questions_answers.Question_ID WHERE quiz_questions.Category_ID = ? ', categoryNum, (error, results) => {
                if (error) reject(error);

                let rawQuestions = results;
                resolve(rawQuestions);
            })
        } catch (e) {
            reject(e)
        }
    })
}

let sendScore = (scoreDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            dbConnect.query('INSERT INTO user_score SET ?', scoreDetails, (error, results) => {
                if (error) reject(error);
                resolve();
            })
        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    getQuestions: getQuestions,
    findUserID: findUserID,
    getAllScores: getAllScores,
    sendScore: sendScore
}

