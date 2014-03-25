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
    * The CSS class added to Item instances.
    */
    var ITEM_CLASS = "p-Item";

    /**
    * The most base class of visible porcelain objects.
    *
    * Instances are represented by a single <div>.
    *
    * @class
    */
    var Item = (function () {
        /**
        * Construct a new Item.
        */
        function Item() {
            this._parent = null;
            this._children = null;
            this._signals = null;
            this._element = document.createElement("div");
            this._element.className = ITEM_CLASS;
        }
        /**
        * Destroy the item and its children.
        */
        Item.prototype.destroy = function () {
            this._detach();
            this._destroyChildren();
            this._destroySignals();
            this._deparent();
            this._element = null;
        };

        Object.defineProperty(Item.prototype, "element", {
            /**
            * The item's div element.
            *
            * @readonly
            */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "parent", {
            /**
            * The parent Item of this item.
            *
            * @readonly
            */
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "children", {
            /**
            * The array child items for this item.
            *
            * @readonly
            */
            get: function () {
                if (!this._children) {
                    return [];
                }
                return this._children.slice();
            },
            enumerable: true,
            configurable: true
        });

        Item.prototype.append = function () {
            for (var i = 0, n = arguments.length; i < n; ++i) {
                this._append(arguments[i]);
            }
        };

        Item.prototype.prepend = function () {
            for (var i = 0, n = arguments.length; i < n; ++i) {
                this._prepend(arguments[i]);
            }
        };

        Item.prototype.insertBefore = function () {
            var target = arguments[0];
            for (var i = 1, n = arguments.length; i < n; ++i) {
                this._insertBefore(target, arguments[i]);
            }
        };

        Item.prototype.insertAfter = function () {
            var target = arguments[0];
            for (var i = 1, n = arguments.length; i < n; ++i) {
                this._insertBefore(target, arguments[i]);
            }
        };

        Item.prototype.remove = function () {
            for (var i = 0, n = arguments.length; i < n; ++i) {
                this._remove(arguments[i]);
            }
        };

        /**
        * Create a new Signal owned by the item.
        *
        * The signal will be destroyed automatically by the item.
        */
        Item.prototype.createSignal = function () {
            if (!this._signals) {
                this._signals = [];
            }
            var signal = new porcelain.Signal();
            this._signals.push(signal);
            return signal;
        };

        /**
        * A helper method for appending an item.
        *
        * @private
        */
        Item.prototype._append = function (child) {
            if (!this._children) {
                this._children = [];
            }
            child._deparent();
            child._parent = this;
            this._children.push(child);
            this._element.appendChild(child._element);
        };

        /**
        * A helper method for prepending an item.
        *
        * @private
        */
        Item.prototype._prepend = function (child) {
            if (!this._children) {
                this._children = [];
            }
            child._deparent();
            child._parent = this;
            this._children.unshift(child);
            var elem = this._element;
            elem.insertBefore(child._element, elem.firstChild);
        };

        /**
        * A helper method for inserting an item.
        *
        */
        Item.prototype._insertBefore = function (before, child) {
            if (!this._children) {
                this._children = [];
            }
            child._deparent();
            child._parent = this;
            var elem = this._element;
            var index = this._children.indexOf(before);
            if (index === -1) {
                this._children.unshift(child);
                elem.insertBefore(child._element, elem.firstChild);
            } else {
                this._children.splice(index, 0, child);
                elem.insertBefore(child._element, before._element);
            }
        };

        /**
        * A helper method for inserting an item.
        *
        */
        Item.prototype._insertAfter = function (after, child) {
            if (!this._children) {
                this._children = [];
            }
            child._deparent();
            child._parent = this;
            var elem = this._element;
            var index = this._children.indexOf(after);
            if (index === -1) {
                this._children.push(child);
                elem.appendChild(child._element);
            } else {
                this._children.splice(index + 1, 0, child);
                elem.insertBefore(child._element, after._element.nextSibling);
            }
        };

        /**
        * A helper method for removing a child item.
        *
        * @private
        */
        Item.prototype._remove = function (child) {
            if (child._parent === this) {
                child._deparent();
                child._detach();
            }
        };

        /**
        * A helper method to detach the div element.
        *
        * @private
        */
        Item.prototype._detach = function () {
            var elem = this._element;
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
        };

        /**
        * A helper method for destroying the item children.
        *
        * @private
        */
        Item.prototype._destroyChildren = function () {
            if (!this._children) {
                return;
            }
            var children = this._children;
            this._children = null;
            for (var i = 0, n = children.length; i < n; ++i) {
                children[i].destroy();
            }
        };

        /**
        * A helper method for destroying the item signals.
        *
        * @private
        */
        Item.prototype._destroySignals = function () {
            if (this._signals) {
                return;
            }
            var signals = this._signals;
            this._signals = null;
            for (var i = 0, n = signals.length; i < n; ++i) {
                signals[i].disconnect();
            }
        };

        /**
        * A helper method for de-parenting the object.
        *
        * @private
        */
        Item.prototype._deparent = function () {
            var parent = this._parent;
            if (!parent) {
                return;
            }
            this._parent = null;
            var siblings = parent._children;
            if (!siblings) {
                return;
            }
            var index = siblings.indexOf(this);
            if (index !== -1) {
                siblings.splice(index, 1);
            }
        };
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
