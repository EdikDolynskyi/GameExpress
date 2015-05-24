var mongoose = require('mongoose');

module.exports = (function () {
    var Schema = mongoose.Schema;
    var PersonSchema = new Schema({
        _id: Number,
        name: String,
        health: Number,
        route: Array
    }, {collection: 'Persons'});

    mongoose.model('person', PersonSchema);
})();
