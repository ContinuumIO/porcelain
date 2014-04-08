declare module porcelain {
    /**
    * A component which serves as a move grip for a component.
    *
    * @class
    */
    class MoveGrip extends Component {
        /**
        * The CSS class added to MoveGrip instances.
        */
        static Class: string;
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
        * The mousemove event binder.
        *
        * @readonly
        */
        public evtMouseMove: EventBinder;
        /**
        * Construct a new MoveGrip.
        *
        * @param target The component to move with the grip.
        */
        constructor(target: Component);
        /**
        * Destroy the title bar.
        */
        public destroy(): void;
        /**
        * The target component moved by the grip.
        */
        public target(): Component;
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
