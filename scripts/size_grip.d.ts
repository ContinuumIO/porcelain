declare module porcelain {
    /**
    * The areas which define the behavior of a size grip.
    */
    enum GripArea {
        Left = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
        TopLeft = 4,
        TopRight = 5,
        BottomLeft = 6,
        BottomRight = 7,
    }
    /**
    * A widget which enables mouse resizing of an adjustable item.
    *
    * @class
    */
    class SizeGrip extends Component {
        /**
        * The mousedown event binder.
        */
        public evtMouseDown: EventBinder;
        /**
        * The mouseup event binder.
        */
        public evtMouseUp: EventBinder;
        /**
        * The mousemove event binder.
        */
        public evtMouseMove: EventBinder;
        /**
        * Construct a new SizeGrip.
        *
        * @param gripArea The grip area defining the size grip behavior.
        * @param target The component to resize with the grip.
        */
        constructor(gripArea: GripArea, target: Component);
        /**
        * Destroy the edge grip.
        */
        public destroy(): void;
        /**
        * Returns the grip area defining the size grip behavior.
        */
        public gripArea(): GripArea;
        /**
        * Returns the target component resized by the size grip.
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
        private _gripArea;
        private _item;
        private _offsetX;
        private _offsetY;
    }
}
