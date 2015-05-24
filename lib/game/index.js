var Vector = require('../vector');
var person = require('../person');
var extend = require('node.extend');


function GameField(name, size){
    this.name = name;
    this.size = size;
}

//������� ����������� ������� ���
function Game(name) {
    this._id = 0;
    this.name = name; // ����� ���
    this.fighters = []; // ��������, �� ������ ������
    this.aliveFighters = 0; // ������� ��������
    this.finished = false; // ������ ��� ��������
    this.started = false; // ������ ��� ������
    this.gameField = new GameField('', new Vector(800, 600));
}
// ����� ������� ���
Game.prototype.startGame = function () {
    if (this.aliveFighters < 2) {
        console.log(this.name + ': ' + 'There should be at least two fighters!');
        return;
    }

    this.started = true; // ���������, �� ��� ������ �����������
    console.log(this.name + ': ' + 'started\n');
};
// ����� ��������� ���
Game.prototype.finishGame = function() {
    if (!this.started) {
        console.log(this.name + ': ' + 'Please start game first!\n');
        return;
    }

    //clearInterval(this.handler); //������� �������� �������(����� �� ������ �����)
    this.finished = true; // ������, �� ��� ��������
    // ���� �� ����� �����(����� ���), �� ���� ���������
    if (this.aliveFighters > 1) {
        console.log(this.name + ': ' + 'There is no winner\n');
    } else {
        var winner;
        for(var it in this.fighters) {
            winner = this.fighters[it];
            if(!winner.isDead) //����������, ���, �� �����
                break;
        }
        console.log('%s: Game finished.\nWinner is: %s\n', this.name, winner.name);
    }
};
// ����� ��� ��������� ������ (���, ��������� �������, �� ���� ��������, ������������ �� �����)
Game.prototype.createFighter = function(name, position, doMove, isBandit, route) {
    var fighter = isBandit ? new person.Bandit(name) : new person.Man(name);
    fighter._id = this.fighters.length;
    fighter.position = position;
    this.fighters.push(fighter); // ������ �� ��� ������
    this.aliveFighters++; //� ������� ������ �����
    fighter.gameField = this.gameField;
    fighter.route = route;
    if(fighter.route){
        fighter.position = route.points[0];
    }
};
// ����� ��� ������ ���������
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
// �����, ��� ���� ��� ������ ���������, � ������� ������ ������, ������� ����������� ��� ������
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