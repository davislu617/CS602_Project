module.exports = 
	function editTrip(req , res , next){
		// record all transport
        var transport = req.transport;
        for (index in transport){
            transport[index].travelDate = transport[index].travelDate.toString().substring(0,21);
        }
		
		// change the format of the startDate and endDate
		var startDate = req.destination.startDate;
		var endDate = req.destination.endDate;
		var destination = JSON.parse(JSON.stringify(req.destination));
		displayStartDate = destination.startDate.substring(0,10);
		displayEndDate = destination.endDate.substring(0,10);
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
		var dateLoop = new Date();
		for(var i = 0; i < dayList.length; i++){
			dayList[i].attraction = req.attraction[i];
			dayList[i].hotel = req.hotel.filter(function(hotel){
				return hotel.travelDate.getTime() == dayList[i].formatDate
			});
			for(var j = 0; j < dayList[i].attraction.length; j++){
				dayList[i].attraction[j].travelFormatDate = dayList[i].attraction[j].travelDate.getTime();
				dayList[i].attraction[j].travelDate = dayList[i].attraction[j].travelDate.toString().substring(0,21);
			}
		}
		for(index in dayList){
			if(dayList[index].hotel[0]){
				dayList[index].hotel[0].travelDate = dayList[index].hotel[0].travelDate.toString().substring(0,16);
			}
		}
		res.render('editTripView',{username: req.session.username,
								   day: dayList,
		  						   destination: req.destination,
								   startDate: displayStartDate,
								   endDate: displayEndDate,
								   transport: transport});
		
    };
