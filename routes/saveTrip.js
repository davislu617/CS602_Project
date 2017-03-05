var pool = require('./dbConnection.js')();
module.exports = 
	function addTrip(req , res , next){
        // normalize the inputs from the user
        var startDateArray = req.body.startDate.split('/');
        var startDate = startDateArray[2] + '-' + startDateArray[0] + '-' + startDateArray[1];
        var endDateArray = req.body.endDate.split('/');
        var endDate = endDateArray[2] + '-' + endDateArray[0] + '-' + endDateArray[1];

        pool.getConnection(function(err, connection){
            if (err){
         console.log(err);
         return;
            }
            // insert the normalized inputs into the database
            var query = 'INSERT INTO Trip VALUES(NULL,"' + startDate + '","' + endDate 
                    + '", (SELECT destination_id from Destination d WHERE d.city="'
                    + req.body.destination + '"));';
            connection.query(query, function(err, info){
                if(err){
                    res.render('addTripView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }else{
                    query = 'INSERT INTO Trip_User VALUES(' + info.insertId + ',"' + req.session.username + '");';
                    connection.query(query, function(err, info){
                        if(err){
                            res.render('addTripView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                        }else{
                            // redirect to the displayTrip page after inserting the trip successfully
                            res.redirect('/trip/display');
                        }
                    });
                }
            });
            connection.release();
        });
    }