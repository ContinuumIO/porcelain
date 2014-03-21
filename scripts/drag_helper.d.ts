declare module porcelain {
    /**
    * The interface for a drag helper event.
    */
    interface DragHelperEvent<T> {
        pageX: number;
        pageY: number;
        context: T;
    }
    /**
    * The interface for a drag helper handler.
    */
    interface DragHelperHandler<T> {
        (event: DragHelperEvent<T>): void;
    }
    /**
    * The DragHelper class.
    *
    * A DragHelper can be used to help implement moving/dragging of an
    * html element. The helper takes care of boiler plate required for
    * handling the necessary DOM events for proper mouse capture.
    *
    * @class
    */
    class DragHelper<T> {
        /**
        * An optional handler to react to a left mouse press.
        */
        public pressed: DragHelperHandler<T>;
        /**
        * An optional handler to react to a left mouse release.
        */
        public released: DragHelperHandler<T>;
        /**
        * An optional handler to react to a mouse move. This will
        * be invoked only while the left mouse button is pressed.
        */
        public moved: DragHelperHandler<T>;
        /**
        * Construct a new DragHelper.
        *
        * @param element - the html element to use as the drag target
        * @param context - additional context to add the event objects
        */
        constructor(element: Element, context: T);
        /**
        * Destroy the drag helper.
        *
        * This will release the internal references to the element,
        * context, and handlers.
        */
        public destroy(): void;
        /**
        * Get the drag target element.
        *
        * @readonly
        */
        public element : Element;
        /**
        * Get the user-provided drag context.
        * @readonly
        */
        public context : T;
        /** The handler for the element mousedown event.
        *
        * @private
        */
        private _onMouseDown;
        /** The handler for the element mouseup event.
        *
        * @private
        */
        private _onMouseUp;
        /** The handler for the element mousemove event.
        *
        * @private
        */
        private _onMouseMove;
        private _element;
        private _context;
    }
}
