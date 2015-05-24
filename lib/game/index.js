var Vector = require('../vector');
var person = require('../person');
var extend = require('node.extend');


function GameField(name, size){
    this.name = name;
    this.size = size;
}

//Функція конструктор процесу ГРА
function Game(name) {
    this._id = 0;
    this.name = name; // назва гри
    this.fighters = []; // персонажі, які беруть участь
    this.aliveFighters = 0; // виживші персонажі
    this.finished = false; // флажок гра закінчена
    this.started = false; // флажок гра почата
    this.gameField = new GameField('', new Vector(800, 600));
}
// метод запуску гри
Game.prototype.startGame = function () {
    if (this.aliveFighters < 2) {
        console.log(this.name + ': ' + 'There should be at least two fighters!');
        return;
    }

    this.started = true; // позначаємо, що гра успішно розпочалася
    console.log(this.name + ': ' + 'started\n');
};
// метод закінчення гри
Game.prototype.finishGame = function() {
    if (!this.started) {
        console.log(this.name + ': ' + 'Please start game first!\n');
        return;
    }

    //clearInterval(this.handler); //очищуємо значення таймера(більше не задаємо кроки)
    this.finished = true; // флажок, що гра закінчена
    // якщо ще хтось живий(тобто двоє), то нема переможця
    if (this.aliveFighters > 1) {
        console.log(this.name + ': ' + 'There is no winner\n');
    } else {
        var winner;
        for(var it in this.fighters) {
            winner = this.fighters[it];
            if(!winner.isDead) //переможець, той, що живий
                break;
        }
        console.log('%s: Game finished.\nWinner is: %s\n', this.name, winner.name);
    }
};
// метод для створення ігрока (імя, початкова позиція, чи буде рухатись, приналежність до класу)
Game.prototype.createFighter = function(name, position, doMove, isBandit, route) {
    var fighter = isBandit ? new person.Bandit(name) : new person.Man(name);
    fighter._id = this.fighters.length;
    fighter.position = position;
    this.fighters.push(fighter); // додаємо до гри ігроків
    this.aliveFighters++; //і вказуємо скільки живих
    fighter.gameField = this.gameField;
    fighter.route = route;
    if(fighter.route){
        fighter.position = route.points[0];
    }
};
// Метод для пошуку персонажа
Game.prototype.findFighter = function(id) {
    for(var it in this.fighters) {
        var fighter = this.fighters[it];
        if (fighter._id == id) {
            var tFighter = fighter.typeName == 'Man'
                ? new person.Man(fighter.name)
                : new person.Bandit(fighter.name);
            extend(tFighter, fighter);
            this.fighters[it] =  tFighter;
            return tFighter;
        }
    }
    return null;
}
// метод, для того щоб кікнути персонажа, і поміняти потрібні флажки, вивести повідомлення про смерть
Game.prototype.kickFighter = function(person) {
    var index = this.fighters.indexOf(person);
    if (index == -1) {
        console.log('%s -> No such fighter in game\n', this.name);
        return;
    }
    person.isDeadHandled = true;
    this.aliveFighters--;
    console.log(this.name + ': ' + person.name + ' is dead\n');

    if (this.aliveFighters < 2) {
        this.finishGame();
    }
};

module.exports = Game;