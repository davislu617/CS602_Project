var Transport = require('./mongodbConnection.js').getTransportModel();

module.exports = 
	function deleteTransport(req , res , next){
        var trip_id = req.params.tripId;
        var id = req.params.transportId;
        Transport.findById(id, function(err , transport){
            if(err){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}
            if(!transport){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}
            // delete the transport from MongoDb
            transport.remove(function (err){
                if(err){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});}
                res.redirect('/trip/edit/'+trip_id);
            });
        });
    }