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

    var MAX_ITEM_DIM = (1 << 16) - 1;
    var MAX_ITEM_SIZE = new porcelain.Size(MAX_ITEM_DIM, MAX_ITEM_DIM);

    var Item = (function () {
        function Item() {
            this._geometry = new porcelain.Rect();
            this._minSize = new porcelain.Size(0, 0);
            this._maxSize = new porcelain.Size(MAX_ITEM_SIZE);
            this._element = null;
        }
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
                width = Math.max(this._minSize.width, width);
                width = Math.min(this._maxSize.width, width);
                this._geometry.width = width;
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
                height = Math.max(this._minSize.height, height);
                height = Math.min(this._maxSize.height, height);
                this._geometry.height = height;
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
                var sz = new porcelain.Size(size);
                sz = sz.expandedTo(this._minSize).boundedTo(this._maxSize);
                this._geometry.size = sz;
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
                var sz = new porcelain.Size(rect.width, rect.height);
                sz = sz.expandedTo(this._minSize).boundedTo(this._maxSize);
                this._geometry.rect = {
                    x: rect.x,
                    y: rect.y,
                    width: sz.width,
                    height: sz.height
                };
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
                this._maxSize = new porcelain.Size(size);
            },
            enumerable: true,
            configurable: true
        });


        Item.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        Object.defineProperty(Item.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Item.prototype.createElement = function () {
            var element = document.createElement("div");
            element.className = ITEM_CLASS;
            return element;
        };

        Item.prototype.render = function () {
            if (this.element === null) {
                this._element = this.createElement();
            }
        };

        Item.prototype._syncGeometry = function () {
            if (this._element !== null) {
                var geo = this._geometry;
                var style = this._element.style;
                style.left = geo.left + "px";
                style.top = geo.top + "px";
                style.width = geo.width + "px";
                style.height = geo.height + "px";
            }
        };
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
