var Transport = require('./mongodbConnection.js').getTransportModel();

module.exports = 
	function findTransport(req , res , next){
        var tripId = req.destination.trip_id;
        // retrieve basic information of transports and add it to req
        Transport.find({"$query":{"trip": tripId},"$orderby":{"travelDate":1}}, function(err , transport){
            if(err){
                    res.render('errorView',{username: 'Welcome ' + req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}
            
            var result =  transport.map(function(transport){
                return{
                        id: transport._id,
                        trip_id: transport.trip,
                        name: transport.name,
                        info: transport.info,
                        travelDate: transport.travelDate
                }
            });
            result.sort(function(a,b){return a.travelDate - b.travelDate});
            req.transport = result;
            next();
        });
    }