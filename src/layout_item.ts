/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The maximimum allowed layout width or height of an item.
     */
    export
    var MAX_ITEM_DIM = 1073741823;  // (1 << 30) - 1;

    /**
     * The minimum allowed layout size of an item.
     */
    export
    var MIN_ITEM_SIZE = new Size(0, 0);

    /**
     * The maximum allowed layout size of an item.
     */
    export
    var MAX_ITEM_SIZE = new Size(MAX_ITEM_DIM, MAX_ITEM_DIM);


    /**
     * An interface for items which can be procedurally layed out.
     */
    export
    interface ILayoutItem {

        /**
         * Returns the computed minimum size of the item.
         */
        minimumSize(): Size;

        /**
         * Returns the computed maximum size of the item.
         */
        maximumSize(): Size;

        /**
         * Returns the computed preferred size of the item.
         */
        sizeHint(): Size;

        /**
         * Returns the item's current layout rect.
         */
        rect(): Rect;

        /**
         * Set the item's layout rect.
         *
         * @param rect The desired layout rect of the item.
         */
        setRect(rect: Rect): void;
    }

}
