var express = require('express');
var router = express.Router();

var cg = require('../singleton/currentGame');

/*
router.get('/inrangeof/:id', function(req, res) {
    var currentGame = cg.get();
    if (!currentGame)
        return res.end('There no game');

    var id = req.params.id;
    var man = currentGame.findFighter(id);
    if (!man)
        return res.end('There is no fighter with id: ' + id);

    var enemiesInRange = man.fightersInKickRange(currentGame.fighters);

    res.json(enemiesInRange);
});
*/

router.post('/:id/:enemyId', function(req, res) {
    res.end('Ok, we fight');
});


module.exports = router;