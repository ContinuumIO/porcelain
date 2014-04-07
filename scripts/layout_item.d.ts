﻿declare module porcelain {
    /**
    * The maximimum allowed width or height of an item.
    */
    var MAX_ITEM_DIM: number;
    /**
    * The minimum allowed size of an item.
    */
    var MIN_ITEM_SIZE: Size;
    /**
    * The maximum allowed size of an item.
    */
    var MAX_ITEM_SIZE: Size;
    /**
    * An interface for objects which can be procedurally layed out.
    */
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
        * Returns the object's offset rect.
        */
        rect(): Rect;
        /**
        * Sets the object's offset rect.
        */
        setRect(rect: Rect): any;
    }
    /**
    * A class which implements ILayoutItem for a Component.
    *
    * @class
    */
    class ComponentItem implements ILayoutItem {
        public component: Component;
        /**
        * Construct a new ComponentItem.
        *
        * @param component The component to manipulate.
        */
        constructor(component: Component);
        /**
        * Compute the minimum size of the component.
        */
        public minimumSize(): Size;
        /**
        * Compute the maximum size of the component.
        */
        public maximumSize(): Size;
        /**
        * Compute the preferred size of the component.
        */
        public sizeHint(): Size;
        /**
        * Returns the offset rect of the component.
        */
        public rect(): Rect;
        /**
        * Sets the offset rect of the component.
        */
        public setRect(rect: Rect): void;
    }
}