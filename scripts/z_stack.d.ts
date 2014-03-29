declare module porcelain {
    /**
    * The interface for defining a ZStackItem.
    */
    interface IZStackItem {
        zIndex: number;
    }
    /**
    * A class for managing the z-order of a collection of items.
    */
    class ZStack {
        /**
        * Construct a new ZStack.
        *
        * @param minZ The z-index to use for the bottom of the stack.
        */
        constructor(minZ: number);
        /**
        * The item on the top of the z-stack.
        *
        * @readonly
        */
        public top : IZStackItem;
        /**
        * The item on the bottom of the z-stack.
        *
        * @readonly
        */
        public bottom : IZStackItem;
        /**
        * Returns true if the stack contains the item.
        *
        * @param item The item of interest.
        */
        public contains(item: IZStackItem): boolean;
        /**
        * Add an item to the top of the z-stack.
        *
        * If the stack already contains the item, this is a no-op.
        *
        * @param item The item to add to the stack.
        */
        public add(item: IZStackItem): void;
        /**
        * Remove an item from the z-stack and reset its z-index.
        *
        * If the stack does not contain the item, this is a no-op.
        */
        public remove(item: IZStackItem): void;
        /**
        * Raise the specified items to the top of the stack.
        *
        * The relative stack order of the items will be maintained.
        */
        public raise(...items: IZStackItem[]): void;
        /**
        * Lower the specified items to the bottom of the stack.
        *
        * The relative stack order of the items will be maintained.
        */
        public lower(...items: IZStackItem[]): void;
        /**
        * Classify the given items and current items into old and new.
        *
        * @private
        */
        private _classify(items);
        /**
        * Update the z indices for the current stack items.
        *
        * @private
        */
        private _updateIndices();
        private _stack;
        private _minZ;
    }
}
