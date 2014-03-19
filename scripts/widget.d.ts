declare module porcelain {
    class Widget extends Item {
        /**
        * Construct a new Widget.
        * @class
        * @classdesc A Widget is an absolutely positioned item. The
        * geometry of a widget must be manipulated programmatically
        * using the widget api. Do not use CSS to position a widget's
        * internal div element.
        */
        constructor();
        /**
        * Move the left edge of the widget to the given location. The
        * value is in units of pixels relative to the origin of the
        * parent. This may change the width, but will not change the
        * right edge.
        * @type {number}
        */
        public left : number;
        /**
        * Get the top edge of the widget. The value is in units of
        * pixels relative to the origin of the parent. This is
        * equivalent to `y`.
        * @type {number}
        */
        /**
        * Move the top edge of the widget to the given location. The
        * value is in units of pixels relative to the origin of the
        * parent. This may change the height, but will not change the
        * bottom edge.
        * @type {number}
        */
        public top : number;
        /**
        * Get the right edge of the widget. The value is in units of
        * pixels relative to the origin of the parent. This is
        * equivalent to `left` + `width`.
        * @type {number}
        */
        /**
        * Move the right edge of the widget to the given location. The
        * value is in units of pixels relative to the origin of the
        * parent. This may change the width, but will not change the
        * left edge.
        * @type {number}
        */
        public right : number;
        /**
        * Get the bottom edge of the widget. The value is in units of
        * pixels relative to the origin of the parent. This is
        * equivalent to `top` + `height`.
        * @type {number}
        */
        public bottom : number;
        /**
        * Get the x-coordinate of the widget origin. The value is in
        * units of pixels relative to the origin of the parent. This
        * is equivalent to `left`.
        */
        /**
        * Move the x-coordinate of the widget origin to the given
        * position. This may change the left and right edge, but
        * will not change the width.
        * @type {number}
        */
        public x : number;
        /**
        * Get the y-coordinate of the widget origin. The value is in
        * units of pixels relative to the origin of the parent. This
        * is equivalent to `top`.
        */
        /**
        * Move the y-coordinate of the widget origin to the given
        * position. This may change the top and bottom edge, but
        * will not change the height.
        * @type {number}
        */
        public y : number;
        /**
        * Get the width of the widget in pixels. This is equivalent
        * `right` - `left`.
        * @type {number}
        */
        /**
        * Set the width of the widget in pixels. This may change
        * the right edge, but will not change the left edge.
        * @type {number}
        */
        public width : number;
        /**
        * Get the height of the widget in pixels. This is equivalent
        * `bottom` - `top`.
        * @type {number}
        */
        /**
        * Set the height of the widget in pixels. This may change
        * the bottom edge, but will not change the top edge.
        * @type {number}
        */
        public height : number;
        /**
        * Get the top-left corner position of the widget.
        * @type {IPoint}
        */
        /**
        * Set the top-left corner position of the widget. This is
        * more efficient than setting `top` and `left` separately.
        * @type {IPoint}
        */
        public topLeft : IPoint;
        /**
        * Get the top-right corner position of the widget.
        * @type {IPoint}
        */
        /**
        * Set the top-righ corner position of the widget. This is
        * more efficient than setting `top` and `right` separately.
        * @type {IPoint}
        */
        public topRight : IPoint;
        /**
        * Get the bottom-left corner position of the widget.
        * @type {IPoint}
        */
        /**
        * Set the bottom-left corner position of the widget. This is
        * more efficient than setting `bottom` and `left` separately.
        * @type {IPoint}
        */
        public bottomLeft : IPoint;
        /**
        * Get the bottom-right corner position of the widget.
        * @type {IPoint}
        */
        /**
        * Set the bottom-right corner position of the widget. This is
        * more efficient than setting `bottom` and `right` separately.
        * @type {IPoint}
        */
        public bottomRight : IPoint;
        /**
        * Get the x-y origin of the widget. This is equivalent to
        * `topLeft`.
        * @type {IPoint}
        */
        /**
        * Set the x-y origin of the widget. This is more efficient
        * than setting 'x' and 'y' independently.
        * @type {IPoint}
        */
        public pos : IPoint;
        /**
        * Get the size of the widget.
        * @type {ISize}
        */
        /**
        * Set the size of the widget. This is more efficient than
        * setting 'width' and 'height' independently.
        * @type {ISize}
        */
        public size : ISize;
        /**
        * Get the geometry rect for the widget.
        * @type {IRect}
        */
        /**
        * Set the geometry rect for the widget. This is more efficient
        * than setting `x`, `y`, `width`, and `height` independently.
        * @type {IRect}
        */
        public rect : IRect;
        /**
        * Get the minimum size of the widget.
        * @type {ISize}
        */
        /**
        * Set the minimum size of the widget. This may cause the
        * widget to resize if current size is smaller than the
        * specified minimum size.
        * @type {ISize}
        */
        public minimumSize : ISize;
        /**
        * Get the maximum size of the widget.
        * @type {ISize}
        */
        /**
        * Set the maximum size of the widget. This may cause the
        * widget to resize if current size is larger than the
        * specified maximum size.
        * @type {ISize}
        */
        public maximumSize : ISize;
        /**
        * Create the DOM contents for the widget.
        */
        public create(): void;
        /**
        * Synchronize the div's geometry with the internal geometry.
        * @private
        */
        private _syncGeometry();
        private _geometry;
        private _minSize;
        private _maxSize;
    }
}
