var Transport = require('./mongodbConnection.js').getTransportModel();

module.exports = 
	function saveTransport(req , res , next){
        // normalize the inputs from the user
        var attractionName = req.body.attraction;
        var trip_id = req.params.tripId;
        var transportName = req.body.transport;
        var transportInfo = req.body.info;
        var travelDate = new Date();
        travelDate.setFullYear(req.body.date.substring(0,4));
        travelDate.setMonth(req.body.date.substring(5,7)-1);
        travelDate.setDate(req.body.date.substring(8,10));
        travelDate.setHours(req.body.time.substring(0,2));
        travelDate.setMinutes(req.body.time.substring(3,5));
        var transport = new Transport({
            trip: trip_id,
            name: transportName,
            info: transportInfo,
            travelDate: travelDate
        })
    // save the transport in MongoDb
       transport.save(function (err){
            if(err){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}
            res.redirect('/trip/edit/'+trip_id);
        });
    }
