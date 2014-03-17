/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var Item = (function () {
        function Item() {
            this._geometry = new porcelain.Rect();
            this._element = null;
        }
        Object.defineProperty(Item.prototype, "x", {
            //
            // Geometry Methods
            //
            get: function () {
                return this._geometry.left;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "y", {
            get: function () {
                return this._geometry.top;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "width", {
            get: function () {
                return this._geometry.width;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "height", {
            get: function () {
                return this._geometry.height;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "pos", {
            get: function () {
                return this._geometry.topLeft;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "size", {
            get: function () {
                return this._geometry.size;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "rect", {
            get: function () {
                return this._geometry.rect;
            },
            enumerable: true,
            configurable: true
        });

        Item.prototype.move = function (point) {
            this._geometry.moveTopLeft(point);
            this._updateElementGeometry(true, false);
        };

        Item.prototype.resize = function (size) {
            this._geometry.size = size;
            this._updateElementGeometry(false, true);
        };

        Item.prototype.setGeometry = function (rect) {
            this._geometry.rect = rect;
            this._updateElementGeometry(true, true);
        };

        Item.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        Object.defineProperty(Item.prototype, "element", {
            //
            // DOM Methods
            //
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Item.prototype.render = function () {
            this._element = document.createElement("div");
            this._element.className = "porcelain-Item";
            this._updateElementGeometry(true, true);
        };

        //
        // Private API
        //
        Item.prototype._updateElementGeometry = function (pos, size) {
            var geo = this._geometry;
            var style = this._element.style;
            if (pos) {
                style.left = geo.left + "px";
                style.top = geo.top + "px";
            }
            if (size) {
                style.width = geo.width + "px";
                style.height = geo.height + "px";
            }
        };
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
