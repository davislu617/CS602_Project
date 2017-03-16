module.exports = 
	function deleteTripConfirm(req , res , next){
        var trip_id = req.params.tripId;
        if (req.user.role != 'owner'){
            res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">Invalid</div>'});
        }
        res.render('deleteTripConfirmView',{username: req.session.username,
                                                tripId: trip_id});
    }