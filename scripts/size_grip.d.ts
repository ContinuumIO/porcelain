declare module porcelain {
    /**
    * A widget which enables drag-sizing of an element's geometry.
    *
    * @class
    */
    class SizeGrip extends Widget {
        /**
        * Construct a new SizeGrip.
        */
        constructor(border: Border);
        /**
        * Destroy the size grip.
        */
        public destroy(): void;
        private _border;
        private _target;
        private _offsetX;
        private _offsetY;
    }
}
