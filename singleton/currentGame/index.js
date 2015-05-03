var currentGame = null;

module.exports = {
    set: function(game) {
        currentGame = game;
    },
    get: function() {
        return currentGame;
    }
};