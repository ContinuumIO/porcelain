declare module porcelain {
    /**
    * A resize grip for use with a top-level window.
    *
    * A ResizeGrip updates the geometry of a window in response to a
    * left mouse button drag.
    *
    * @class
    */
    class ResizeGrip extends Item {
        /**
        * Construct a new ResizeGrip.
        *
        * @param border - the border position of the grip
        * @param windowGeometry - the geometry handler for the window
        */
        constructor(border: Border, windowGeometry: Geometry);
        /**
        * Destroy the ResizeGrip.
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
        private _offsetX;
        private _offsetY;
        private _windowGeometry;
        private _border;
    }
}
