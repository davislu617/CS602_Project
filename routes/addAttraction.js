var pool = require('./dbConnection.js')();
var attraction;
var autoFillScript ='';




module.exports = 
	function addAttraction(req , res , next){
        var trip_id = req.params.tripId;
        var date = new Date;
        date.setTime(req.params.date);
        var formatDate = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
        pool.getConnection(function(err, connection){
            if (err){
            console.log(err);
            return;
            }
            // retrieve all available attractions to the user
            var query = 'SELECT a.name, d.city, a.destination_id FROM Attraction a JOIN Destination d '
                    + 'ON a.destination_id = d.destination_id JOIN Trip t '
                    + 'ON t.destination_id = d.destination_id WHERE t.trip_id = ? ORDER BY a.name ASC' 
            connection.query(query,[trip_id], function(err, rows){
                attraction = rows;
                // create a <script> tag to invoke the JQuery UI function -- autocomplete
                autoFillScript += '<script>' + ' $( function() {var attractionList = [';
                for(index in attraction){
                    autoFillScript += '"' + attraction[index].name + '",';
                }
                autoFillScript = autoFillScript.substring(0,autoFillScript.length-1);
                autoFillScript += ']; $( "#attraction" ).autocomplete({source: attractionList});});</script>';
                res.render('addAttractionView',{username: req.session.username,
                                                data:attraction,
                                                city:attraction[0],
                                                tripId: trip_id,
                                                date: formatDate,
                                                autoFill: autoFillScript});
            });
            connection.release();
        });
    }