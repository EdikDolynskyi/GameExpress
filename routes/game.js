var util = require('util');
var express = require('express');
var router = express.Router();

var cg = require('../singleton/currentGame');

//router.get('/', function(req, res) {
//   res.end('List of games');
//});

router.get('/fighters', function (req, res) {
    var currentGame = cg.get();
    if (!currentGame)
        return res.end('There is no game!');

    res.write(util.format('Game: %s\n', currentGame.name));
    currentGame.fighters.forEach(function (o) {
        res.write(
            util.format('id: %s name: %s\n', o.id, o.name)
        );
    });

    res.end();
});

router.post('/create', function (req, res) {
    //Load modules
    {
        var Game = require('../lib/game');
        var Route = require('../lib/route');
        var Vector = require('../lib/vector');
    }

    //Start game
    {
        var currentGame = new Game('Opu vs Pishti');
        cg.set(currentGame);
        var gameField = currentGame.gameField;

        var opuRoute = new Route("FirstRoute", gameField, [new Vector(0, 0), new Vector(50, 100), new Vector(300, 700)]);
        currentGame.createFighter('Opu', new Vector(0, 0), true, false, opuRoute);

        var pishtiRoute = new Route("SecondRoute", gameField, [new Vector(10, 10), new Vector(50, 50), new Vector(300, 700)]);
        currentGame.createFighter('Pishti', new Vector(50, 50), true, true, pishtiRoute);
    }

    res.end('Game Created!');
});

router.post('/start', function (req, res) {
    var currentGame = cg.get();
    if (!currentGame) {
        res.end('There is no game to start!');
    } else {
        currentGame.startGame();
        res.end(util.format('Game "%s" started :)', currentGame.name));
    }
});

//router.post('/createFighter', function(req, res) {
//    res.end('Fighter created');
//});

module.exports = router;