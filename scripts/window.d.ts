declare module porcelain {
    /**
    * A top-level Window component.
    *
    * A Window looks and behaves much like its desktop counterpart.
    * It should never be added as the child of another component.
    */
    class Window extends Component {
        /**
        * The mousedown event handler.
        */
        public mousedown: EventBinder;
        /**
        * Construct a new Window.
        */
        constructor();
        /**
        * Destroy the Window component.
        */
        public destroy(): void;
        /**
        * The title text in the Window title bar.
        */
        public title : string;
        /**
        * Attach the Window to the given DOM element.
        *
        * If not provided, it will be attached to the document body.
        */
        public attach(elem?: HTMLElement): void;
        /**
        * Raise the window to the top of the Z order.
        */
        public raise(): void;
        /**
        * Lower the window to the bottom of the Z order.
        */
        public lower(): void;
        /**
        * Maximize the window to fit the browser page.
        */
        public maximize(): void;
        /**
        * Restore the window to its normal size.
        */
        public restore(): void;
        /**
        * Minimize the window to the task bar.
        */
        public minimize(): void;
        /**
        * Close the window.
        *
        * This will hide the window and then destroy it.
        */
        public close(): void;
        /**
        * A reimplemented parent class method.
        *
        * Returns the computed minimum size of the window.
        *
        * @protected
        */
        public minimumSizeHint(): Size;
        /**
        * The mousedown event handler.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        /**
        * An internal helper method for setting the window state.
        */
        private _setWindowState(state);
        private _subItems;
        private _windowState;
    }
}
