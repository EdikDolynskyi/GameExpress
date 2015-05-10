var Vector = require('../vector');
var Environment = require('../environment');
var Weapon = require('./weapon');

//����������� �������� ���������
function Man(name) {
    this.id = -1;
    this.name = name; //��� ���������
    this.health = 100; //�������
    this.isDead = false; //������ �� �� �������
    this.isDeadHandled = false; // ������ ���� ���� �����
    this.movementRange = 20;
    this.doMove = true; // ������, �� �������� ���� ��������� �� �
    this.position = new Vector(0, 0);
    this.weapon = Weapon.weapons.sword;
    this.gameField = new Vector(100, 100);
    this.route = null;
    this.kickDistance = 10;

    this.race = "azian";
    this.age = 65;
    this.weight = 70;
    this.growth = 165;
    this.hairColor = "white";
}
//TODO ������� ���, ��� �� �� �����, ���� �������
Man.prototype.moveTo = function (position) {// ���� ������� ���� ����� ��� ������� � ��� �� ��� �� ��� �����������,�� ����� �� ���

    if (this.position == position)
        return;
    //���� ������ ������� �������� �� ��� ���� �� ����� ����������� ������� � ��������� ��������
    position.correct(this.position, this.gameField.size);

    var direction = new Vector(position.x - this.position.x, position.y - this.position.y); // ������ ���� ��� ���������, ���� ����������� ������� �� � �� �
    var distanceToDestination = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2)); // ��������� ��������� �� ������ �����������(������� ���������)
    var allowedRange = Environment.calcAllowedRange(this.movementRange, direction); // ��������� ������� ��������� �� ������� ����.���., ���� �������� ����������� ������� �������� ��������� �� ������
    if (distanceToDestination <= allowedRange) {
        this.position = position;
    }
    else {
        //TODO: ������ ����� ���� �� ������ �������.
        //movementSpeed � ������� ���������. ������ ��� �,� ������������ ����
        //���� ������������ direction.x �� direction.y
        var correlation = allowedRange / distanceToDestination;//��������� ����, ������ �� ����� ������ �� ���� ������ ��� �������.
        this.position.x += direction.x * correlation;
        this.position.y += direction.y * correlation;
    }

    console.log(this.name + ": stepped " + "\n");
    console.log(this.name + ": my position now is " + this.position.x + " " + this.position.y + "\n");

    if(this.position.x != position.x && this.position.y != position.y){
        this.route.points[1] = position;
    }
};
// ����� ���� ������� ��������� ����� ���������
Man.prototype.getDamage = function (damage) {
    this.health -= damage;
    if (this.health <= 0) {
        this.dead();
    }
};
// ����� ��� ��������� ����(����� �� ������ ���������)
Man.prototype.fight = function (person) {


        var fighter = person;
        if (fighter != this || !fighter.isDead) {
            var distanceToEnemy = this.position.distanceTo(fighter.position);
            if (distanceToEnemy <= this.kickDistance) {
                fighter.getDamage(this.weapon.damage);
                console.log(this.name + " hit " + fighter.name);
            }
            else {
                var safeDistance = this.position.distanceTo(fighter.position) - this.kickDistance;
                var safePosition = fighter.position;
                if(fighter.position.x != 0) {
                    safePosition.x = safeDistance * fighter.position.x / this.position.distanceTo(fighter.position);
                }
                else {safePosition.x = 0;};

                if(fighter.position.y != 0) {
                    safePosition.y = safeDistance * fighter.position.y / this.position.distanceTo(fighter.position);
                }
                else {safePosition.y = 0;};

                this.moveTo(safePosition);
            }
        }


};
// ������ ���������, ��� �� �� �� �����
Man.prototype.dead = function () {
    this.isDead = true;
};
// ����� ��� ��������� ����� ���
/*
Man.prototype.doTurn = function (fighters) {
    for (var it in fighters) {
        var fighter = fighters[it];
        if (fighter == this || fighter.isDead)
            continue;

        var distanceToEnemy = this.position.distanceTo(fighter.position);
        if (distanceToEnemy <= this.kickDistance) {
            this.fight(fighter);
            break;
        }
        else {
            this.doMove = true;
        }
    }

    if (this.doMove) {
        var newPosition = this.route.points[1];
        this.moveTo(newPosition);
        console.log(this.name + ": stepped " + "\n");
        console.log(this.name + ": my position now is " + this.position.x + " " + this.position.y + "\n");
        this.route.points[0] = this.position;
        if (this.position.x == this.route.points[1].x && this.position.y == this.route.points[1].y) {
            this.route.points.shift();
            if (this.route.points.length > 1) {
                console.log("*******" + this.name + " arrived at the point of the route " + this.route.points[0].x + " " + this.route.points[0].y + "******" + "\n");
            }
            else {
                console.log("*******" + this.name + " arrived at the end of the route " + this.route.points[0].x + " " + this.route.points[0].y + "******" + "\n");
                this.doMove = false;
            }
        }
    }
};
*/

Man.prototype.moveToRoute = function () {

        var newPosition = this.route.points[1];
        this.moveTo(newPosition);
        this.route.points[0] = this.position;
        if (this.position.x == this.route.points[1].x && this.position.y == this.route.points[1].y) {
            this.route.points.shift();
            if (this.route.points.length > 1) {
                console.log("*******" + this.name + " arrived at the point of the route " + this.route.points[0].x + " " + this.route.points[0].y + "******" + "\n");
            }
            else {
                console.log("*******" + this.name + " arrived at the end of the route " + this.route.points[0].x + " " + this.route.points[0].y + "******" + "\n");
            }
        }
};
// ����� �������� ����� ������ �� ����������� � ��� ��������� ����
Man.prototype.fightersInKickRange = function(fighters) {
    var self = this;
    var res = [];
    fighters.forEach(function(f) {
        if (self.position.distanceTo(f.position) < this.kickDistance)
            res.push(f);
    });
    return res;
};

module.exports = Man;