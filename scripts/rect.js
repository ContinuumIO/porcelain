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
    * An implementation of IBox and IRect
    */
    var Rect = (function () {
        function Rect(first, second, third, fourth) {
            switch (arguments.length) {
                case 0:
                    this.left = 0;
                    this.top = 0;
                    this.right = 0;
                    this.bottom = 0;
                    break;
                case 1:
                    if (first.left === undefined) {
                        var rect = first;
                        this.left = rect.x;
                        this.top = rect.y;
                        this.right = rect.x + rect.width;
                        this.bottom = rect.y + rect.height;
                    } else {
                        var box = first;
                        this.left = box.left;
                        this.top = box.top;
                        this.right = box.right;
                        this.bottom = box.bottom;
                    }
                    break;
                case 2:
                    if (second.x === undefined) {
                        var topLeft = first;
                        var size = second;
                        this.left = first.x;
                        this.top = first.y;
                        this.right = first.x + size.width;
                        this.bottom = first.y + size.height;
                    } else {
                        var topLeft = first;
                        var bottomRight = second;
                        this.left = topLeft.x;
                        this.top = topLeft.y;
                        this.right = bottomRight.x;
                        this.bottom = bottomRight.y;
                    }
                    break;
                case 4:
                    var x = first;
                    var y = second;
                    var width = third;
                    var height = fourth;
                    this.left = x;
                    this.top = y;
                    this.right = x + width;
                    this.bottom = y + height;
                    break;
                default:
                    throw "invalid constructor call";
            }
        }
        Object.defineProperty(Rect.prototype, "x", {
            /**
            * The X-coordinate of the rect.
            *
            * This is equivalent to `left`. Modifying this value will
            * change the right edge, but will not change the width.
            */
            get: function () {
                return this.left;
            },
            set: function (pos) {
                this.moveLeft(pos);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "y", {
            /**
            * The Y-coordinate of the rect.
            *
            * This is equivalent to `top`. Modifying this value will
            * change the bottom edge, but will not change the height.
            */
            get: function () {
                return this.top;
            },
            set: function (pos) {
                this.moveTop(pos);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "width", {
            /**
            * The width of the rect.
            *
            * This is equivalent to `right - left`. Modifying this value
            * will change the right edge.
            */
            get: function () {
                return this.right - this.left;
            },
            set: function (width) {
                this.right = this.left + width;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "height", {
            /**
            * The height of the rect.
            *
            * This is equivalent to `bottom - top`. Modifying this value
            * will change the bottom edge.
            */
            get: function () {
                return this.bottom - this.top;
            },
            set: function (height) {
                this.bottom = this.top + height;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "topLeft", {
            /**
            * The top left corner of the rect.
            *
            * Modifying this value will change the width and height but
            * will not change the right or bottom edge.
            */
            get: function () {
                return { x: this.left, y: this.top };
            },
            set: function (point) {
                this.left = point.x;
                this.top = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "topRight", {
            /**
            * The top right corner of the rect.
            *
            * Modifying this value will change the width and height but
            * will not change the left or bottom edge.
            */
            get: function () {
                return { x: this.right, y: this.top };
            },
            set: function (point) {
                this.right = point.x;
                this.top = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "bottomLeft", {
            /**
            * The bottom left corner of the rect.
            *
            * Modifying this value will change the width and height but
            * will not change the top or right edge.
            */
            get: function () {
                return { x: this.left, y: this.bottom };
            },
            set: function (point) {
                this.left = point.x;
                this.bottom = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "bottomRight", {
            /**
            * The bottom right corner of the rect.
            *
            * Modifying this value will change the width and height but
            * will not change the top or left edge.
            */
            get: function () {
                return { x: this.right, y: this.bottom };
            },
            set: function (point) {
                this.right = point.x;
                this.bottom = point.y;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "center", {
            /**
            * The center point of the rect.
            *
            * @readonly
            */
            get: function () {
                var x = this.left + Math.floor(this.width / 2);
                var y = this.top + Math.floor(this.height / 2);
                return { x: x, y: y };
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Rect.prototype, "pos", {
            /**
            * The position of the rect.
            *
            * This is equivalent to `topLeft`. Modifying this value will
            * change the right and bottom edges but will not change the
            * width or height.
            */
            get: function () {
                return this.topLeft;
            },
            set: function (point) {
                this.moveTopLeft(point);
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "size", {
            /**
            * The size of the rect.
            *
            * Modifying this value will change the right and bottom
            * edges but will not change the left or top edge.
            */
            get: function () {
                return { width: this.width, height: this.height };
            },
            set: function (size) {
                this.width = size.width;
                this.height = size.height;
            },
            enumerable: true,
            configurable: true
        });


        /**
        * Move the left edge of the rect.
        *
        * This will not change the width of the rect.
        *
        * @param pos - the new location of the left edge
        */
        Rect.prototype.moveLeft = function (pos) {
            this.right += pos - this.left;
            this.left = pos;
        };

        /**
        * Move the top edge of the rect.
        *
        * This will not change the height of the rect.
        *
        * @param pos - the new location of the top edge
        */
        Rect.prototype.moveTop = function (pos) {
            this.bottom += pos - this.top;
            this.top = pos;
        };

        /**
        * Move the right edge of the rect.
        *
        * This will not change the width of the rect.
        *
        * @param pos - the new location of the right edge
        */
        Rect.prototype.moveRight = function (pos) {
            this.left += pos - this.right;
            this.right = pos;
        };

        /**
        * Move the bottom edge of the rect.
        *
        * This will not change the height of the rect.
        *
        * @param pos - the new location of the bottom edge
        */
        Rect.prototype.moveBottom = function (pos) {
            this.top = pos - this.bottom;
            this.bottom = pos;
        };

        /**
        * Move the top left corner of the rect.
        *
        * This is equivalent to moving the top and left edges
        * separately.
        *
        * @param point - the new location of the corner
        */
        Rect.prototype.moveTopLeft = function (point) {
            this.moveLeft(point.x);
            this.moveTop(point.y);
        };

        /**
        * Move the top right corner of the rect.
        *
        * This is equivalent to moving the top and right edges
        * separately.
        *
        * @param point - the new location of the corner
        */
        Rect.prototype.moveTopRight = function (point) {
            this.moveRight(point.x);
            this.moveTop(point.y);
        };

        /**
        * Move the bottom left corner of the rect.
        *
        * This is equivalent to moving the bottom and left edges
        * separately.
        *
        * @param point - the new location of the corner
        */
        Rect.prototype.moveBottomLeft = function (point) {
            this.moveLeft(point.x);
            this.moveBottom(point.y);
        };

        /**
        * Move the bottom right corner of the rect.
        *
        * This is equivalent to moving the bottom and right edges
        * separately.
        *
        * @param point - the new location of the corner
        */
        Rect.prototype.moveBottomRight = function (point) {
            this.moveRight(point.x);
            this.moveBottom(point.y);
        };

        /**
        * Move the center point of the rect.
        *
        * This will not change the width or height.
        *
        * @param point - the new center point of the rect
        */
        Rect.prototype.moveCenter = function (point) {
            this.moveLeft(point.x + Math.floor(this.width / 2));
            this.moveTop(point.y + Math.floor(this.height / 2));
        };

        /**
        * Whether the width OR height is zero or negative.
        */
        Rect.prototype.isEmpty = function () {
            return this.left >= this.right || this.top >= this.bottom;
        };

        /**
        * Whether the width AND height are zero.
        */
        Rect.prototype.isNull = function () {
            return this.left === this.right && this.top === this.bottom;
        };

        /**
        * Whether the width AND height are positive non-zero.
        */
        Rect.prototype.isValid = function () {
            return this.left < this.right && this.top < this.bottom;
        };

        /**
        * Add the given deltas to the left, top, right and bottom edges.
        */
        Rect.prototype.adjust = function (dx1, dy1, dx2, dy2) {
            this.left += dx1;
            this.top += dy1;
            this.right += dx2;
            this.bottom += dy2;
        };

        /**
        * Create a new rect with edges adjusted by the given deltas.
        */
        Rect.prototype.adjusted = function (dx1, dy1, dx2, dy2) {
            var rect = new Rect(this);
            rect.adjust(dx1, dy1, dx2, dy2);
            return rect;
        };

        /**
        * Test whether this rect contains the given point.
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
        * Test whether this rect intersects the given rect.
        */
        Rect.prototype.intersects = function (rect) {
            if (this.isNull()) {
                return false;
            }
            if (rect.width === 0 && rect.height === 0) {
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
            var l2 = rect.x;
            var r2 = l2 + rect.width;
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
            var t2 = rect.y;
            var b2 = t2 + rect.height;
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
        * The intersection of this rect with the given rect.
        */
        Rect.prototype.intersected = function (rect) {
            if (this.isNull()) {
                return new Rect();
            }
            if (rect.width === 0 && rect.height === 0) {
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
            var l2 = rect.x;
            var r2 = l2 + rect.width;
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
            var t2 = rect.y;
            var b2 = t2 + rect.height;
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
        * Create a new rect with normalized edges.
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
        * Create a new rect translated by the given deltas.
        */
        Rect.prototype.translated = function (dx, dy) {
            var rect = new Rect(this);
            rect.translate(dx, dy);
            return rect;
        };

        /**
        * The bounding rect of this rect and the given rect.
        */
        Rect.prototype.united = function (rect) {
            if (this.isNull()) {
                return new Rect(rect);
            }
            if (rect.width === 0 && rect.height === 0) {
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
            var l2 = rect.x;
            var r2 = l2 + rect.width;
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
            var t2 = rect.y;
            var b2 = t2 + rect.height;
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
