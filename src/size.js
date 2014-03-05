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
            this._width = width;
            this._height = height;
        }
        Size.prototype.width = function () {
            return this._width;
        };

        Size.prototype.setWidth = function (width) {
            this._width = width;
        };

        Size.prototype.height = function () {
            return this._height;
        };

        Size.prototype.setHeight = function (height) {
            this._height = height;
        };

        Size.prototype.isEmpty = function () {
            return this._width == 0 || this._height == 0;
        };

        Size.prototype.isNull = function () {
            return this._width == 0 && this._height == 0;
        };

        Size.prototype.isValid = function () {
            return this._width >= 0 && this._height >= 0;
        };

        Size.prototype.boundedTo = function (other) {
            var width = Math.min(this._width, other._width);
            var height = Math.min(this._height, other._height);
            return new Size(width, height);
        };

        Size.prototype.expandedTo = function (other) {
            var width = Math.max(this._width, other._width);
            var height = Math.max(this._height, other._height);
            return new Size(width, height);
        };

        Size.prototype.transpose = function () {
            var width = this._width;
            this._width = this._height;
            this._height = width;
        };

        Size.prototype.transposed = function () {
            return new Size(this._height, this._width);
        };

        Size.prototype.equals = function (other) {
            return this._width == other._width && this._height == other._height;
        };

        Size.prototype.add = function (other) {
            this._width += other._width;
            this._height += other._height;
        };

        Size.prototype.added = function (other) {
            var width = this._width + other._width;
            var height = this._height + other._height;
            return new Size(width, height);
        };

        Size.prototype.subtract = function (other) {
            this._width -= other._width;
            this._height -= other._height;
        };

        Size.prototype.subtracted = function (other) {
            var width = this._width - other._width;
            var height = this._height - other._height;
            return new Size(width, height);
        };

        Size.prototype.multiply = function (factor) {
            this._width *= factor;
            this._height *= factor;
        };

        Size.prototype.multiplied = function (factor) {
            var width = this._width * factor;
            var height = this._height * factor;
            return new Size(width, height);
        };

        Size.prototype.divide = function (factor) {
            this._width /= factor;
            this._height /= factor;
        };

        Size.prototype.divided = function (factor) {
            var width = this._width / factor;
            var height = this._height / factor;
            return new Size(width, height);
        };
        return Size;
    })();
    porcelain.Size = Size;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size.js.map
