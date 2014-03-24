declare module porcelain {
    /**
    * An item which enables drag-sizing of an element's geometry.
    *
    * @class
    */
    class SizeGrip extends Item {
        /**
        * Construct a new SizeGrip.
        */
        constructor(border: Border, target: Geometry, parent?: Item);
        /**
        * Destroy the size grip.
        */
        public destroy(): void;
        /**
        * The internal mousedown handler.
        *
        * @private
        */
        private _onMouseDown;
        /**
        * The internal mouseup handler.
        *
        * @private
        */
        private _onMouseUp;
        /**
        * The internal mousemove handler.
        *
        * @private
        */
        private _onMouseMove;
        private _border;
        private _target;
        private _offsetX;
        private _offsetY;
    }
}
