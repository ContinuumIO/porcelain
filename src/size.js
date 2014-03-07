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
        function Size(size) {
            if (typeof size === "undefined") { size = { width: -1, height: -1 }; }
            this.width = size.width;
            this.height = size.height;
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


        Object.defineProperty(Size.prototype, "size$", {
            get: function () {
                return new Size(this.size);
            },
            set: function (size) {
                this.size = size;
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
            return { width: w, height: h };
        };

        Size.prototype.boundedTo$ = function (other) {
            return new Size(this.boundedTo(other));
        };

        Size.prototype.expandedTo = function (other) {
            var w = Math.max(this.width, other.width);
            var h = Math.max(this.height, other.height);
            return { width: w, height: h };
        };

        Size.prototype.expandedTo$ = function (other) {
            return new Size(this.expandedTo(other));
        };

        Size.prototype.transpose = function () {
            var w = this.width;
            this.width = this.height;
            this.height = w;
        };

        Size.prototype.transposed = function () {
            return { width: this.height, height: this.width };
        };

        Size.prototype.transposed$ = function () {
            return new Size(this.transposed());
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
            return { width: w, height: h };
        };

        Size.prototype.added$ = function (other) {
            return new Size(this.added(other));
        };

        Size.prototype.subtract = function (other) {
            this.width -= other.width;
            this.height -= other.height;
        };

        Size.prototype.subtracted = function (other) {
            var w = this.width - other.width;
            var h = this.height - other.height;
            return { width: w, height: h };
        };

        Size.prototype.subtracted$ = function (other) {
            return new Size(this.subtracted(other));
        };

        Size.prototype.multiply = function (factor) {
            this.width *= factor;
            this.height *= factor;
        };

        Size.prototype.multiplied = function (factor) {
            var w = this.width * factor;
            var h = this.height * factor;
            return { width: w, height: h };
        };

        Size.prototype.multiplied$ = function (factor) {
            return new Size(this.multiplied(factor));
        };

        Size.prototype.divide = function (factor) {
            this.width = Math.floor(this.width / factor);
            this.height = Math.floor(this.height / factor);
        };

        Size.prototype.divided = function (factor) {
            var w = Math.floor(this.width / factor);
            var h = Math.floor(this.height / factor);
            return { width: w, height: h };
        };

        Size.prototype.divided$ = function (factor) {
            return new Size(this.divided(factor));
        };
        return Size;
    })();
    porcelain.Size = Size;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size.js.map
