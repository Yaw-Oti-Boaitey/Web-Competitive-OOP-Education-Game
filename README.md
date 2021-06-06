# Object-Oriented Programming Quiz Game

This is a quiz game that tests players on their object-oriented programming knowledge. This knowledge includes 'General Object-Oriented Programming concepts', 'Java' and 'Python'

## Installation
IMPORTANT: Setting up the system must be done on a Windows system, though it is possible to do on a MAC or a Linux machine.

"Node.js" and a "MySQL" server are required to run this system effectively: "Node.js" creates the server holding the website, and MySQL holds the database. This program was tested with the application "XAMPP", which hosts the server holding the MySQL database, so that is the application that will be elaborated on later.
The computer must hold a stable internet connection, so all the bootstrap templates work correctly.

"Node.js" can be downloaded for Windows and Mac from the following website: https://nodejs.org/en/download/
(It is best to download the Latest LTS version of NodeJS for this project)

"XAMPP" can be downloaded for Windows, Linux and Mac OSX from the following website: https://www.apachefriends.org/download.html
(Using the latest version is the optimal choice).

To run the website, the NodeJS and the XAMPP servers needs to be set up and running.

## Setting up XAMPP
i)During XAMPP installation, in "Select Components", leave the default selections and continue("MYSQL" should be selected).

ii) In the XAMPP Control Panel, press "Start" for both "Apache" and "MySQL". After both turn green, select "Admin" for MySQL. A new browser window/tab will appear.
In the browser window that opens, in the menu on the leftside of the page, select "New", give the database the name 'quiz_database' and press "Create".

iii) Select the new database, select "Import" from the tabs list and under "File to import", click "Browse" and select the "quiz_database.sql" file located inside the 'main' folder of this project.

The game questions and some sample user accounts for testing have now been imported.

[NOTE: The .env file in 'main' holds the database connection settings necessary for connectivity. Currently it has been configured to be using the default values when XAMPP has been downloaded for the first time]

## Setting up NodeJS
To run the Node server, in the command line, navigate to the location of the main folder(e.g. cd C:\main) and type in 
```
npm run dev
```
or you can type in this instead
```
npm run start
```

When the messages "Server started on port 8080" and "MySQL Connected..." appear, the website can now be accessed.

On the localhost machine(the machine running the Node and MySQL servers), you can get to the page by typing
localhost:8080

For other computers to have access to the game, in any browser search bar, they must input the following into a browser search bar:
http://<LOCAL.HOSTS.IP.ADDRESS>:8080/ (e.g. http://192.168.0.3:8080)

(NOTE: Other computers must be connected to the same WiFi router/internet source.)

## Issues with running the NodeJS server
If you encounter an issue that causes an error to appear instead of the "MySQL Connected..." message, you may need to make some changes to XAMPP and the .env file located in the 'main' folder.

i) Select "Admin" for MySQL in the XAMPP control panel. On the page, click on the "SQL" header and enter this information:

CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;

CREATE USER 'username'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

[NOTE: Both the '.' symbols have asterisks around them]

[NOTE: You can change the 'username' and 'password' to anything you want. For the purpose of this README, we will be using those values]

ii) Open the .env file(You can use a text editor) and change the details currently there:

a. Change DATABASE_HOST from localhost to your computer's ip address(e.g. 192.168.64.2).

b. Change DATABASE_USER from root to username.

c. Change DATABASE_PASSWORD to password.

Now everything should work. To access the website, you will need to type "localhost:8080" into the search bar.

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
