declare module porcelain {
    /**
    * A top-level Window component.
    *
    * A Window looks and behaves much like its desktop counterpart.
    * It should never be added as the child of another component.
    */
    class Window extends Component {
        /**
        * The CSS class added to Window instances.
        */
        static Class: string;
        /**
        * The CSS class added to the Window body.
        */
        static BodyClass: string;
        /**
        * The CSS class added to a Window size grip.
        */
        static SizeGripClass: string;
        /**
        * The CSS class added to a Window title bar.
        */
        static TitleBarClass: string;
        /**
        * The CSS class added to the Window content.
        */
        static ContentClass: string;
        /**
        * The mousedown event handler.
        */
        public evtMouseDown: EventBinder;
        /**
        * Construct a new Window.
        */
        constructor();
        /**
        * Destroy the Window component.
        */
        public destroy(): void;
        /**
        * Returns the title text in the Window title bar.
        */
        public title(): string;
        /**
        * Set the title text in the Window title bar.
        */
        public setTitle(value: string): void;
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
        * The resize event handler.
        *
        * This handler will dispatch to the window body.
        *
        * @protected
        */
        public onResize(): void;
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
        private _stored;
        private _subItems;
        private _windowState;
    }
}
