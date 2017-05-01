var pool = require('./dbConnection.js')();
module.exports = 
	function displayTrip(req , res , next){
		 pool.getConnection(function(err, connection){
            if (err){
         		console.log(err);
         		return;
            }
			var query = 'SELECT t.trip_id, t.startDate, t.endDate, d.city, d.state '
						+ 'FROM Trip_User tu JOIN Trip t ON tu.trip_id = t.trip_id '
						+ 'JOIN Destination d ON t.destination_id = d.destination_id '
						+  'WHERE tu.username = "' + req.session.username + '" '
						+ 'ORDER BY t.startDate ASC;';
			// retrieve trip information from the database
			connection.query(query, function(err, rows){
				if(err){
                    res.render('displayTripView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }else{
					if(!rows[0]){
						res.render('displayTripView',{username:req.session.username, 
												  message: "You don't have any trip plan :(<br><br>Let's have a <span class='tripit'>TRIP </span>!"
												  			+"<br><br><a href='/trip/add'>Add a trip</a>"});
					}else{
						// create an inline <script> to invoke the countdown function for each trip
						var result = JSON.parse(JSON.stringify(rows));
						var countdown ="<script type='text/javascript'>";
						for(index in result){
							countdown += "$('#'+"+result[index].trip_id+").countdown({until: new Date("
									+result[index].startDate.substring(0,4)+","+(result[index].startDate.substring(5,7)-1)
									+","+result[index].startDate.substring(8,10)+")});";
							result[index].startDate = result[index].startDate.substring(0,10);
							result[index].endDate = result[index].endDate.substring(0,10);
						}
						countdown += "</script>";

						res.render('displayTripView',{username:'Welcome ' + req.session.username, 
												  	data: result,
												  	countdown: countdown});
					}
				}
			});
			connection.release();
		 });
};