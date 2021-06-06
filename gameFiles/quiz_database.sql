-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2021 at 11:01 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `Question_ID` int(255) NOT NULL,
  `Category_ID` int(255) NOT NULL,
  `Question` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`Question_ID`, `Category_ID`, `Question`) VALUES
(1, 1, 'What does OOP stand for?'),
(2, 1, 'How many principles of Object-Oriented Programming are there?'),
(3, 1, 'Which is the correct definition of object-oriented programming?'),
(4, 2, 'TRUE OR FALSE: The name of the java file must match the class name'),
(5, 1, 'Which of these best describes \'Encapsulation\'?'),
(6, 1, 'What is a \'class\' in Object Oriented Programming?'),
(7, 1, 'What is a \'friend\' function?'),
(8, 1, 'Which of these best describes \'Inheritance\'?'),
(9, 1, 'What are the basic concepts of Object-Oriented Programming?'),
(10, 1, 'Which of these best describes an \'Object\' in Object-Oriented Programming?'),
(11, 1, 'Select the one that is NOT a concept of Object-Oriented Programming.'),
(12, 1, 'What is a constructor?'),
(13, 1, 'Which of these best describes \'Abstraction\'?'),
(14, 1, 'TRUE OR FALSE: A virtual function is a member function of a class, and its functionality cannot be overridden in its derived class'),
(15, 1, 'Which one best describes \'Polymorphism\'?'),
(16, 2, 'What does \"JDK\" stand for?'),
(17, 2, 'What is the use of \'main\' in \"public static void main(String args[])\"?'),
(18, 2, 'What does \"JVM\" stand for in Java?'),
(19, 2, 'What is the \"Java Runtime Environment\"?'),
(20, 2, 'What term refers to the tool necessary to compile, document and package Java programs?'),
(21, 2, 'What does \'void\' mean in \"public static void main(String args[])\"?'),
(22, 2, 'What is a \'singleton class\' in Java?'),
(23, 2, 'What is a \'package\' in Java?'),
(24, 2, 'What does \'public\' mean in \"public static void main(String args[])\"?'),
(25, 2, 'TRUE OR FALSE: \'delete\' is a valid keyword in java'),
(26, 2, 'What does \'static\' stand for in \"public static void main(String args[])\"?'),
(27, 3, 'TRUE OR FALSE:  Python is case-sensitive.'),
(28, 3, 'What is the main difference between a list and a tuple?'),
(29, 3, 'Which of these is NOT a key feature of Python?'),
(30, 3, 'What is pep 8?'),
(31, 3, 'What is \'namespace\' in Python?'),
(32, 3, 'What is __init__?'),
(33, 3, 'What is \'type conversion\' in Python?'),
(34, 3, 'What are \'python modules\'?'),
(35, 3, 'How would you convert \"jIMbO\" into lowercase in Python?'),
(36, 3, 'What is \'PYTHONPATH\'?'),
(37, 3, 'What is the result of \">>> (1,2,3,4,5)[2:4]\"?'),
(38, 3, 'How will you check if all characters in a string are alphanumeric?');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions_answers`
--

CREATE TABLE `quiz_questions_answers` (
  `Answer_ID` int(255) NOT NULL,
  `Question_ID` int(255) NOT NULL,
  `Answer` varchar(255) NOT NULL,
  `Correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_questions_answers`
--

INSERT INTO `quiz_questions_answers` (`Answer_ID`, `Question_ID`, `Answer`, `Correct`) VALUES
(1, 1, 'Organized-Ordinal Prototyping', 0),
(2, 1, 'Object-Oriented Programming', 1),
(3, 1, 'Object-Oscillating Programs', 0),
(4, 1, 'Object-Oriental Programming', 0),
(5, 3, 'Programming involving the use of storage devices to produce code', 0),
(6, 3, 'A programming model that organizes software design around objects', 1),
(7, 3, 'A programming model that is run exclusively with machine learning to develop code for any purpose', 0),
(8, 3, 'A programming model that organizes software design around functions and logic', 0),
(9, 2, '4', 1),
(10, 2, '6', 0),
(11, 2, '12', 0),
(12, 2, '10', 0),
(15, 4, 'True', 1),
(16, 4, 'False', 0),
(17, 14, 'False', 1),
(18, 14, 'True', 0),
(19, 6, 'A technique used by the compilers to insert complete body of the function wherever that function is used in the program source code', 0),
(20, 6, 'The blueprint, plan or template that describes the details of an object.', 1),
(21, 6, 'A variable that holds data for browsers', 0),
(22, 6, 'A group of students attending a lesson.', 0),
(23, 6, 'A function where different operators are applied and depends on the arguments', 0),
(29, 11, 'Encapsulation', 0),
(30, 11, 'Polymorphism', 0),
(31, 11, 'Eradication', 1),
(32, 11, 'Abstraction', 0),
(33, 11, 'Inheritance', 0),
(34, 7, 'A friend of the main class that will help it through thick and thin.', 0),
(35, 7, 'A function that is allowed to access the public, private, or protected data in a class, given it is declared in it.', 1),
(36, 7, 'A member function of a class, and its functionality can be overridden in its derived class', 0),
(37, 7, 'A regular function that allows the creation of several methods with the same name which differ from each other by the type of input and output of the function', 0),
(38, 15, 'Assigning a value in the main class to an object that was previously declared in a subclass', 0),
(39, 15, 'Converting a class into a subclass', 0),
(40, 15, 'Transforming methods into classes', 0),
(41, 15, 'Assigning behavior or a value in a subclass to something that was already declared in the main class', 1),
(42, 12, 'The functions which can be used in conjunction with the insertion (<<) and extraction (>>) operators on an object', 0),
(43, 12, 'A method that upon being called, changes an object\'s value', 0),
(44, 12, 'A class used to initialize the state of an object, and it gets invoked at the time of object creation', 0),
(45, 12, 'A method used to initialize the state of an object, and it gets invoked at the time of object creation', 1),
(46, 5, 'The process of containing all important information inside an object, only exposing selected information to the outside world.', 1),
(47, 5, 'The process of encasing classes into one class that can only be called by the main class if referred to.', 0),
(48, 5, 'The process of compressing a program into a compressed format (e.g. .RAR)', 0),
(49, 5, 'It is the process of containing all important information inside the main class, only exposing selected information to the other classes in the program.', 0),
(54, 8, 'A concept where one class shares the structure and behavior defined in another class.', 1),
(55, 8, 'The act of transforming a class into methods and functions', 0),
(56, 8, 'The process of taking code of one programming language and merging it with another programming language', 0),
(57, 8, 'A concept where one method shares the structure and behavior defined in a function.', 0),
(58, 9, 'Inheritance, Polymorphism, Encryption and Abstraction', 0),
(59, 9, 'Encapsulation, Abstraction, Inheritance and Polynomials\r\n', 0),
(60, 9, 'Abstraction, Encryption, Individualism and Polymorphism\r\n', 0),
(61, 9, 'Inheritance, Abstraction, Encapsulation and Polymorphism', 1),
(62, 10, 'An instance of an application', 0),
(63, 10, 'An instance of a function', 0),
(64, 10, 'An instance of a class', 1),
(65, 10, 'An instance of a method', 0),
(66, 13, 'A user can restructure the way objects works.', 0),
(67, 13, 'A user can change all aspects of a program.', 0),
(68, 13, 'A user can interact with all attributes and methods of an object.', 0),
(69, 13, 'A user interacts with only selected attributes and methods of an object.', 1),
(75, 16, 'Java Development Kite', 0),
(76, 16, 'Java Development Kit', 1),
(77, 16, 'Java Database Kit', 0),
(78, 16, 'JavaScript Developer\'s Kinematics', 0),
(79, 16, 'Java Database Kinematics', 0),
(80, 18, 'Java Virtual Machine', 1),
(81, 18, 'Java Variable Mechanics', 0),
(82, 18, 'January Vitality Machinery', 0),
(83, 18, 'Java Virtuous Matters', 0),
(84, 18, 'JavaScript Vitality Machine', 0),
(85, 25, 'False', 1),
(86, 25, 'True', 0),
(87, 23, 'A file added to a java program that enables it to be send off to different machines.', 0),
(88, 23, 'The collection of related classes and interfaces bundled together.', 1),
(89, 23, 'It converts the Java primitives into reference types (objects).', 0),
(90, 23, 'A block of code used to initialize an object.', 0),
(91, 17, 'It is the name of the method searched by JVM as a starting point for an application.', 1),
(92, 17, 'It is the class searched by JVM as a starting point for an application.', 0),
(93, 17, 'It is the name of a method created by the user.', 0),
(94, 17, 'It is the name of the method searched by JDK as a starting point for an application.', 0),
(95, 17, 'It is an access modifier which allows it to be called by any class.', 0),
(96, 19, 'It is a runtime environment in which Java bytecode can be executed', 1),
(97, 19, 'It is a runtime environment in which JavaScript bytecode can be executed', 0),
(98, 19, 'It is an environment which allows a java program\'s use in programs that use different programming languages.', 0),
(99, 19, 'It is an environment that allows java programs to compete against each other.', 0),
(100, 19, 'It is a tool necessary to compile, document and package Java programs.', 0),
(101, 20, 'Package', 0),
(102, 20, 'Method', 0),
(103, 20, 'Java Development Kit', 1),
(104, 20, 'Classes', 0),
(105, 20, 'Java Runtime Environment', 0),
(106, 20, 'Functions', 0),
(107, 21, 'It is the return type of the method which will not return any value.', 1),
(108, 21, 'It is the return type of the method which returns a value.', 0),
(109, 21, 'A keyword in java which identifies it is class-based.', 0),
(110, 21, 'The parameter passed to the main method.', 0),
(111, 21, 'It is a term indicating that main will not contain any code.', 0),
(122, 22, 'It is a class in which only one instance can be created at any given time, in one JVM, made by making its constructor private', 1),
(123, 22, 'It is a method in which only one instance can be created at any given time, in one JVM, made by making its constructor private', 0),
(124, 22, 'It is the term used for a class in a program when it is the only one in that program.', 0),
(125, 22, 'It is a class that converts the Java primitives into the reference types.', 0),
(126, 24, 'It is an access modifier, which makes it so that the method it is attached to can be accessed by any class', 1),
(127, 24, 'It is an access modifier, which makes it so that the method it is attached to cannot be accessed by any class', 0),
(128, 24, 'It is the parameter passed to the main method', 0),
(129, 24, 'It is the return type of the method, meaning that method will not return any value.', 0),
(130, 32, 'This is a method or constructor in Python, automatically called to allocate memory when a new object/ instance of a class is created.', 1),
(131, 32, 'This is a class in Python, automatically called to allocate memory when a new object/ instance of a class is created.', 0),
(132, 32, 'This is a method that gives a certain class a name when called.', 0),
(133, 32, 'This is a constructor in Java, automatically called to allocate memory when a new object/ instance of a class is created.', 0),
(134, 32, 'This is a method ,automatically called to delete some memory when a new object/ instance of a class is created.', 0),
(135, 27, 'True', 1),
(136, 27, 'False', 0),
(137, 28, 'Lists are mutable, while Tuples are immutable.', 1),
(138, 28, 'Lists are immutable, while Tuples are mutable.', 0),
(139, 28, 'No difference. They are just different names for a collection of items', 0),
(140, 28, 'Lists can only contains strings, while Tuples can hold strings and integers', 0),
(141, 28, 'Lists are unique to Python, while Tuples are used in many other programming languages.', 0),
(142, 29, 'Python is an interpreted language', 0),
(143, 29, 'Python is dynamically typed', 0),
(144, 29, 'Python is a Prototype-based Language', 1),
(145, 29, 'Python is well suited to object orientated programming', 0),
(146, 29, 'In Python, functions are first-class objects', 0),
(147, 26, 'It is a class whose only one instance can be created at any given time, in one JVM.', 0),
(148, 26, 'It is a block of code which is used to initialize an object.', 0),
(149, 26, 'It is the return type of a method, that makes it so the method will not return any value.', 0),
(150, 26, 'Public is an access modifier, which makes it so the method will be accessible by any class.', 0),
(151, 26, 'It indicates that the particular member belongs to a type itself, rather than to an instance of that type.', 1),
(152, 30, 'a set of rules that specify how to format Python code for maximum readability.', 1),
(153, 30, 'a set of methods that specify how to convert Python code into other languages.', 0),
(154, 30, 'A class made by a user involving pepper.', 0),
(155, 30, 'a naming system used to make sure that names are unique to avoid naming conflicts', 0),
(156, 30, 'Files containing Python code.', 0),
(157, 31, 'A naming system used to make sure that names are unique to avoid naming conflicts', 1),
(158, 31, 'The name a user gives to a Python file.', 0),
(159, 31, 'A variable that can be accessed by any function in the program.', 0),
(160, 31, 'A function that can have any number of parameters, but can have just one statement.', 0),
(161, 33, 'The conversion of one data type into another.', 1),
(162, 33, 'The conversion of one programming language into another.', 0),
(163, 33, 'A method or constructor automatically called to allocate memory when a new object/ instance of a class is created', 0),
(164, 33, 'The conversion of a List into a Tuple', 0),
(165, 33, 'The conversion of a sub class into a main class.', 0),
(171, 37, '(3, 4)', 1),
(172, 37, '(2,3)', 0),
(173, 37, '(4,5)', 0),
(174, 37, '(2,3,4,5)', 0),
(175, 37, '(2,4)', 0),
(176, 34, 'These are files containing Python code.', 1),
(177, 34, 'These are specific methods exclusive to Python.', 0),
(178, 34, 'These are files that were previously other files, but were converted to \'.py\' files.', 0),
(179, 34, 'This is a term used for a session concerning Python learning.', 0),
(180, 34, 'These are files containing a mix of Python code and other coding languages.', 0),
(181, 35, '>>> \'jIMbO\'.lower()', 1),
(182, 35, '\'jIMbO\'.toLowerCase();', 0),
(183, 35, '>>>\'jIMbO\'.toLowerCase();', 0),
(184, 35, '>>>\'jIMbO\'.lowerCaseIt();', 0),
(185, 35, 'toLowerCase(\'jIMbO\');', 0),
(186, 36, 'This is a set of rules that specify how to format Python code for maximum readability.', 0),
(187, 36, 'It is an environment variable which is used when a module is imported to check for the presence of the imported modules in various directories.', 1),
(188, 36, 'It is a local variable which is used when a module is imported to check for the presence of the imported modules in various directories.', 0),
(189, 36, 'It is a variable which is used when a .py file is being converted.', 0),
(190, 36, 'This is the directory a .py file is located on the system.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions_categories`
--

