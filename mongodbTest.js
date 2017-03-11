var Transport = require('./routes/mongodbConnection.js').getTransportModel();



Transport.find({$query:{"trip": 1}, $orderby:{"_id":1}}, function(err , transport){
        if(err)
            console.log("Error : %s ",err);
        var result = transport.map(function(transport){
            return{
                    id: transport._id,
                    trip_id: transport.trip,
                    name: transport.name,
                    info: transport.info,
                    travelDate: transport.travelDate
            }
        });
        transport.sort(function(a,b){return a.travelDate - b.travelDate});
        console.log(transport);
});