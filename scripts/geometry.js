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
    * The absolute minimum allowed element size.
    */
    var MIN_ELEMENT_SIZE = new porcelain.Size(0, 0);

    /**
    * The absolute maximimum allowed element size.
    */
    var MAX_ELEMENT_SIZE = new porcelain.Size((1 << 16) - 1, (1 << 16) - 1);

    /**
    * The layout geometry class.
    *
    * A Geometry instance is used to procedurally control the geometry
    * of an absolutely positioned element. It should not typically be
    * used in combination with CSS layout.
    *
    * @class
    */
    var Geometry = (function () {
        /**
        * Construct a new Geometry instance.
        */
        function Geometry(element) {
            this._rect = new porcelain.Rect();
            this._minSize = new porcelain.Size(MIN_ELEMENT_SIZE);
            this._maxSize = new porcelain.Size(MAX_ELEMENT_SIZE);
            this._element = element;
            this._syncGeometry();
        }
        /**
        * Release the element reference.
        */
        Geometry.prototype.destroy = function () {
            this._element = null;
        };

        Object.defineProperty(Geometry.prototype, "left", {
            /**
            * The left edge of the element.
            *
            * This is equivalent to `x`. Modifying this value will change
            * the width but will not change the right edge.
            */
            get: function () {
                return this._rect.left;
            },
            set: function (left) {
                var min = this._rect.right - this._maxSize.width;
                var max = this._rect.right - this._minSize.width;
                this._rect.left = Math.min(Math.max(min, left), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "top", {
            /**
            * The top edge of the element.
            *
            * This is equivalent to `y`. Modifying this value will change
            * the height but will not change the bottom edge.
            */
            get: function () {
                return this._rect.top;
            },
            set: function (top) {
                var min = this._rect.bottom - this._maxSize.height;
                var max = this._rect.bottom - this._minSize.height;
                this._rect.top = Math.min(Math.max(min, top), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "right", {
            /**
            * The right edge of the element.
            *
            * This is equivalent to `left + width`. Modifying this value
            * will change the width but will not change the left edge.
            */
            get: function () {
                return this._rect.right;
            },
            set: function (right) {
                var min = this._rect.left + this._minSize.width;
                var max = this._rect.left + this._maxSize.width;
                this._rect.right = Math.min(Math.max(min, right), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "bottom", {
            /**
            * The bottom edge of the element.
            *
            * This is equivalent to `top + height`. Modifying this value
            * will change the height but will not change the bottom edge.
            */
            get: function () {
                return this._rect.bottom;
            },
            set: function (bottom) {
                var min = this._rect.top + this._minSize.height;
                var max = this._rect.top + this._maxSize.height;
                this._rect.bottom = Math.min(Math.max(min, bottom), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "x", {
            /**
            * The X-coordinate of the element.
            *
            * This is equivalent to `left`. Modifying this value will
            * move the element but will not change its size.
            */
            get: function () {
                return this._rect.x;
            },
            set: function (x) {
                this._rect.x = x;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "y", {
            /**
            * The Y-coordinate of the element.
            *
            * This is equivalent to `top`. Modifying this value will
            * move the element but will not change its size.
            */
            get: function () {
                return this._rect.y;
            },
            set: function (y) {
                this._rect.y = y;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "width", {
            /**
            * The width of the element.
            *
            * This is equivalent `right - left`. Modifying this value
            * will change the right edge.
            */
            get: function () {
                return this._rect.width;
            },
            set: function (width) {
                var min = this._minSize.width;
                var max = this._maxSize.width;
                this._rect.width = Math.min(Math.max(min, width), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "height", {
            /**
            * The height of the element.
            *
            * This is equivalent `bottom - top`. Modifying this value
            * will change the bottom edge.
            */
            get: function () {
                return this._rect.height;
            },
            set: function (height) {
                var min = this._minSize.height;
                var max = this._maxSize.height;
                this._rect.height = Math.min(Math.max(min, height), max);
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "topLeft", {
            /**
            * The top left corner of the element.
            *
            * Modifying this value will change the width and height.
            */
            get: function () {
                return { x: this._rect.left, y: this._rect.top };
            },
            set: function (point) {
                var minX = this._rect.right - this._maxSize.width;
                var maxX = this._rect.right - this._minSize.width;
                var minY = this._rect.bottom - this._maxSize.height;
                var maxY = this._rect.bottom - this._minSize.height;
                var x = Math.min(Math.max(minX, point.x), maxX);
                var y = Math.min(Math.max(minY, point.y), maxY);
                this._rect.topLeft = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "topRight", {
            /**
            * The top right corner of the element.
            *
            * Modifying this value will change the width and height.
            */
            get: function () {
                return { x: this._rect.right, y: this._rect.top };
            },
            set: function (point) {
                var minX = this._rect.left + this._minSize.width;
                var maxX = this._rect.left + this._maxSize.width;
                var minY = this._rect.bottom - this._maxSize.height;
                var maxY = this._rect.bottom - this._minSize.height;
                var x = Math.min(Math.max(minX, point.x), maxX);
                var y = Math.min(Math.max(minY, point.y), maxY);
                this._rect.topRight = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "bottomLeft", {
            /**
            * The bottom left corner of the element.
            *
            * Modifying this value will change the width and height.
            */
            get: function () {
                return { x: this._rect.left, y: this._rect.bottom };
            },
            set: function (point) {
                var minX = this._rect.right - this._maxSize.width;
                var maxX = this._rect.right - this._minSize.width;
                var minY = this._rect.top + this._minSize.height;
                var maxY = this._rect.top + this._maxSize.height;
                var x = Math.min(Math.max(minX, point.x), maxX);
                var y = Math.min(Math.max(minY, point.y), maxY);
                this._rect.bottomLeft = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "bottomRight", {
            /**
            * The bottom right corner of the element.
            *
            * Modifying this value will change the width and height.
            */
            get: function () {
                return { x: this._rect.right, y: this._rect.bottom };
            },
            set: function (point) {
                var minX = this._rect.left + this._minSize.width;
                var maxX = this._rect.left + this._maxSize.width;
                var minY = this._rect.top + this._minSize.height;
                var maxY = this._rect.top + this._maxSize.height;
                var x = Math.min(Math.max(minX, point.x), maxX);
                var y = Math.min(Math.max(minY, point.y), maxY);
                this._rect.bottomRight = { x: x, y: y };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "pos", {
            /**
            * The X and Y coordinates of the the element origin.
            *
            * This is equivalent to `topLeft`. Modifying this value will
            * move the element but will not change its size.
            */
            get: function () {
                return this._rect.pos;
            },
            set: function (pos) {
                this._rect.pos = pos;
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "size", {
            /**
            * The width and height of the element.
            *
            * Modifying this value will change the right and bottom edges.
            */
            get: function () {
                return this._rect.size;
            },
            set: function (size) {
                var minw = this._minSize.width;
                var minh = this._minSize.height;
                var maxw = this._maxSize.width;
                var maxh = this._maxSize.height;
                var w = Math.min(Math.max(minw, size.width), maxw);
                var h = Math.min(Math.max(minh, size.height), maxh);
                this._rect.size = { width: w, height: h };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "rect", {
            /**
            * The position and size of the element.
            */
            get: function () {
                return this._rect.rect;
            },
            set: function (rect) {
                var minw = this._minSize.width;
                var minh = this._minSize.height;
                var maxw = this._maxSize.width;
                var maxh = this._maxSize.height;
                var w = Math.min(Math.max(minw, rect.width), maxw);
                var h = Math.min(Math.max(minh, rect.height), maxh);
                this._rect.rect = { x: rect.x, y: rect.y, width: w, height: h };
                this._syncGeometry();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Geometry.prototype, "minimumSize", {
            /**
            * The minimum allowed size of the element.
            *
            * Modifying this value will cause the element to resize if its
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


        Object.defineProperty(Geometry.prototype, "maximumSize", {
            /**
            * The maximum allowed size of the element.
            *
            * Modifying this value will cause the element to resize if its
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
        * Synchronize the element geometry with the internal rect.
        *
        * @private
        */
        Geometry.prototype._syncGeometry = function () {
            if (!this._element) {
                return;
            }
            var rect = this._rect;
            var style = this._element.style;
            style.left = rect.left + "px";
            style.top = rect.top + "px";
            style.width = rect.width + "px";
            style.height = rect.height + "px";
        };
        return Geometry;
    })();
    porcelain.Geometry = Geometry;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=geometry.js.map
