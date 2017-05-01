// sample of creating an API to retrieve trips 
// just a sample right now -- for further development, to query database and convert all information into a comprehensive JSON object

module.exports = 
	function downloadTrip(req , res , next){
        var username = req.params.username;
        
        pool.getConnection(function(err, connection){
            var query = 'SELECT t.trip_id, t.startDate, t.endDate, d.city, d.state, d.country '
                      + 'FROM Trip_User tu JOIN Trip t ON tu.trip_id = t.trip_id '
                      + 'JOIN Destination d ON t.destination_id = d.destination_id '
                      + 'WHERE Username = "'+username+'"';
			connection.query(query,
              function(err, rows){
				if(err){
                    console.log(err);
                    return;
                }else{
                    // send the information back
                     res.write(JSON.stringify(rows));
                     res.end();
                    }
                
			  });
            
			connection.release();
		});
    }
