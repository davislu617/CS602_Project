var pool = require('./dbConnection.js')();
var _ = require('underscore');

module.exports = function requireUser (req, res, next){
  pool.getConnection(function(err, connection){
    if (err){
      console.log(err);
      return;
    }
    // check if username and trip_id are matched in database
    var query = 'SELECT * FROM Trip_User WHERE trip_id = '+ req.params.tripId + ' ORDER BY role DESC';
    connection.query(query, function(err, rows){
      if(err || !_.findWhere(rows, {"username":req.session.username})){
        console.log(err);
        res.redirect('/trip/display');
      }else{
        req.user = _.findWhere(rows, {"username":req.session.username});
        req.userlist = rows;
        next();
      }
    });
    connection.release();
  });
};