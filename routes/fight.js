var express = require('express');
var router = express.Router();

var cg = require('../singleton/currentGame');

router.post('/:_id/:enemyId', function(req, res) {
    cg.get(function(game) {
        if (!game)
            return res.end('There no game');

        var id = req.params._id;
        if (isNaN(id))
            return res.end('_id  should be numbers');

        var enemyId = req.params.enemyId;
        if (isNaN(enemyId))
            return res.end('enemyId  should be numbers');

        var man = game.findFighter(id);
        if (!man)
            return res.end('There is no fighter with _id: ' + id);

        var enemy = game.findFighter(enemyId);
        man.fight(enemy);

        cg.set(game, function() {
            res.end('Ok, we fight');
        });
    });
});


module.exports = router;