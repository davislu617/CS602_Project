module.exports = 
	function saveAttraction(req , res , next){
        // normalize the inputs from the user
        var attractionName = req.body.attraction;
        var dateTime = req.body.date + ' ' + req.body.time;
        var trip_id = req.params.tripId;
        var destination_id = req.params.destination_id;
        pool.getConnection(function(err, connection){
            if (err){
         console.log(err);
         return;
            }
            // insert the normalized inputs into the database
            var query = 'INSERT INTO Trip_Attraction '
                        + 'VALUES (?, ?, (SELECT attraction_id FROM Attraction a '
                                                            + 'WHERE a.name=? AND a.destination_id = ?))';
            connection.query(query,[trip_id, dateTime, attractionName, destination_id], function(err, rows){
                if(err){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }else{
                    // redirect to the displayTrip page after inserting the trip successfully
                    res.redirect('/trip/edit/'+trip_id);
                }
            });
            connection.release();
        });
    }
