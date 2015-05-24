var util = require('util');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var cg = require('../singleton/currentGame');
require('../models/index.js');


router.get('/fighters', function (req, res) {
    cg.get(function (game) {
        if (!game)
            return res.end('There is no game!');

        res.write(util.format('Game: %s\n', game.name));
        game.fighters.forEach(function (o) {
            res.write(
                util.format('_id: %s name: %s\n', o._id, o.name)
            );
        });
        res.end();
    });
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
        var game = new Game('Opu vs Pishti');
        var gameField = game.gameField;

        var opuRoute = new Route("FirstRoute", gameField, [new Vector(0, 0), new Vector(0, 0)]);
        game.createFighter('Opu', new Vector(0, 0), true, false, opuRoute);

        var pishtiRoute = new Route("SecondRoute", gameField, [new Vector(800, 600), new Vector(800, 600)]);
        game.createFighter('Pishti', new Vector(0, 0), true, true, pishtiRoute);

        cg.set(game, function () {
            res.end('Game Created!');
        });
    }
});

router.post('/start', function (req, res) {
    cg.get(function (game) {
        if (!game) {
            res.end('There is no game to start!');
        } else {
            game.startGame();
            cg.set(game, function (err, game) {
                res.end(util.format('Game "%s" started :)', game.name));
            });
        }
    });
});

module.exports = router;