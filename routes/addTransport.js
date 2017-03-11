module.exports = 
    function addTransport(req, res, next) {
        var trip_id = req.params.tripId;
        var datepicker = '<script>'
                        +'$(function(){ $("#date").datepicker({ minDate: new Date('
                        +req.destination.startDate.getFullYear()+','+req.destination.startDate.getMonth()+','+req.destination.startDate.getDate()
                        +'), maxDate: new Date('
                        +req.destination.endDate.getFullYear()+','+req.destination.endDate.getMonth()+','+req.destination.endDate.getDate()
                        +"), dateFormat: 'yy-mm-dd'});});"
                        +'</script>';
        res.render('addTransportView',{username: req.session.username,
                                                tripId: trip_id,
                                                datepicker: datepicker});    
    }