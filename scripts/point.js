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
    *
    * @class
    */
    var Point = (function () {
        function Point(arg1, arg2) {
            switch (arguments.length) {
                case 0:
                    this.x = 0;
                    this.y = 0;
                    break;
                case 1:
                    this.x = arg1.x;
                    this.y = arg1.y;
                    break;
                case 2:
                    this.x = arg1;
                    this.y = arg2;
                    break;
                default:
                    throw new Error("invalid constructor call");
            }
        }
        /**
        * Returns true if this point is equivalent to another.
        */
        Point.prototype.equals = function (other) {
            return this.x == other.x && this.y == other.y;
        };

        /**
        * Returns true if both X AND Y coordinates are zero.
        */
        Point.prototype.isNull = function () {
            return this.x == 0 && this.y == 0;
        };

        /**
        * Returns the sum of the abs X and Y distances to the origin.
        */
        Point.prototype.manhattanLength = function () {
            return Math.abs(this.x) + Math.abs(this.y);
        };

        /**
        * Return a new size with the X and Y values swapped.
        */
        Point.prototype.transpose = function () {
            return new Point(this.x, this.y);
        };

        /**
        * Returns a new point which is the sum of the two points.
        */
        Point.prototype.add = function (other) {
            return new Point(this.x + other.x, this.y + other.y);
        };

        /**
        * Returns a new point which is the difference of the two points.
        */
        Point.prototype.subtract = function (other) {
            return new Point(this.x - other.x, this.y - other.y);
        };

        /**
        * Returns a new point scaled by the given factor.
        */
        Point.prototype.multiply = function (factor) {
            var x = Math.floor(this.x * factor);
            var y = Math.floor(this.y * factor);
            return new Point(x, y);
        };

        /**
        * Returns a new point scaled by the given divisor.
        */
        Point.prototype.divide = function (divisor) {
            var x = Math.floor(this.x / divisor);
            var y = Math.floor(this.y / divisor);
            return new Point(x, y);
        };
        return Point;
    })();
    porcelain.Point = Point;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=point.js.map
