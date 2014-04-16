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
    * A class which represents a point in Cartesian space.
    *
    * @class
    */
    var Point = (function () {
        function Point(arg1, arg2) {
            switch (arguments.length) {
                case 0:
                    this.x = 0;
                    this.y = 0;
                    break;
                case 1:
                    this.x = arg1.x;
                    this.y = arg1.y;
                    break;
                case 2:
                    this.x = arg1;
                    this.y = arg2;
                    break;
                default:
                    throw new Error("invalid constructor call");
            }
        }
        /**
        * Returns true if both X AND Y coordinates are zero.
        */
        Point.prototype.isNull = function () {
            return this.x == 0 && this.y == 0;
        };

        /**
        * Returns the sum of the abs X and Y distances to the origin.
        */
        Point.prototype.manhattanLength = function () {
            return Math.abs(this.x) + Math.abs(this.y);
        };

        /**
        * Returns true if this point is equivalent to another.
        */
        Point.prototype.equals = function (other) {
            return this.x == other.x && this.y == other.y;
        };

        /**
        * Returns a new point which is the sum of the two points.
        */
        Point.prototype.add = function (other) {
            return new Point(this.x + other.x, this.y + other.y);
        };

        /**
        * Returns a new point which is the difference of the two points.
        */
        Point.prototype.subtract = function (other) {
            return new Point(this.x - other.x, this.y - other.y);
        };

        /**
        * Returns a new point scaled by the given factor.
        */
        Point.prototype.multiply = function (factor) {
            var x = Math.floor(this.x * factor);
            var y = Math.floor(this.y * factor);
            return new Point(x, y);
        };

        /**
        * Returns a new point scaled by the given divisor.
        */
        Point.prototype.divide = function (divisor) {
            var x = Math.floor(this.x / divisor);
            var y = Math.floor(this.y / divisor);
            return new Point(x, y);
        };
        return Point;
    })();
    porcelain.Point = Point;
})(porcelain || (porcelain = {}));
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
    * A class representing a size in Cartesian space.
    *
    * @class
    */
    var Size = (function () {
        function Size(arg1, arg2) {
            switch (arguments.length) {
                case 0:
                    this.width = -1;
                    this.height = -1;
                    break;
                case 1:
                    this.width = arg1.width;
                    this.height = arg1.height;
                    break;
                case 2:
                    this.width = arg1;
                    this.height = arg2;
                    break;
                default:
                    throw new Error("invalid constructor call");
            }
        }
        /**
        * Returns true if the width OR height is zero.
        */
        Size.prototype.isEmpty = function () {
            return this.width == 0 || this.height == 0;
        };

        /**
        * Returns true if the height width AND height are zero.
        */
        Size.prototype.isNull = function () {
            return this.width == 0 && this.height == 0;
        };

        /**
        * Returns true if the width AND height are non-negative.
        */
        Size.prototype.isValid = function () {
            return this.width >= 0 && this.height >= 0;
        };

        /**
        * Returns a new size limited in each dimension by another size.
        */
        Size.prototype.boundedTo = function (other) {
            var w = Math.min(this.width, other.width);
            var h = Math.min(this.height, other.height);
            return new Size(w, h);
        };

        /**
        * Returns a new size expaned in each dimension to another size.
        */
        Size.prototype.expandedTo = function (other) {
            var w = Math.max(this.width, other.width);
            var h = Math.max(this.height, other.height);
            return new Size(w, h);
        };

        /**
        * Swap the width and height values.
        */
        Size.prototype.transpose = function () {
            var temp = this.width;
            this.width = this.height;
            this.height = temp;
        };

        /**
        * Returns a new size with width and height swapped.
        */
        Size.prototype.transposed = function () {
            return new Size(this.height, this.width);
        };

        /**
        * Returns true if this size is equivalent to another.
        */
        Size.prototype.equals = function (other) {
            return this.width == other.width && this.height == other.height;
        };

        /**
        * Returns a new size which is the sum of two sizes.
        */
        Size.prototype.add = function (other) {
            var w = this.width + other.width;
            var h = this.height + other.height;
            return new Size(w, h);
        };

        /**
        * Returns a new size which is the difference of two sizes.
        */
        Size.prototype.subtract = function (other) {
            var w = this.width - other.width;
            var h = this.height - other.height;
            return new Size(w, h);
        };

        /**
        * Returns a new size scaled by the given factor.
        */
        Size.prototype.multiply = function (factor) {
            var w = Math.floor(this.width * factor);
            var h = Math.floor(this.height * factor);
            return new Size(w, h);
        };

        /**
        * Returns a new size scaled by the given divisor.
        */
        Size.prototype.divide = function (divisor) {
            var w = Math.floor(this.width / divisor);
            var h = Math.floor(this.height / divisor);
            return new Size(w, h);
        };
        return Size;
    })();
    porcelain.Size = Size;
})(porcelain || (porcelain = {}));
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
    * A class represeting a rectangle in Cartesian space.
    *
    * @class
    */
    var Rect = (function () {
        function Rect(arg1, arg2, arg3, arg4) {
            switch (arguments.length) {
                case 0:
                    this.left = 0;
                    this.top = 0;
                    this.right = 0;
                    this.bottom = 0;
                    break;
                case 1:
                    this.left = arg1.left;
                    this.top = arg1.top;
                    this.right = arg1.right;
                    this.bottom = arg1.bottom;
                    break;
                case 2:
                    this.left = arg1.x;
                    this.top = arg1.y;
                    this.right = arg2.x;
                    this.bottom = arg2.y;
                    break;
                case 4:
                    this.left = arg1;
                    this.top = arg2;
                    this.right = this.left + arg3;
                    this.bottom = this.top + arg4;
                    break;
                default:
                    throw new Error("invalid constructor call");
            }
        }
        /**
        * Returns the width of the rect.
        *
        * This is equivalent to `right - left`
        */
        Rect.prototype.width = function () {
            return this.right - this.left;
        };

        /**
        * Set the width of the rect.
        *
        * This will move the right edge.
        */
        Rect.prototype.setWidth = function (width) {
            this.right = this.left + width;
        };

        /**
        * Returns the height of the rect.
        *
        * This is Equivalent to `bottom - top`.
        */
        Rect.prototype.height = function () {
            return this.bottom - this.top;
        };

        /**
        * Set the height of the rect.
        *
        * This will move the bottom edge.
        */
        Rect.prototype.setHeight = function (height) {
            this.bottom = this.top + height;
        };

        /**
        * Returns the size of the rect.
        */
        Rect.prototype.size = function () {
            return new porcelain.Size(this.width(), this.height());
        };

        /**
        * Set the size of the rect.
        *
        * This will move the left and right edges.
        */
        Rect.prototype.setSize = function (size) {
            this.setWidth(size.width);
            this.setHeight(size.height);
        };

        /**
        * Returns the top left corner of the rect.
        */
        Rect.prototype.topLeft = function () {
            return new porcelain.Point(this.left, this.top);
        };

        /**
        * Set the top left corner of the rect.
        *
        * This will change the width and height, but will not change
        * change the right or bottom edges.
        */
        Rect.prototype.setTopLeft = function (point) {
            this.left = point.x;
            this.top = point.y;
        };

        /**
        * Returns the top right corner of the rect.
        */
        Rect.prototype.topRight = function () {
            return new porcelain.Point(this.right, this.top);
        };

        /**
        * Set the top right corner of the rect.
        *
        * This will change the width and height, but will not change
        * the left or bottom edges.
        */
        Rect.prototype.setTopRight = function (point) {
            this.right = point.x;
            this.top = point.y;
        };

        /**
        * Returns bottom left corner of the rect.
        */
        Rect.prototype.bottomLeft = function () {
            return new porcelain.Point(this.left, this.bottom);
        };

        /**
        * Set the bottom left corner of the rect.
        *
        * This will change the width and height, but will not change
        * the right or top edges.
        */
        Rect.prototype.setBottomLeft = function (point) {
            this.left = point.x;
            this.bottom = point.y;
        };

        /**
        * Returns bottom right corner of the rect.
        */
        Rect.prototype.bottomRight = function () {
            return new porcelain.Point(this.right, this.bottom);
        };

        /** Set the bottom right corner of the rect.
        *
        * This will change the width and height, but will not change
        * the left or top edges.
        */
        Rect.prototype.setBottomRight = function (point) {
            this.right = point.x;
            this.bottom = point.y;
        };

        /**
        * Returns the center point of the rect.
        */
        Rect.prototype.center = function () {
            var x = this.left + Math.floor(this.width() / 2);
            var y = this.top + Math.floor(this.height() / 2);
            return new porcelain.Point(x, y);
        };

        /**
        * Move the left edge of the rect.
        *
        * This will change the right edge, but will not change
        * the width.
        */
        Rect.prototype.moveLeft = function (pos) {
            this.right += pos - this.left;
            this.left = pos;
        };

        /**
        * Move the top edge of the rect.
        *
        * This will change the bottom edge, but will not change
        * the height.
        */
        Rect.prototype.moveTop = function (pos) {
            this.bottom += pos - this.top;
            this.top = pos;
        };

        /**
        * Move the right edge of the rect.
        *
        * This will change the left edge, but will not change
        * the width.
        */
        Rect.prototype.moveRight = function (pos) {
            this.left += pos - this.right;
            this.right = pos;
        };

        /**
        * Move the bottom edge of the rect.
        *
        * This will change the top edge, but will not change the
        * height.
        */
        Rect.prototype.moveBottom = function (pos) {
            this.top = pos - this.bottom;
            this.bottom = pos;
        };

        /**
        * Move the top left corner of the rect.
        *
        * This is equivalent to moving the top and left edges.
        */
        Rect.prototype.moveTopLeft = function (point) {
            this.moveLeft(point.x);
            this.moveTop(point.y);
        };

        /**
        * Move the top right corner of the rect.
        *
        * This is equivalent to moving the top and right edges.
        */
        Rect.prototype.moveTopRight = function (point) {
            this.moveRight(point.x);
            this.moveTop(point.y);
        };

        /**
        * Move the bottom left corner of the rect.
        *
        * This is equivalent to moving the bottom and left edges.
        */
        Rect.prototype.moveBottomLeft = function (point) {
            this.moveLeft(point.x);
            this.moveBottom(point.y);
        };

        /**
        * Move the bottom right corner of the rect.
        *
        * This is equivalent to moving the bottom and right edges.
        */
        Rect.prototype.moveBottomRight = function (point) {
            this.moveRight(point.x);
            this.moveBottom(point.y);
        };

        /**
        * Move the center point of the rect.
        *
        * This will not change the width or height.
        */
        Rect.prototype.moveCenter = function (point) {
            this.moveLeft(point.x + Math.floor(this.width() / 2));
            this.moveTop(point.y + Math.floor(this.height() / 2));
        };

        /**
        * Returns true if the width OR height is zero or negative.
        */
        Rect.prototype.isEmpty = function () {
            return this.left >= this.right || this.top >= this.bottom;
        };

        /**
        * Returns true if the width AND height are zero.
        */
        Rect.prototype.isNull = function () {
            return this.left === this.right && this.top === this.bottom;
        };

        /**
        * Returns true the width AND height are positive non-zero.
        */
        Rect.prototype.isValid = function () {
            return this.left < this.right && this.top < this.bottom;
        };

        /**
        * Returns true if this rect is equivalent to another.
        */
        Rect.prototype.equals = function (other) {
            return this.left == other.left && this.top == other.top && this.right == other.right && this.bottom == other.bottom;
        };

        /**
        * Adjust the rect edges by the given deltas.
        */
        Rect.prototype.adjust = function (dx1, dy1, dx2, dy2) {
            this.left += dx1;
            this.top += dy1;
            this.right += dx2;
            this.bottom += dy2;
        };

        /**
        * Returns a new rect adjusted by the given deltas.
        */
        Rect.prototype.adjusted = function (dx1, dy1, dx2, dy2) {
            var rect = new Rect(this);
            rect.adjust(dx1, dy1, dx2, dy2);
            return rect;
        };

        /**
        * Normalize the rect so that right >= left and bottom >= top.
        */
        Rect.prototype.normalize = function () {
            var temp;
            if (this.right < this.left) {
                temp = this.left;
                this.left = this.right;
                this.right = temp;
            }
            if (this.bottom < this.top) {
                temp = this.top;
                this.top = this.bottom;
                this.bottom = temp;
            }
        };

        /**
        * Returns a new rect with normalized edges.
        */
        Rect.prototype.normalized = function () {
            var rect = new Rect(this);
            rect.normalize();
            return rect;
        };

        /**
        * Translate the rect by the given deltas.
        */
        Rect.prototype.translate = function (dx, dy) {
            this.left += dx;
            this.top += dy;
            this.right += dx;
            this.bottom += dy;
        };

        /**
        * Returns a new rect translated by the given deltas.
        */
        Rect.prototype.translated = function (dx, dy) {
            var rect = new Rect(this);
            rect.translate(dx, dy);
            return rect;
        };

        /**
        * Returns true if this rect contains the given point.
        */
        Rect.prototype.contains = function (point) {
            if (this.isNull()) {
                return false;
            }
            var temp;
            var l = this.left;
            var r = this.right;
            if (r < l) {
                temp = l;
                l = r;
                r = temp;
            }
            var x = point.x;
            if (x < l || x >= r) {
                return false;
            }
            var t = this.top;
            var b = this.bottom;
            if (b < t) {
                temp = t;
                t = b;
                b = temp;
            }
            var y = point.y;
            if (y < t || y >= b) {
                return false;
            }
            return true;
        };

        /**
        * Returns true if this rect intersects the given rect.
        */
        Rect.prototype.intersects = function (rect) {
            if (this.isNull() || rect.isNull()) {
                return false;
            }
            var temp;
            var l1 = this.left;
            var r1 = this.right;
            if (r1 < l1) {
                temp = l1;
                l1 = r1;
                r1 = temp;
            }
            var l2 = rect.left;
            var r2 = rect.right;
            if (r2 < l2) {
                temp = l2;
                l2 = r2;
                r2 = temp;
            }
            if (l1 >= r2 || l2 >= r1) {
                return false;
            }
            var t1 = this.top;
            var b1 = this.bottom;
            if (b1 < t1) {
                temp = t1;
                t1 = b1;
                b1 = temp;
            }
            var t2 = rect.top;
            var b2 = rect.bottom;
            if (b2 < t2) {
                temp = t2;
                t2 = b2;
                b2 = temp;
            }
            if (t1 >= b2 || t2 >= b1) {
                return false;
            }
            return true;
        };

        /**
        * Returns the bounding rect of this rect and the given rect.
        */
        Rect.prototype.intersectected = function (rect) {
            if (this.isNull() || rect.isNull()) {
                return new Rect();
            }
            var temp;
            var l1 = this.left;
            var r1 = this.right;
            if (r1 < l1) {
                temp = l1;
                l1 = r1;
                r1 = temp;
            }
            var l2 = rect.left;
            var r2 = rect.right;
            if (r2 < l2) {
                temp = l2;
                l2 = r2;
                r2 = temp;
            }
            if (l1 >= r2 || l2 >= r1) {
                return new Rect();
            }
            var t1 = this.top;
            var b1 = this.bottom;
            if (b1 < t1) {
                temp = t1;
                t1 = b1;
                b1 = temp;
            }
            var t2 = rect.top;
            var b2 = rect.bottom;
            if (b2 < t2) {
                temp = t2;
                t2 = b2;
                b2 = temp;
            }
            if (t1 >= b2 || t2 >= b1) {
                return new Rect();
            }
            var result = new Rect();
            result.left = Math.max(l1, l2);
            result.top = Math.max(t1, t2);
            result.right = Math.min(r1, r2);
            result.bottom = Math.min(b1, b2);
            return result;
        };

        /**
        * Returns the bounding rect of this rect and the given rect.
        */
        Rect.prototype.united = function (rect) {
            if (this.isNull()) {
                return new Rect(rect);
                ;
            }
            if (rect.isNull()) {
                return new Rect(this);
            }
            var temp;
            var l1 = this.left;
            var r1 = this.right;
            if (r1 < l1) {
                temp = l1;
                l1 = r1;
                r1 = temp;
            }
            var l2 = rect.left;
            var r2 = rect.right;
            if (r2 < l2) {
                temp = l2;
                l2 = r2;
                r2 = temp;
            }
            var t1 = this.top;
            var b1 = this.bottom;
            if (b1 < t1) {
                temp = t1;
                t1 = b1;
                b1 = temp;
            }
            var t2 = rect.top;
            var b2 = rect.bottom;
            if (b2 < t2) {
                temp = t2;
                t2 = b2;
                b2 = temp;
            }
            var result = new Rect();
            result.left = Math.min(l1, l2);
            result.top = Math.min(t1, t2);
            result.right = Math.max(r1, r2);
            result.bottom = Math.max(b1, b2);
            return result;
        };
        return Rect;
    })();
    porcelain.Rect = Rect;
})(porcelain || (porcelain = {}));
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
    * CSS classes common to various components.
    */
    porcelain.CommonClass = {
        /**
        * Added to pressed components.
        */
        Pressed: "p-pressed",
        /**
        * Added to minimized components.
        */
        Minimized: "p-minimized",
        /**
        * Added to maximized components.
        */
        Maximized: "p-maximized",
        /**
        * Added to components which use small font.
        */
        SmallText: "p-small-text",
        /**
        * Added to components which use large font.
        */
        LargeText: "p-large-text"
    };
})(porcelain || (porcelain = {}));
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
    * Create an array of values defined an enum object.
    */
    function enumValues(enumObj) {
        var values = [];
        for (var k in enumObj) {
            var v = enumObj[k];
            if (typeof v === "number") {
                values.push(v);
            }
        }
        return values;
    }
    porcelain.enumValues = enumValues;
})(porcelain || (porcelain = {}));
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
    * An object which provides viewport measurement functions.
    */
    porcelain.Viewport = {
        /**
        * The position of the left edge of the viewport, in pixels.
        *
        * This is equal to the X scroll position of the page.
        */
        left: function () {
            return window.pageXOffset;
        },
        /**
        * The position of the top edge of the viewport, in pixels.
        *
        * This is equal to the Y scroll position of the page.
        */
        top: function () {
            return window.pageYOffset;
        },
        /**
        * The position of the right edge of the viewport, in pixels.
        *
        * This value *does not* include the vertical scrollbar.
        */
        clientRight: function () {
            return this.left() + this.clientWidth();
        },
        /**
        * The position of the bottom edge of the viewport, in pixels.
        *
        * This value *does not* include the horizontal scrollbar.
        */
        clientBottom: function () {
            return this.top() + this.clientHeight();
        },
        /**
        * The width of the viewport, in pixels.
        *
        * This value *does not* include the vertical scrollbar.
        */
        clientWidth: function () {
            return document.documentElement.clientWidth;
        },
        /**
        * The height of the viewport, in pixels.
        *
        * This value *does not* include the horizontal scrollbar.
        */
        clientHeight: function () {
            return document.documentElement.clientHeight;
        },
        /**
        * The position of the right edge of the viewport, in pixels.
        *
        * This value *includes* the vertical scrollbar.
        */
        windowRight: function () {
            return this.left() + this.windowWidth();
        },
        /**
        * The position of the bottom edge of the viewport, in pixels.
        *
        * This value *includes* the horizontal scrollbar.
        */
        windowBottom: function () {
            return this.top() + this.windowHeight();
        },
        /**
        * The width of the viewport, in pixels.
        *
        * This value *include* the vertical scrollbar.
        */
        windowWidth: function () {
            return window.innerWidth;
        },
        /**
        * The height of the viewport, in pixels.
        *
        * This value does *includes* the horizontal scrollbar.
        */
        windowHeight: function () {
            return window.innerHeight;
        }
    };
})(porcelain || (porcelain = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    /*
    * A class which manages an event listener binding.
    *
    * @class
    */
    var EventBinder = (function () {
        /**
        * Construct a new event binder.
        *
        * @param type The event type to bind for the target.
        * @param target The target of the event.
        */
        function EventBinder(type, target) {
            this._proxies = null;
            this._type = type;
            this._target = target;
        }
        /**
        * Destroy the event binder.
        */
        EventBinder.prototype.destroy = function () {
            this.unbind();
            this._target = null;
        };

        /**
        * Returns the event type for the binder.
        */
        EventBinder.prototype.type = function () {
            return this._type;
        };

        /**
        * Returns the event target for the binder.
        */
        EventBinder.prototype.target = function () {
            return this._target;
        };

        /**
        * Bind a listener to the event.
        *
        * If the listener is already attached, this is a no-op.
        *
        * @param listener The event listener to bind to the event.
        * @param [context] The 'this' context to pass to the listener.
        */
        EventBinder.prototype.bind = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            var proxies = this._proxies;
            if (!proxies) {
                proxies = this._proxies = [];
            }
            for (var i = 0, n = proxies.length; i < n; ++i) {
                var p = proxies[i];
                if (p.listener === listener && p.context === context) {
                    return;
                }
            }
            var proxy = new ProxyListener(listener, context);

            // workaround http://typescript.codeplex.com/workitem/45
            this._target.addEventListener(this._type, proxy, false);
            proxies.push(proxy);
        };

        /**
        * Unbind a listener from the event.
        *
        * If the listener is not attached, this is a no-op. If
        * no listener is supplied, all listeners will be unbound.
        *
        * @param [listener] The event listener to bind to the event.
        * @param [context] The 'this' context to pass to the listener.
        */
        EventBinder.prototype.unbind = function (listener, context) {
            if (typeof listener === "undefined") { listener = null; }
            if (typeof context === "undefined") { context = null; }
            var proxies = this._proxies;
            if (!proxies) {
                return;
            }
            if (!listener) {
                var type = this._type;
                var target = this._target;
                for (var i = 0, n = proxies.length; i < n; ++i) {
                    target.removeEventListener(type, proxies[i]);
                }
                this._proxies = null;
                return;
            }
            for (var i = 0, n = proxies.length; i < n; ++i) {
                var p = proxies[i];
                if (p.listener === listener && p.context === context) {
                    // workaround http://typescript.codeplex.com/workitem/45
                    this._target.removeEventListener(this._type, p);
                    this._proxies.splice(i, 1);
                    return;
                }
            }
        };
        return EventBinder;
    })();
    porcelain.EventBinder = EventBinder;

    /**
    * An internal class which implements an event listener proxy.
    */
    var ProxyListener = (function () {
        /**
        * Construct a new proxy listener.
        *
        * @param listener The listener function to invoke.
        * @param context The 'this' context to pass to the listener.
        */
        function ProxyListener(listener, context) {
            this.listener = listener;
            this.context = context;
        }
        /**
        * The event listener dispatch method.
        */
        ProxyListener.prototype.handleEvent = function (event) {
            this.listener.call(this.context, event);
        };
        return ProxyListener;
    })();
})(porcelain || (porcelain = {}));
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
    * The Signal class.
    *
    * A Signal provides a type-safe one-to-many notification mechanism.
    * It allows objects to broadcast information without regard as to
    * whether or not anything is listening.
    *
    * @class
    */
    var Signal = (function () {
        /**
        * Construct a new Signal.
        */
        function Signal() {
            this._connections = null;
        }
        /**
        * Connect a slot to the signal.
        *
        * The slot will be invoked when the signal is emitted. The
        * arguments emitted by the signal will be passed to the slot.
        * If the slot is already connected, this is a no-op.
        *
        * @param slot The function to connect to the signal.
        * @param [context] The context to bind to the function call.
        */
        Signal.prototype.connect = function (slot, context) {
            if (typeof context === "undefined") { context = null; }
            var connections = this._connections;
            if (!connections) {
                connections = this._connections = [];
            }
            for (var i = 0, n = connections.length; i < n; ++i) {
                var conn = connections[i];
                if (conn.slot === slot && conn.context === context) {
                    return;
                }
            }
            connections.push({ slot: slot, context: context });
        };

        /**
        * Disconnect a slot from the signal.
        *
        * If the slot is not connected to the signal, this is a no-op.
        * If no slot is provided, all slots will be disconnected.
        *
        * @param slot - the function to disconnect from the signal.
        * @param [context] The context object provided with the slot.
        */
        Signal.prototype.disconnect = function (slot, context) {
            if (typeof slot === "undefined") { slot = null; }
            if (typeof context === "undefined") { context = null; }
            var connections = this._connections;
            if (!connections) {
                return;
            }
            if (!slot) {
                this._connections = null;
                return;
            }
            for (var i = 0, n = connections.length; i < n; ++i) {
                var conn = connections[i];
                if (conn.slot === slot && conn.context === context) {
                    this._connections.splice(i, 1);
                    return;
                }
            }
        };

        Signal.prototype.emit = function () {
            var connections = this._connections;
            if (!connections || !connections.length) {
                return;
            }
            connections = connections.slice();
            for (var i = 0, n = connections.length; i < n; ++i) {
                var conn = connections[i];
                conn.slot.apply(conn.context, arguments);
            }
        };
        return Signal;
    })();
    porcelain.Signal = Signal;

    
})(porcelain || (porcelain = {}));
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
    * The most base class of porcelain objects.
    *
    * @class
    */
    var Component = (function () {
        /**
        * Construct a new Component.
        */
        function Component() {
            /**
            * A signal emitted when the component is destroyed.
            *
            * @readonly
            */
            this.destroyed = new porcelain.Signal();
            this._parent = null;
            this._children = null;
            this._geometryCache = null;
            this._element = this.createElement();
            this.addClass(Component.Class);
        }
        /**
        * Destroy the component and its children.
        */
        Component.prototype.destroy = function () {
            this.destroyed.emit();
            this.destroyed.disconnect();
            this._detachElement();
            this._destroyChildren();
            this._deparent();
            this._element = null;
        };

        /**
        * Returns the parent Component of this component.
        */
        Component.prototype.parent = function () {
            return this._parent;
        };

        /**
        * Returns the array of child Components of this component.
        */
        Component.prototype.children = function () {
            var children = this._children;
            if (children) {
                return children.slice();
            }
            return [];
        };

        /**
        * Unparent the Component and detach its element from the DOM.
        *
        */
        Component.prototype.detach = function () {
            this._detachElement();
            this._deparent();
        };

        /**
        * Append children to the end of this component.
        *
        * If a component is already a child, it will be moved to the
        * end of the child array. The children *must* be unique.
        *
        * @param [...] The child Components to append.
        */
        Component.prototype.append = function () {
            var children = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                children[_i] = arguments[_i + 0];
            }
            var fragment = this._prepareChildren(children);
            var current = this._children || [];
            this._children = current.concat(children);
            this._element.appendChild(fragment);
        };

        /**
        * Prepend children to the beginning of this component.
        *
        * If a component is already a child, it will be moved to the
        * beginning of the child array. The children *must* be unique.
        *
        * @param [...] The child Components to prepend.
        */
        Component.prototype.prepend = function () {
            var children = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                children[_i] = arguments[_i + 0];
            }
            var fragment = this._prepareChildren(children);
            var current = this._children || [];
            this._children = children.concat(current);
            var element = this._element;
            element.insertBefore(fragment, element.firstChild);
        };

        /**
        * Insert children before the given child.
        *
        * If a component is already a child, it will be moved to the
        * new location in the child array. The before child *must* be
        * a current child. The children *must* be unique.
        *
        * @param before The child marking the insert location.
        * @param [...] The child Components to insert.
        */
        Component.prototype.insertBefore = function (before) {
            var children = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                children[_i] = arguments[_i + 1];
            }
            if (before._parent !== this) {
                throw Error("'before' is not a child of this component.");
            }
            var fragment = this._prepareChildren(children);
            var current = this._children || [];
            var index = current.indexOf(before);
            if (index === -1) {
                this._children = current.concat(children);
                this._element.appendChild(fragment);
            } else {
                var leading = current.slice(0, index);
                var trailing = current.slice(index);
                this._children = leading.concat(children, trailing);
                this._element.insertBefore(fragment, before._element);
            }
        };

        /**
        * Returns the component's internal DOM element.
        */
        Component.prototype.element = function () {
            return this._element;
        };

        /**
        * Returns the id of the component's DOM element.
        */
        Component.prototype.id = function () {
            return this._element.id;
        };

        /**
        * Set the id of the component's DOM element.
        *
        * @param id The id string to apply to the element.
        */
        Component.prototype.setId = function (id) {
            this._element.id = id;
        };

        /**
        * Add a name or names to the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to add to the element.
        */
        Component.prototype.addClass = function (className) {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var newParts = className.match(/\S+/g) || [];
            var newName = _.union(currParts, newParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        };

        /**
        * Remove a name or names from the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to remove from the element.
        */
        Component.prototype.removeClass = function (className) {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var oldParts = className.match(/\S+/g) || [];
            var newName = _.difference(currParts, oldParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        };

        /**
        * Returns the inline style object for the component element.
        */
        Component.prototype.style = function () {
            return this._element.style;
        };

        /**
        * Returns the computed style object for the component element.
        */
        Component.prototype.computedStyle = function () {
            return window.getComputedStyle(this._element);
        };

        /**
        * Returns the CSS display value for the component element.
        */
        Component.prototype.display = function () {
            return window.getComputedStyle(this._element).display;
        };

        /**
        * Set the CSS display value for the component element.
        *
        * @param value The display value to apply to the element.
        */
        Component.prototype.setDisplay = function (value) {
            this._element.style.display = value;
        };

        /**
        * Returns CSS position value for the component element.
        */
        Component.prototype.position = function () {
            return window.getComputedStyle(this._element).position;
        };

        /**
        * Set the CSS position value for the component element.
        *
        * @param value The position value to apply to the element.
        */
        Component.prototype.setPosition = function (value) {
            this._element.style.position = value;
        };

        /**
        * Returns the cached geometry data for the object.
        *
        * This is intended for internal use by the framework. It is
        * subject to change without notice and should not be used
        * directly by user code.
        */
        Component.prototype.cachedGeometry = function () {
            var cache = this._geometryCache;
            if (!cache) {
                cache = this._geometryCache = {
                    rect: null,
                    sizeHint: null,
                    minimumSize: null,
                    maximumSize: null
                };
            }
            return cache;
        };

        /**
        * Returns the preferred size of the component.
        *
        * This computes the natural size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * This should be implemented by subclasses which wish to be
        * used effectively by the procedural layout system.
        *
        * @protected
        */
        Component.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        /**
        * Create the underlying element for the component.
        *
        * The default implementation creates a div.
        *
        * @protected.
        */
        Component.prototype.createElement = function () {
            return document.createElement("div");
        };

        /**
        * A helper method for preparing children to be inserted.
        *
        * @private
        */
        Component.prototype._prepareChildren = function (children) {
            var fragment = document.createDocumentFragment();
            for (var i = 0, n = children.length; i < n; ++i) {
                var child = children[i];
                child._deparent();
                child._parent = this;
                fragment.appendChild(child._element);
            }
            return fragment;
        };

        /**
        * A helper method to detach the DOM element.
        *
        * @private
        */
        Component.prototype._detachElement = function () {
            var element = this._element;
            var parentNode = element.parentNode;
            if (parentNode) {
                parentNode.removeChild(element);
            }
        };

        /**
        * A helper method for destroying the component children.
        *
        * @private
        */
        Component.prototype._destroyChildren = function () {
            var children = this._children;
            if (!children) {
                return;
            }
            this._children = null;
            for (var i = 0, n = children.length; i < n; ++i) {
                children[i].destroy();
            }
        };

        /**
        * A helper method for de-parenting the component.
        *
        * @private
        */
        Component.prototype._deparent = function () {
            var parent = this._parent;
            if (!parent) {
                return;
            }
            this._parent = null;
            var siblings = parent._children;
            if (!siblings) {
                return;
            }
            _.pull(siblings, this);
        };
        Component.Class = "p-Component";
        return Component;
    })();
    porcelain.Component = Component;

    
})(porcelain || (porcelain = {}));
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
    * The maximimum allowed layout width or height of an object.
    */
    porcelain.MAX_LAYOUT_DIM = 1073741823;

    /**
    * The minimum allowed layout size of an object.
    */
    porcelain.MIN_LAYOUT_SIZE = new porcelain.Size(0, 0);

    /**
    * The maximum allowed layout size of an object.
    */
    porcelain.MAX_LAYOUT_SIZE = new porcelain.Size(porcelain.MAX_LAYOUT_DIM, porcelain.MAX_LAYOUT_DIM);

    

    
})(porcelain || (porcelain = {}));
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
    * A class which implements ILayoutItem for a Component.
    *
    * @class
    */
    var ComponentItem = (function () {
        /**
        * Construct a new ComponentItem.
        *
        * @param component The component to manipulate.
        */
        function ComponentItem(component) {
            this._component = component;
        }
        /**
        * Returns the component handled by this item.
        */
        ComponentItem.prototype.component = function () {
            return this._component;
        };

        /**
        * Returns the computed minimum size of the component.
        */
        ComponentItem.prototype.minimumSize = function () {
            var component = this._component;
            var cache = component.cachedGeometry();
            var minSize = cache.minimumSize;
            if (!minSize) {
                var style = component.computedStyle();
                var w = parseInt(style.minWidth) || 0;
                var h = parseInt(style.minHeight) || 0;
                w = Math.min(Math.max(0, w), porcelain.MAX_LAYOUT_DIM);
                h = Math.min(Math.max(0, h), porcelain.MAX_LAYOUT_DIM);
                minSize = cache.minimumSize = new porcelain.Size(w, h);
            }
            return new porcelain.Size(minSize);
        };

        /**
        * Compute the maximum size of the component.
        */
        ComponentItem.prototype.maximumSize = function () {
            var component = this._component;
            var cache = component.cachedGeometry();
            var maxSize = cache.maximumSize;
            if (!maxSize) {
                var style = component.computedStyle();
                var w = parseInt(style.maxWidth) || porcelain.MAX_LAYOUT_DIM;
                var h = parseInt(style.maxHeight) || porcelain.MAX_LAYOUT_DIM;
                w = Math.min(Math.max(0, w), porcelain.MAX_LAYOUT_DIM);
                h = Math.min(Math.max(0, h), porcelain.MAX_LAYOUT_DIM);
                maxSize = cache.maximumSize = new porcelain.Size(w, h);
            }
            return new porcelain.Size(maxSize);
        };

        /**
        * Compute the preferred size of the component.
        */
        ComponentItem.prototype.sizeHint = function () {
            var component = this._component;
            var cache = component.cachedGeometry();
            var sizeHint = cache.sizeHint;
            if (!sizeHint) {
                var ns = this.minimumSize();
                var xs = this.maximumSize();
                var sh = component.sizeHint();
                var w = Math.min(Math.max(ns.width, sh.width), xs.width);
                var h = Math.min(Math.max(ns.height, sh.height), xs.height);
                sizeHint = cache.sizeHint = new porcelain.Size(w, h);
            }
            return new porcelain.Size(sizeHint);
        };

        /**
        * Returns the layout rect of the component.
        */
        ComponentItem.prototype.rect = function () {
            var component = this._component;
            var cache = component.cachedGeometry();
            var rect = cache.rect;
            if (!rect) {
                var elem = component.element();
                var x = elem.offsetLeft;
                var y = elem.offsetTop;
                var w = elem.offsetWidth;
                var h = elem.offsetHeight;
                rect = cache.rect = new porcelain.Rect(x, y, w, h);
            }
            return new porcelain.Rect(rect);
        };

        /**
        * Set the layout rect of the component.
        *
        * @param rect The layout rect to apply to the component.
        */
        ComponentItem.prototype.setRect = function (rect) {
            var min = this.minimumSize();
            var max = this.maximumSize();
            var x = rect.left;
            var y = rect.top;
            var w = Math.min(Math.max(min.width, rect.width()), max.width);
            var h = Math.min(Math.max(min.height, rect.height()), max.height);
            var component = this._component;
            var cache = component.cachedGeometry();
            var style = component.style();
            cache.rect = new porcelain.Rect(x, y, w, h);
            style.left = x + "px";
            style.top = y + "px";
            style.width = w + "px";
            style.height = h + "px";
        };
        return ComponentItem;
    })();
    porcelain.ComponentItem = ComponentItem;
})(porcelain || (porcelain = {}));
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
    * A class for managing the Z-order of a collection of Items.
    *
    * @class
    */
    var ZStack = (function () {
        /**
        * Construct a new ZStack.
        *
        * @param minIndex The minimum Z-index of the stack.
        */
        function ZStack(minIndex) {
            this._stack = [];
            this._minIndex = minIndex;
        }
        /**
        * Returns the component on the top of the stack.
        */
        ZStack.prototype.top = function () {
            if (this._stack.length) {
                return this._stack[this._stack.length - 1];
            }
            return null;
        };

        /**
        * Returns the component on the bottom of the stack.
        */
        ZStack.prototype.bottom = function () {
            if (this._stack.length) {
                return this._stack[0];
            }
            return null;
        };

        /**
        * Returns true if the stack contains the given component.
        *
        * @param component The component of interest.
        */
        ZStack.prototype.contains = function (component) {
            return this._stack.indexOf(component) !== -1;
        };

        /**
        * Add a component to the top of the stack.
        *
        * If the stack already contains the component, this is a no-op.
        *
        * @param component The component to add to the stack.
        */
        ZStack.prototype.add = function (component) {
            if (!component || this.contains(component)) {
                return;
            }
            var index = this._minIndex + this._stack.length;
            this._stack.push(component);
            setZIndex(component, index);
        };

        /**
        * Remove a component from the stack and clear its Z-index.
        *
        * If the stack does not contain the component, this is a no-op.
        */
        ZStack.prototype.remove = function (component) {
            var index = this._stack.indexOf(component);
            if (index >= 0) {
                this._stack.splice(index, 1);
                setZIndex(component, 0);
                this._updateIndices();
            }
        };

        /**
        * Raise the specified components to the top of the stack.
        *
        * The relative stacking order of the components will be maintained.
        */
        ZStack.prototype.raise = function () {
            var components = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                components[_i] = arguments[_i + 0];
            }
            if (components.length === 1 && components[0] === this.top()) {
                return;
            }
            var cr = this._classify(components);
            this._stack = cr.oldComps.concat(cr.newComps);
            this._updateIndices();
        };

        /**
        * Lower the specified components to the bottom of the stack.
        *
        * The relative stacking order of the components will be maintained.
        */
        ZStack.prototype.lower = function () {
            var components = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                components[_i] = arguments[_i + 0];
            }
            if (components.length === 1 && components[0] === this.bottom()) {
                return;
            }
            var cr = this._classify(components);
            this._stack = cr.newComps.concat(cr.oldComps);
            this._updateIndices();
        };

        /**
        * Classify the given and current components into old and new.
        *
        * @private
        */
        ZStack.prototype._classify = function (components) {
            var oldComps = [];
            var newComps = [];
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                var component = stack[i];
                if (components.indexOf(component) === -1) {
                    oldComps.push(component);
                } else {
                    newComps.push(component);
                }
            }
            newComps.sort(function (a, b) {
                return getZIndex(a) - getZIndex(b);
            });
            return { oldComps: oldComps, newComps: newComps };
        };

        /**
        * Update the Z-indices for the current stack components.
        *
        * @private
        */
        ZStack.prototype._updateIndices = function () {
            var minIndex = this._minIndex;
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                setZIndex(stack[i], minIndex + i);
            }
        };
        return ZStack;
    })();
    porcelain.ZStack = ZStack;

    /**
    * A predefinined Z-stack for normal window components.
    */
    porcelain.normalWindowStack = new ZStack(10000);

    /**
    * A predefined Z-stack for top-most window components.
    */
    porcelain.topMostWindowStack = new ZStack(20000);

    /**
    * A predefined Z-stack for popup window components.
    */
    porcelain.popupWindowStack = new ZStack(30000);

    

    /**
    * Get the numeric Z-index of the given component.
    */
    function getZIndex(component) {
        return parseInt(component.computedStyle().zIndex) || 0;
    }

    /**
    * Set the numeric Z-index of the given component.
    */
    function setZIndex(component, index) {
        component.style().zIndex = index ? index.toString() : "";
    }
})(porcelain || (porcelain = {}));
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
    * A basic push button class.
    *
    * This class serves as a base class for more concrete button types.
    *
    * @class
    */
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
        * Construct a new Button instance.
        */
        function Button() {
            _super.call(this);
            /**
            * A signal emitted when the button is clicked.
            *
            * @readonly
            */
            this.clicked = new porcelain.Signal();
            /**
            * A signal emitted when the button is pressed.
            *
            * @readonly
            */
            this.pressed = new porcelain.Signal();
            /**
            * A signal emitted when the button is released.
            *
            * @readonly
            */
            this.released = new porcelain.Signal();
            /**
            * The mousedown event binder.
            *
            * @readonly
            */
            this.evtMouseDown = new porcelain.EventBinder("mousedown", this.element());
            /**
            * The mouseup event binder.
            *
            * @readonly
            */
            this.evtMouseUp = new porcelain.EventBinder("mouseup", document);
            this.addClass(Button.Class);
            this.evtMouseDown.bind(this.onMouseDown, this);
        }
        /**
        * Destroy the button instance.
        */
        Button.prototype.destroy = function () {
            this.clicked.disconnect();
            this.pressed.disconnect();
            this.released.disconnect();
            this.evtMouseDown.destroy();
            this.evtMouseUp.destroy();
            _super.prototype.destroy.call(this);
        };

        /**
        * The mousedown event handler.
        *
        * @protected
        */
        Button.prototype.onMouseDown = function (event) {
            if (event.button === 0) {
                event.preventDefault();

                // This is needed for firefox since event.preventDefault()
                // will prevent the :active CSS class from being applied.
                this.addClass(porcelain.CommonClass.Pressed);
                this.evtMouseUp.bind(this.onMouseUp, this);
                this.pressed.emit();
            }
        };

        /**
        * The mouseup event handler.
        *
        * @protected
        */
        Button.prototype.onMouseUp = function (event) {
            if (event.button === 0) {
                this.removeClass(porcelain.CommonClass.Pressed);
                this.evtMouseUp.unbind(this.onMouseUp, this);
                this.released.emit();
                var rect = new porcelain.Rect(this.element().getBoundingClientRect());
                var point = new porcelain.Point(event.clientX, event.clientY);
                if (rect.contains(point)) {
                    event.preventDefault();
                    this.clicked.emit();
                }
            }
        };
        Button.Class = "p-Button";
        return Button;
    })(porcelain.Component);
    porcelain.Button = Button;
})(porcelain || (porcelain = {}));
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
    * A component for displaying readonly text.
    *
    * @class
    */
    var Label = (function (_super) {
        __extends(Label, _super);
        /**
        * Construct a new Label.
        */
        function Label(text) {
            _super.call(this);
            this.addClass(Label.Class);
            this.addClass(porcelain.CommonClass.SmallText);
            if (text) {
                this.setText(text);
            }
        }
        /**
        * Get the text content of the label.
        */
        Label.prototype.text = function () {
            return this.element().innerHTML;
        };

        /**
        * Set the text content of the label.
        */
        Label.prototype.setText = function (value) {
            // yes, there is a potential XSS vector here
            // but, we need to allow html formatted label text
            // so, sanitizing needs to be handled elsewhere
            this.element().innerHTML = value;
        };
        Label.Class = "p-Label";
        return Label;
    })(porcelain.Component);
    porcelain.Label = Label;
})(porcelain || (porcelain = {}));
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
    * A component which serves as a move grip for a component.
    *
    * @class
    */
    var MoveGrip = (function (_super) {
        __extends(MoveGrip, _super);
        /**
        * Construct a new MoveGrip.
        *
        * @param item The layout item to manipulate with the grip.
        */
        function MoveGrip(target) {
            _super.call(this);
            /**
            * The mousedown event binder.
            *
            * @readonly
            */
            this.evtMouseDown = new porcelain.EventBinder("mousedown", this.element());
            /**
            * The mouseup event binder.
            *
            * @readonly
            */
            this.evtMouseUp = new porcelain.EventBinder("mouseup", document);
            /**
            * The mousemove event binder.
            *
            * @readonly
            */
            this.evtMouseMove = new porcelain.EventBinder("mousemove", document);
            this._offsetX = 0;
            this._offsetY = 0;
            this._target = target;
            this.addClass(MoveGrip.Class);
            this.evtMouseDown.bind(this.onMouseDown, this);
        }
        /**
        * Destroy the MoveGrip.
        */
        MoveGrip.prototype.destroy = function () {
            this.evtMouseDown.destroy();
            this.evtMouseUp.destroy();
            this.evtMouseMove.destroy();
            this._target = null;
            _super.prototype.destroy.call(this);
        };

        /**
        * The target layout item manipulated by the grip.
        */
        MoveGrip.prototype.target = function () {
            return this._target;
        };

        /**
        * The mousedown handler.
        *
        * @protected
        */
        MoveGrip.prototype.onMouseDown = function (event) {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.evtMouseUp.bind(this.onMouseUp, this);
            this.evtMouseMove.bind(this.onMouseMove, this);
            var rect = this._target.rect();
            this._offsetX = event.pageX - rect.left;
            this._offsetY = event.pageY - rect.top;
        };

        /**
        * The mouseup handler.
        *
        * @protected
        */
        MoveGrip.prototype.onMouseUp = function (event) {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.evtMouseUp.unbind(this.onMouseUp, this);
            this.evtMouseMove.unbind(this.onMouseMove, this);
            this._offsetX = 0;
            this._offsetY = 0;
        };

        /**
        * The mousemove handler.
        *
        * @protected
        */
        MoveGrip.prototype.onMouseMove = function (event) {
            event.preventDefault();
            var v = porcelain.Viewport;
            var x = Math.min(Math.max(v.left(), event.pageX), v.windowRight());
            var y = Math.min(Math.max(v.top(), event.pageY), v.windowBottom());
            var rect = this._target.rect();
            rect.moveLeft(x - this._offsetX);
            rect.moveTop(y - this._offsetY);
            this._target.setRect(rect);
        };
        MoveGrip.Class = "p-MoveGrip";
        return MoveGrip;
    })(porcelain.Component);
    porcelain.MoveGrip = MoveGrip;
})(porcelain || (porcelain = {}));
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
    * A component which renders like a canonical push button.
    */
    var PushButton = (function (_super) {
        __extends(PushButton, _super);
        /**
        * Construct a new PushButton.
        */
        function PushButton(text, image) {
            _super.call(this);
            this._textElement = null;
            this._imageElement = null;
            this.addClass(PushButton.Class);
            this.addClass(porcelain.CommonClass.SmallText);
            if (text) {
                this.setText(text);
            }
            if (image) {
                this.setImage(image);
            }
        }
        /**
        * Destroy the PushButton.
        */
        PushButton.prototype.destroy = function () {
            this._textElement = null;
            this._imageElement = null;
            _super.prototype.destroy.call(this);
        };

        /**
        * Returns the text displayed in the push button.
        */
        PushButton.prototype.text = function () {
            var elem = this._textElement;
            return elem ? elem.textContent : "";
        };

        /**
        * Set the text displayed in the push button.
        */
        PushButton.prototype.setText = function (value) {
            if (!value) {
                this._clearText();
            } else {
                this._ensureText().textContent = value;
            }
        };

        /**
        * Returns the source url of the button image.
        */
        PushButton.prototype.image = function () {
            var elem = this._imageElement;
            return elem ? elem.src : "";
        };

        /**
        * Set the source url of the button image.
        */
        PushButton.prototype.setImage = function (image) {
            if (!image) {
                this._clearImage();
            } else {
                this._ensureImage().src = image;
            }
        };

        /**
        * The element creation method.
        *
        * @protected
        */
        PushButton.prototype.createElement = function () {
            var elem = document.createElement("button");
            elem.type = "button";
            return elem;
        };

        /**
        * A helper method for clearing the text element.
        *
        * @private
        */
        PushButton.prototype._clearText = function () {
            var elem = this._textElement;
            if (elem) {
                this.element().removeChild(elem);
                this._textElement = null;
            }
        };

        /**
        * A helper method for creating the text element.
        *
        * @private
        */
        PushButton.prototype._ensureText = function () {
            var elem = this._textElement;
            if (!elem) {
                elem = document.createElement("span");
                elem.className = PushButton.TextClass;
                this.element().appendChild(elem);
                this._textElement = elem;
            }
            return elem;
        };

        /**
        * A helper method for clearing the image element.
        *
        * @private
        */
        PushButton.prototype._clearImage = function () {
            var elem = this._imageElement;
            if (elem) {
                this.element().removeChild(elem);
                this._imageElement = null;
            }
        };

        /**
        * A helper method for creating the image element.
        *
        * @private
        */
        PushButton.prototype._ensureImage = function () {
            var elem = this._imageElement;
            if (!elem) {
                elem = document.createElement("img");
                elem.className = PushButton.ImageClass;
                this.element().appendChild(elem);
                this._imageElement = elem;
            }
            return elem;
        };
        PushButton.Class = "p-PushButton";

        PushButton.TextClass = "p-PushButton-text";

        PushButton.ImageClass = "p-PushButton-image";
        return PushButton;
    })(porcelain.Button);
    porcelain.PushButton = PushButton;
})(porcelain || (porcelain = {}));
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
    * The areas which define the behavior of a size grip.
    */
    (function (GripArea) {
        GripArea[GripArea["Left"] = 0] = "Left";
        GripArea[GripArea["Top"] = 1] = "Top";
        GripArea[GripArea["Right"] = 2] = "Right";
        GripArea[GripArea["Bottom"] = 3] = "Bottom";
        GripArea[GripArea["TopLeft"] = 4] = "TopLeft";
        GripArea[GripArea["TopRight"] = 5] = "TopRight";
        GripArea[GripArea["BottomLeft"] = 6] = "BottomLeft";
        GripArea[GripArea["BottomRight"] = 7] = "BottomRight";
    })(porcelain.GripArea || (porcelain.GripArea = {}));
    var GripArea = porcelain.GripArea;

    /**
    * A widget which enables mouse resizing of an adjustable item.
    *
    * @class
    */
    var SizeGrip = (function (_super) {
        __extends(SizeGrip, _super);
        /**
        * Construct a new SizeGrip.
        *
        * @param gripArea The grip area defining the size grip behavior.
        * @param target The layout item to resize with the grip.
        */
        function SizeGrip(gripArea, target) {
            _super.call(this);
            /**
            * The mousedown event binder.
            */
            this.evtMouseDown = new porcelain.EventBinder("mousedown", this.element());
            /**
            * The mouseup event binder.
            */
            this.evtMouseUp = new porcelain.EventBinder("mouseup", document);
            /**
            * The mousemove event binder.
            */
            this.evtMouseMove = new porcelain.EventBinder("mousemove", document);
            this._offsetX = 0;
            this._offsetY = 0;
            this._gripArea = gripArea;
            this._target = target;
            this.addClass(SizeGrip.Class);
            this.addClass(SizeGrip.GripAreaPrefix + GripArea[gripArea]);
            this.evtMouseDown.bind(this.onMouseDown, this);
        }
        /**
        * Destroy the SizeGrip.
        */
        SizeGrip.prototype.destroy = function () {
            this.evtMouseDown.destroy();
            this.evtMouseUp.destroy();
            this.evtMouseMove.destroy();
            this._target = null;
            _super.prototype.destroy.call(this);
        };

        /**
        * Returns the grip area defining the size grip behavior.
        */
        SizeGrip.prototype.gripArea = function () {
            return this._gripArea;
        };

        /**
        * Returns the target layout item resized by the size grip.
        */
        SizeGrip.prototype.target = function () {
            return this._target;
        };

        /**
        * The mousedown handler.
        *
        * @protected
        */
        SizeGrip.prototype.onMouseDown = function (event) {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.evtMouseUp.bind(this.onMouseUp, this);
            this.evtMouseMove.bind(this.onMouseMove, this);
            var rect = this._target.rect();
            switch (this._gripArea) {
                case 0 /* Left */:
                case 4 /* TopLeft */:
                case 6 /* BottomLeft */:
                    this._offsetX = event.pageX - rect.left;
                    break;
                case 2 /* Right */:
                case 5 /* TopRight */:
                case 7 /* BottomRight */:
                    this._offsetX = event.pageX - rect.right;
                    break;
            }
            switch (this._gripArea) {
                case 1 /* Top */:
                case 4 /* TopLeft */:
                case 5 /* TopRight */:
                    this._offsetY = event.pageY - rect.top;
                    break;
                case 3 /* Bottom */:
                case 6 /* BottomLeft */:
                case 7 /* BottomRight */:
                    this._offsetY = event.pageY - rect.bottom;
                    break;
                default:
                    break;
            }
        };

        /**
        * The mouseup handler.
        *
        * @protected
        */
        SizeGrip.prototype.onMouseUp = function (event) {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.evtMouseUp.unbind(this.onMouseUp, this);
            this.evtMouseMove.unbind(this.onMouseMove, this);
            this._offsetX = 0;
            this._offsetY = 0;
        };

        /**
        * The mousemove handler.
        *
        * @protected
        */
        SizeGrip.prototype.onMouseMove = function (event) {
            event.preventDefault();
            var vp = porcelain.Viewport;
            var target = this._target;
            var rect = target.rect();
            var minSize = target.minimumSize();
            var maxSize = target.maximumSize();
            var x = event.pageX - this._offsetX;
            var y = event.pageY - this._offsetY;
            x = Math.min(Math.max(vp.left(), x), vp.windowRight());
            y = Math.min(Math.max(vp.top(), y), vp.windowBottom());
            var minX, maxX;
            switch (this._gripArea) {
                case 0 /* Left */:
                case 4 /* TopLeft */:
                case 6 /* BottomLeft */:
                    minX = rect.right - maxSize.width;
                    maxX = rect.right - minSize.width;
                    rect.left = Math.min(Math.max(minX, x), maxX);
                    break;
                case 2 /* Right */:
                case 5 /* TopRight */:
                case 7 /* BottomRight */:
                    minX = rect.left + minSize.width;
                    maxX = rect.left + maxSize.width;
                    rect.right = Math.min(Math.max(minX, x), maxX);
                    break;
                default:
                    break;
            }
            var minY, maxY;
            switch (this._gripArea) {
                case 1 /* Top */:
                case 4 /* TopLeft */:
                case 5 /* TopRight */:
                    minY = rect.bottom - maxSize.height;
                    maxY = rect.bottom - minSize.height;
                    rect.top = Math.min(Math.max(minY, y), maxY);
                    break;
                case 3 /* Bottom */:
                case 6 /* BottomLeft */:
                case 7 /* BottomRight */:
                    minY = rect.top + minSize.height;
                    maxY = rect.top + maxSize.height;
                    rect.bottom = Math.min(Math.max(minY, y), maxY);
                    break;
                default:
                    break;
            }
            target.setRect(rect);
        };
        SizeGrip.Class = "p-SizeGrip";

        SizeGrip.GripAreaPrefix = "p-GripArea-";
        return SizeGrip;
    })(porcelain.Component);
    porcelain.SizeGrip = SizeGrip;
})(porcelain || (porcelain = {}));
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
    * An enum defining the available title bar buttons.
    */
    (function (TitleBarButton) {
        TitleBarButton[TitleBarButton["NoButton"] = 0x0] = "NoButton";
        TitleBarButton[TitleBarButton["Close"] = 0x1] = "Close";
        TitleBarButton[TitleBarButton["Maximize"] = 0x2] = "Maximize";
        TitleBarButton[TitleBarButton["Minimize"] = 0x4] = "Minimize";
        TitleBarButton[TitleBarButton["Restore"] = 0x8] = "Restore";
        TitleBarButton[TitleBarButton["Mask"] = 0xF] = "Mask";
    })(porcelain.TitleBarButton || (porcelain.TitleBarButton = {}));
    var TitleBarButton = porcelain.TitleBarButton;

    /**
    * A simple title bar widget for use in a typical window.
    *
    * The title bar is a dumb container widget. The window is
    * responsible for interacting directly with its sub items.
    *
    * @class
    */
    var TitleBar = (function (_super) {
        __extends(TitleBar, _super);
        /**
        * Construct a new TitleBar
        *
        * @param target The layout item to move with the title bar.
        */
        function TitleBar(target) {
            _super.call(this, target);
            this._buttons = 0 /* NoButton */;
            this.addClass(TitleBar.Class);

            var icon = this._icon = new porcelain.Component();
            icon.addClass(TitleBar.IconClass);

            var label = this._label = new porcelain.Label();
            label.addClass(TitleBar.LabelClass);
            label.addClass(porcelain.CommonClass.LargeText);

            var clsBtn = this._closeButton = new porcelain.Button();
            clsBtn.addClass(TitleBar.CloseButtonClass);

            var maxBtn = this._maximizeButton = new porcelain.Button();
            maxBtn.addClass(TitleBar.MaximizeButtonClass);

            var minBtn = this._minimizeButton = new porcelain.Button();
            minBtn.addClass(TitleBar.MinimizeButtonClass);

            var rstBtn = this._restoreButton = new porcelain.Button();
            rstBtn.addClass(TitleBar.RestoreButtonClass);

            var btnBox = this._buttonBox = new porcelain.Component();
            btnBox.addClass(TitleBar.ButtonBoxClass);
            btnBox.append(minBtn, rstBtn, maxBtn, clsBtn);

            // the order is important for CSS float layout
            this.append(icon, btnBox, label);

            this.setButtons(15 /* Mask */ & ~8 /* Restore */);
        }
        /**
        * Destroy the title bar.
        */
        TitleBar.prototype.destroy = function () {
            this._icon = null;
            this._label = null;
            this._minimizeButton = null;
            this._maximizeButton = null;
            this._restoreButton = null;
            this._closeButton = null;
            this._buttonBox = null;
            _super.prototype.destroy.call(this);
        };

        Object.defineProperty(TitleBar.prototype, "closeButtonClicked", {
            /**
            * A signal emitted when the close button is clicked.
            */
            get: function () {
                return this._closeButton.clicked;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TitleBar.prototype, "maximizeButtonClicked", {
            /**
            * A signal emitted when the maximize button is clicked.
            */
            get: function () {
                return this._maximizeButton.clicked;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TitleBar.prototype, "minimizeButtonClicked", {
            /**
            * A signal emitted when the minimize button is clicked.
            */
            get: function () {
                return this._minimizeButton.clicked;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TitleBar.prototype, "restoreButtonClicked", {
            /**
            * A signal emitted when the restore button is clicked.
            */
            get: function () {
                return this._restoreButton.clicked;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns the title text of the title bar.
        */
        TitleBar.prototype.title = function () {
            return this._label.text();
        };

        /**
        * Set the title text of the title bar.
        */
        TitleBar.prototype.setTitle = function (title) {
            this._label.setText(title);
        };

        /**
        * Returns an OR'd combination of visible TitleBarButtons.
        */
        TitleBar.prototype.buttons = function () {
            return this._buttons;
        };

        /**
        * Set the OR'd combination of visible TitleBarButtons.
        */
        TitleBar.prototype.setButtons = function (buttons) {
            this._buttons = buttons & 15 /* Mask */;
            this._closeButton.setDisplay(buttons & 1 /* Close */ ? "" : "none");
            this._maximizeButton.setDisplay(buttons & 2 /* Maximize */ ? "" : "none");
            this._minimizeButton.setDisplay(buttons & 4 /* Minimize */ ? "" : "none");
            this._restoreButton.setDisplay(buttons & 8 /* Restore */ ? "" : "none");
        };

        /**
        * The mousedown handler.
        *
        * This is a reimplemented parent class method. The mouse press
        * is ignored when clicking within the bounds of the button box.
        *
        * @protected
        */
        TitleBar.prototype.onMouseDown = function (event) {
            if (event.button !== 0) {
                return;
            }
            var elem = this._buttonBox.element();
            var rect = new porcelain.Rect(elem.getBoundingClientRect());
            var point = new porcelain.Point(event.clientX, event.clientY);
            if (rect.contains(point)) {
                return;
            }
            _super.prototype.onMouseDown.call(this, event);
        };
        TitleBar.Class = "p-TitleBar";

        TitleBar.IconClass = "p-TitleBar-icon";

        TitleBar.LabelClass = "p-TitleBar-label";

        TitleBar.ButtonBoxClass = "p-TitleBar-buttonBox";

        TitleBar.CloseButtonClass = "p-TitleBar-closeButton";

        TitleBar.MinimizeButtonClass = "p-TitleBar-minimizeButton";

        TitleBar.MaximizeButtonClass = "p-TitleBar-maximizeButton";

        TitleBar.RestoreButtonClass = "p-TitleBar-restoreButton";
        return TitleBar;
    })(porcelain.MoveGrip);
    porcelain.TitleBar = TitleBar;
})(porcelain || (porcelain = {}));
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
    * A top-level Window component.
    *
    * A Window looks and behaves much like its desktop counterpart.
    * It should never be added as the child of another component.
    */
    var Window = (function (_super) {
        __extends(Window, _super);
        /**
        * Construct a new Window.
        */
        function Window() {
            _super.call(this);
            /**
            * The mousedown event handler.
            */
            this.evtMouseDown = new porcelain.EventBinder("mousedown", this.element());
            this._content = null;
            this._windowState = 0 /* Normal */;
            this.addClass(Window.Class);

            // Create the layout item for sizing the window.
            this._item = new porcelain.ComponentItem(this);

            // The children to be added to the window.
            var children = [];

            // The body component which holds the window content.
            var body = this._body = new porcelain.Component();
            body.addClass(Window.BodyClass);
            children.push(body);

            // The size grips for interactive window resizing.
            var gripAreas = porcelain.enumValues(porcelain.GripArea);
            for (var i = 0, n = gripAreas.length; i < n; ++i) {
                var grip = new porcelain.SizeGrip(gripAreas[i], this._item);
                grip.addClass(Window.SizeGripClass);
                children.push(grip);
            }

            // The window title bar.
            var titleBar = this._titleBar = new porcelain.TitleBar(this._item);
            titleBar.addClass(Window.TitleBarClass);
            children.push(titleBar);

            // Connect the title bar button clicked signals.
            titleBar.closeButtonClicked.connect(this.close, this);
            titleBar.maximizeButtonClicked.connect(this.maximize, this);
            titleBar.minimizeButtonClicked.connect(this.minimize, this);
            titleBar.restoreButtonClicked.connect(this.restore, this);

            // Add the window children.
            this.append.apply(this, children);

            // Bind the Window mousedown handler.
            this.evtMouseDown.bind(this.onMouseDown, this);

            // Add the window to the global Z stack.
            porcelain.normalWindowStack.add(this);
        }
        /**
        * Destroy the Window component.
        */
        Window.prototype.destroy = function () {
            porcelain.normalWindowStack.remove(this);
            this.evtMouseDown.destroy();
            this._item = null;
            this._titleBar = null;
            this._body = null;
            this._content = null;
            _super.prototype.destroy.call(this);
        };

        /**
        * Returns the title text in the Window title bar.
        */
        Window.prototype.title = function () {
            return this._titleBar.title();
        };

        /**
        * Set the title text in the Window title bar.
        */
        Window.prototype.setTitle = function (title) {
            this._titleBar.setTitle(title);
        };

        /**
        * Returns the central content component of the window.
        */
        Window.prototype.content = function () {
            return this._content;
        };

        /**
        * Set the central content component of the window.
        *
        * The old window content will be detached from the window.
        *
        * @param content The component to add to the window.
        */
        Window.prototype.setContent = function (content) {
            var old = this._content;
            if (content === old) {
                return;
            }
            if (old) {
                old.detach();
                old.removeClass(Window.ContentClass);
            }
            if (content) {
                content.addClass(Window.ContentClass);
                this._body.append(content);
            }
            this._content = content;
        };

        /**
        * Attach the Window to the given DOM element.
        *
        * If not provided, it will be attached to the document body.
        */
        Window.prototype.attach = function (elem) {
            (elem || document.body).appendChild(this.element());
        };

        /**
        * Raise the window to the top of the Z order.
        */
        Window.prototype.raise = function () {
            porcelain.normalWindowStack.raise(this);
        };

        /**
        * Lower the window to the bottom of the Z order.
        */
        Window.prototype.lower = function () {
            porcelain.normalWindowStack.lower(this);
        };

        /**
        * Maximize the window to fit the browser page.
        */
        Window.prototype.maximize = function () {
            this._setWindowState(2 /* Maximized */);
        };

        /**
        * Restore the window to its normal size.
        */
        Window.prototype.restore = function () {
            this._setWindowState(0 /* Normal */);
        };

        /**
        * Minimize the window to the task bar.
        */
        Window.prototype.minimize = function () {
            this._setWindowState(1 /* Minimized */);
        };

        /**
        * Close the window.
        *
        * This will hide the window and then destroy it.
        */
        Window.prototype.close = function () {
            this.setDisplay("none");
            this.destroy();
        };

        /**
        * The mousedown event handler.
        *
        * @protected
        */
        Window.prototype.onMouseDown = function (event) {
            this.raise();
        };

        /**
        * An internal helper method for setting the window state.
        */
        Window.prototype._setWindowState = function (state) {
            if (state === this._windowState) {
                return;
            }
            this._windowState = state;
            var buttons = 1 /* Close */;
            switch (state) {
                case 0 /* Normal */:
                    buttons |= 4 /* Minimize */;
                    buttons |= 2 /* Maximize */;
                    this.removeClass(porcelain.CommonClass.Maximized);
                    this._item.setRect(this._stored);
                    break;
                case 1 /* Minimized */:
                    buttons |= 2 /* Maximize */;
                    buttons |= 8 /* Restore */;
                    this.removeClass(porcelain.CommonClass.Maximized);
                    this._item.setRect(this._stored);
                    break;
                case 2 /* Maximized */:
                    buttons |= 4 /* Minimize */;
                    buttons |= 8 /* Restore */;
                    this.addClass(porcelain.CommonClass.Maximized);
                    this._stored = this._item.rect();
                    var style = this.style();
                    style.left = "";
                    style.top = "";
                    style.width = "";
                    style.height = "";
                    break;
                default:
                    break;
            }
            this._titleBar.setButtons(buttons);
        };
        Window.Class = "p-Window";

        Window.BodyClass = "p-Window-body";

        Window.SizeGripClass = "p-Window-sizeGrip";

        Window.TitleBarClass = "p-Window-titleBar";

        Window.ContentClass = "p-Window-content";
        return Window;
    })(porcelain.Component);
    porcelain.Window = Window;

    /**
    * An enum defining the window state.
    */
    var WindowState;
    (function (WindowState) {
        WindowState[WindowState["Normal"] = 0] = "Normal";
        WindowState[WindowState["Minimized"] = 1] = "Minimized";
        WindowState[WindowState["Maximized"] = 2] = "Maximized";
    })(WindowState || (WindowState = {}));
})(porcelain || (porcelain = {}));
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
/// <reference path="../thirdparty/lodash.d.ts"/>
/// <reference path="../thirdparty/tsutils.d.ts"/>
/// <reference path="../thirdparty/kiwi.d.ts"/>
/// <reference path="point.ts"/>
/// <reference path="size.ts"/>
/// <reference path="rect.ts"/>
/// <reference path="common.ts"/>
/// <reference path="utils.ts"/>
/// <reference path="viewport.ts"/>
/// <reference path="event_binder.ts"/>
/// <reference path="signal.ts"/>
/// <reference path="component.ts"/>
/// <reference path="layout.ts"/>
/// <reference path="component_item.ts"/>
/// <reference path="z_stack.ts"/>
/// <reference path="button.ts"/>
/// <reference path="label.ts"/>
/// <reference path="move_grip.ts"/>
/// <reference path="push_button.ts"/>
/// <reference path="size_grip.ts"/>
/// <reference path="title_bar.ts"/>
/// <reference path="window.ts"/>
