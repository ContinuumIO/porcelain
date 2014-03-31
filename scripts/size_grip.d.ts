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
    * A widget which enables mouse resizing of a layout actor.
    *
    * @class
    */
    class SizeGrip extends Widget {
        /**
        * Construct a new SizeGrip.
        *
        * @param gripArea The grip area defining the size grip behavior.
        * @param target The adjustable object to be resized by the grip.
        */
        constructor(gripArea: GripArea, target: IAdjustable);
        /**
        * Destroy the edge grip.
        */
        public destroy(): void;
        /**
        * The grip area defining the size grip behavior.
        *
        * @readonly
        */
        public gripArea : GripArea;
        /**
        * The target object of the size grip.
        *
        * @readonly
        */
        public target : IAdjustable;
        /**
        * The internal mousedown handler.
        *
        * @private
        */
        private _onMouseDown(event);
        /**
        * The internal mouseup handler.
        *
        * @private
        */
        private _onMouseUp(event);
        /**
        * The internal mousemove handler.
        *
        * @private
        */
        private _onMouseMove(event);
        private _gripArea;
        private _target;
        private _offsetX;
        private _offsetY;
    }
}
