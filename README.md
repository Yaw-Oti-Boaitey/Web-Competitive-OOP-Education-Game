# Object-Oriented Programming Quiz Game

This is a quiz game that tests players on their object-oriented programming knowledge. This knowledge includes 'General Object-Oriented Programming concepts', 'Java' and 'Python'

## Installation
"Node.js" and a "MySQL" server are required to run this system effectively: "Node.js" creates the server holding the website, and MySQL holds the database. This program was tested with the application "XAMPP", which hosts the server holding the MySQL database, so that is the application that will be elaborated on later.
The computer must hold a stable internet connection, so all the bootstrap templates work correctly.

"Node.js" can be downloaded for Windows and Mac from the following website: https://nodejs.org/en/download/
(It is best to download the Latest LTS version of NodeJS for this project)

"XAMPP" can be downloaded for Windows, Linux and Mac OSX from the following website: https://www.apachefriends.org/download.html
(Using the latest version is the optimal choice).

To run the website, the NodeJS and the XAMPP servers needs to be set up and running.

## Setting up XAMPP
i)During XAMPP installation, in "Select Components", leave the default selections and continue("MYSQL" should be selected).

ii) In the XAMPP Control Panel, press "Start" for both "Apache" and "MySQL". After both turn green, select "Admin" for MySQL. 
In the browser window that opens, in the menu on the leftside of the page, select "New", give the database the name 'quiz_database' and press "Create".

iii) Select the new database, select "Import" from the tabs list and under "File to import", click "Browse" and select the "quiz_database.sql" file located inside the 'main' folder of this project.

The game questions and some sample user accounts for testing have now been imported.

[NOTE: The .env file in 'main' holds the database connection settings necessary for connectivity. Currently it has been configured to be using the default values when XAMPP has been downloaded for the first time]

## Setting up NodeJS
To run the Node server, in the command line, navigate to the location of the main folder(e.g. cd C:\main) and type in 
```
npm run dev
```

When the messages "Server started on port 8080" and "MySQL Connected..." appear, the website can now be accessed.

On the localhost machine(the machine running the Node and MySQL servers), you can get to the page by typing
localhost:8080

For other computers to have access to the game, in any browser search bar, they must input 
http://<LOCAL.HOSTS.IP.ADDRESS>:8080/ (e.g. http://192.168.0.3:8080)

(NOTE: Other computers must be connected to the same WiFi router/internet source.)

## Usage
The website hosts a competitive quiz game. This game is meant to assess players on their Object-Oriented programming knowledge, as well as their 'Java' and 'Python' knowledge.

The game is played with 2-8 people as they answer 10 sets of questions and try to get the highest score in the room. Each question will have 2 or 4 answer options that players can choose from. 
After selecting an answer option, the player can lock it in to confirm it. Once everyone has answered, or after 20 seconds have passed, the answer selected will be highlighted with a colour, with a green answer being the correct one, and the red answer being the wrong one.

If a player gets the answer correct, they are granted 100 points, and extra points based on how fast they answered.

AFTER EVERY SECOND, 5 POINTS ARE DEDUCTED FROM A TOTAL OF 100 EXTRA POINTS A PLAYER CAN RECEIVE

(20 seconds = 100 extra points, 18 seconds = 90 extra points, 10 seconds = 50 extra points, etc)

After the set of 10 questions, a scoreboard is presented, showing everyone and the points each of them got.

## Authors and acknowledgment
I would like to give a special thanks to Dr. Genovefa Kefalidou, who was my tutor during the production of this software