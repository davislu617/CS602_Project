module.exports = 
	function lookAround(req , res , next){
        pool.getConnection(function(err, connection){
            // retrieve all desinations from database
            connection.query('SELECT * FROM Destination ORDER BY city ASC',function(err, rows){
                if(err){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }else{
                    res.render('lookAroundView',{username: 'Welcome ' + req.session.username,
                                                 destination: rows})
                }
            });
            connection.release();
        });
        
    }