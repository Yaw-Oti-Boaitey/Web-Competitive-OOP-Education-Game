/*
This javascript holds function calls for signing into an account
*/
let passport = require('passport');

let getloginPage = function (req, res) {
    res.render('login');
}

let handleLogin = function (req, res, next) {

    passport.authenticate("localLogin", function (error, user, info) {

        if (error) return res.status(500).json(error);
        if (!user) return res.status(401).json(info.message);

        req.login(user, function (err) {
            if (err) res.status(500).json(error);
            else return res.status(200).json(user);
        })

    })(req, res, next);

}

// let authCheck = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         console.log("This user is logged in");
//         res.locals.isAuthenticated  = req.isAuthenticated();
//     } else console.log("This user has not logged in");
//     next();
// }

module.exports = {
    getloginPage: getloginPage,
    handleLogin: handleLogin,
    //authCheck: authCheck
};