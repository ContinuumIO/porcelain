/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var WIDGET_CLASS = "porcelain-Widget";

    var MIN_WIDGET_SIZE = new Size(0, 0);
    var MAX_WIDGET_DIM = (1 << 16) - 1;
    var MAX_WIDGET_SIZE = new Size(MAX_WIDGET_DIM, MAX_WIDGET_DIM);

    export class Widget extends Item {

        /**
         * Construct a new Widget.
         * @class
         * @classdesc A Widget is an absolutely positioned item. The
         * geometry of a widget must be manipulated programmatically
         * using the widget api. Do not use CSS to position a widget's
         * internal div element.
         */
        constructor() {
            super();
            $(this.element).addClass(WIDGET_CLASS);
        }
        
        /* Get the left edge of the widget. The value is in units of
         * pixels relative to the origin of the parent. This is 
         * equivalent to `x`.
         * @type {number}
         */
        get left(): number {
            return this._geometry.left;
        }

        /**
         * Move the left edge of the widget to the given location. The
         * value is in units of pixels relative to the origin of the 
         * parent. This may change the width, but will not change the
         * right edge.
         * @type {number}
         */
        set left(left: number) {
            var min = this._geometry.right - this._maxSize.width;
            var max = this._geometry.right - this._minSize.width;
            this._geometry.left = Math.min(Math.max(min, left), max);
            this._syncGeometry()
        }

        /**
         * Get the top edge of the widget. The value is in units of
         * pixels relative to the origin of the parent. This is
         * equivalent to `y`.
         * @type {number}
         */
        get top(): number {
            return this._geometry.top;
        }

        /**
         * Move the top edge of the widget to the given location. The
         * value is in units of pixels relative to the origin of the 
         * parent. This may change the height, but will not change the
         * bottom edge.
         * @type {number}
         */
        set top(top: number) {
            var min = this._geometry.bottom - this._maxSize.height;
            var max = this._geometry.bottom - this._minSize.height;
            this._geometry.top = Math.min(Math.max(min, top), max);
            this._syncGeometry()
        }

        /**
         * Get the right edge of the widget. The value is in units of 
         * pixels relative to the origin of the parent. This is 
         * equivalent to `left` + `width`. 
         * @type {number}
         */
        get right(): number {
            return this._geometry.right;
        }

        /**
         * Move the right edge of the widget to the given location. The
         * value is in units of pixels relative to the origin of the 
         * parent. This may change the width, but will not change the
         * left edge.
         * @type {number}
         */
        set right(right: number) {
            var min = this._geometry.left + this._minSize.width;
            var max = this._geometry.left + this._maxSize.width;
            this._geometry.right = Math.min(Math.max(min, right), max);
            this._syncGeometry();
        }

        /**
         * Get the bottom edge of the widget. The value is in units of
         * pixels relative to the origin of the parent. This is 
         * equivalent to `top` + `height`. 
         * @type {number}
         */
        get bottom(): number {
            return this._geometry.bottom;
        }
        
        /* Move the bottom edge of the widget to the given location. 
         * The value is in units of pixels relative to the origin of 
         * the parent. This may change the height, but will not change 
         * the top edge.
         * @type {number}
         */
        set bottom(bottom: number) {
            var min = this._geometry.top + this._minSize.height;
            var max = this._geometry.top + this._maxSize.height;
            this._geometry.bottom = Math.min(Math.max(min, bottom), max);
            this._syncGeometry();
        }

        /**
         * Get the x-coordinate of the widget origin. The value is in
         * units of pixels relative to the origin of the parent. This
         * is equivalent to `left`.
         */
        get x(): number {
            return this._geometry.x;
        }
        
        /**
         * Move the x-coordinate of the widget origin to the given 
         * position. This may change the left and right edge, but 
         * will not change the width.
         * @type {number}
         */
        set x(x: number) {
            this._geometry.x = x;
            this._syncGeometry();
        }

        /**
         * Get the y-coordinate of the widget origin. The value is in
         * units of pixels relative to the origin of the parent. This
         * is equivalent to `top`.
         */
        get y(): number {
            return this._geometry.y;
        }
       
        /**
         * Move the y-coordinate of the widget origin to the given 
         * position. This may change the top and bottom edge, but 
         * will not change the height.
         * @type {number}
         */
        set y(y: number) {
            this._geometry.y = y;
            this._syncGeometry();
        }

        /**
         * Get the width of the widget in pixels. This is equivalent
         * `right` - `left`.
         * @type {number}
         */
        get width(): number {
            return this._geometry.width;
        }

        /**
         * Set the width of the widget in pixels. This may change
         * the right edge, but will not change the left edge.
         * @type {number}
         */
        set width(width: number) {
            var min = this._minSize.width;
            var max = this._maxSize.width;
            this._geometry.width = Math.min(Math.max(min, width), max);
            this._syncGeometry();
        }
       
        /**
         * Get the height of the widget in pixels. This is equivalent
         * `bottom` - `top`.
         * @type {number}
         */
        get height(): number {
            return this._geometry.height;
        }

        /**
         * Set the height of the widget in pixels. This may change
         * the bottom edge, but will not change the top edge.
         * @type {number}
         */
        set height(height: number) {
            var min = this._minSize.height;
            var max = this._maxSize.height;
            this._geometry.height = Math.min(Math.max(min, height), max);
            this._syncGeometry();
        }

        /**
         * Get the top-left corner position of the widget.
         * @type {IPoint}
         */
        get topLeft(): IPoint {
            return { x: this._geometry.left, y: this._geometry.top };
        }

        /**
         * Set the top-left corner position of the widget. This is
         * more efficient than setting `top` and `left` separately.
         * @type {IPoint}
         */
        set topLeft(point: IPoint) {
            var minx = this._geometry.right - this._maxSize.width;
            var maxx = this._geometry.right - this._minSize.width;
            var miny = this._geometry.bottom - this._maxSize.height;
            var maxy = this._geometry.bottom - this._minSize.height;
            var x = Math.min(Math.max(minx, point.x), maxx);
            var y = Math.min(Math.max(miny, point.y), maxy);
            this._geometry.topLeft = { x: x, y: y };
            this._syncGeometry();
        }

        /**
         * Get the top-right corner position of the widget.
         * @type {IPoint}
         */
        get topRight(): IPoint {
            return { x: this._geometry.right, y: this._geometry.top };
        }
       
        /**
         * Set the top-righ corner position of the widget. This is
         * more efficient than setting `top` and `right` separately.
         * @type {IPoint}
         */
        set topRight(point: IPoint) {
            var minx = this._geometry.left + this._minSize.width;
            var maxx = this._geometry.left + this._maxSize.width;
            var miny = this._geometry.bottom - this._maxSize.height;
            var maxy = this._geometry.bottom - this._minSize.height;
            var x = Math.min(Math.max(minx, point.x), maxx);
            var y = Math.min(Math.max(miny, point.y), maxy);
            this._geometry.topRight = { x: x, y: y };
            this._syncGeometry();
        }

        /**
         * Get the bottom-left corner position of the widget.
         * @type {IPoint}
         */
        get bottomLeft(): IPoint {
            return { x: this._geometry.left, y: this._geometry.bottom };
        }

        /**
         * Set the bottom-left corner position of the widget. This is
         * more efficient than setting `bottom` and `left` separately.
         * @type {IPoint}
         */
        set bottomLeft(point: IPoint) {
            var minx = this._geometry.right - this._maxSize.width;
            var maxx = this._geometry.right - this._minSize.width;
            var miny = this._geometry.top + this._minSize.height;
            var maxy = this._geometry.top + this._maxSize.height;
            var x = Math.min(Math.max(minx, point.x), maxx);
            var y = Math.min(Math.max(miny, point.y), maxy);
            this._geometry.bottomLeft = { x: x, y: y };
            this._syncGeometry();
        }

        /**
         * Get the bottom-right corner position of the widget.
         * @type {IPoint}
         */
        get bottomRight(): IPoint {
            return { x: this._geometry.right, y: this._geometry.bottom };
        }

        /**
         * Set the bottom-right corner position of the widget. This is
         * more efficient than setting `bottom` and `right` separately.
         * @type {IPoint}
         */
        set bottomRight(point: IPoint) {
            var minx = this._geometry.left + this._minSize.width;
            var maxx = this._geometry.left + this._maxSize.width;
            var miny = this._geometry.top + this._minSize.height;
            var maxy = this._geometry.top + this._maxSize.height;
            var x = Math.min(Math.max(minx, point.x), maxx);
            var y = Math.min(Math.max(miny, point.y), maxy);
            this._geometry.bottomRight = { x: x, y: y };
            this._syncGeometry();
        }

        /**
         * Get the x-y origin of the widget. This is equivalent to 
         * `topLeft`.
         * @type {IPoint}
         */
        get pos(): IPoint {
            return this._geometry.pos;
        }

        /**
         * Set the x-y origin of the widget. This is more efficient
         * than setting 'x' and 'y' independently.
         * @type {IPoint}
         */
        set pos(pos: IPoint) {
            this._geometry.pos = pos;
            this._syncGeometry();
        }

        /**
         * Get the size of the widget.
         * @type {ISize}
         */
        get size(): ISize {
            return this._geometry.size;
        }

        /**
         * Set the size of the widget. This is more efficient than 
         * setting 'width' and 'height' independently.
         * @type {ISize}
         */
        set size(size: ISize) {
            var minw = this._minSize.width;
            var minh = this._minSize.height;
            var maxw = this._maxSize.width;
            var maxh = this._maxSize.height;
            var w = Math.min(Math.max(minw, size.width), maxw);
            var h = Math.min(Math.max(minh, size.height), maxh);
            this._geometry.size = { width: w, height: h };
            this._syncGeometry();
        }

        /**
         * Get the geometry rect for the widget.
         * @type {IRect}
         */
        get rect(): IRect {
            return this._geometry.rect;
        }

        /**
         * Set the geometry rect for the widget. This is more efficient
         * than setting `x`, `y`, `width`, and `height` independently.
         * @type {IRect}
         */
        set rect(rect: IRect) {
            var minw = this._minSize.width;
            var minh = this._minSize.height;
            var maxw = this._maxSize.width;
            var maxh = this._maxSize.height;
            var w = Math.min(Math.max(minw, rect.width), maxw);
            var h = Math.min(Math.max(minh, rect.height), maxh);
            this._geometry.rect = { x: rect.x, y: rect.y, width: w, height: h };
            this._syncGeometry();
        }

        /**
         * Get the minimum size of the widget.
         * @type {ISize}
         */
        get minimumSize(): ISize {
            return this._minSize.size;
        }

        /**
         * Set the minimum size of the widget. This may cause the
         * widget to resize if current size is smaller than the 
         * specified minimum size.
         * @type {ISize}
         */
        set minimumSize(size: ISize) {
            // XXX clip and update
            this._minSize = new Size(size);
        }

        /**
         * Get the maximum size of the widget.
         * @type {ISize}
         */
        get maximumSize(): ISize {
            return this._maxSize.size;
        }

        /**
         * Set the maximum size of the widget. This may cause the
         * widget to resize if current size is larger than the 
         * specified maximum size.
         * @type {ISize}
         */
        set maximumSize(size: ISize) {
            // XXX clip and update
            this._maxSize = new Size(size);
        }

        /**
         * Synchronize the div's geometry with the internal geometry.
         * @private
         */
        private _syncGeometry(): void {
            var geo = this._geometry;
            $(this.element).css({
                left: geo.left,
                top: geo.top,
                width: geo.width,
                height: geo.height
            });
        }

        private _geometry: Rect = new Rect();
        private _minSize: Size = new Size(MIN_WIDGET_SIZE);
        private _maxSize: Size = new Size(MAX_WIDGET_SIZE);
    }

}
