var Vector = require('../vector');

var Environment = {
    environmentResistance: 0, // ��� ���������� [0..3]
    wind: new Vector(0, 0),   //[-5..5][-5..5] ������ �� ������� �������� ���� �� +50%, � ������� ��������� -50% ��������
    maxWindPower: new Vector(5, 5),
    isCyclingStarted: false,
    startCycling: function() {
        if (this.isCyclingStarted)
            return;

        var self = this;
        var changeWeather = function() {
            self.environmentResistance = Math.random() * 3; // ��������� ��� ����������

            var xWindDirection = Math.random() > 0.5 ? 1 : -1; // ��������� �������� ���� �� � (��������, �� ���������)
            var yWindDirection = Math.random() > 0.5 ? 1 : -1;
            self.wind = new Vector(xWindDirection * Math.random() * 5, yWindDirection * Math.random() * 5); // ���� ��� ����, ����� ���� ���� �� � �� �
        };
        (function loop() { // �������� ������� ��� ������� �������� ���� ������� ����
            var rand = Math.round(Math.random() * 3000);
            setTimeout(function() {
                changeWeather();
                loop();
            }, rand);
        }());
        this.isCyclingStarted = true; //��������� ���� ������� ����
    },
    calcAllowedRange: function(distance, direction) {// ������� ���������� ������� ��������� � ������� ���.���., ������ ������. �������� ��������� �� ������ ���� ����
        /*
         var xPassing = direction.x * this.wind.x;//������� ��������, �������� ��� ���� ���������, �� ���
         xPassing = xPassing / Math.ceil(Math.abs(direction.x) * this.maxWindPower.x) / 2;//³�������� ��������� �������� ���� �� ����������� ���������
         var yPassing = direction.y * this.wind.y;
         yPassing = yPassing / Math.ceil(Math.abs(direction.y) * this.maxWindPower.y) / 2;

         distance += distance * 0.5 * (xPassing + yPassing); // ��������� ������� ���������, �� ��� ���� ��������� ��������(���� ��������)

         if (this.environmentResistance < 1) // ����� ����� ���. �� ���������
         this.environmentResistance = 1;
         distance /= this.environmentResistance;
         */

        return distance;
    }
};
Environment.startCycling();

module.exports = Environment;