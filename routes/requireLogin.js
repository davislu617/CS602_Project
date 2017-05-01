var pool = require('./dbConnection.js')();

module.exports = function requireLogin (req, res, next){ 
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            return;
        }
      var query = 'SELECT username, password FROM User WHERE username="'
                + req.session.username + '";';
      connection.query(query, function(err,rows){
        if(!JSON.parse(JSON.stringify(rows))[0]){
          res.redirect('/login');
          req.session.reset();
        }else{
          next();
        }
      });
      connection.release();
    });
  }
};