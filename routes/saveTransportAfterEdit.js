var Transport = require('./mongodbConnection.js').getTransportModel();

module.exports = 
	function saveTransportAfterEdit(req , res , next){
        // normalize the inputs from the user
        var trip_id = req.params.tripId;
        var id = req.params.transportId;
        var transportName = req.body.transport;
        var transportInfo = req.body.info;
        var travelDate = new Date();
        var dateString = req.body.date.split('-');
        var timeString = req.body.time.split(':');
        travelDate.setFullYear(dateString[0]);
        travelDate.setMonth(dateString[1]-1);
        travelDate.setDate(dateString[2]);
        travelDate.setHours(timeString[0]);
        travelDate.setMinutes(timeString[1]);
        Transport.findById(id, function(err , transport){
            if(err){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}
            if(! transport){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}

            transport.name = transportName;
            transport.info = transportInfo;
            transport.travelDate = travelDate;
            // save the updated transport in MongoDb
            transport.save(function (err){
                if(err){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}
                res.redirect('/trip/edit/'+trip_id);
            });
        });
    }