-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 26, 2017 at 11:47 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CS602_Project`
--

-- --------------------------------------------------------

--
-- Table structure for table `Attraction`
--

CREATE TABLE `Attraction` (
  `attraction_id` int(10) NOT NULL,
  `name` varchar(64) NOT NULL,
  `destination_id` int(10) NOT NULL,
  `description` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Attraction`
--

INSERT INTO `Attraction` (`attraction_id`, `name`, `destination_id`, `description`) VALUES
(1, 'Freedom Trail', 1, 'The Freedom Trail is a 2.5-mile-long (4.0 km) path through downtown Boston, Massachusetts that passes by 16 locations significant to the history of the United States. Marked largely with brick, it winds between Boston Common to the Bunker Hill Monument in '),
(2, 'Boston Common', 1, 'Boston Common (also known as the Common) is a central public park in downtown Boston, Massachusetts. It is sometimes erroneously referred to as the \"Boston Commons\".[4][5] Dating from 1634, it is the oldest city park in the United States.'),
(3, 'Harvard University', 1, 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts, established in 1636, whose history, influence, and wealth have made it one of the worlds most prestigious universities.'),
(4, 'Museum of Fine Arts', 1, 'The Museum of Fine Arts in Boston is the fourth largest museum in the United States. It contains more than 450,000 works of art, making it one of the most comprehensive collections in the Americas. With more than one million visitors a year, it is the 55th'),
(5, 'New England Aquarium', 1, 'The New England Aquarium is an aquarium located in Boston, Massachusetts. In addition to the main aquarium building, attractions at the New England Aquarium include the Simons IMAX Theatre and the New England Aquarium Whale Watch, which operates from April'),
(6, 'Faneuil Hall', 1, 'Faneuil Hall, located near the waterfront and Government Center, has been a marketplace and a meeting hall since 1743. It was the site of several speeches by Samuel Adams, James Otis, and others encouraging independence from Great Britain. Now it is part o'),
(7, 'Fenway Park', 1, 'Fenway Park is a baseball park located in Boston, at 4 Yawkey Way near Kenmore Square. Since 1912, it has been the home for the Boston Red Sox, the Major League Baseball (MLB) franchise. It is the oldest ballpark in MLB.'),
(8, 'Boston Harbor', 1, 'Boston Harbor is a natural harbor and estuary of Massachusetts Bay, and is located adjacent to the city of Boston, Massachusetts. It is home to the Port of Boston, a major shipping facility in the northeastern United States.'),
(9, 'United States Capitol', 3, 'The United States Capitol, often called the Capitol Building or Capitol Hill, is the home of the United States Congress, and the seat of the legislative branch of the U.S. federal government. It sits atop Capitol Hill at the eastern end of the National Mal'),
(10, 'Lincoln Memorial', 3, 'The Lincoln Memorial is an American national monument built to honor the 16th President of the United States, Abraham Lincoln. It is located on the western end of the National Mall in Washington, D.C., across from the Washington Monument.'),
(11, 'White House', 3, 'The White House is the official residence and principal workplace of the President of the United States, located at 1600 Pennsylvania Avenue NW in Washington, D.C. It has been the residence of every U.S. president since John Adams in 1800. The term White H'),
(12, 'National Museum of Natural History', 3, 'The National Museum of Natural History is a natural history museum administered by the Smithsonian Institution, located on the National Mall in Washington, D.C., United States. With free admission and open doors 364 days a year, it is the third most visite'),
(13, 'Washington Monument', 3, 'The Washington Monument is an obelisk on the National Mall in Washington, D.C., built to commemorate George Washington, once commander-in-chief of the Continental Army and the first President of the United States.'),
(14, 'National Gallery of Art', 3, 'The National Gallery of Art, and its attached Sculpture Garden, is a national art museum in Washington, D.C., located on the National Mall, between 3rd and 9th Streets, at Constitution Avenue NW. Open to the public and free of charge, the museum was privat'),
(15, 'Jefferson Memorial', 3, 'The Jefferson Memorial is a presidential memorial in Washington, D.C., dedicated to Thomas Jefferson (1743–1826), one of the most important of the American Founding Fathers as the main drafter and writer of the Declaration of Independence, member of the Co'),
(16, 'National Zoological Park', 3, 'The National Zoological Park, commonly known as the National Zoo, is one of the oldest zoos in the United States. The Giant Panda Habitat features three outdoor areas with animal enrichment, as well as an indoor area with a rocky outcrop, a waterfall, and '),
(17, 'Central Park', 2, 'Central Park is an urban park in Manhattan, New York City. Central Park is the most visited urban park in the United States, with 40 million visitors in 2013, and one of the most filmed locations in the world.'),
(18, 'Empire State Building', 2, 'The Empire State Building is a 102-story skyscraper located on Fifth Avenue between West 33rd and 34th Streets in Midtown, Manhattan, New York City. It has a roof height of 1,250 feet, and with its antenna included, it stands a total of 1,454 feet tall. It'),
(19, 'Statue of Liberty', 2, 'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor '),
(20, 'Metropolitan Museum of Art', 2, 'The Metropolitan Museum of Art, colloquially \"the Met\", is located in New York City and is the largest art museum in the United States, and is among the most visited art museums in the world. Its permanent collection contains over two million works, divide'),
(21, 'Rockefeller Center', 2, 'Rockefeller Center is a large complex consisting of 19 high-rise commercial buildings covering 22 acres between 48th and 51st Streets in New York City. Commissioned by the Rockefeller family, it is located in the center of Midtown Manhattan, spanning the a'),
(22, 'One World Trade Center', 2, 'One World Trade Center is the main building of the rebuilt World Trade Center complex in Lower Manhattan, New York City. It is the tallest building in the Western Hemisphere, and the sixth-tallest in the world. The supertall structure has the same name as '),
(23, 'American Museum of Natural History', 2, 'The American Museum of Natural History (abbreviated as AMNH), located on the Upper West Side of Manhattan, New York City, is one of the largest museums in the world. Located in park-like grounds across the street from Central Park, the museum complex compr'),
(24, 'Brooklyn Bridge', 2, 'The Brooklyn Bridge is a hybrid cable-stayed/suspension bridge in New York City and is one of the oldest bridges of either type in the United States. Completed in 1883, it connects the boroughs of Manhattan and Brooklyn by spanning the East River. It has a');

-- --------------------------------------------------------

--
-- Table structure for table `Destination`
--

CREATE TABLE `Destination` (
  `destination_id` int(10) NOT NULL,
  `city` varchar(64) NOT NULL,
  `state` varchar(64) NOT NULL,
  `country` varchar(64) NOT NULL,
  `description` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Destination`
--

INSERT INTO `Destination` (`destination_id`, `city`, `state`, `country`, `description`) VALUES
(1, 'Boston', 'MA', 'U.S.', 'Boston is the capital and most populous city of the Commonwealth of Massachusetts in the United States. One of the oldest cities in the United States, Boston was founded on the Shawmut Peninsula in 1630 by Puritan settlers from England. It was the scene of'),
(2, 'New York', 'NY', 'U.S.', 'New York, is the most populous city in the United States. With an estimated 2015 population of 8,550,405 distributed over a land area of about 302.6 square miles. New York City is also the most densely populated major city in the United States. Located at '),
(3, 'Washington', 'D.C.', 'U.S.', 'The signing of the Residence Act on July 16, 1790, approved the creation of a capital district located along the Potomac River on the East Coast. The U.S. Constitution provided for a federal district under the exclusive jurisdiction of the Congress and the');

-- --------------------------------------------------------

--
-- Table structure for table `Trip`
--

CREATE TABLE `Trip` (
  `trip_id` int(10) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `destination_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `Trip`
--
DELIMITER $$
CREATE TRIGGER `trip_after_update` AFTER UPDATE ON `Trip` FOR EACH ROW BEGIN
	DELETE FROM Trip_Attraction
    WHERE trip_id = new.trip_id AND DATE(travelDate) NOT BETWEEN new.startDate AND new.endDate;
    DELETE FROM Trip_Hotel
    WHERE trip_id = new.trip_id AND travelDate NOT BETWEEN new.startDate AND new.endDate;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Trip_Attraction`
--

CREATE TABLE `Trip_Attraction` (
  `trip_id` int(10) NOT NULL,
  `travelDate` datetime NOT NULL,
  `attraction_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Trip_Hotel`
--

CREATE TABLE `Trip_Hotel` (
  `trip_id` int(10) NOT NULL,
  `travelDate` date NOT NULL,
  `name` varchar(64) NOT NULL,
  `address` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Trip_User`
--

CREATE TABLE `Trip_User` (
  `trip_id` int(10) NOT NULL,
  `username` varchar(64) NOT NULL,
  `role` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `firstName` varchar(64) NOT NULL,
  `lastName` varchar(64) NOT NULL,
  `emailAddress` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Attraction`
--
ALTER TABLE `Attraction`
  ADD PRIMARY KEY (`attraction_id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `Destination`
--
ALTER TABLE `Destination`
  ADD PRIMARY KEY (`destination_id`);

--
-- Indexes for table `Trip`
--
ALTER TABLE `Trip`
  ADD PRIMARY KEY (`trip_id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `Trip_Attraction`
--
ALTER TABLE `Trip_Attraction`
  ADD PRIMARY KEY (`trip_id`,`travelDate`),
  ADD KEY `attraction_id` (`attraction_id`);

--
-- Indexes for table `Trip_Hotel`
--
ALTER TABLE `Trip_Hotel`
  ADD PRIMARY KEY (`trip_id`,`travelDate`);

--
-- Indexes for table `Trip_User`
--
ALTER TABLE `Trip_User`
  ADD PRIMARY KEY (`trip_id`,`username`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Attraction`
--
ALTER TABLE `Attraction`
  MODIFY `attraction_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `Trip`
--
ALTER TABLE `Trip`
  MODIFY `trip_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Attraction`
--
ALTER TABLE `Attraction`
  ADD CONSTRAINT `attraction_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `Destination` (`destination_id`);

--
-- Constraints for table `Trip`
--
ALTER TABLE `Trip`
  ADD CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `Destination` (`destination_id`);

--
-- Constraints for table `Trip_Attraction`
--
ALTER TABLE `Trip_Attraction`
  ADD CONSTRAINT `trip_attraction_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `Trip` (`trip_id`),
  ADD CONSTRAINT `trip_attraction_ibfk_2` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction` (`attraction_id`);

--
-- Constraints for table `Trip_Hotel`
--
ALTER TABLE `Trip_Hotel`
  ADD CONSTRAINT `trip_hotel_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `Trip` (`trip_id`);

--
-- Constraints for table `Trip_User`
--
ALTER TABLE `Trip_User`
  ADD CONSTRAINT `trip_user_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `Trip` (`trip_id`),
  ADD CONSTRAINT `trip_user_ibfk_2` FOREIGN KEY (`username`) REFERENCES `User` (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
