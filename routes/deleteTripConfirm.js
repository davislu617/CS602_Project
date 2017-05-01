module.exports = 
	function deleteTripConfirm(req , res , next){
        var trip_id = req.params.tripId;
        // check if the user has the privilege to delete the trip
        if (req.user.role != 'owner'){
            res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">Invalid</div>'});
        }
        // comfirm page to delete trips
        res.render('deleteTripConfirmView',{username: 'Welcome ' + req.session.username,
                                                tripId: trip_id});
    }