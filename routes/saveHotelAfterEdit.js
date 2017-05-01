module.exports = 
	function saveHotelAfterEdit(req , res , next){
        // normalize the inputs from the user
        var trip_id = req.params.tripId;
        var name = req.body.name;
        var address = req.body.address;
        var date = req.body.date;
        var originalDate = new Date();
        originalDate.setTime(req.params.date);
        var originalDateString = originalDate.getFullYear() + '-' + (originalDate.getMonth()+1) + '-' + originalDate.getDate();
        pool.getConnection(function(err, connection){
            if (err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                return;
            }
            // update the hotel in the database
            var query = 'UPDATE Trip_Hotel '
                        + 'SET name = ? , address = ? , travelDate = ?'
                        + 'WHERE trip_id = ? AND travelDate = ?';
            connection.query(query,[name, address, date, trip_id, originalDateString], function(err, rows){
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