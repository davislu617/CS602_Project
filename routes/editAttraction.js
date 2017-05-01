module.exports = 
	function editAttraction(req , res , next){
        var trip_id = req.params.tripId;
        var travelDateTime = new Date;
        travelDateTime.setTime(req.params.travelDateTime);
        var attractionName = req.params.attractionName;
        var travelDate = travelDateTime.getFullYear() + '-' + (travelDateTime.getMonth()+1) + '-' + travelDateTime.getDate();
        var travelTime = travelDateTime.toString().substring(16,21);
        var datepicker = '<script>'
                        +'$(function(){ $("#date").datepicker({ minDate: new Date('
                        +req.destination.startDate.getFullYear()+','+req.destination.startDate.getMonth()+','+req.destination.startDate.getDate()
                        +'), maxDate: new Date('
                        +req.destination.endDate.getFullYear()+','+req.destination.endDate.getMonth()+','+req.destination.endDate.getDate()
                        +"), dateFormat: 'yy-mm-dd'});});"
                        +'</script>';
        res.render('editAttractionView',{username: 'Welcome ' + req.session.username,
                                                name: attractionName,
                                                tripId: trip_id,
                                                date: travelDate,
                                                time: travelTime,
                                                datepicker: datepicker});
    }