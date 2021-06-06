/*
This javascript holds the elements used in various screens in the game page
*/
let express = require('express');
const { dirname } = require('path');
let path = require('path');

let viewEngine = function (app) {

    //Serves images, CSS files, and JavaScript files in a directory named 'client'
    app.use(express.static("client"));

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, "../client/pages"));

}

module.exports = viewEngine;