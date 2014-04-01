declare module porcelain {
    /**
    * The most base class of visible porcelain objects.
    *
    * The Item class supports basic functionality for creating the
    * underlying DOM node, events, signals, and setting the node
    * classes and id. It also implements the parent-children tree.
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
        * The item's internal DOM element.
        *
        * @readonly
        */
        public element : HTMLElement;
        /**
        * The id of the underlying DOM element.
        */
        public id : string;
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
        * Bind a listener to the specified event.
        *
        * The listener will be removed when the item is destroyed.
        *
        * @param type The string type of the event to bind.
        * @param listener The event listener to bind to the target.
        * @param [target] The event target. The default is the item element.
        * @param [context] The listener context. The default is the item.
        */
        public bind(type: string, listener: EventListener, target?: EventTarget, context?: any): void;
        /**
        * Unbind a listener from the specified event.
        *
        * @param type The string type of the event.
        * @param listener The event listener which was bound.
        * @param [target] The event target. The default is the item element.
        * @param [context] The listener context. The default is the item.
        */
        public unbind(type: string, listener: EventListener, target?: EventTarget, context?: any): void;
        /**
        * Create a new Signal with a lifetime bound to the item.
        */
        public createSignal(): Signal;
        /**
        * Create the underlying element for the item.
        *
        * The default implementation of this method creates a div.
        *
        * @protected.
        */
        public createElement(): HTMLElement;
        /**
        * A helper method for preparing children to be inserted.
        *
        * @private
        */
        private _prepareChildren(children);
        /**
        * A helper method to detach the DOM element.
        *
        * @private
        */
        private _detachElement();
        /**
        * A helper method for destroying the event binders.
        *
        * @private
        */
        private _destroyBinders();
        /**
        * A helper method for destroying the item signals.
        *
        * @private
        */
        private _destroySignals();
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
        private _element;
        private _parent;
        private _children;
        private _binders;
        private _signals;
    }
}
