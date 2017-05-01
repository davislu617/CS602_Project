module.exports = 
	function editAttraction(req , res , next){
        var trip_id = req.params.tripId;
        var travelDate = new Date();
        travelDate.setTime(req.params.date);
        var date = travelDate.getFullYear() + '-' + (travelDate.getMonth()+1) + '-' + travelDate.getDate();
        var datepicker = '<script>'
                        +'$(function(){ $("#date").datepicker({ minDate: new Date('
                        +req.destination.startDate.getFullYear()+','+req.destination.startDate.getMonth()+','+req.destination.startDate.getDate()
                        +'), maxDate: new Date('
                        +req.destination.endDate.getFullYear()+','+req.destination.endDate.getMonth()+','+req.destination.endDate.getDate()
                        +"), dateFormat: 'yy-mm-dd'});});"
                        +'</script>';
        pool.getConnection(function(err, connection){
            if(err){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
            }
            // retrieve the travel dates of this plan -- users can only set the hotel within these travel dates
            var query = 'SELECT * FROM Trip_Hotel '
                    + 'WHERE trip_id = ? AND travelDate = "'+date+'"'; 
            connection.query(query,[trip_id], function(err, rows){
                if(err){
                    res.render('errorView',{username: req.session.username,
                                  error:'<div class="alert alert-danger" role="alert">'+err+'</div>'});
                }
                res.render('editHotelView',{username: 'Welcome ' + req.session.username,
                                                city:req.destination.city,
                                                tripId: trip_id,
                                                name: rows[0].name,
                                                date: date,
                                                formatDate:req.params.date,
                                                address: rows[0].address,
                                                datepicker: datepicker});
            });
            connection.release();
        });

    }