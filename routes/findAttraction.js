module.exports = 
	function findAttraction(req , res , next){
        var startDate = req.destination.startDate;
		var endDate = req.destination.endDate;
        var trip_id = req.destination.trip_id;
        var difference_ms = endDate.getTime() - startDate.getTime();
		var travelDays = Math.round(difference_ms/(24*60*60*1000));
        var dayList = [];
        for (var i = 0; i <= travelDays; i++){
            dayList.push(startDate.getTime() + i*24*60*60*1000)
        }
        var date = new Date();
        var query = '';
        for (var i = 0; i < dayList.length; i++){
            date.setTime(dayList[i]);
            var SearchstartDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate()+' '+'00:00:00';
            date.setTime(dayList[i]+24*60*60*1000);
            var SearchEndDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate()+' '+'00:00:00';
            query += 'SELECT a.name, ta.travelDate FROM Attraction a JOIN Trip_Attraction ta '
				        + 'ON a.attraction_id = ta.attraction_id WHERE ta.trip_id = ' +trip_id
				        + ' AND ta.travelDate BETWEEN "'+SearchstartDate+'" AND "'+SearchEndDate+'"; ';
        }
 
        pool.getConnection(function(err, connection){
			connection.query(query,
              function(err, rows){
				if(err)
					console.log("Error Selecting : %s ", err);
                req.attraction = rows;
                next();
			  });
			connection.release();
		});
        
    };