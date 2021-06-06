/*
*This is the file holding the configurations for the XAMPP database
*/
let mysql = require('mysql');

let dotenv = require('dotenv');
dotenv.config({path: '../.env'});

let db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

db.connect(function (error) {
    if (error) console.log(error);
    else console.log("MYSQL Connected...");
});

module.exports = db;