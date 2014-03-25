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
        constructor();
        /**
        * Destroy the item and its children.
        */
        public destroy(): void;
        /**
        * The item's div element.
        *
        * @readonly
        */
        public element : HTMLDivElement;
        /**
        * The parent Item of this item.
        *
        * @readonly
        */
        public parent : Item;
        /**
        * The array child items for this item.
        *
        * @readonly
        */
        public children : Item[];
        public append(...children: Item[]): void;
        public prepend(...children: Item[]): void;
        public insertBefore(before: Item, ...children: Item[]): void;
        public insertAfter(after: Item, ...children: Item[]): void;
        public remove(...children: Item[]): void;
        /**
        * Create a new Signal owned by the item.
        *
        * The signal will be destroyed automatically by the item.
        */
        public createSignal<T>(): Signal<T>;
        /**
        * A helper method for appending an item.
        *
        * @private
        */
        private _append(child);
        /**
        * A helper method for prepending an item.
        *
        * @private
        */
        private _prepend(child);
        /**
        * A helper method for inserting an item.
        *
        */
        private _insertBefore(before, child);
        /**
        * A helper method for inserting an item.
        *
        */
        private _insertAfter(after, child);
        /**
        * A helper method for removing a child item.
        *
        * @private
        */
        private _remove(child);
        /**
        * A helper method to detach the div element.
        *
        * @private
        */
        private _detach();
        /**
        * A helper method for destroying the item children.
        *
        * @private
        */
        private _destroyChildren();
        /**
        * A helper method for destroying the item signals.
        *
        * @private
        */
        private _destroySignals();
        /**
        * A helper method for de-parenting the object.
        *
        * @private
        */
        private _deparent();
        private _element;
        private _parent;
        private _children;
        private _signals;
    }
}
