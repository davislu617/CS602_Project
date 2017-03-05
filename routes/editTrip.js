module.exports = 
	function displayTrip(req , res , next){
	  	res.render('editTripView',{username: req.session.username})
    };