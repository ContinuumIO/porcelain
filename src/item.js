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
        function Item(parent) {
            if (typeof parent === "undefined") { parent = null; }
            this._parent = null;
            this._children = null;
            this._geometry = new porcelain.Rect();
            this._element = null;
            this.parent = parent;
        }
        Object.defineProperty(Item.prototype, "parent", {
            //
            //  parent-child methods
            //
            get: function () {
                return this._parent;
            },
            set: function (parent) {
                var old = this._parent;
                if (parent === old) {
                    return;
                }
                if (parent === this) {
                    throw "cannot use 'this' as Item parent";
                }
                this._parent = parent;
                if (old !== null) {
                    var i = old._children.indexOf(this);
                    if (i !== -1) {
                        old._children.splice(i, 1);
                        old.childRemoved(this);
                    }
                }
                if (parent !== null) {
                    parent._children.push(this);
                    parent.childAdded(this);
                }
                this.parentChanged(old, parent);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "children", {
            get: function () {
                if (this._children !== null) {
                    return this._children.slice();
                }
                return [];
            },
            enumerable: true,
            configurable: true
        });

        Item.prototype.childAdded = function (child) {
        };

        Item.prototype.childRemoved = function (child) {
        };

        Item.prototype.parentChanged = function (old, parent) {
        };

        Object.defineProperty(Item.prototype, "x", {
            //
            // geometry methods
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

        Item.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        Item.prototype.move = function (point) {
            this._geometry.moveTopLeft(point);
            this.refreshElementGeometry(true, false);
        };

        Item.prototype.resize = function (size) {
            this._geometry.size = size;
            this.refreshElementGeometry(false, true);
        };

        Item.prototype.setGeometry = function (rect) {
            this._geometry.rect = rect;
            this.refreshElementGeometry(true, true);
        };

        Object.defineProperty(Item.prototype, "element", {
            //
            // DOM methods
            //
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Item.prototype.render = function () {
            this._element = document.createElement("div");
            this._element.style.position = "absolute";
        };

        Item.prototype.refreshElementGeometry = function (pos, size) {
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
