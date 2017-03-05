var pool = require('./dbConnection.js')();
var destination;
pool.getConnection(function(err, connection){
    if (err){
    console.log(err);
    return;
    }
    // retrieve all available destinations to the user
    connection.query('SELECT * FROM Destination', function(err, rows){
        destination = rows;
    });
    connection.release();
});

module.exports = 
	function displayTrip(req , res , next){
        
	  	res.render('addTripView',{username: req.session.username,
                                  data:destination})
    }