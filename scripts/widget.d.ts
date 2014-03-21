declare module porcelain {
    /** The base Widget class.
    *
    * A Widget is an absolutely positioned item. The geometry of a
    * widget must be manipulated programmatically using the widget
    * api. Do not use CSS to position a widget's div element.
    *
    * @class
    */
    class Widget extends Item {
        /**
        * Construct a new Widget.
        */
        constructor();
        public left : number;
        /**
        * The top edge of the widget.
        *
        * This is equivalent to `y`. Modifying this value will change
        * the height but will not change the bottom edge.
        */
        public top : number;
        /**
        * The right edge of the widget.
        *
        * This is equivalent to `left + width`. Modifying this value
        * will change the width but will not change the left edge.
        */
        public right : number;
        /**
        * The bottom edge of the widget.
        *
        * This is equivalent to `top + height`. Modifying this value
        * will change the height but will not change the bottom edge.
        */
        public bottom : number;
        /**
        * The X-coordinate of the widget.
        *
        * This is equivalent to `left`. Modifying this value will
        * move the widget but will not change its size.
        */
        public x : number;
        /**
        * The Y-coordinate of the widget.
        *
        * This is equivalent to `top`. Modifying this value will
        * move the widget but will not change its size.
        */
        public y : number;
        /**
        * The width of the widget.
        *
        * This is equivalent `right - left`. Modifying this value
        * will change the right edge.
        */
        public width : number;
        /**
        * The height of the widget.
        *
        * This is equivalent `bottom - top`. Modifying this value
        * will change the bottom edge.
        */
        public height : number;
        /**
        * The top left corner of the widget.
        *
        * Modifying this value will change the width and height.
        */
        public topLeft : IPoint;
        /**
        * The top right corner of the widget.
        *
        * Modifying this value will change the width and height.
        */
        public topRight : IPoint;
        /**
        * The bottom left corner of the widget.
        *
        * Modifying this value will change the width and height.
        */
        public bottomLeft : IPoint;
        /**
        * The bottom right corner of the widget.
        *
        * Modifying this value will change the width and height.
        */
        public bottomRight : IPoint;
        /**
        * The X and Y coordinates of the the widget origin.
        *
        * This is equivalent to `topLeft`. Modifying this value will
        * move the widget but will not change its size.
        */
        public pos : IPoint;
        /**
        * The width and height of the widget.
        *
        * Modifying this value will change the right and bottom edges.
        */
        public size : ISize;
        /**
        * The position and size of the widget.
        */
        public rect : IRect;
        /**
        * The minimum allowed size of the widget.
        *
        * Modifying this value will cause the widget to resize of its
        * current size is less than the new minimum.
        */
        public minimumSize : ISize;
        /**
        * The maximum allowed size of the widget.
        *
        * Modifying this value will cause the widget to resize of its
        * current size is greater than the new maximum.
        */
        public maximumSize : ISize;
        /**
        * Synchronize the div's geometry with the internal geometry.
        *
        * @private
        */
        private _syncGeometry();
        private _geometry;
        private _minSize;
        private _maxSize;
    }
}
