var Vector = require('../vector');

var Environment = {
    environmentResistance: 0, // опір середовища [0..3]
    wind: new Vector(0, 0),   //[-5..5][-5..5] Рахуємо що повністю попутний вітер дає +50%, а повністю зустрічний -50% швидкості
    maxWindPower: new Vector(5, 5),
    isCyclingStarted: false,
    startCycling: function() {
        if (this.isCyclingStarted)
            return;

        var self = this;
        var changeWeather = function() {
            self.environmentResistance = Math.random() * 3; // Рендомний опір середовища

            var xWindDirection = Math.random() > 0.5 ? 1 : -1; // Рендомний напрямок вітру по х (попутний, чи зустрічний)
            var yWindDirection = Math.random() > 0.5 ? 1 : -1;
            self.wind = new Vector(xWindDirection * Math.random() * 5, yWindDirection * Math.random() * 5); // точні дані вітру, тобто сила вітру по х та у
        };
        (function loop() { // замкнута функція для циклічної хаотичної зміни погодніх умов
            var rand = Math.round(Math.random() * 3000);
            setTimeout(function() {
                changeWeather();
                loop();
            }, rand);
        }());
        this.isCyclingStarted = true; //запустили зміну погодніх умов
    },
    calcAllowedRange: function(distance, direction) {// Функція розрахунку можливої дистанції з впливом нав.сер., отримує максим. дальність персонажа та напрям його руху
        /*
         var xPassing = direction.x * this.wind.x;//числове значення, наскільки нам вітер сопутствує, чи мішає
         xPassing = xPassing / Math.ceil(Math.abs(direction.x) * this.maxWindPower.x) / 2;//Відношення поточного сприяння вітру до максимально можливого
         var yPassing = direction.y * this.wind.y;
         yPassing = yPassing / Math.ceil(Math.abs(direction.y) * this.maxWindPower.y) / 2;

         distance += distance * 0.5 * (xPassing + yPassing); // визначаємо реальну дистанцію, на яку може зміститись персонаж(сума відношень)

         if (this.environmentResistance < 1) // вплив опору сер. на дистанцію
         this.environmentResistance = 1;
         distance /= this.environmentResistance;
         */

        return distance;
    }
};
Environment.startCycling();

module.exports = Environment;