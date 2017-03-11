module.exports = 
	function saveHotel(req , res , next){
        // normalize the inputs from the user
        var trip_id = req.params.tripId;
        var name = req.body.name;
        var address = req.body.address;
        // find all dates that the hotel will be in
        var startDateString = req.body.startDate.split('-');
        var startDate = new Date();
        startDate.setFullYear(startDateString[0]);
        startDate.setMonth(startDateString[1]-1);
        startDate.setDate(startDateString[2]);
        var endDateString = req.body.endDate.split('-');
        var endDate = new Date();
        endDate.setFullYear(endDateString[0]);
        endDate.setMonth(endDateString[1]-1);
        endDate.setDate(endDateString[2]);
        var dateList = [];
        if(req.body.startDate == req.body.endDate){
            dateList.push(req.body.startDate);
        }else{
            var difference_ms = endDate.getTime() - startDate.getTime();
		    var travelDays = Math.round(difference_ms/(24*60*60*1000));
            for (var i = 0; i <= travelDays; i++){
                dateList.push(startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate());
                startDate.setDate(startDate.getDate()+1);
            }
        }
        var query = '';
        for (index in dateList){
            query += 'INSERT INTO Trip_Hotel VALUES('+trip_id+', "'+dateList[index]+'", "'+name+'", "'+address+'"); '
        }

        pool.getConnection(function(err, connection){
            if (err){
                res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                return;
            }
            // insert the all dates of the hotel into the database

            connection.query(query, function(err, rows){
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
