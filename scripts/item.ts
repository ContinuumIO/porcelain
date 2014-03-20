/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var ITEM_CLASS = "porcelain-Item";

    export class Item {

        /**
         * Construct a new Item.
         * @class
         * @classdesc The base class of porcelain visual items.
         * An Item is represented by a single <div>. The div 
         * contents and layout are specified by subclasses.
         */
        constructor() {
            this._element = document.createElement("div");
            $(this._element).addClass(ITEM_CLASS);
        }

        /**
         * Destroy the item and remove its element from the DOM. 
         * Interaction with an Item after it is destroyed is undefined.
         */
        destroy(): void {
            $(this._element).remove();
            this._element = null;
        }

        /**
         * The item's internal div element.
         * @readonly
         * @type {HTMLDivElement}
         */
        get element(): HTMLDivElement {
            return this._element;
        }

        /**
         * Get the width of the item in pixels.
         * @readonly
         * @type {number}
         */
        get width(): number {
            return this._element.getBoundingClientRect().width;
        }

        /**
         * Get the height of the item in pixels.
         * @readonly
         * @type {number}
         */
        get height(): number {
            return this._element.getBoundingClientRect().height;
        }

        /**
         * Get the size of the item. This is more efficient than
         * getting `width` and `height` independently.
         * @readonly
         * @type {ISize}
         */
        get size(): ISize {
            var r = this._element.getBoundingClientRect();
            return { width: r.width, height: r.height };
        }

        private _element: HTMLDivElement;
    }

}
