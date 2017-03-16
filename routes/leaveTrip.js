module.exports = 
	function deleteTrip(req , res , next){
        var trip_id = req.params.tripId;
        // authenticate if the user is the owner of this trip
        if (req.user.role == 'owner'){
            res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">You cannot leave this trip as the trip onwer</div>'});
        }
        pool.getConnection(function(err, connection){
            if (err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                return;
            }
            // delete the trip in the database
            var query = 'DELETE FROM Trip_User WHERE trip_id = ? AND username = ? ';
            connection.query(query, [trip_id, req.session.username], function(err, rows){
                if(err){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }else{
                    res.redirect('/trip/display');
                }
            });
            connection.release();
        });
    }