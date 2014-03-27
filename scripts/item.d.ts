declare module porcelain {
    /**
    * The most base class of visible porcelain objects.
    *
    * Instances are represented by a single <div> element.
    *
    * @class
    */
    class Item {
        /**
        * Construct a new Item.
        */
        constructor();
        /**
        * Destroy the item and its children, and cleanup the DOM.
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
        * The array child Items for this item.
        *
        * @readonly
        */
        public children : Item[];
        /**
        * Unparent the Item and detach its element from the DOM.
        *
        */
        public detach(): void;
        /**
        * Append children to the end of this item.
        *
        * If an item is already a child, it will be moved to the
        * end of the child array. The children *must* be unique.
        *
        * @param [...] The child Items to append to the item.
        */
        public append(...children: Item[]): void;
        /**
        * Prepend children to the beginning of this item.
        *
        * If an item is already a child, it will be moved to the
        * beginning of the child array. The children *must* be unique.
        *
        * @param [...] The child Items to prepend to the item.
        */
        public prepend(...children: Item[]): void;
        /**
        * Insert children before the given child.
        *
        * If an item is already a child, it will be moved to the new
        * location in the child array. The before child *must* be a
        * current child. The children *must* be unique.
        *
        * @param before The child item marking the insert location.
        * @param [...] The child Items to insert into the item.
        */
        public insertBefore(before: Item, ...children: Item[]): void;
        /**
        * Add a name or names to the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to add to the element.
        */
        public addClass(className: string): void;
        /**
        * Remove a name or names from the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to remove from the element.
        */
        public removeClass(className: string): void;
        /**
        * A helper method to detach the div element.
        *
        * @private
        */
        private _detachElement();
        /**
        * A helper method for destroying the item children.
        *
        * @private
        */
        private _destroyChildren();
        /**
        * A helper method for de-parenting the object.
        *
        * @private
        */
        private _deparent();
        /**
        * A helper method for preparing children to be inserted.
        *
        * @private
        */
        private _prepareChildren(children);
        private _element;
        private _parent;
        private _children;
    }
}
