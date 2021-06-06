/*
This javascript holds function calls to the database regarding registering an account
*/
let dbConnect = require('../config/dbConnect');

let userCreation = (userDetails) => {

    return new Promise(async (resolve, reject) => {
        try {
            let emailCheck = await checkEmail(userDetails.email);
            let usernameCheck = await checkUsername(userDetails.username);

            if (emailCheck === false && usernameCheck === false) {
                dbConnect.query('INSERT INTO user_login SET ? ', userDetails, (error, results) => {
                    if (error) reject(error);
                    resolve(`User Created Successfully`);
                })
            } else {
                if(emailCheck === true) reject(`The e-mail '${userDetails.email}' has already been used.`);
                if(usernameCheck === true) reject (`The username '${userDetails.username}' has already been used.`);
            }
        } catch (e) {
            reject(e);
        }
    });

};

let checkUsername = (playerUsername) => {

    return new Promise((resolve, reject) => {
        try {
            dbConnect.query('SELECT username FROM user_login WHERE username = ?', [playerUsername], (error, results) => {
                if (error) reject(error);

                if (results.length > 0) 
                resolve(true);
                else resolve(false);
            })
        } catch (e) {
            reject(e);
        }
    });

}

let checkEmail = (userEmail) => {

    return new Promise((resolve, reject) => {
        try {
            dbConnect.query('SELECT email FROM user_login WHERE email = ?', [userEmail], (error, results) => {
                if (error) reject(error);

                if (results.length > 0) 
                resolve(true);
                else resolve(false);
            })

        } catch (e) {
            reject(e);
        }
    });

}

module.exports = {
    userCreation: userCreation
};