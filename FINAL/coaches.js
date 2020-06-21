module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //* Adds a coach, redirects to the players page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO coaches (fname, lname, age) VALUES (?,?,?)";
        var inserts = [req.body.fname, req.body.lname,req.body.age];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/players');
            }
        });
    });

  return router;
}();