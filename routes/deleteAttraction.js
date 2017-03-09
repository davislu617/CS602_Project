module.exports = 
	function deleteAttraction(req , res , next){
        // normalize the inputs from the user
        var trip_id = req.params.tripId;
        var travelDateTime = new Date;
        travelDateTime.setTime(req.params.travelDateTime);
        var travelDate = travelDateTime.getFullYear() + '-' + (travelDateTime.getMonth()+1) + '-' + travelDateTime.getDate()
                        + ' ' + travelDateTime.getHours() + ':' + travelDateTime.getMinutes() + ':' + travelDateTime.getSeconds();
        pool.getConnection(function(err, connection){
            if (err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                return;
            }
            // delete the attraction the database
            var query = 'DELETE FROM Trip_Attraction '
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