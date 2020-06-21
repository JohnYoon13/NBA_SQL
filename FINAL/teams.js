module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    //* Adds a team, redirects to the players page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO teams (name, city) VALUES (?,?)";
        var inserts = [req.body.name, req.body.city];
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