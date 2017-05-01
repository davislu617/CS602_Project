module.exports = 
	function saveHotelAfterEdit(req , res , next){
        // normalize the inputs from the user
        var trip_id = req.params.tripId;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;

        pool.getConnection(function(err, connection){
            if (err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                return;
            }
            // update the travel dates in the database
            var query = 'UPDATE Trip '
                        + 'SET startDate = ? , endDate = ?'
                        + 'WHERE trip_id = ?';
            connection.query(query,[startDate, endDate, trip_id], function(err, rows){
                if(err){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }else{
                    // redirect to the displayTrip page after inserting the trip successfully
                    res.redirect('/trip/edit/'+trip_id);
                }
            });
            connection.release();
        });
    }