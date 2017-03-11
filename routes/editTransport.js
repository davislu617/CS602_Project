var Transport = require('./mongodbConnection.js').getTransportModel();

module.exports = 
	function editTransport(req , res , next){
        var id = req.params.transportId;
        var trip_id = req.params.tripId;
        Transport.findById(id, function(err , transport){
            if(err){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}
            if(! transport){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                    return;}

            var travelDateTime = transport.travelDate;
            var travelDate = travelDateTime.getFullYear() + '-' + (travelDateTime.getMonth()+1) + '-' + travelDateTime.getDate();
            var travelTime = travelDateTime.toString().substring(16,21);
            var datepicker = '<script>'
                        +'$(function(){ $("#date").datepicker({ minDate: new Date('
                        +req.destination.startDate.getFullYear()+','+req.destination.startDate.getMonth()+','+req.destination.startDate.getDate()
                        +'), maxDate: new Date('
                        +req.destination.endDate.getFullYear()+','+req.destination.endDate.getMonth()+','+req.destination.endDate.getDate()
                        +"), dateFormat: 'yy-mm-dd'});});"
                        +'</script>';
            res.render('editTransportView',{username: req.session.username,
                                                transport: transport,
                                                tripId: trip_id,
                                                date: travelDate,
                                                time: travelTime,
                                                datepicker: datepicker});
        });
    }
