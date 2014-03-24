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
    * The CSS class applied to Item instances.
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
        function Item(parent) {
            if (typeof parent === "undefined") { parent = null; }
            this._parent = null;
            this._children = null;
            this._signals = null;
            this._element = document.createElement("div");
            this.$.addClass(ITEM_CLASS);
            this.setParent(parent);
        }
        /**
        * Destroy the item and its children.
        */
        Item.prototype.destroy = function () {
            this.$.remove();
            this._destroyChildren();
            this._destroySignals();
            this.setParent(null);
            this._element = null;
        };

        Object.defineProperty(Item.prototype, "element", {
            /**
            * The item's internal div element.
            *
            * @readonly
            */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "$", {
            /**
            * A JQuery wrapper around the internal div element.
            *
            * Creates a *new* wrapper each time it is accessed.
            *
            * @readonly
            */
            get: function () {
                return $(this._element);
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
            * The child Items of this item.
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

        /**
        * Set the parent of the item.
        */
        Item.prototype.setParent = function (parent) {
            if (parent === this._parent) {
                return;
            }
            if (this._parent) {
                this._parent._removeChild(this);
            }
            this._parent = parent;
            if (parent) {
                parent._addChild(this);
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
        * An internal helper method for adding a child item.
        *
        * @private
        */
        Item.prototype._addChild = function (child) {
            if (!this._children) {
                this._children = [];
            }
            this._children.push(child);
        };

        /**
        * An internal helper method for removing a child item.
        */
        Item.prototype._removeChild = function (child) {
            if (!this._children) {
                return;
            }
            var index = this._children.indexOf(child);
            this._children.splice(index, 1);
        };

        /**
        * An internal helper method for destroying the children.
        */
        Item.prototype._destroyChildren = function () {
            if (!this._children) {
                return;
            }
            var children = this._children;
            this._children = null;
            $.each(children, function (index, child) {
                child.destroy();
            });
        };

        /**
        * An internal helper method for destroying the signals.
        */
        Item.prototype._destroySignals = function () {
            if (!this._signals) {
                return;
            }
            var signals = this._signals;
            this._signals = null;
            $.each(signals, function (index, signal) {
                signal.disconnect();
            });
        };
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
