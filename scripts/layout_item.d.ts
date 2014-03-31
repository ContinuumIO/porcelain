declare module porcelain {
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
        * Returns the object's geometry rect.
        */
        geometry(): Rect;
        /**
        * Set the object's geometry to the given rect.
        */
        setGeometry(rect: IRect): any;
        /**
        * Returns the minimum allowed size of the object.
        */
        minimumSize(): Size;
        /**
        * Returns the maximum allowed size of the object.
        */
        maximumSize(): Size;
        /**
        * Returns the preferred size of the object.
        */
        sizeHint(): Size;
    }
    /**
    * An interface describing a layout adjustable object.
    */
    interface IAdjustable {
        /**
        * The layout item to use for adjusting the object.
        *
        * @readonly
        */
        layoutItem: ILayoutItem;
    }
    /**
    * An interface describing the target of a layout item.
    */
    interface ILayoutTarget {
        /**
        * The HTML element positioned by the item.
        *
        * @readonly
        */
        element: HTMLElement;
        /**
        * The preferred size of the element.
        *
        * An invalid size will be ignored. Expensive hints
        * should be cached by the target.
        */
        sizeHint(): Size;
        /**
        * The suggested minimum size of the element.
        *
        * An invalid size will be ignored. Expensive hints
        * should be cached by the target.
        */
        minimumSizeHint(): Size;
        /**
        * The suggested maximum size of the element.
        *
        * An invalid size will be ignored. Expensive hints
        * should be cached by the target.
        */
        maximumSizeHint(): Size;
    }
    /**
    * A class which manipulates the geometry of a layout target.
    *
    * The target element's style will be forced to absolute positioning.
    *
    * @class
    */
    class LayoutItem implements ILayoutItem {
        /**
        * Construct a new LayoutItem.
        *
        * @param target The target layout object to manipulate.
        */
        constructor(target: ILayoutTarget);
        /**
        * The layout target of this layout item.
        *
        * @readonly
        */
        public target : ILayoutTarget;
        /**
        * Returns the position of the top-left corner of the item.
        */
        public pos(): Point;
        /**
        * Move the top-left corner of the item to the given position.
        */
        public move(point: IPoint): void;
        /**
        * Returns the current size of the item.
        */
        public size(): Size;
        /**
        * Resize the item to the given size.
        */
        public resize(size: ISize): void;
        /**
        * Returns the current geometry of the item.
        */
        public geometry(): Rect;
        /**
        * Set the geometry of the item.
        */
        public setGeometry(rect: IRect): void;
        /**
        * Returns the minimum allowed size of the item.
        */
        public minimumSize(): Size;
        /**
        * Set the minimum allowed size of the item.
        *
        * This will override the target's minimumSizeHint. It can be
        * set to an ivalid size to reset the value to minimum hint.
        */
        public setMinimumSize(size: ISize): void;
        /**
        * Returns the maximum allowed size of the item.
        */
        public maximumSize(): Size;
        /**
        * Set the maximum allowed size of the item.
        */
        public setMaximumSize(size: ISize): void;
        /**
        * Returns the preferred size of the item.
        */
        public sizeHint(): Size;
        private _target;
        private _geometry;
        private _minimumSize;
        private _maximumSize;
    }
}
