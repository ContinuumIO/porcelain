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
        function Point(point) {
            if (typeof point === "undefined") { point = { x: 0, y: 0 }; }
            this.x = point.x;
            this.y = point.y;
        }
        Object.defineProperty(Point.prototype, "point", {
            get: function () {
                return { x: this.x, y: this.y };
            },
            set: function (point) {
                this.x = point.x;
                this.y = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Point.prototype, "point$", {
            get: function () {
                return new Point(this.point);
            },
            set: function (point) {
                this.point = point;
            },
            enumerable: true,
            configurable: true
        });


        Point.prototype.isNull = function () {
            return this.x == 0 && this.y == 0;
        };

        Point.prototype.manhattanLength = function () {
            return Math.abs(this.x) + Math.abs(this.y);
        };

        Point.prototype.equals = function (other) {
            return this.x == other.x && this.y == other.y;
        };

        Point.prototype.add = function (other) {
            this.x += other.x;
            this.y += other.y;
        };

        Point.prototype.added = function (other) {
            return { x: this.x + other.x, y: this.y + other.y };
        };

        Point.prototype.added$ = function (other) {
            return new Point(this.added(other));
        };

        Point.prototype.subtract = function (other) {
            this.x -= other.x;
            this.y -= other.y;
        };

        Point.prototype.subtracted = function (other) {
            return { x: this.x - other.x, y: this.y - other.y };
        };

        Point.prototype.subtracted$ = function (other) {
            return new Point(this.subtracted(other));
        };

        Point.prototype.multiply = function (factor) {
            this.x *= factor;
            this.y *= factor;
        };

        Point.prototype.multiplied = function (factor) {
            return { x: this.x * factor, y: this.y * factor };
        };

        Point.prototype.multiplied$ = function (factor) {
            return new Point(this.multiplied(factor));
        };

        Point.prototype.divide = function (factor) {
            this.x = Math.floor(this.x / factor);
            this.y = Math.floor(this.y / factor);
        };

        Point.prototype.divided = function (factor) {
            var x = Math.floor(this.x / factor);
            var y = Math.floor(this.y / factor);
            return { x: x, y: y };
        };

        Point.prototype.divided$ = function (factor) {
            return new Point(this.divided(factor));
        };
        return Point;
    })();
    porcelain.Point = Point;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=point.js.map
