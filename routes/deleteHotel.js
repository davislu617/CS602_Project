module.exports = 
	function deleteHotel(req , res , next){
        // normalize the inputs from the user
        var trip_id = req.params.tripId;
        var date = new Date;
        date.setTime(req.params.date);
        var travelDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        pool.getConnection(function(err, connection){
            if (err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                return;
            }
            // delete the hotel from the database
            var query = 'DELETE FROM Trip_Hotel '
                        + 'WHERE trip_id = ? AND travelDate = ?';
            connection.query(query,[trip_id, travelDate], function(err, rows){
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