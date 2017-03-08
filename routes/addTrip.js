var pool = require('./dbConnection.js')();
var destination;
var autoFillScript ='';
pool.getConnection(function(err, connection){
    if (err){
    console.log(err);
    return;
    }
    // retrieve all available destinations to the user
    connection.query('SELECT * FROM Destination', function(err, rows){
        destination = rows;
        // create a <script> tag to invoke the JQuery UI function -- autocomplete
        autoFillScript += '<script>' + ' $( function() {var destinationList = [';
        for(index in destination){
            autoFillScript += '"' + destination[index].city + '",';
        }
        autoFillScript = autoFillScript.substring(0,autoFillScript.length-1);
        autoFillScript += ']; $( "#destination" ).autocomplete({source: destinationList});});</script>';
    });
    connection.release();
});


module.exports = 
	function displayTrip(req , res , next){
        
	  	res.render('addTripView',{username: req.session.username,
                                  data:destination,
                                  autoFill: autoFillScript})
    }