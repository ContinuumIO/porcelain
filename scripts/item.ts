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
        constructor() { }

        /**
         * Get the width of the item in pixels.
         * @readonly
         * @type {number}
         */
        get width(): number {
            if (!this._element) {
                return 0;
            }
            return this._element.getBoundingClientRect().width;
        }

        /**
         * Get the height of the item in pixels.
         * @readonly
         * @type {number}
         */
        get height(): number {
            if (!this._element) {
                return 0;
            }
            return this._element.getBoundingClientRect().height;
        }

        /**
         * Get the size of the item. This is more efficient than
         * getting `width` and `height` independently.
         * @readonly
         * @type {ISize}
         */
        get size(): ISize {
            if (!this._element) {
                return { width: 0, height: 0 };
            }
            var r = this._element.getBoundingClientRect();
            return { width: r.width, height: r.height };
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
         * Create the item's internal div element. This is a 
         * no-op if the element has already been created.
         */
        create(): void {
            if (this._element) {
                return;
            }
            this._element = document.createElement("div");
            $(this._element).addClass(ITEM_CLASS);
        }

        /**
         * Destroy the item's internal div element. This is a
         * no-op if the element has already been destroyed.
         */
        destroy(): void {
            if (!this._element) {
                return;
            }
            $(this._element).remove();
            this._element = null;
        }

        private _element: HTMLDivElement = null;
    }

}
