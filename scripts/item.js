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

    var Item = (function () {
        /**
        * Construct a new Item.
        * @class
        * @classdesc The base class of porcelain visual items.
        * An Item is represented by a single <div>. The div
        * contents and layout are specified by subclasses.
        */
        function Item() {
            this._element = null;
        }
        Object.defineProperty(Item.prototype, "width", {
            /**
            * Get the width of the item in pixels.
            * @readonly
            * @type {number}
            */
            get: function () {
                if (!this._element) {
                    return 0;
                }
                return this._element.getBoundingClientRect().width;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "height", {
            /**
            * Get the height of the item in pixels.
            * @readonly
            * @type {number}
            */
            get: function () {
                if (!this._element) {
                    return 0;
                }
                return this._element.getBoundingClientRect().height;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "size", {
            /**
            * Get the size of the item. This is more efficient than
            * getting `width` and `height` independently.
            * @readonly
            * @type {ISize}
            */
            get: function () {
                if (!this._element) {
                    return { width: 0, height: 0 };
                }
                var r = this._element.getBoundingClientRect();
                return { width: r.width, height: r.height };
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "element", {
            /**
            * The item's internal div element.
            * @readonly
            * @type {HTMLDivElement}
            */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Create the item's internal div element. This is a
        * no-op if the element has already been created.
        */
        Item.prototype.create = function () {
            if (this._element) {
                return;
            }
            this._element = document.createElement("div");
            $(this._element).addClass(ITEM_CLASS);
        };

        /**
        * Destroy the item's internal div element. This is a
        * no-op if the element has already been destroyed.
        */
        Item.prototype.destroy = function () {
            if (!this._element) {
                return;
            }
            $(this._element).remove();
            this._element = null;
        };
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
