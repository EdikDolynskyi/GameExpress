var util = require('util');

//клас для створення маршруту, приймає імя та масив векторів(точок х,у)
function Route(name,gameField,points) {
    this.name = name;
    this.gameField = gameField;
    this.points = points;
    function showRoute(){
        console.log('----------------------------');
        console.log('The route ' + name + ' has the following points:');
        var str = util.format('(%s,%s)', points[0].x, points[0].y);
        var l = points.length;
        for (var i = 1; i < l; i++)
        {
            str += util.format('--> (%s,%s)', points[i].x, points[i].y);
        }
        console.log(str);
        console.log('----------------------------');
    }
    function correctRoute() {
        var field = gameField.size;
        var length = points.length - 1;
        for (var i = 0; i < length; i++)
        {
            points[i + 1].correct(points[i], field);
        }
        return points;
    }
    showRoute();
    this.points = correctRoute();
    console.log('------- Route after correcting:----------\n');
    showRoute();
}

module.exports = Route;