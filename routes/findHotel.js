module.exports = 
	function findAttraction(req , res , next){
        var trip_id = req.destination.trip_id;
        pool.getConnection(function(err, connection){
            // retrieve basic information of hotels and add it to req
            var query = 'SELECT * FROM Trip_Hotel WHERE trip_id = ?';
			connection.query(query,[trip_id], function(err, rows){
				if(err){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}
                req.hotel = rows;
                next();
			  });
			connection.release();
		});
    }