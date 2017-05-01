var pool = require('./dbConnection.js')();
var _ = require('underscore');
var bodyParser = require('body-parser');

module.exports = function auth(req, res, next){
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            return;
        }
        // check if the username and the password are matched with the records in database
        var query = 'SELECT username, password FROM User WHERE username="'
                + req.body.Username + '"AND password="' + req.body.Password+'";';
        connection.query(query, function(err,rows){
            if(!JSON.parse(JSON.stringify(rows))[0]){
                res.render('loginView',{error: '<div class="alert alert-danger" role="alert">Invalid login information!</div>'});
            }else{
                req.session.username = req.body.Username;
                res.redirect('/trip/display');
            }
        });
        connection.release();
    });
};
