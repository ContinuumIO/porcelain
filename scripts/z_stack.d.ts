declare module porcelain {
    /**
    * A class for managing the Z-order of a collection of Items.
    *
    * @class
    */
    class ZStack {
        /**
        * Construct a new ZStack.
        *
        * @param minZ The Z-index to use for the bottom of the stack.
        */
        constructor(minZ: number);
        /**
        * The item on the top of the stack.
        *
        * @readonly
        */
        public top : Component;
        /**
        * The item on the bottom of the stack.
        *
        * @readonly
        */
        public bottom : Component;
        /**
        * Returns true if the stack contains the item.
        *
        * @param item The item of interest.
        */
        public contains(item: Component): boolean;
        /**
        * Add an item to the top of the stack.
        *
        * If the stack already contains the item, this is a no-op.
        *
        * @param item The item to add to the stack.
        */
        public add(item: Component): void;
        /**
        * Remove an item from the stack and clear its Z-index.
        *
        * If the stack does not contain the item, this is a no-op.
        */
        public remove(item: Component): void;
        /**
        * Raise the specified items to the top of the stack.
        *
        * The relative stacking order of the items will be maintained.
        */
        public raise(...items: Component[]): void;
        /**
        * Lower the specified items to the bottom of the stack.
        *
        * The relative stacking order of the items will be maintained.
        */
        public lower(...items: Component[]): void;
        /**
        * Classify the given items and current items into old and new.
        *
        * @private
        */
        private _classify(items);
        /**
        * Update the Z-indices for the current stack items.
        *
        * @private
        */
        private _updateIndices();
        private _stack;
        private _minZ;
    }
    /**
    * A predefinined Z-stack for normal window items.
    */
    var globalNormalWindowStack: ZStack;
    /**
    * A predefined Z-stack for top-most Window items.
    */
    var globalTopMostWindowStack: ZStack;
    /**
    * A predefined Z-stack for popup window items.
    */
    var globalPopupWindowStack: ZStack;
}
