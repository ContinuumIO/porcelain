/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var Size = (function () {
        function Size(width, height) {
            if (typeof width === "undefined") { width = -1; }
            if (typeof height === "undefined") { height = -1; }
            this.width = width;
            this.height = height;
        }
        Size.fromISize = function (size) {
            return new Size(size.width, size.height);
        };

        Size.prototype.copy = function () {
            return new Size(this.width, this.height);
        };

        Size.prototype.isEmpty = function () {
            return this.width == 0 || this.height == 0;
        };

        Size.prototype.isNull = function () {
            return this.width == 0 && this.height == 0;
        };

        Size.prototype.isValid = function () {
            return this.width >= 0 && this.height >= 0;
        };

        Size.prototype.boundedTo = function (other) {
            var width = Math.min(this.width, other.width);
            var height = Math.min(this.height, other.height);
            return new Size(width, height);
        };

        Size.prototype.expandedTo = function (other) {
            var width = Math.max(this.width, other.width);
            var height = Math.max(this.height, other.height);
            return new Size(width, height);
        };

        Size.prototype.transpose = function () {
            var width = this.width;
            this.width = this.height;
            this.height = width;
        };

        Size.prototype.transposed = function () {
            return new Size(this.height, this.width);
        };

        Size.prototype.equals = function (other) {
            return this.width == other.width && this.height == other.height;
        };

        Size.prototype.add = function (other) {
            this.width += other.width;
            this.height += other.height;
        };

        Size.prototype.added = function (other) {
            var width = this.width + other.width;
            var height = this.height + other.height;
            return new Size(width, height);
        };

        Size.prototype.subtract = function (other) {
            this.width -= other.width;
            this.height -= other.height;
        };

        Size.prototype.subtracted = function (other) {
            var width = this.width - other.width;
            var height = this.height - other.height;
            return new Size(width, height);
        };

        Size.prototype.multiply = function (factor) {
            this.width *= factor;
            this.height *= factor;
        };

        Size.prototype.multiplied = function (factor) {
            var width = this.width * factor;
            var height = this.height * factor;
            return new Size(width, height);
        };

        Size.prototype.divide = function (factor) {
            this.width = Math.floor(this.width / factor);
            this.height = Math.floor(this.height / factor);
        };

        Size.prototype.divided = function (factor) {
            var width = Math.floor(this.width / factor);
            var height = Math.floor(this.height / factor);
            return new Size(width, height);
        };
        return Size;
    })();
    porcelain.Size = Size;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size.js.map
