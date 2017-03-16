module.exports = 
	function adduser(req , res , next){
        // normalize the inputs from the user
        var trip_id = req.params.tripId;
        var username = req.body.username;

        // authenticate if the user is the owner of this editTrip
        if (req.user.role != 'owner'){
            res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">Invalid</div>'});
        }

        pool.getConnection(function(err, connection){
            if (err){
         console.log(err);
         return;
            }
            // insert the normalized inputs into the database
            var query = 'INSERT INTO Trip_User VALUES(? , ?, "companion")';
            connection.query(query, [trip_id, username], function(err, info){
            if(err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">Invalid Username</div>'});
            }else{
                  res.redirect('/trip/edit/'+trip_id);
                 }
            });
            connection.release();
        });
    }