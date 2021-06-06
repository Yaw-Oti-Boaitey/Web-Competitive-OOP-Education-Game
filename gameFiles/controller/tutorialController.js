/*
This javascript holds function calls to the different pages of the "About" Page
*/
let getFirstTutorialPage = function (req, res) {
    res.render('./tutorial');
}

let getSecondTutorialPage = function (req, res) {
    res.render('tutorial2');
}

let getThirdTutorialPage = function (req, res) {
    res.render('tutorial3');
}

let getFourthTutorialPage = function (req, res) {
    res.render('tutorial4');
}

let getFifthTutorialPage = function (req, res) {
    res.render('tutorial5');
}

let getSixthTutorialPage = function (req, res) {
    res.render('tutorial6');
}

module.exports = {
    getFirstTutorialPage: getFirstTutorialPage,
    getSecondTutorialPage: getSecondTutorialPage,
    getThirdTutorialPage: getThirdTutorialPage,
    getFourthTutorialPage: getFourthTutorialPage,
    getFifthTutorialPage: getFifthTutorialPage,
    getSixthTutorialPage: getSixthTutorialPage
}