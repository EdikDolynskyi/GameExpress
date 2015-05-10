var Vector = require('../vector');
var Environment = require('../environment');
var Weapon = require('./weapon');

//конструктор базового персонажа
function Man(name) {
    this.id = -1;
    this.name = name; //імя персонажа
    this.health = 100; //здоровя
    this.isDead = false; //флажок чи він мертвий
    this.isDeadHandled = false; // флажок коли його убили
    this.movementRange = 20;
    this.doMove = true; // флажок, шо персонаж буде двигатися чи ні
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
//TODO зробити так, щоб він не ходив, коли мертвий
Man.prototype.moveTo = function (position) {// Якщо позиція куди треба йти співпадає з тою на якій він вже знаходиться,то нікуди не йти

    if (this.position == position)
        return;
    //якщо задана позиція виходить за межі поля то задаєм максимально можливу в потрібному напрямку
    position.correct(this.position, this.gameField.size);

    var direction = new Vector(position.x - this.position.x, position.y - this.position.y); // Напрям куди йти персонажу, який визначається різницею по х та у
    var distanceToDestination = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2)); // Визначаємо дистанцію до пункту призначення(квадрат гіпотенузи)
    var allowedRange = Environment.calcAllowedRange(this.movementRange, direction); // Враховуємо можливу дистанцію із впливом навк.сер., куди передаємо максимально можливу дальність персонажа та напрям
    if (distanceToDestination <= allowedRange) {
        this.position = position;
    }
    else {
        //TODO: Знайти точку куди ми можемо попасти.
        //movementSpeed э довжина гіпотенузи. Знайти такі х,у співвідношення яких
        //рівне співвідношенню direction.x до direction.y
        var correlation = allowedRange / distanceToDestination;//відношення того, скільки ми можем пройти до того скільки нам потрібно.
        this.position.x += direction.x * correlation;
        this.position.y += direction.y * correlation;
    }

    console.log(this.name + ": stepped " + "\n");
    console.log(this.name + ": my position now is " + this.position.x + " " + this.position.y + "\n");

    if(this.position.x != position.x && this.position.y != position.y){
        this.route.points[1] = position;
    }
};
// метод який визначає нанесення урону персонажу
Man.prototype.getDamage = function (damage) {
    this.health -= damage;
    if (this.health <= 0) {
        this.dead();
    }
};
// метод для реалізації бійки(удару по іншому персонажу)
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
// флажок персонажа, про те чи він живий
Man.prototype.dead = function () {
    this.isDead = true;
};
// Метод для реалізації кроків гри
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
// Метод повертаэ масив быйцыв що знаходяться в зоні досяжності зброї
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