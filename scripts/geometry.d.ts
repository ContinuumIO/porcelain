declare module porcelain {
    /**
    * The layout geometry class.
    *
    * A Geometry instance is used to procedurally control the geometry
    * of an absolutely positioned element. It should not typically be
    * used in combination with CSS layout.
    *
    * @class
    */
    class Geometry implements IBox, IRect {
        /**
        * Construct a new Geometry instance.
        */
        constructor(element: HTMLElement);
        /**
        * Destroy the geometry and release the element reference.
        */
        public destroy(): void;
        /**
        * The left edge of the element.
        *
        * This is equivalent to `x`. Modifying this value will change
        * the width but will not change the right edge.
        */
        public left : number;
        /**
        * The top edge of the element.
        *
        * This is equivalent to `y`. Modifying this value will change
        * the height but will not change the bottom edge.
        */
        public top : number;
        /**
        * The right edge of the element.
        *
        * This is equivalent to `left + width`. Modifying this value
        * will change the width but will not change the left edge.
        */
        public right : number;
        /**
        * The bottom edge of the element.
        *
        * This is equivalent to `top + height`. Modifying this value
        * will change the height but will not change the bottom edge.
        */
        public bottom : number;
        /**
        * The X-coordinate of the element.
        *
        * This is equivalent to `left`. Modifying this value will
        * move the element but will not change its size.
        */
        public x : number;
        /**
        * The Y-coordinate of the element.
        *
        * This is equivalent to `top`. Modifying this value will
        * move the element but will not change its size.
        */
        public y : number;
        /**
        * The width of the element.
        *
        * This is equivalent `right - left`. Modifying this value
        * will change the right edge.
        */
        public width : number;
        /**
        * The height of the element.
        *
        * This is equivalent `bottom - top`. Modifying this value
        * will change the bottom edge.
        */
        public height : number;
        /**
        * The top left corner of the element.
        *
        * Modifying this value will change the width and height.
        */
        public topLeft : IPoint;
        /**
        * The top right corner of the element.
        *
        * Modifying this value will change the width and height.
        */
        public topRight : IPoint;
        /**
        * The bottom left corner of the element.
        *
        * Modifying this value will change the width and height.
        */
        public bottomLeft : IPoint;
        /**
        * The bottom right corner of the element.
        *
        * Modifying this value will change the width and height.
        */
        public bottomRight : IPoint;
        /**
        * The X and Y coordinates of the the element origin.
        *
        * This is equivalent to `topLeft`. Modifying this value will
        * move the element but will not change its size.
        */
        public pos : IPoint;
        /**
        * The width and height of the element.
        *
        * Modifying this value will change the right and bottom edges.
        */
        public size : ISize;
        /**
        * The position and size of the element.
        */
        public rect : IRect;
        /**
        * The minimum allowed size of the element.
        *
        * Modifying this value will cause the element to resize if its
        * current size is less than the new minimum.
        */
        public minimumSize : ISize;
        /**
        * The maximum allowed size of the element.
        *
        * Modifying this value will cause the element to resize if its
        * current size is greater than the new maximum.
        */
        public maximumSize : ISize;
        /**
        * Synchronize the element geometry with the internal rect.
        *
        * @private
        */
        private _syncGeometry();
        private _element;
        private _rect;
        private _minSize;
        private _maxSize;
    }
}
