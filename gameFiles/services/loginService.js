/*
This javascript holds function calls to the database regarding logging in
*/
let dbConnect = require('../config/dbConnect');
let bcrypt = require('bcryptjs');

let findUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            dbConnect.query("SELECT * FROM user_login WHERE email = ?", email, function (error, results) {
                if (error) reject(error);
                let user = results[0];
                if(user == undefined){
                    resolve()
                }
                resolve(user);
            })
        } catch (e) {
            reject(e);
        }
    })
}

let compareUserPassword = (user, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let match = await bcrypt.compare(password, user.password);
            if (match) resolve(true);
            else resolve("The password you entered is incorrect");
        } catch (e) {
            reject(e);
        }
    })
}

let findUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            dbConnect.query("SELECT * FROM user_login WHERE userID = ?", id, function (error, results) {
                if (error) reject(error);
                let user = results[0];
                resolve(user);
            })
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    findUserByEmail: findUserByEmail,
    compareUserPassword: compareUserPassword,
    findUserById: findUserById
};