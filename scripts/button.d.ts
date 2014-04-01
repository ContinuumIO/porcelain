declare module porcelain {
    /**
    * A basic button class.
    *
    * A Button provides the basic behavior of a simple push button.
    *
    * @class
    */
    class Button extends Component {
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
        * The mousedown event binder.
        */
        public mousedown: EventBinder;
        /**
        * The mouseup event binder.
        */
        public mouseup: EventBinder;
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
