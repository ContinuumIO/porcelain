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
     * Instances are represented by a single <div>. The internal 
     * div contents and the div layout are provided by subclasses.
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

        /**
         * The width of the item in pixels.
         *
         * @readonly
         */
        get width(): number {
            return this._element.getBoundingClientRect().width;
        }

        /**
         * The height of the item in pixels.
         *
         * @readonly
         */
        get height(): number {
            return this._element.getBoundingClientRect().height;
        }

        /**
         * The size of the item, in pixels.
         *
         * This is more efficient than accessing `width` and `height`
         * separately.
         *
         * @readonly
         */
        get size(): ISize {
            var r = this._element.getBoundingClientRect();
            return { width: r.width, height: r.height };
        }

        private _element: HTMLDivElement;
    }

}
