module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT players.id, fname, lname, age, teams.name AS team FROM players INNER JOIN teams ON players.team = teams.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.players = results;
            complete();
        });
    }

    function getPlayer(res, mysql, context, id, complete){
        var sql = "SELECT id, fname, lname, team, age FROM players WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results[0];
            complete();
        });
    }

    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, city FROM teams", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teams  = results;
            complete();
        });
    }

    function getCoaches(res, mysql, context, complete){
        mysql.pool.query("SELECT id, age, fname,lname FROM coaches", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.coaches  = results;
            complete();
        });
    }

    function getPositions(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM positions", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.positions  = results;
            complete();
        });
    }

    function getPlayerPositions(res, mysql, context, complete){
        mysql.pool.query("SELECT fname, lname, name FROM players LEFT JOIN player_positions ON players.id = player_positions.player_id LEFT JOIN positions ON positions.id = player_positions.position_id;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player_positions  = results;
            complete();
        });
    }

    //* Adds a player, redirects to the players page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO players (fname, lname, team, coach, age) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname,req.body.name,req.body.coach,req.body.age];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/players');
            }
        });
    });

    /*Display all tables. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        context.jsscripts = ["deleteplayer.js"];
        getPlayers(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        getCoaches(res, mysql, context, complete);
        getPositions(res, mysql, context, complete);
        getPlayerPositions(res, mysql, context, complete);
        function complete(){
            //res.render('players', context);
            callbackCount++;
            if(callbackCount >= 5){
                res.render('players', context);
            }
        }
    });

    /* Display one player for the specific purpose of updating player */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedteam.js", "updateplayer.js", "deleteplayer.js"];
        var mysql = req.app.get('mysql');
        getPlayer(res, mysql, context, req.params.id, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-player', context);
            }

        }
    });

    /* The URI that update data is sent to in order to update a player */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE players SET fname=?, lname=?, team=?, age=? WHERE id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.team,req.body.age, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(202).end();
                // res.status(200);
                // res.end();
            }
        });
    });

    /* Route to delete a player, simply returns a 202 upon success. Ajax will handle this. */
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM players WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
  return router;
}();