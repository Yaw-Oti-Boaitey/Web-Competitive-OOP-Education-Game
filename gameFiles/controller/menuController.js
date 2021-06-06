/*
This javascript holds function calls to navigating to the Main Menu
*/
let getHomePage = function(req, res){
    res.render('menu', {
        user: req.user
    });
}


module.exports = {
    getHomePage: getHomePage
};