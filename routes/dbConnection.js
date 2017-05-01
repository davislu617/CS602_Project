var mysql = require('mysql');
var credentials = require("../credentials.js");

module.exports  = function (){
	return pool = mysql.createPool({
		"host": credentials.host, 
		"port": 3307,
		"user": credentials.username,
		"password": credentials.password,
		"database": credentials.database,
		multipleStatements: true
	});
};


