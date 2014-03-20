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
            this._element = document.createElement("div");
            $(this._element).addClass(ITEM_CLASS);
        }
        /**
        * Destroy the item and remove its element from the DOM.
        * Interaction with an Item after it is destroyed is undefined.
        */
        Item.prototype.destroy = function () {
            $(this._element).remove();
            this._element = null;
        };

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

        Object.defineProperty(Item.prototype, "width", {
            /**
            * Get the width of the item in pixels.
            * @readonly
            * @type {number}
            */
            get: function () {
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
                var r = this._element.getBoundingClientRect();
                return { width: r.width, height: r.height };
            },
            enumerable: true,
            configurable: true
        });
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
