/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * An interface for objects which enable procedural layout.
     */
    export interface ILayoutActor {

        /**
         * The minimum allowed size of the object.
         */
        minimumSize(): Size;

        /**
         * The maximum allowed size of the object.
         */
        maximumSize(): Size;

        /** 
         * The preferred size of the object.
         */
        sizeHint(): Size;

        /**
         * The rect describing the object geometry.
         */
        geometry(): Rect;

        /**
         * Set the objects geometry.
         */
        setGeometry(rect: Rect);
    }

}
