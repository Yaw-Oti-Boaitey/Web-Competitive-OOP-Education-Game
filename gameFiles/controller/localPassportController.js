/*
This javascript holds function calls to verify the login details given to the system with details stored in the system
*/
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
let loginService = require('../services/loginService');

let initPassportLocal = () => {

    passport.use("localLogin", new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        async (email, password, done) => {
            try {
                //Check if the e-mail exists
                await loginService.findUserByEmail(email).then(async (user) => {
                    if (!user)
                        return done(null, false, { message: `An account with the email \"${email}\" does not exist` });

                    //Compare local password to database password
                    let match = await loginService.compareUserPassword(user, password);
                    if (match != true) return done(null, false, { message: 'The password inputted is incorrect' });

                    return done(null, user, null);



                });
            } catch (err) {
                return done(null, false, { message: err });
            }
        }));
};

passport.serializeUser((user, done) => {
    done(null, user.userID);
});

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;