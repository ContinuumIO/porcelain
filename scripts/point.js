/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    

    /**
    * An implementation of the IPoint interface.
    */
    var Point = (function () {
        function Point(first, second) {
            switch (arguments.length) {
                case 0:
                    this.x = 0;
                    this.y = 0;
                    break;
                case 1:
                    var point = first;
                    this.x = point.x;
                    this.y = point.y;
                    break;
                case 2:
                    var x = first;
                    var y = second;
                    this.x = x;
                    this.y = y;
                    break;
                default:
                    throw "invalid constructor call";
            }
        }
        /**
        * Whether both X and Y coordinates are zero.
        */
        Point.prototype.isNull = function () {
            return this.x == 0 && this.y == 0;
        };

        /**
        * The sum of the absolute X and Y distances to the origin.
        */
        Point.prototype.manhattanLength = function () {
            return Math.abs(this.x) + Math.abs(this.y);
        };

        /**
        * Test the point for equality with another.
        */
        Point.prototype.equals = function (other) {
            return this.x == other.x && this.y == other.y;
        };

        /**
        * Increment this point by another point.
        */
        Point.prototype.add = function (other) {
            this.x += other.x;
            this.y += other.y;
        };

        /**
        * A new point which is the vector sum of the two points.
        */
        Point.prototype.added = function (other) {
            return new Point(this.x + other.x, this.y + other.y);
        };

        /**
        * Decrement this point by another point.
        */
        Point.prototype.subtract = function (other) {
            this.x -= other.x;
            this.y -= other.y;
        };

        /**
        * A new point which is the vector difference of the two points.
        */
        Point.prototype.subtracted = function (other) {
            return new Point(this.x - other.x, this.y - other.y);
        };

        /**
        * Scale this point by the given factor.
        */
        Point.prototype.multiply = function (factor) {
            this.x *= factor;
            this.y *= factor;
        };

        /**
        * A new point scaled by the given factor.
        */
        Point.prototype.multiplied = function (factor) {
            return new Point(this.x * factor, this.y * factor);
        };

        /**
        * Scale this point by the given divisor.
        */
        Point.prototype.divide = function (divisor) {
            this.x /= divisor;
            this.y /= divisor;
        };

        /**
        * A new point scaled by the given divisor.
        */
        Point.prototype.divided = function (divisor) {
            var x = Math.floor(this.x / divisor);
            var y = Math.floor(this.y / divisor);
            return new Point(x, y);
        };
        return Point;
    })();
    porcelain.Point = Point;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=point.js.map
