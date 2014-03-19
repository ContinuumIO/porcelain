/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var ITEM_CLASS = "porcelain-Item";

    var MIN_ITEM_SIZE = new porcelain.Size(0, 0);
    var MAX_ITEM_DIM = (1 << 16) - 1;
    var MAX_ITEM_SIZE = new porcelain.Size(MAX_ITEM_DIM, MAX_ITEM_DIM);

    var Item = (function () {
        function Item() {
            this._geometry = new porcelain.Rect();
            this._minSize = new porcelain.Size(MIN_ITEM_SIZE);
            this._maxSize = new porcelain.Size(MAX_ITEM_SIZE);
            this._element = null;
        }
        Object.defineProperty(Item.prototype, "left", {
            get: function () {
                return this._geometry.left;
            },
            set: function (left) {
                var min = this._geometry.right - this._maxSize.width;
                var max = this._geometry.right - this._minSize.width;
                this._geometry.left = Math.min(Math.max(min, left), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "top", {
            get: function () {
                return this._geometry.top;
            },
            set: function (top) {
                var min = this._geometry.bottom - this._maxSize.height;
                var max = this._geometry.bottom - this._minSize.height;
                this._geometry.top = Math.min(Math.max(min, top), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "right", {
            get: function () {
                return this._geometry.right;
            },
            set: function (right) {
                var min = this._geometry.left + this._minSize.width;
                var max = this._geometry.left + this._maxSize.width;
                this._geometry.right = Math.min(Math.max(min, right), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "bottom", {
            get: function () {
                return this._geometry.bottom;
            },
            set: function (bottom) {
                var min = this._geometry.top + this._minSize.height;
                var max = this._geometry.top + this._maxSize.height;
                this._geometry.bottom = Math.min(Math.max(min, bottom), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "x", {
            get: function () {
                return this._geometry.x;
            },
            set: function (x) {
                this._geometry.x = x;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "y", {
            get: function () {
                return this._geometry.y;
            },
            set: function (y) {
                this._geometry.y = y;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "width", {
            get: function () {
                return this._geometry.width;
            },
            set: function (width) {
                var min = this._minSize.width;
                var max = this._maxSize.width;
                this._geometry.width = Math.min(Math.max(min, width), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "height", {
            get: function () {
                return this._geometry.height;
            },
            set: function (height) {
                var min = this._minSize.height;
                var max = this._maxSize.height;
                this._geometry.height = Math.min(Math.max(min, height), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "topLeft", {
            get: function () {
                return { x: this._geometry.left, y: this._geometry.top };
            },
            set: function (point) {
                var minx = this._geometry.right - this._maxSize.width;
                var maxx = this._geometry.right - this._minSize.width;
                var miny = this._geometry.bottom - this._maxSize.height;
                var maxy = this._geometry.bottom - this._minSize.height;
                var x = Math.min(Math.max(minx, point.x), maxx);
                var y = Math.min(Math.max(miny, point.y), maxy);
                this._geometry.topLeft = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "topRight", {
            get: function () {
                return { x: this._geometry.right, y: this._geometry.top };
            },
            set: function (point) {
                var minx = this._geometry.left + this._minSize.width;
                var maxx = this._geometry.left + this._maxSize.width;
                var miny = this._geometry.bottom - this._maxSize.height;
                var maxy = this._geometry.bottom - this._minSize.height;
                var x = Math.min(Math.max(minx, point.x), maxx);
                var y = Math.min(Math.max(miny, point.y), maxy);
                this._geometry.topRight = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "bottomLeft", {
            get: function () {
                return { x: this._geometry.left, y: this._geometry.bottom };
            },
            set: function (point) {
                var minx = this._geometry.right - this._maxSize.width;
                var maxx = this._geometry.right - this._minSize.width;
                var miny = this._geometry.top + this._minSize.height;
                var maxy = this._geometry.top + this._maxSize.height;
                var x = Math.min(Math.max(minx, point.x), maxx);
                var y = Math.min(Math.max(miny, point.y), maxy);
                this._geometry.bottomLeft = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "bottomRight", {
            get: function () {
                return { x: this._geometry.right, y: this._geometry.bottom };
            },
            set: function (point) {
                var minx = this._geometry.left + this._minSize.width;
                var maxx = this._geometry.left + this._maxSize.width;
                var miny = this._geometry.top + this._minSize.height;
                var maxy = this._geometry.top + this._maxSize.height;
                var x = Math.min(Math.max(minx, point.x), maxx);
                var y = Math.min(Math.max(miny, point.y), maxy);
                this._geometry.bottomRight = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "pos", {
            get: function () {
                return this._geometry.pos;
            },
            set: function (pos) {
                this._geometry.pos = pos;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "size", {
            get: function () {
                return this._geometry.size;
            },
            set: function (size) {
                var minw = this._minSize.width;
                var minh = this._minSize.height;
                var maxw = this._maxSize.width;
                var maxh = this._maxSize.height;
                var w = Math.min(Math.max(minw, size.width), maxw);
                var h = Math.min(Math.max(minh, size.height), maxh);
                this._geometry.size = { width: w, height: h };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "rect", {
            get: function () {
                return this._geometry.rect;
            },
            set: function (rect) {
                var minw = this._minSize.width;
                var minh = this._minSize.height;
                var maxw = this._maxSize.width;
                var maxh = this._maxSize.height;
                var w = Math.min(Math.max(minw, rect.width), maxw);
                var h = Math.min(Math.max(minh, rect.height), maxh);
                this._geometry.rect = { x: rect.x, y: rect.y, width: w, height: h };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "minimumSize", {
            get: function () {
                return this._minSize.size;
            },
            set: function (size) {
                // XXX clip and update
                this._minSize = new porcelain.Size(size);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "maximumSize", {
            get: function () {
                return this._maxSize.size;
            },
            set: function (size) {
                // XXX clip and update
                this._maxSize = new porcelain.Size(size);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        // protected
        Item.prototype._create = function () {
            if (this._element !== null) {
                return;
            }
            this._element = document.createElement("div");
            $(this._element).addClass(ITEM_CLASS);
            this._syncGeometry();
        };

        Item.prototype._syncGeometry = function () {
            if (this._element !== null) {
                var geo = this._geometry;
                $(this._element).css({
                    left: geo.left,
                    top: geo.top,
                    width: geo.width,
                    height: geo.height
                });
            }
        };
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
