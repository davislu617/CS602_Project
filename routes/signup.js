var pool = require('./dbConnection.js')();

module.exports = 
  function saveCourse(req , res , next){
    
    var inputFrom= {
      username  : req.body.username,
      password    : req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            return;
        }
        // insert new user into database
        connection.query("INSERT INTO User VALUES ('" + req.body.username
    +"','"+req.body.password+"','"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.email+"');",
        function(err, rows){
            if (err){
                res.render('loginView',{username:"", error: '<div class="alert alert-danger" role="alert">'+err+'</div>'});
            }else{
                res.render('loginView',{username:"", error: '<div class="alert alert-success" role="alert">Sign up successfully!</div>'});
            }
        });
        connection.release();
    });
    
  };
