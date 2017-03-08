module.exports = 
	function findDesination(req , res , next){
		pool.getConnection(function(err, connection){
            
			var query = 'SELECT t.trip_id, t.startDate, t.endDate, d.destination_id, d.city '
				        + 'FROM Trip t JOIN Destination d ON t.destination_id = d.destination_id '
				        + 'WHERE t.trip_id = ?'
			connection.query(query,[req.params.tripId],function(err, rows){
				if(err)
					res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
				req.destination = rows[0];
                next();
			});
			connection.release();
		});
    };