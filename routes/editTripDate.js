module.exports = 
	function editTripDate(req , res , next){
        var trip_id = req.params.tripId;
        var startDate = req.destination.startDate.getFullYear()+'-'+(req.destination.startDate.getMonth()+1)+'-'+req.destination.startDate.getDate();
        var endDate = req.destination.endDate.getFullYear()+'-'+(req.destination.endDate.getMonth()+1)+'-'+req.destination.endDate.getDate();
        
        var msg = '<div class="alert alert-warning" role="alert">Notice: All existing information will be removed if it is not within your new travel date.</div>'
        res.render('editTripDateView',{username: req.session.username,
                                                error: msg,
                                                destination:req.destination.city,
                                                tripId: trip_id,
                                                startDate: startDate,
                                                endDate: endDate});
    }