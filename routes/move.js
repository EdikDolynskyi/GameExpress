var util = require('util');
var express = require('express');
var router = express.Router();

var Vector = require('../lib/vector');

var cg = require('../singleton/currentGame');

router.post('/:_id', function(req, res) {
    cg.get(function (game) {
        if (!game)
            return res.end('There no game');

        var id = req.params._id;

        if (isNaN(id))
            return res.end('_id  should be numbers');

        var man = game.findFighter(id);
        if (!man)
            return res.end('There is no fighter with _id: ' + id);

        man.moveToRoute();

        cg.set(game, function() {
            res.end(util.format('Ok, %s moved to point of route: (%s, %s)', man.name, man.route.points[1].x, man.route.points[1].y));
        });
    });
});

router.post('/:_id/:xCoordinate/:yCoordinate', function(req, res) {
    cg.get(function(game) {
        if (!game)
            return res.end('There no game');

        var id = req.params._id;
        var x = parseInt(req.params.xCoordinate);
        var y = parseInt(req.params.yCoordinate);

        if (isNaN(id))
            return res.end('_id  should be numbers');

        if (isNaN(x) || isNaN(y))
            return res.end('X and Y coordinates should be numbers');

        var man = game.findFighter(id);
        if (!man)
            return res.end('There is no fighter with _id: ' + id);

        var point = new Vector(x, y);
        man.moveTo(point);

        cg.set(game, function () {
            res.end(util.format('Ok, %s moved to a new position : (%s, %s)', man.name, point.x, point.y));
        });
    });
});


module.exports = router;