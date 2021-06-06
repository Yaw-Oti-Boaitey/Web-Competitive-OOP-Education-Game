/*
This javascript holds function calls for registering an account
*/
let registerService = require('../services/registerService');
let bcrypt = require('bcryptjs');

let getRegisterPage = function (req, res) {
    res.render('register');
}

let createNewUser = async (req, res) => {

    try{
        let { email, username, password } = req.body;

        let salt = bcrypt.genSaltSync(10);

        let user = {
            email: email,
            username: username,
            password: bcrypt.hashSync(password, salt)
        };

        await registerService.userCreation(user);

        return res.status(200).json({
            message: 'The user has been created'
        });

    }catch(e){
        return res.status(500).json(e);
    }

}

module.exports = {
    getRegisterPage: getRegisterPage,
    createNewUser: createNewUser
};