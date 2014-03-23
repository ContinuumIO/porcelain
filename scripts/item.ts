/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

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
    export class Item {

        /**
         * Construct a new Item.
         */
        constructor() {
            this._element = document.createElement("div");
            $(this._element).addClass(ITEM_CLASS);
        }

        /**
         * Destroy the item and remove its element from the DOM. 
         *
         * Manipulating an Item after it has been destroyed will
         * result in undefined behavior.
         */
        destroy(): void {
            $(this._element).remove();
            this._element = null;
        }

        /**
         * The item's internal div element.
         *
         * @readonly
         */
        get element(): HTMLDivElement {
            return this._element;
        }

        private _element: HTMLDivElement;
    }

}
