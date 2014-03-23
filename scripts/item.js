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
    var ITEM_CLASS = "porcelain-Item";

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
            this._element = document.createElement("div");
            $(this._element).addClass(ITEM_CLASS);
        }
        /**
        * Destroy the item and remove its element from the DOM.
        *
        * Manipulating an Item after it has been destroyed will
        * result in undefined behavior.
        */
        Item.prototype.destroy = function () {
            $(this._element).remove();
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
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
