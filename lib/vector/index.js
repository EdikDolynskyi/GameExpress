/**
 * Created by Edo on 03.05.2015.
 */

//Клас вектора
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.distanceTo = function(point) {
    return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
};

Vector.prototype.correct = function (fromPos, sizeOfField) {
    if (this.x > sizeOfField.x) {
        var distanceToPositionX = this.x - fromPos.x;
        var distanceAllowedX = sizeOfField.x - fromPos.x;
        var correlationX = distanceAllowedX / distanceToPositionX;
        this.x = sizeOfField.x;
        this.y = fromPos.y + (this.y - fromPos.y) * correlationX;
    }
    if (this.y > sizeOfField.y) {
        var distanceToPositionY = this.y - fromPos.y;
        var distanceAllowedY = sizeOfField.y - fromPos.y;
        var correlationY = distanceAllowedY / distanceToPositionY;
        this.y = sizeOfField.y;
        this.x = fromPos.x + (this.x - fromPos.x) * correlationY;
    }
};

module.exports = Vector;