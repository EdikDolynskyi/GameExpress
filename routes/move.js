var util = require('util');
var express = require('express');
var router = express.Router();

var Vector = require('../lib/vector');

var cg = require('../singleton/currentGame');

router.post('/:id', function(req, res) {
    var currentGame = cg.get();
    if (!currentGame)
        return res.end('There no game');

    var id = req.params.id;
    //var x = parseInt(req.params.xCoordinate);
    //var y = parseInt(req.params.yCoordinate);

    if (isNaN(id))
        return res.end('id  should be numbers');

    var man = currentGame.findFighter(id);
    if (!man)
        return res.end('There is no fighter with id: ' + id);


    man.moveToRoute();

    res.end(util.format('Ok, %s moved to point of route: (%s, %s)', man.name, man.route.points[1].x, man.route.points[1].y));
});
router.post('/:id/:xCoordinate/:yCoordinate', function(req, res) {
    var currentGame = cg.get();
    if (!currentGame)
        return res.end('There no game');

    var id = req.params.id;
    var x = parseInt(req.params.xCoordinate);
    var y = parseInt(req.params.yCoordinate);

    if (isNaN(id))
        return res.end('id  should be numbers');

    if (isNaN(x) || isNaN(y))
        return res.end('X and Y coordinates should be numbers');

    var man = currentGame.findFighter(id);
    if (!man)
        return res.end('There is no fighter with id: ' + id);

    var point = new Vector(x, y);
   // man.route.points.push(point);
    man.moveTo(point);

    res.end(util.format('Ok, %s moved to a new position : (%s, %s)', man.name, point.x, point.y));
});


module.exports = router;