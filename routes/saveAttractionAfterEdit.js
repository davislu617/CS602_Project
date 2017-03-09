module.exports = 
	function saveAttractionAfterEdit(req , res , next){
        // normalize the inputs from the user
        var attractionName = req.body.attraction;
        var dateTime = req.body.date + ' ' + req.body.time;
        var trip_id = req.params.tripId;
        pool.getConnection(function(err, connection){
            if (err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                return;
            }
            // update the attraction in the database
            var query = 'UPDATE Trip_Attraction '
                        + 'SET travelDate = ? '
                        + 'WHERE trip_id = ? AND attraction_id = '
                        + '(SELECT a.attraction_id FROM Attraction a WHERE a.name = ?)';
            connection.query(query,[dateTime, trip_id, attractionName], function(err, rows){
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