CREATE TABLE `quiz_questions_categories` (
  `Category_ID` int(255) NOT NULL,
  `Category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_questions_categories`
--

INSERT INTO `quiz_questions_categories` (`Category_ID`, `Category`) VALUES
(1, 'General OOP Concepts'),
(2, 'Java'),
(3, 'Python');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `userID` int(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`userID`, `email`, `username`, `password`) VALUES
(11, 'su@gmail.com', 'SampleUser', '$2a$10$wXXRVZadjeSMlWFSL/uVc.ZhBZj81WDA3qWdIH/.TGakKFCcquTMK'),
(16, 'tu@gmail.com', 'TestUser69', '$2a$10$vlXJxVuZ.IGjDuO3xw8CqeMMrM88O4Mkzw/.LKA6DCe.K1Rz/0tj2'),
(17, 'testuser2@hotmail.com', 'testuser2', '$2a$10$AvjEnJVZ3nbZcOvbTDtuVeVh5BCjS/M9fDKLW7We/6xYLgwb/OQ/i');

-- --------------------------------------------------------

--
-- Table structure for table `user_score`
--

CREATE TABLE `user_score` (
  `Score_ID` int(255) NOT NULL,
  `UserID` int(255) NOT NULL,
  `Category_ID` int(255) NOT NULL,
  `Score` int(255) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`Question_ID`),
  ADD KEY `fk_category_id` (`Category_ID`);

--
-- Indexes for table `quiz_questions_answers`
--
ALTER TABLE `quiz_questions_answers`
  ADD PRIMARY KEY (`Answer_ID`),
  ADD KEY `fk_question_id` (`Question_ID`);

--
-- Indexes for table `quiz_questions_categories`
--
ALTER TABLE `quiz_questions_categories`
  ADD PRIMARY KEY (`Category_ID`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `user_score`
--
ALTER TABLE `user_score`
  ADD PRIMARY KEY (`Score_ID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `Category_ID` (`Category_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `Question_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `quiz_questions_answers`
--
ALTER TABLE `quiz_questions_answers`
  MODIFY `Answer_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT for table `quiz_questions_categories`
--
ALTER TABLE `quiz_questions_categories`
  MODIFY `Category_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `userID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_score`
--
ALTER TABLE `user_score`
  MODIFY `Score_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`Category_ID`) REFERENCES `quiz_questions_categories` (`Category_ID`);

--
-- Constraints for table `quiz_questions_answers`
--
ALTER TABLE `quiz_questions_answers`
  ADD CONSTRAINT `fk_question_id` FOREIGN KEY (`Question_ID`) REFERENCES `quiz_questions` (`Question_ID`);

--
-- Constraints for table `user_score`
--
ALTER TABLE `user_score`
  ADD CONSTRAINT `user_score_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user_login` (`userID`),
  ADD CONSTRAINT `user_score_ibfk_2` FOREIGN KEY (`Category_ID`) REFERENCES `quiz_questions_categories` (`Category_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
