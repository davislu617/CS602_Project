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
startDate DATE NULL,
endDate DATE NULL,
destination_id INT(10),
CONSTRAINT PRIMARY KEY (trip_id),
CONSTRAINT FOREIGN KEY (destination_id) REFERENCES Destination (destination_id));

DROP TABLE if exists Trip_User;
CREATE TABLE Trip_User (
trip_id INT(10),
username VARCHAR(64),
CONSTRAINT PRIMARY KEY (trip_id, username),
CONSTRAINT FOREIGN KEY (trip_id) REFERENCES Trip (trip_id),
CONSTRAINT FOREIGN KEY (username) REFERENCES User (username));

DROP TABLE if exists Attraction;
CREATE TABLE Attraction (
attraction_id DECIMAL(10) PRIMARY KEY,
name VARCHAR(64) NOT NULL,
destination_id DECIMAL(10) NOT NULL,
location VARCHAR(64) NOT NULL,
description VARCHAR(256) NOT NULL,
CONSTRAINT FOREIGN KEY (destination_id) REFERENCES Destination (destination_id));

DROP TABLE if exists Transport;
CREATE TABLE Transport (
transport_id DECIMAL(10) PRIMARY KEY,
name VARCHAR(64) NOT NULL);


DROP TABLE if exists Trip_Attraction;
CREATE TABLE Trip_Attraction (
trip_id DECIMAL(10),
attraction_id DECIMAL(10),
travelDate DATE NOT NULL,
travelTime VARCHAR(10) NOT NULL,
CONSTRAINT PRIMARY KEY (trip_id, attraction_id),
CONSTRAINT FOREIGN KEY (trip_id) REFERENCES Trip (trip_id),
CONSTRAINT FOREIGN KEY (attraction_id) REFERENCES Attraction (attraction_id));

DROP TABLE if exists Trip_Transport;
CREATE TABLE Trip_Transport (
trip_id DECIMAL(10),
transport_id DECIMAL(10),
travelDate DATE NOT NULL,
travelTime VARCHAR(10) NOT NULL,
CONSTRAINT PRIMARY KEY (trip_id, transport_id),
CONSTRAINT FOREIGN KEY (trip_id) REFERENCES Trip (trip_id),
CONSTRAINT FOREIGN KEY (transport_id) REFERENCES Transport (transport_id));