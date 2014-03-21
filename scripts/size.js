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
    */
    var Size = (function () {
        function Size(first, second) {
            switch (arguments.length) {
                case 0:
                    this.width = -1;
                    this.height = -1;
                    break;
                case 1:
                    var size = first;
                    this.width = size.width;
                    this.height = size.height;
                    break;
                case 2:
                    var width = first;
                    var height = second;
                    this.width = width;
                    this.height = height;
                    break;
                default:
                    throw "invalid constructor call";
            }
        }
        /**
        * Whether the width OR height is zero.
        */
        Size.prototype.isEmpty = function () {
            return this.width == 0 || this.height == 0;
        };

        /**
        * Whether the width AND height are zero.
        */
        Size.prototype.isNull = function () {
            return this.width == 0 && this.height == 0;
        };

        /**
        * Whether the width AND height are non-negative.
        */
        Size.prototype.isValid = function () {
            return this.width >= 0 && this.height >= 0;
        };

        /**
        * Test the size for equality with another.
        */
        Size.prototype.equals = function (other) {
            return this.width == other.width && this.height == other.height;
        };

        /**
        * A new size bounded in each dimension by another size.
        */
        Size.prototype.boundedTo = function (other) {
            var w = Math.min(this.width, other.width);
            var h = Math.min(this.height, other.height);
            return new Size(w, h);
        };

        /**
        * A new size expanded in each dimension to another size.
        */
        Size.prototype.expandedTo = function (other) {
            var w = Math.max(this.width, other.width);
            var h = Math.max(this.height, other.height);
            return new Size(w, h);
        };

        /**
        * Swap the width and height of this size.
        */
        Size.prototype.transpose = function () {
            var temp = this.width;
            this.width = this.height;
            this.height = temp;
        };

        /**
        * A new size with the width and height swapped.
        */
        Size.prototype.transposed = function () {
            return new Size(this.height, this.width);
        };

        /**
        * Increment this size by the given size.
        */
        Size.prototype.add = function (other) {
            this.width += other.width;
            this.height += other.height;
        };

        /**
        * A new size increased in each dimension by another.
        */
        Size.prototype.added = function (other) {
            var w = this.width + other.width;
            var h = this.height + other.height;
            return new Size(w, h);
        };

        /**
        * Decrement this size by the given size.
        */
        Size.prototype.subtract = function (other) {
            this.width -= other.width;
            this.height -= other.height;
        };

        /**
        * A new size decreased in each dimension by another.
        */
        Size.prototype.subtracted = function (other) {
            var w = this.width - other.width;
            var h = this.height - other.height;
            return new Size(w, h);
        };

        /**
        * Scale this size by the given factor.
        */
        Size.prototype.multiply = function (factor) {
            this.width *= factor;
            this.height *= factor;
        };

        /**
        * A new size scaled in each dimension by a factor.
        */
        Size.prototype.multiplied = function (factor) {
            var w = this.width * factor;
            var h = this.height * factor;
            return new Size(w, h);
        };

        /**
        * Scale this size by the given divisor.
        */
        Size.prototype.divide = function (divisor) {
            this.width /= divisor;
            this.height /= divisor;
        };

        /**
        * A new size scaled in each dimension by a divisor.
        */
        Size.prototype.divided = function (divisor) {
            var w = Math.floor(this.width / divisor);
            var h = Math.floor(this.height / divisor);
            return new Size(w, h);
        };
        return Size;
    })();
    porcelain.Size = Size;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size.js.map
