/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The CSS class applied to Widget instances.
     */
    var WIDGET_CLASS = "porcelain-Widget";

    /**
     * The absolute minimum allowed widget size.
     */
    var MIN_WIDGET_SIZE = new Size(0, 0);

    /**
     * The absolute maximimum allowed widget size.
     */
    var MAX_WIDGET_SIZE = new Size((1 << 16) - 1, (1 << 16) - 1);


    /** The base Widget class.
     *
     * A Widget is an absolutely positioned item. The geometry of a 
     * widget must be manipulated programmatically using the widget 
     * api. Do not use CSS to position a widget's div element.
     *
     * @class
     */
    export class Widget extends Item {

        /**
         * Construct a new Widget.
         */
        constructor() {
            super();
            $(this.element).addClass(WIDGET_CLASS);
        }
        
        /* The left edge of the widget. 
         * 
         * This is equivalent to `x`. Modifying this value will change
         * the width but will not change the right edge.
         */
        get left(): number {
            return this._geometry.left;
        }

        set left(left: number) {
            var min = this._geometry.right - this._maxSize.width;
            var max = this._geometry.right - this._minSize.width;
            this._geometry.left = Math.min(Math.max(min, left), max);
            this._syncGeometry()
        }

        /**
         * The top edge of the widget.
         *
         * This is equivalent to `y`. Modifying this value will change
         * the height but will not change the bottom edge.
         */
        get top(): number {
            return this._geometry.top;
        }

        set top(top: number) {
            var min = this._geometry.bottom - this._maxSize.height;
            var max = this._geometry.bottom - this._minSize.height;
            this._geometry.top = Math.min(Math.max(min, top), max);
            this._syncGeometry()
        }

        /**
         * The right edge of the widget. 
         * 
         * This is equivalent to `left + width`. Modifying this value
         * will change the width but will not change the left edge.
         */
        get right(): number {
            return this._geometry.right;
        }

        set right(right: number) {
            var min = this._geometry.left + this._minSize.width;
            var max = this._geometry.left + this._maxSize.width;
            this._geometry.right = Math.min(Math.max(min, right), max);
            this._syncGeometry();
        }

        /**
         * The bottom edge of the widget. 
         * 
         * This is equivalent to `top + height`. Modifying this value
         * will change the height but will not change the bottom edge.
         */
        get bottom(): number {
            return this._geometry.bottom;
        }
        
        set bottom(bottom: number) {
            var min = this._geometry.top + this._minSize.height;
            var max = this._geometry.top + this._maxSize.height;
            this._geometry.bottom = Math.min(Math.max(min, bottom), max);
            this._syncGeometry();
        }

        /**
         * The X-coordinate of the widget. 
         * 
         * This is equivalent to `left`. Modifying this value will
         * move the widget but will not change its size.
         */
        get x(): number {
            return this._geometry.x;
        }
        
        set x(x: number) {
            this._geometry.x = x;
            this._syncGeometry();
        }

        /**
         * The Y-coordinate of the widget. 
         * 
         * This is equivalent to `top`. Modifying this value will
         * move the widget but will not change its size.
         */
        get y(): number {
            return this._geometry.y;
        }
       
        set y(y: number) {
            this._geometry.y = y;
            this._syncGeometry();
        }

        /**
         * The width of the widget. 
         *
         * This is equivalent `right - left`. Modifying this value
         * will change the right edge.
         */
        get width(): number {
            return this._geometry.width;
        }

        set width(width: number) {
            var min = this._minSize.width;
            var max = this._maxSize.width;
            this._geometry.width = Math.min(Math.max(min, width), max);
            this._syncGeometry();
        }
       
        /**
         * The height of the widget. 
         *
         * This is equivalent `bottom - top`. Modifying this value
         * will change the bottom edge.
         */
        get height(): number {
            return this._geometry.height;
        }

        set height(height: number) {
            var min = this._minSize.height;
            var max = this._maxSize.height;
            this._geometry.height = Math.min(Math.max(min, height), max);
            this._syncGeometry();
        }

        /**
         * The top left corner of the widget.
         *
         * Modifying this value will change the width and height.
         */
        get topLeft(): IPoint {
            return { x: this._geometry.left, y: this._geometry.top };
        }

        set topLeft(point: IPoint) {
            var minX = this._geometry.right - this._maxSize.width;
            var maxX = this._geometry.right - this._minSize.width;
            var minY = this._geometry.bottom - this._maxSize.height;
            var maxY = this._geometry.bottom - this._minSize.height;
            var x = Math.min(Math.max(minX, point.x), maxX);
            var y = Math.min(Math.max(minY, point.y), maxY);
            this._geometry.topLeft = { x: x, y: y };
            this._syncGeometry();
        }

        /**
         * The top right corner of the widget.
         *
         * Modifying this value will change the width and height.
         */
        get topRight(): IPoint {
            return { x: this._geometry.right, y: this._geometry.top };
        }
       
        set topRight(point: IPoint) {
            var minX = this._geometry.left + this._minSize.width;
            var maxX = this._geometry.left + this._maxSize.width;
            var minY = this._geometry.bottom - this._maxSize.height;
            var maxY = this._geometry.bottom - this._minSize.height;
            var x = Math.min(Math.max(minX, point.x), maxX);
            var y = Math.min(Math.max(minY, point.y), maxY);
            this._geometry.topRight = { x: x, y: y };
            this._syncGeometry();
        }

        /**
         * The bottom left corner of the widget.
         *
         * Modifying this value will change the width and height.
         */
        get bottomLeft(): IPoint {
            return { x: this._geometry.left, y: this._geometry.bottom };
        }

        set bottomLeft(point: IPoint) {
            var minX = this._geometry.right - this._maxSize.width;
            var maxX = this._geometry.right - this._minSize.width;
            var minY = this._geometry.top + this._minSize.height;
            var maxY = this._geometry.top + this._maxSize.height;
            var x = Math.min(Math.max(minX, point.x), maxX);
            var y = Math.min(Math.max(minY, point.y), maxY);
            this._geometry.bottomLeft = { x: x, y: y };
            this._syncGeometry();
        }

        /**
         * The bottom right corner of the widget.
         *
         * Modifying this value will change the width and height.
         */
        get bottomRight(): IPoint {
            return { x: this._geometry.right, y: this._geometry.bottom };
        }

        set bottomRight(point: IPoint) {
            var minX = this._geometry.left + this._minSize.width;
            var maxX = this._geometry.left + this._maxSize.width;
            var minY = this._geometry.top + this._minSize.height;
            var maxY = this._geometry.top + this._maxSize.height;
            var x = Math.min(Math.max(minX, point.x), maxX);
            var y = Math.min(Math.max(minY, point.y), maxY);
            this._geometry.bottomRight = { x: x, y: y };
            this._syncGeometry();
        }

        /**
         * The X and Y coordinates of the the widget origin. 
         * 
         * This is equivalent to `topLeft`. Modifying this value will
         * move the widget but will not change its size.
         */
        get pos(): IPoint {
            return this._geometry.pos;
        }

        set pos(pos: IPoint) {
            this._geometry.pos = pos;
            this._syncGeometry();
        }

        /**
         * The width and height of the widget.
         *
         * Modifying this value will change the right and bottom edges.
         */
        get size(): ISize {
            return this._geometry.size;
        }

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
         * The position and size of the widget.
         */
        get rect(): IRect {
            return this._geometry.rect;
        }

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
         * The minimum allowed size of the widget.
         *
         * Modifying this value will cause the widget to resize of its
         * current size is less than the new minimum.
         */
        get minimumSize(): ISize {
            return this._minSize.size;
        }

        set minimumSize(size: ISize) {
            // XXX clip and update
            this._minSize = new Size(size);
        }

        /**
         * The maximum allowed size of the widget.
         *
         * Modifying this value will cause the widget to resize of its
         * current size is greater than the new maximum.
         */
        get maximumSize(): ISize {
            return this._maxSize.size;
        }

        set maximumSize(size: ISize) {
            // XXX clip and update
            this._maxSize = new Size(size);
        }

        /**
         * Synchronize the div's geometry with the internal geometry.
         *
         * @private
         */
        private _syncGeometry(): void {
            var geo = this._geometry;
            var style = this.element.style;
            style.left = geo.left + "px";
            style.top = geo.top + "px";
            style.width = geo.width + "px";
            style.height = geo.height + "px";
        }

        private _geometry: Rect = new Rect();
        private _minSize: Size = new Size(MIN_WIDGET_SIZE);
        private _maxSize: Size = new Size(MAX_WIDGET_SIZE);
    }

}
