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
        Object.defineProperty(Size.prototype, "size", {
            get: function () {
                return { width: this.width, height: this.height };
            },
            set: function (size) {
                this.width = size.width;
                this.height = size.height;
            },
            enumerable: true,
            configurable: true
        });


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
            var w = Math.min(this.width, other.width);
            var h = Math.min(this.height, other.height);
            return new Size(w, h);
        };

        Size.prototype.expandedTo = function (other) {
            var w = Math.max(this.width, other.width);
            var h = Math.max(this.height, other.height);
            return new Size(w, h);
        };

        Size.prototype.transpose = function () {
            var temp = this.width;
            this.width = this.height;
            this.height = temp;
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
            var w = this.width + other.width;
            var h = this.height + other.height;
            return new Size(w, h);
        };

        Size.prototype.subtract = function (other) {
            this.width -= other.width;
            this.height -= other.height;
        };

        Size.prototype.subtracted = function (other) {
            var w = this.width - other.width;
            var h = this.height - other.height;
            return new Size(w, h);
        };

        Size.prototype.multiply = function (factor) {
            this.width *= factor;
            this.height *= factor;
        };

        Size.prototype.multiplied = function (factor) {
            var w = this.width * factor;
            var h = this.height * factor;
            return new Size(w, h);
        };

        Size.prototype.divide = function (factor) {
            this.width = Math.floor(this.width / factor);
            this.height = Math.floor(this.height / factor);
        };

        Size.prototype.divided = function (factor) {
            var w = Math.floor(this.width / factor);
            var h = Math.floor(this.height / factor);
            return new Size(w, h);
        };
        return Size;
    })();
    porcelain.Size = Size;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size.js.map
