var util = require('util');
var express = require('express');
var router = express.Router();

var Vector = require('../lib/vector');

var cg = require('../singleton/currentGame');

router.post('/:id/:xCoordinate/:yCoordinate', function(req, res) {
    var currentGame = cg.get();
    if (!currentGame)
        return res.end('There no game');

    var id = req.params.id;
    var x = parseInt(req.params.xCoordinate);
    var y = parseInt(req.params.yCoordinate);

    if (isNaN(x) || isNaN(y))
        return res.end('X and Y coordinates should be numbers');

    var man = currentGame.findFighter(id);
    if (!man)
        return res.end('There is no fighter with id: ' + id);

    var point = new Vector(x, y);
    man.route.points.push(point);

    res.end(util.format('Ok, new point added to %s: (%s, %s)', man.name, point.x, point.y));
});


module.exports = router;