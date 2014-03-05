/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var Point = (function () {
        function Point(x, y) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            this._x = x;
            this._y = y;
        }
        Point.prototype.x = function () {
            return this._x;
        };

        Point.prototype.setX = function (x) {
            this._x = x;
        };

        Point.prototype.y = function () {
            return this._y;
        };

        Point.prototype.setY = function (y) {
            this._y = y;
        };

        Point.prototype.isNull = function () {
            return this._x == 0 && this._y == 0;
        };

        Point.prototype.manhattanLength = function () {
            return Math.abs(this._x) + Math.abs(this._y);
        };

        Point.prototype.equals = function (other) {
            return this._x == other._x && this._y == other._y;
        };

        Point.prototype.add = function (other) {
            this._x += other._x;
            this._y += other._y;
        };

        Point.prototype.added = function (other) {
            var x = this._x + other._x;
            var y = this._y + other._y;
            return new Point(x, y);
        };

        Point.prototype.subtract = function (other) {
            this._x -= other._x;
            this._y -= other._y;
        };

        Point.prototype.subtracted = function (other) {
            var x = this._x - other._x;
            var y = this._y - other._y;
            return new Point(x, y);
        };

        Point.prototype.multiply = function (factor) {
            this._x *= factor;
            this._y *= factor;
        };

        Point.prototype.multiplied = function (factor) {
            var x = this._x * factor;
            var y = this._y * factor;
            return new Point(x, y);
        };

        Point.prototype.divide = function (factor) {
            this._x /= factor;
            this._y /= factor;
        };

        Point.prototype.divided = function (factor) {
            var x = this._x / factor;
            var y = this._y / factor;
            return new Point(x, y);
        };
        return Point;
    })();
    porcelain.Point = Point;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=point.js.map
