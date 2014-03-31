declare module porcelain {
    /**
    * A basic button class.
    *
    * A Button provides the basic behavior of a simple push button.
    * This class is intented to be subclassed to provide features
    * such as button text and default visual styling, but it is
    * useful on its own when decorated with custom CSS styling.
    *
    * @class
    */
    class Button extends Widget {
        /**
        * A signal emitted when the button is clicked.
        */
        public clicked: Signal;
        /**
        * A signal emitted when the button is pressed.
        */
        public pressed: Signal;
        /**
        * A signal emitted when the button is released.
        */
        public released: Signal;
        /**
        * Construct a new Button instance.
        */
        constructor();
        /**
        * The mousedown event handler.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        /**
        * The mouseup event handler.
        *
        * @protected
        */
        public onMouseUp(event: MouseEvent): void;
    }
}
