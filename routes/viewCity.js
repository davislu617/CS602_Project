module.exports = 
	function viewCity(req , res , next){
        if(req.query.tripId) var tripId = req.query.tripId;
        var city = req.params.city;
        pool.getConnection(function(err, connection){
            // retrieve all information of attractions from database
            var query = 'SELECT a.name, a.description FROM Attraction a '
                      + 'JOIN Destination d ON a.destination_id = d.destination_id ' 
                      + 'WHERE d.city = "'+city+'" '
                      + 'ORDER BY a.name ASC'
            connection.query(query,function(err, rows){
                if(err){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }else{
                    var js = "<script>";
                    for (var i = 0; i < rows.length; i++){
                        // replace all " " by "_" to create id's of these attractions 
                        String.prototype.replaceAll = function(search, replacement) {
                            var target = this;
                            return target.split(search).join(replacement);
                        };
                        rows[i].formatname = rows[i].name.replaceAll(' ','_');
                        js += "$('#"+rows[i].formatname+"').popover();"
                    }
                    js += "</script>";
                    res.render('viewCityView',{username: 'Welcome ' + req.session.username,
                                               tripId: tripId,
                                               city:city,
                                               attraction: rows,
                                                js:js})
                }
            });
            connection.release();
        });
        
    }