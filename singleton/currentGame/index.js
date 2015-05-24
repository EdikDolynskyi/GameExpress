var mongoose = require('mongoose');
require('../../models/index.js');
var Game = mongoose.model('game');
var GameObj = require('../../lib/game');

function get(callback) {
    Game.findOne(function (err, gameData) {
        if (err);
        //TODO: Handle error here;
        var game = gameFromData(gameData);
        if (callback)
            callback(game);
    });
}

function set(game, callback) {
    Game.findOneAndUpdate({_id: 0}, game, {upsert: true}, callback);
}

function gameFromData(gameData) {
    var game = new GameObj(gameData.name);
    game._id = gameData._id;
    game.fighters = gameData.fighters;
    game.aliveFighters = gameData.aliveFighters;
    game.finished = gameData.finished;
    game.started = gameData.started;
    game.gameField = gameData.gameField;

    return game;
}

module.exports = {
    get: get,
    set: set
};