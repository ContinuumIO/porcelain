/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The maximimum allowed width or height of an item.
     */
    export var MAX_ITEM_DIM = 1073741823;  // (1 << 30) - 1; 

    /** 
     * The minimum allowed size of an item.
     */
    export var MIN_ITEM_SIZE = new Size(0, 0);

    /**
     * The maximum allowed size of an item.
     */
    export var MAX_ITEM_SIZE = new Size(MAX_ITEM_DIM, MAX_ITEM_DIM);


    /**
     * An interface for objects which can be procedurally layed out.
     */
    export interface ILayoutItem {

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
         * Returns the object's offset rect.
         */
        rect(): Rect;

        /**
         * Sets the object's offset rect.
         */
        setRect(rect: Rect);
    }


    /**
     * A class which implements ILayoutItem for a Component.
     *
     * @class
     */
    export class ComponentItem implements ILayoutItem {

        /**
         * Construct a new ComponentItem.
         *
         * @param component The component to manipulate.
         */
        constructor(public component: Component) { }

        /**
         * Compute the minimum size of the component.
         */
        minimumSize(): Size {
            var component = this.component;
            var size = component.minimumSize();
            if (size.isValid()) {
                size = size.boundedTo(MAX_ITEM_SIZE);
                size = size.expandedTo(MIN_ITEM_SIZE);
                return size;
            }
            return new Size(MIN_ITEM_SIZE);
        }

        /**
         * Compute the maximum size of the component.
         */
        maximumSize(): Size {
            var component = this.component;
            var size = component.maximumSize();
            if (size.isValid()) {
                size = size.boundedTo(MAX_ITEM_SIZE);
                size = size.expandedTo(MIN_ITEM_SIZE);
                return size;
            }
            return new Size(MAX_ITEM_SIZE);
        }

        /**
         * Compute the preferred size of the component.
         */
        sizeHint(): Size {
            var size = this.component.sizeHint();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            return size;
        }

        /**
         * Returns the offset rect of the component.
         */
        rect(): Rect {
            return this.component.rect();
        }

        /**
         * Sets the offset rect of the component.
         */
        setRect(rect: Rect) {
            this.component.setRect(rect);
        }
    }

}
