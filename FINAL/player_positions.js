module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    //* Adds a player_positions, redirects to the players page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO player_positions (player_id,position_id) VALUES (?,?)";
        var inserts = [req.body.player_id, req.body.position_id];
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