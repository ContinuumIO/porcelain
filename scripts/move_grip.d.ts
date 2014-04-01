declare module porcelain {
    /**
    * A widget which serves as move grip for an adjustable item.
    *
    * This can serve as a base class for more complex widgets
    * like a window title bar.
    *
    * @class
    */
    class MoveGrip extends Component {
        /**
        * The mousedown event binder.
        */
        public mousedown: EventBinder;
        /**
        * The mouseup event binder.
        */
        public mouseup: EventBinder;
        /**
        * The mousemove event binder.
        */
        public mousemove: EventBinder;
        /**
        * Construct a new MoveGrip.
        *
        * @param target The adjustable object moved by the grip.
        */
        constructor(target: ILayoutItem);
        /**
        * Destroy the title bar.
        */
        public destroy(): void;
        /**
        * The mousedown handler.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        /**
        * The mouseup handler.
        *
        * @protected
        */
        public onMouseUp(event: MouseEvent): void;
        /**
        * The mousemove handler.
        *
        * @protected
        */
        public onMouseMove(event: MouseEvent): void;
        private _target;
        private _offsetX;
        private _offsetY;
    }
}
