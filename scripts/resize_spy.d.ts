declare module porcelain {
    /**
    * A class for listening for resizes on a component.
    *
    * An instance of this class can be added as the child of any
    * component. It's `resized` signal will be emitted whenever
    * the parent element is resized.
    *
    * @class
    */
    class ResizeSpy extends Component {
        /**
        * The CSS class added to ResizeSpy instances.
        */
        static Class: string;
        /**
        * The CSS class added to the expandable div.
        */
        static ExpandableClass: string;
        /**
        * The CSS class added to the collapsible div.
        */
        static CollapsibleClass: string;
        /**
        * The CSS class added to the expandable inner div.
        */
        static ExpandableInnerClass: string;
        /**
        * The CSS class added to the collapsible inner div.
        */
        static CollapsibleInnerClass: string;
        /**
        * A signal emmited when the parent div is resized.
        */
        public resized: Signal;
        /**
        * Construct a new ResizeSpy.
        */
        constructor();
        /**
        * Destroy the ResizeSpy.
        */
        public destroy(): void;
        /**
        * Perform initialization which requires a live DOM tree.
        */
        public afterAttach(): void;
        /**
        * The internal scroll event handler.
        *
        * If the size of the element has not changed, this is a no-op.
        * Otherwise, the scroll positions are reset and the resized
        * signal is emitted.
        *
        * @private
        */
        private _onScroll();
        /**
        * A helper method to reset the internal scroll items.
        *
        * This method resets the scroll positions of the internal
        * div elements so that the next resize triggers a scroll.
        *
        * @private
        */
        private _resetScrollPositions();
        private _lastSize;
        private _elements;
        private _evtExpandScroll;
        private _evtCollapseScroll;
    }
}
