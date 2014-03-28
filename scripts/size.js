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
    * An implementation of the ISize interface.
    *
    * @class
    */
    var Size = (function () {
        function Size(arg1, arg2) {
            switch (arguments.length) {
                case 0:
                    this.width = -1;
                    this.height = -1;
                    break;
                case 1:
                    this.width = arg1.width;
                    this.height = arg1.height;
                    break;
                case 2:
                    this.width = arg1;
                    this.height = arg2;
                    break;
                default:
                    throw new Error("invalid constructor call");
            }
        }
        /**
        * Returns true if this size is equivalent to another.
        */
        Size.prototype.equals = function (other) {
            return this.width == other.width && this.height == other.height;
        };

        /**
        * Returns true if the width OR height is zero.
        */
        Size.prototype.isEmpty = function () {
            return this.width == 0 || this.height == 0;
        };

        /**
        * Returns true if the height width AND height are zero.
        */
        Size.prototype.isNull = function () {
            return this.width == 0 && this.height == 0;
        };

        /**
        * Returns true if the width AND height are non-negative.
        */
        Size.prototype.isValid = function () {
            return this.width >= 0 && this.height >= 0;
        };

        /**
        * Returns a new size limited in each dimension by another size.
        */
        Size.prototype.boundedTo = function (other) {
            var w = Math.min(this.width, other.width);
            var h = Math.min(this.height, other.height);
            return new Size(w, h);
        };

        /**
        * Returns a new size expaned in each dimension to another size.
        */
        Size.prototype.expandedTo = function (other) {
            var w = Math.max(this.width, other.width);
            var h = Math.max(this.height, other.height);
            return new Size(w, h);
        };

        /**
        * Return a new size with the width and height values swapped.
        */
        Size.prototype.transpose = function () {
            return new Size(this.height, this.width);
        };

        /**
        * Returns a new size which is the sum of two sizes.
        */
        Size.prototype.add = function (other) {
            var w = this.width + other.width;
            var h = this.height + other.height;
            return new Size(w, h);
        };

        /**
        * Returns a new size which is the difference of two sizes.
        */
        Size.prototype.subtract = function (other) {
            var w = this.width - other.width;
            var h = this.height - other.height;
            return new Size(w, h);
        };

        /**
        * Returns a new size scaled by the given factor.
        */
        Size.prototype.multiply = function (factor) {
            var w = Math.floor(this.width * factor);
            var h = Math.floor(this.height * factor);
            return new Size(w, h);
        };

        /**
        * Returns a new size scaled by the given divisor.
        */
        Size.prototype.divide = function (divisor) {
            var w = Math.floor(this.width / divisor);
            var h = Math.floor(this.height / divisor);
            return new Size(w, h);
        };
        return Size;
    })();
    porcelain.Size = Size;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size.js.map
