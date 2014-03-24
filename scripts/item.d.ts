declare module porcelain {
    /**
    * The most base class of visible porcelain objects.
    *
    * Instances are represented by a single <div>.
    *
    * @class
    */
    class Item {
        /**
        * Construct a new Item.
        */
        constructor(parent?: Item);
        /**
        * Destroy the item and its children.
        */
        public destroy(): void;
        /**
        * The item's internal div element.
        *
        * @readonly
        */
        public element : HTMLDivElement;
        /**
        * A JQuery wrapper around the internal div element.
        *
        * Creates a *new* wrapper each time it is accessed.
        *
        * @readonly
        */
        public $ : JQuery;
        /**
        * The parent Item of this item.
        *
        * @readonly
        */
        public parent : Item;
        /**
        * The child Items of this item.
        *
        * @readonly
        */
        public children : Item[];
        /**
        * Set the parent of the item.
        */
        public setParent(parent: Item): void;
        /**
        * Create a new Signal owned by the item.
        *
        * The signal will be destroyed automatically by the item.
        */
        public createSignal<T>(): Signal<T>;
        /**
        * An internal helper method for adding a child item.
        *
        * @private
        */
        private _addChild(child);
        /**
        * An internal helper method for removing a child item.
        */
        private _removeChild(child);
        /**
        * An internal helper method for destroying the children.
        */
        private _destroyChildren();
        /**
        * An internal helper method for destroying the signals.
        */
        private _destroySignals();
        private _element;
        private _parent;
        private _children;
        private _signals;
    }
}
