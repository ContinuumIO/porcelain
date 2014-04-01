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
        setGeometry(rect: Rect): any;
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
    * A class which implements ILayoutItem for a Component.
    *
    * When a ComponentItem is instantiated an a Component, the
    * component element is forced into 'absolute' positioning.
    *
    * @class
    */
    class ComponentItem implements ILayoutItem {
        /**
        * Construct a new ComponentItem.
        *
        * @param component The component to manipulate.
        */
        constructor(component: Component);
        /**
        * Destroy the ComponentItem.
        */
        public destroy(): void;
        /**
        * The component being manipulated by this item.
        *
        * @readonly
        */
        public component : Component;
        /**
        * Returns the top-left corner of the component.
        */
        public pos(): Point;
        /**
        * Set the top-left corner of the component.
        */
        public move(point: Point): void;
        /**
        * Returns the size of the component.
        */
        public size(): Size;
        /**
        * Set the size of the component.
        */
        public resize(size: Size): void;
        /**
        * Returns the current geometry of the component.
        */
        public geometry(): Rect;
        /**
        * Set the geometry of the component.
        */
        public setGeometry(rect: Rect): void;
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
        public setMinimumSize(size: Size): void;
        /**
        * Returns the maximum allowed size of the item.
        */
        public maximumSize(): Size;
        /**
        * Set the maximum allowed size of the item.
        */
        public setMaximumSize(size: Size): void;
        /**
        * Returns the preferred size of the item.
        */
        public sizeHint(): Size;
        /**
        * Initialize the component style geometry.
        *
        * @private
        */
        private _initGeometry();
        /**
        * Synchronize the style geometry with the given rect.
        *
        * @private
        */
        private _syncGeometry(rect);
        private _component;
        private _geometry;
        private _minimumSize;
        private _maximumSize;
    }
}
