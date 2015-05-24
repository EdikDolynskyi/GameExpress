var mongoose = require('mongoose');

module.exports = (function () {
    var Schema = mongoose.Schema;

    var GameSchema = new Schema({
        _id: Number,
        name: String,
        fighters: Array,
        aliveFighters: Number,
        finished: Boolean,
        started: Boolean,
        gameField: Object
        }, {collection: 'Games'});

    mongoose.model('game', GameSchema);
})();