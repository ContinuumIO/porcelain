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
        * The parent Item of this item.
        */
        public parent : Item;
        /**
        * Create a new Signal owned by the item.
        *
        * The signal will be destroyed automatically by the item.
        */
        public createSignal<T>(): Signal<T>;
        /**
        * Invoked when a child is removed from the item.
        */
        public childRemoved(child: Item): void;
        /**
        * Invoked when a child is added to the item.
        */
        public childAdded(child: Item): void;
        /**
        * An internal helper method for adding a child item.
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
