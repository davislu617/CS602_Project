module.exports = 
	function editTrip(req , res , next){
		// change the format of the startDate and endDate
		var startDate = req.destination.startDate;
		var endDate = req.destination.endDate;
		var destination = JSON.parse(JSON.stringify(req.destination));
		req.destination.startDate = destination.startDate.substring(0,10);
		req.destination.endDate = destination.endDate.substring(0,10);
		// convert travel dates into an array of days
		var dayList = [];
		var difference_ms = endDate.getTime() - startDate.getTime();
		var travelDays = Math.round(difference_ms/(24*60*60*1000));
		var i = 0;
		var currentDate = startDate;
		do{
			dayList.push({date:currentDate.toString().substring(0,15),formatDate:currentDate.getTime()});
			currentDate.setTime(startDate.getTime() + 24*60*60*1000);
			i++;
		}while (i <= travelDays);

		//change the format of travelDate of each attraction
		for(var i = 0; i < dayList.length; i++){
			dayList[i].attraction = req.attraction[i];
			for(var j = 0; j < dayList[i].attraction.length; j++){
				dayList[i].attraction[j].travelDate = dayList[i].attraction[j].travelDate.toString().substring(0,24);
			}
		}


		res.render('editTripView',{username: req.session.username,
									day: dayList,
		  						   destination: req.destination});
		
    };
