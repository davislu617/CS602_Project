module.exports = 
	function deleteTrip(req , res , next){
        var trip_id = req.params.tripId;
        // authenticate if the user is the owner of this editTrip
        if (req.user.role != 'owner'){
            res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">Invalid</div>'});
        }
        pool.getConnection(function(err, connection){
            if (err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                return;
            }
            // delete the trip in the database
            var query = 'DELETE FROM Trip_Attraction WHERE trip_id = ' + trip_id + ';';
            query += 'DELETE FROM Trip_Hotel WHERE trip_id = ' + trip_id + ';';
            query += 'DELETE FROM Trip_User WHERE trip_id = ' + trip_id + ';';
            query += 'DELETE FROM Trip WHERE trip_id = ' + trip_id + ';';
            connection.query(query, function(err, rows){
                if(err){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }else{
                    // redirect to the displayTrip page after inserting the trip successfully
                    res.redirect('/trip/display');
                }
            });
            connection.release();
        });
    }