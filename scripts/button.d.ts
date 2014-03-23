declare module porcelain {
    /**
    * A basic button class.
    *
    * A Button provides the basic behavior of a simple push button.
    * It is sufficient for standalone use as an image button when
    * the button backgroun image is provided by CSS.
    *
    * @class
    */
    class Button extends Item {
        /**
        * A signal emitted when the button is clicked.
        */
        public clicked: Signal<void>;
        /**
        * A signal emitted when the button is pressed.
        */
        public pressed: Signal<void>;
        /**
        * A signal emitted when the button is released.
        */
        public released: Signal<void>;
        /**
        * Construct a new Button instance.
        */
        constructor(parent?: Item);
        /**
        * The internal mouse enter handler.
        *
        * @private
        */
        private _onMouseEnter;
        /**
        * The internal mouse leave handler.
        *
        * @private
        */
        private _onMouseLeave;
        /**
        * The internal mouse down handler.
        *
        * @private
        */
        private _onMouseDown;
        /**
        * The internal mouse up handler.
        *
        * @private
        */
        private _onMouseUp;
    }
}
