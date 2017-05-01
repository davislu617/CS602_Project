module.exports = 
	function addHotel(req , res , next){
        var trip_id = req.params.tripId;
        var currentDate = new Date;
        currentDate.setTime(req.params.date);
        pool.getConnection(function(err, connection){
            if (err){
            console.log(err);
            return;
            }
            // get exact travel dates of this travel plan -- users can only add information within these dates
            var query = 'SELECT t.startDate, t.endDate, d.city FROM Trip t '
                    + 'JOIN Destination d ON t.destination_id = d.destination_id '
                    + 'WHERE trip_id = ?'; 
            connection.query(query,[trip_id], function(err, rows){
                var startDate = rows[0].startDate;
                var endDate = rows[0].endDate;
                var city = rows[0].city;
                res.render('addHotelView',{username: 'Welcome ' + req.session.username,
                                                city:city,
                                                tripId: trip_id,
                                                startDate: startDate.getTime(),
                                                endDate: endDate.getTime()});
            });
            connection.release();
        });
    }