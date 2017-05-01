DROP TABLE if exists User;
CREATE TABLE User (
username VARCHAR(64) PRIMARY KEY,
password VARCHAR(64) NOT NULL,
firstName VARCHAR(64) NOT NULL,
lastName VARCHAR(64) NOT NULL,
emailAddress VARCHAR(128) NOT NULL);


DROP TABLE if exists Destination;
CREATE TABLE Destination (
destination_id INT(10) PRIMARY KEY,
city VARCHAR(64) NOT NULL,
state VARCHAR(64) NOT NULL,
country VARCHAR(64) NOT NULL,
description VARCHAR(256) NOT NULL);

DROP TABLE if exists Trip;
CREATE TABLE Trip (
trip_id INT(10) NOT NULL AUTO_INCREMENT,
startDate DATE NOT NULL,
endDate DATE NOT NULL,
destination_id INT(10) NOT NULL,
CONSTRAINT PRIMARY KEY (trip_id),
CONSTRAINT FOREIGN KEY (destination_id) REFERENCES Destination (destination_id));

DROP TABLE if exists Trip_User;
CREATE TABLE Trip_User (
trip_id INT(10),
username VARCHAR(64),
role VARCHAR(32),
CONSTRAINT PRIMARY KEY (trip_id, username),
CONSTRAINT FOREIGN KEY (trip_id) REFERENCES Trip (trip_id),
CONSTRAINT FOREIGN KEY (username) REFERENCES User (username));

DROP TABLE if exists Attraction;
CREATE TABLE Attraction (
attraction_id INT(10) PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(64) NOT NULL,
destination_id INT(10) NOT NULL,
description VARCHAR(256) NOT NULL,
CONSTRAINT FOREIGN KEY (destination_id) REFERENCES Destination (destination_id));

DROP TABLE if exists Trip_Attraction;
CREATE TABLE Trip_Attraction (
trip_id INT(10),
travelDate DATETIME,
attraction_id INT(10) NOT NULL,
CONSTRAINT PRIMARY KEY (trip_id, travelDate),
CONSTRAINT FOREIGN KEY (trip_id) REFERENCES Trip (trip_id),
CONSTRAINT FOREIGN KEY (attraction_id) REFERENCES Attraction (attraction_id));

DROP TABLE if exists Trip_Hotel;
CREATE TABLE Trip_Hotel (
trip_id INT(10),
travelDate DATE NOT NULL,
name VARCHAR(64) NOT NULL,
address VARCHAR(128) NOT NULL,
CONSTRAINT PRIMARY KEY (trip_id, travelDate),
CONSTRAINT FOREIGN KEY (trip_id) REFERENCES Trip (trip_id));

DROP TRIGGER IF EXISTS trip_after_update;
DELIMITER //
CREATE TRIGGER trip_after_update
AFTER UPDATE ON Trip FOR EACH ROW
BEGIN
	DELETE FROM Trip_Attraction
    WHERE trip_id = new.trip_id AND DATE(travelDate) NOT BETWEEN new.startDate AND new.endDate;
    DELETE FROM Trip_Hotel
    WHERE trip_id = new.trip_id AND travelDate NOT BETWEEN new.startDate AND new.endDate;
END;//

