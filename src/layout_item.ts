/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The maximimum allowed layout width or height of an object.
     */
    export
    var MAX_LAYOUT_DIM = 1073741823;  // (1 << 30) - 1;

    /**
     * The minimum allowed layout size of an object.
     */
    export
    var MIN_LAYOUT_SIZE = new Size(0, 0);

    /**
     * The maximum allowed layout size of an object.
     */
    export
    var MAX_LAYOUT_SIZE = new Size(MAX_LAYOUT_DIM, MAX_LAYOUT_DIM);


    /**
     * An interface for objects which can be procedurally layed out.
     */
    export
    interface ILayoutItem {

        /**
         * Returns the computed minimum size of the object.
         */
        minimumSize(): Size;

        /**
         * Returns the computed maximum size of the object.
         */
        maximumSize(): Size;

        /**
         * Returns the computed preferred size of the object.
         */
        sizeHint(): Size;

        /**
         * Returns the object's current layout rect.
         */
        rect(): Rect;

        /**
         * Set the object's layout rect.
         *
         * @param rect The desired layout rect of the object.
         */
        setRect(rect: Rect): void;
    }

}
