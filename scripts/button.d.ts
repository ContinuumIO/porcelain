declare module porcelain {
    /**
    * A basic push button class.
    *
    * This class serves as a base class for more concrete button types.
    *
    * @class
    */
    class Button extends Component {
        /**
        * A signal emitted when the button is clicked.
        *
        * @readonly
        */
        public clicked: Signal;
        /**
        * A signal emitted when the button is pressed.
        *
        * @readonly
        */
        public pressed: Signal;
        /**
        * A signal emitted when the button is released.
        *
        * @readonly
        */
        public released: Signal;
        /**
        * The mousedown event binder.
        *
        * @readonly
        */
        public evtMouseDown: EventBinder;
        /**
        * The mouseup event binder.
        *
        * @readonly
        */
        public evtMouseUp: EventBinder;
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
