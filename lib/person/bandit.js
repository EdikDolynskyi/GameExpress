var util = require('util');
var Weapon = require('./weapon');
var Man = require('./man');


//конструктор дочірнього класу персонажа
function Bandit(name) {
    Man.apply(this, arguments);
    this.weapon = Weapon.weapons.gun;
    this.health = 120;
    this.movementRange = 30;
    this.isSquatting = false;
    this.kickDistance = 20;

    this.race = "rome";
    this.age = 65;
    this.weight = 70;
    this.growth = 165;
    this.hairColor = "white";
}

//вказуємо, що базовим типом для Bandit є Man
util.inherits(Bandit, Man);

Bandit.prototype.talk = function() {
    console.log('Чуєш є звонити з Нокії на МТС?')
};

Bandit.prototype.changeSquatting = function () {
    this.isSquatting = !this.isSquatting;
};

Bandit.prototype.getDamage = function(damage) {
    if (this.isSquatting) {
        console.log(this.name + ': Хаха, сидячих не б\'ють, йопта!');
        this.changeSquatting();
    } else {
        Bandit.super_.prototype.getDamage.apply(this, arguments);
    }
};

Bandit.prototype.doTurn = function (fighters) {
    var chance = Math.random();
    if (chance < .3) {
        this.changeSquatting();
    }
    Bandit.super_.prototype.doTurn.apply(this, arguments);
};

module.exports = Bandit;