/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var Rect = (function () {
        function Rect(x, y, width, height) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            if (typeof width === "undefined") { width = 0; }
            if (typeof height === "undefined") { height = 0; }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Rect.fromIRect = function (rect) {
            return new Rect(rect.x, rect.y, rect.width, rect.height);
        };

        Rect.fromPointAndSize = function (point, size) {
            return new Rect(point.x, point.y, size.width, size.height);
        };

        Rect.fromPoints = function (topLeft, bottomRight) {
            var x = topLeft.x;
            var y = topLeft.y;
            var width = bottomRight.x - x;
            var height = bottomRight.y - y;
            return new Rect(x, y, width, height);
        };

        Object.defineProperty(Rect.prototype, "left", {
            get: function () {
                return this.x;
            },
            set: function (pos) {
                this.x = pos;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "top", {
            get: function () {
                return this.y;
            },
            set: function (pos) {
                this.y = pos;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            set: function (pos) {
                this.width = pos - this.x;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            set: function (pos) {
                this.height = pos - this.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "topLeft", {
            get: function () {
                return new porcelain.Point(this.x, this.y);
            },
            set: function (point) {
                this.x = point.x;
                this.y = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "topRight", {
            get: function () {
                return new porcelain.Point(this.right, this.y);
            },
            set: function (point) {
                this.right = point.x;
                this.y = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "bottomLeft", {
            get: function () {
                return new porcelain.Point(this.x, this.bottom);
            },
            set: function (point) {
                this.x = point.x;
                this.bottom = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "bottomRight", {
            get: function () {
                return new porcelain.Point(this.right, this.bottom);
            },
            set: function (point) {
                this.right = point.x;
                this.bottom = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "center", {
            get: function () {
                var x = this.x + Math.floor(this.width / 2);
                var y = this.y + Math.floor(this.height / 2);
                return new porcelain.Point(x, y);
            },
            enumerable: true,
            configurable: true
        });
        return Rect;
    })();
    porcelain.Rect = Rect;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=rect.js.map
