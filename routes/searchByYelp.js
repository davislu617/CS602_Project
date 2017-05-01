var yelp = require("node-yelp");
 
var client = yelp.createClient({
  // keys from Yelp registration
  oauth: { 
    "consumer_key": "AhPxARJ4EU-fDVpAynwa9w",
    "consumer_secret": "bqT20xNtUCzCPYr6qRmBLJqfW0E",
    "token": "YfsotQX75lw3ZHL_aZS8F1SAka-Z0ABc",
    "token_secret": "vZvKZJkHn4o1j_OU5nP7xHW7gho"
  },
  
  httpClient: {
    maxSockets: 25  
  }
});
 
module.exports = 
	function searchByYelp(req , res , next){
        var terms = req.body.term;
        var locations = req.body.location;
        client.search({
            term: terms,
            location: locations,
            limit: 10
        }).then(function (data) {
            res.send(data);
        });
    }