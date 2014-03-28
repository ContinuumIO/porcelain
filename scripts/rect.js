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
    * An implementation of the IRect interface.
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
        Rect.prototype.intersection = function (rect) {
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
            var l = Math.max(l1, l2);
            var t = Math.max(t1, t2);
            var r = Math.min(r1, r2);
            var b = Math.min(b1, b2);
            return new Rect({ left: l, top: t, right: r, bottom: b });
        };

        /**
        * Returns the bounding rect of this rect and the given rect.
        */
        Rect.prototype.union = function (rect) {
            if (this.isNull()) {
                return new Rect(rect);
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
            var l = Math.min(l1, l2);
            var t = Math.min(t1, t2);
            var r = Math.max(r1, r2);
            var b = Math.max(b1, b2);
            return new Rect({ left: l, top: t, right: r, bottom: b });
        };
        return Rect;
    })();
    porcelain.Rect = Rect;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=rect.js.map
