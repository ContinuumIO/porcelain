var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    /**
    * The CSS class applied to Widget instances.
    */
    var WIDGET_CLASS = "porcelain-Widget";

    /**
    * The absolute minimum allowed widget size.
    */
    var MIN_WIDGET_SIZE = new porcelain.Size(0, 0);

    /**
    * The absolute maximimum allowed widget size.
    */
    var MAX_WIDGET_SIZE = new porcelain.Size((1 << 16) - 1, (1 << 16) - 1);

    /** The base Widget class.
    *
    * A Widget is an absolutely positioned item. The geometry of a
    * widget must be manipulated programmatically using the widget
    * api. Do not use CSS to position a widget's div element.
    *
    * @class
    */
    var Widget = (function (_super) {
        __extends(Widget, _super);
        /**
        * Construct a new Widget.
        */
        function Widget() {
            _super.call(this);
            this._geometry = new porcelain.Rect();
            this._minSize = new porcelain.Size(MIN_WIDGET_SIZE);
            this._maxSize = new porcelain.Size(MAX_WIDGET_SIZE);
            $(this.element).addClass(WIDGET_CLASS);
        }
        Object.defineProperty(Widget.prototype, "left", {
            /* The left edge of the widget.
            *
            * This is equivalent to `x`. Modifying this value will change
            * the width but will not change the right edge.
            */
            get: function () {
                return this._geometry.left;
            },
            set: function (left) {
                var min = this._geometry.right - this._maxSize.width;
                var max = this._geometry.right - this._minSize.width;
                this._geometry.left = Math.min(Math.max(min, left), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "top", {
            /**
            * The top edge of the widget.
            *
            * This is equivalent to `y`. Modifying this value will change
            * the height but will not change the bottom edge.
            */
            get: function () {
                return this._geometry.top;
            },
            set: function (top) {
                var min = this._geometry.bottom - this._maxSize.height;
                var max = this._geometry.bottom - this._minSize.height;
                this._geometry.top = Math.min(Math.max(min, top), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "right", {
            /**
            * The right edge of the widget.
            *
            * This is equivalent to `left + width`. Modifying this value
            * will change the width but will not change the left edge.
            */
            get: function () {
                return this._geometry.right;
            },
            set: function (right) {
                var min = this._geometry.left + this._minSize.width;
                var max = this._geometry.left + this._maxSize.width;
                this._geometry.right = Math.min(Math.max(min, right), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "bottom", {
            /**
            * The bottom edge of the widget.
            *
            * This is equivalent to `top + height`. Modifying this value
            * will change the height but will not change the bottom edge.
            */
            get: function () {
                return this._geometry.bottom;
            },
            set: function (bottom) {
                var min = this._geometry.top + this._minSize.height;
                var max = this._geometry.top + this._maxSize.height;
                this._geometry.bottom = Math.min(Math.max(min, bottom), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "x", {
            /**
            * The X-coordinate of the widget.
            *
            * This is equivalent to `left`. Modifying this value will
            * move the widget but will not change its size.
            */
            get: function () {
                return this._geometry.x;
            },
            set: function (x) {
                this._geometry.x = x;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "y", {
            /**
            * The Y-coordinate of the widget.
            *
            * This is equivalent to `top`. Modifying this value will
            * move the widget but will not change its size.
            */
            get: function () {
                return this._geometry.y;
            },
            set: function (y) {
                this._geometry.y = y;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "width", {
            /**
            * The width of the widget.
            *
            * This is equivalent `right - left`. Modifying this value
            * will change the right edge.
            */
            get: function () {
                return this._geometry.width;
            },
            set: function (width) {
                var min = this._minSize.width;
                var max = this._maxSize.width;
                this._geometry.width = Math.min(Math.max(min, width), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "height", {
            /**
            * The height of the widget.
            *
            * This is equivalent `bottom - top`. Modifying this value
            * will change the bottom edge.
            */
            get: function () {
                return this._geometry.height;
            },
            set: function (height) {
                var min = this._minSize.height;
                var max = this._maxSize.height;
                this._geometry.height = Math.min(Math.max(min, height), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "topLeft", {
            /**
            * The top left corner of the widget.
            *
            * Modifying this value will change the width and height.
            */
            get: function () {
                return { x: this._geometry.left, y: this._geometry.top };
            },
            set: function (point) {
                var minX = this._geometry.right - this._maxSize.width;
                var maxX = this._geometry.right - this._minSize.width;
                var minY = this._geometry.bottom - this._maxSize.height;
                var maxY = this._geometry.bottom - this._minSize.height;
                var x = Math.min(Math.max(minX, point.x), maxX);
                var y = Math.min(Math.max(minY, point.y), maxY);
                this._geometry.topLeft = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "topRight", {
            /**
            * The top right corner of the widget.
            *
            * Modifying this value will change the width and height.
            */
            get: function () {
                return { x: this._geometry.right, y: this._geometry.top };
            },
            set: function (point) {
                var minX = this._geometry.left + this._minSize.width;
                var maxX = this._geometry.left + this._maxSize.width;
                var minY = this._geometry.bottom - this._maxSize.height;
                var maxY = this._geometry.bottom - this._minSize.height;
                var x = Math.min(Math.max(minX, point.x), maxX);
                var y = Math.min(Math.max(minY, point.y), maxY);
                this._geometry.topRight = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "bottomLeft", {
            /**
            * The bottom left corner of the widget.
            *
            * Modifying this value will change the width and height.
            */
            get: function () {
                return { x: this._geometry.left, y: this._geometry.bottom };
            },
            set: function (point) {
                var minX = this._geometry.right - this._maxSize.width;
                var maxX = this._geometry.right - this._minSize.width;
                var minY = this._geometry.top + this._minSize.height;
                var maxY = this._geometry.top + this._maxSize.height;
                var x = Math.min(Math.max(minX, point.x), maxX);
                var y = Math.min(Math.max(minY, point.y), maxY);
                this._geometry.bottomLeft = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "bottomRight", {
            /**
            * The bottom right corner of the widget.
            *
            * Modifying this value will change the width and height.
            */
            get: function () {
                return { x: this._geometry.right, y: this._geometry.bottom };
            },
            set: function (point) {
                var minX = this._geometry.left + this._minSize.width;
                var maxX = this._geometry.left + this._maxSize.width;
                var minY = this._geometry.top + this._minSize.height;
                var maxY = this._geometry.top + this._maxSize.height;
                var x = Math.min(Math.max(minX, point.x), maxX);
                var y = Math.min(Math.max(minY, point.y), maxY);
                this._geometry.bottomRight = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "pos", {
            /**
            * The X and Y coordinates of the the widget origin.
            *
            * This is equivalent to `topLeft`. Modifying this value will
            * move the widget but will not change its size.
            */
            get: function () {
                return this._geometry.pos;
            },
            set: function (pos) {
                this._geometry.pos = pos;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "size", {
            /**
            * The width and height of the widget.
            *
            * Modifying this value will change the right and bottom edges.
            */
            get: function () {
                return this._geometry.size;
            },
            set: function (size) {
                var minw = this._minSize.width;
                var minh = this._minSize.height;
                var maxw = this._maxSize.width;
                var maxh = this._maxSize.height;
                var w = Math.min(Math.max(minw, size.width), maxw);
                var h = Math.min(Math.max(minh, size.height), maxh);
                this._geometry.size = { width: w, height: h };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "rect", {
            /**
            * The position and size of the widget.
            */
            get: function () {
                return this._geometry.rect;
            },
            set: function (rect) {
                var minw = this._minSize.width;
                var minh = this._minSize.height;
                var maxw = this._maxSize.width;
                var maxh = this._maxSize.height;
                var w = Math.min(Math.max(minw, rect.width), maxw);
                var h = Math.min(Math.max(minh, rect.height), maxh);
                this._geometry.rect = { x: rect.x, y: rect.y, width: w, height: h };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "minimumSize", {
            /**
            * The minimum allowed size of the widget.
            *
            * Modifying this value will cause the widget to resize of its
            * current size is less than the new minimum.
            */
            get: function () {
                return this._minSize.size;
            },
            set: function (size) {
                // XXX clip and update
                this._minSize = new porcelain.Size(size);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Widget.prototype, "maximumSize", {
            /**
            * The maximum allowed size of the widget.
            *
            * Modifying this value will cause the widget to resize of its
            * current size is greater than the new maximum.
            */
            get: function () {
                return this._maxSize.size;
            },
            set: function (size) {
                // XXX clip and update
                this._maxSize = new porcelain.Size(size);
            },
            enumerable: true,
            configurable: true
        });


        /**
        * Synchronize the div's geometry with the internal geometry.
        *
        * @private
        */
        Widget.prototype._syncGeometry = function () {
            var geo = this._geometry;
            var style = this.element.style;
            style.left = geo.left + "px";
            style.top = geo.top + "px";
            style.width = geo.width + "px";
            style.height = geo.height + "px";
        };
        return Widget;
    })(porcelain.Item);
    porcelain.Widget = Widget;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=widget.js.map
