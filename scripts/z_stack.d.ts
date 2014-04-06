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
        * @param minIndex The minimum Z-index of the stack.
        */
        constructor(minIndex: number);
        /**
        * Returns the component on the top of the stack.
        */
        public top(): Component;
        /**
        * Returns the component on the bottom of the stack.
        */
        public bottom(): Component;
        /**
        * Returns true if the stack contains the given component.
        *
        * @param component The component of interest.
        */
        public contains(component: Component): boolean;
        /**
        * Add a component to the top of the stack.
        *
        * If the stack already contains the component, this is a no-op.
        *
        * @param component The component to add to the stack.
        */
        public add(component: Component): void;
        /**
        * Remove a component from the stack and clear its Z-index.
        *
        * If the stack does not contain the component, this is a no-op.
        */
        public remove(component: Component): void;
        /**
        * Raise the specified components to the top of the stack.
        *
        * The relative stacking order of the components will be maintained.
        */
        public raise(...components: Component[]): void;
        /**
        * Lower the specified components to the bottom of the stack.
        *
        * The relative stacking order of the components will be maintained.
        */
        public lower(...components: Component[]): void;
        /**
        * Classify the given and current components into old and new.
        *
        * @private
        */
        private _classify(components);
        /**
        * Update the Z-indices for the current stack components.
        *
        * @private
        */
        private _updateIndices();
        private _minIndex;
        private _stack;
    }
    /**
    * A predefinined Z-stack for normal window components.
    */
    var normalWindowStack: ZStack;
    /**
    * A predefined Z-stack for top-most window components.
    */
    var topMostWindowStack: ZStack;
    /**
    * A predefined Z-stack for popup window components.
    */
    var popupWindowStack: ZStack;
}
