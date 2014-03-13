/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var Rect = (function () {
        function Rect(rect) {
            if (typeof rect === "undefined") { rect = nullRect(); }
            this.left = rect.x;
            this.top = rect.y;
            this.right = rect.x + rect.width;
            this.bottom = rect.y + rect.height;
        }
        Object.defineProperty(Rect.prototype, "x", {
            get: function () {
                return this.left;
            },
            set: function (pos) {
                this.left = pos;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "y", {
            get: function () {
                return this.top;
            },
            set: function (pos) {
                this.top = pos;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "width", {
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


        Object.defineProperty(Rect.prototype, "topLeft$", {
            get: function () {
                return new porcelain.Point(this.topLeft);
            },
            set: function (point) {
                this.topLeft = point;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "topRight", {
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


        Object.defineProperty(Rect.prototype, "topRight$", {
            get: function () {
                return new porcelain.Point(this.topRight);
            },
            set: function (point) {
                this.topRight = point;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "bottomLeft", {
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


        Object.defineProperty(Rect.prototype, "bottomLeft$", {
            get: function () {
                return new porcelain.Point(this.bottomLeft);
            },
            set: function (point) {
                this.bottomLeft = point;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "bottomRight", {
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


        Object.defineProperty(Rect.prototype, "bottomRight$", {
            get: function () {
                return new porcelain.Point(this.bottomRight);
            },
            set: function (point) {
                this.bottomRight = point;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "center", {
            get: function () {
                var x = this.left + Math.floor(this.width / 2);
                var y = this.top + Math.floor(this.height / 2);
                return { x: x, y: y };
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Rect.prototype, "center$", {
            get: function () {
                return new porcelain.Point(this.center);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Rect.prototype, "size", {
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


        Object.defineProperty(Rect.prototype, "size$", {
            get: function () {
                return new porcelain.Size(this.size);
            },
            set: function (size) {
                this.size = size;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "rect", {
            get: function () {
                return {
                    x: this.left,
                    y: this.top,
                    width: this.right - this.left,
                    height: this.bottom - this.top
                };
            },
            set: function (rect) {
                this.left = rect.x;
                this.top = rect.y;
                this.right = rect.x + rect.width;
                this.bottom = rect.y + rect.height;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "rect$", {
            get: function () {
                return new Rect(this.rect);
            },
            set: function (rect) {
                this.rect = rect;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Rect.prototype, "box", {
            get: function () {
                return {
                    left: this.left,
                    top: this.top,
                    right: this.right,
                    bottom: this.bottom
                };
            },
            set: function (box) {
                this.left = box.left;
                this.top = box.top;
                this.right = box.right;
                this.bottom = box.bottom;
            },
            enumerable: true,
            configurable: true
        });


        Rect.prototype.moveLeft = function (pos) {
            this.right += pos - this.left;
            this.left = pos;
        };

        Rect.prototype.moveTop = function (pos) {
            this.bottom += pos - this.top;
            this.top = pos;
        };

        Rect.prototype.moveRight = function (pos) {
            this.left += pos - this.right;
            this.right = pos;
        };

        Rect.prototype.moveBottom = function (pos) {
            this.top = pos - this.bottom;
            this.bottom = pos;
        };

        Rect.prototype.moveTo = function (point) {
            this.moveTopLeft(point);
        };

        Rect.prototype.moveTopLeft = function (point) {
            this.moveLeft(point.x);
            this.moveTop(point.y);
        };

        Rect.prototype.moveTopRight = function (point) {
            this.moveRight(point.x);
            this.moveTop(point.y);
        };

        Rect.prototype.moveBottomLeft = function (point) {
            this.moveLeft(point.x);
            this.moveBottom(point.y);
        };

        Rect.prototype.moveBottomRight = function (point) {
            this.moveRight(point.x);
            this.moveBottom(point.y);
        };

        Rect.prototype.moveCenter = function (point) {
            this.left = point.x + Math.floor(this.width / 2);
            this.top = point.y + Math.floor(this.height / 2);
        };

        Rect.prototype.isEmpty = function () {
            return this.left >= this.right || this.top >= this.bottom;
        };

        Rect.prototype.isNull = function () {
            return this.left === this.right && this.top === this.bottom;
        };

        Rect.prototype.isValid = function () {
            return this.left < this.right && this.top < this.bottom;
        };

        Rect.prototype.adjust = function (dx1, dy1, dx2, dy2) {
            this.left += dx1;
            this.top += dy1;
            this.right += dx2;
            this.bottom += dy2;
        };

        Rect.prototype.adjusted = function (dx1, dy1, dx2, dy2) {
            var x = this.left + dx1;
            var y = this.top + dy1;
            var w = this.right + dx2 - x;
            var h = this.bottom + dy2 - y;
            return { x: x, y: y, width: w, height: h };
        };

        Rect.prototype.adjusted$ = function (dx1, dy1, dx2, dy2) {
            return new Rect(this.adjusted(dx1, dy2, dx2, dy2));
        };

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

        Rect.prototype.intersects = function (rect) {
            if (this.isNull() || isNull(rect)) {
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

        Rect.prototype.intersected = function (rect) {
            if (this.isNull() || isNull(rect)) {
                return nullRect();
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
                return nullRect();
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
                return nullRect();
            }
            var x = Math.max(l1, l2);
            var y = Math.max(t1, t2);
            var width = Math.min(r1, r2) - x;
            var height = Math.min(b1, b2) - y;
            return { x: x, y: y, width: width, height: height };
        };

        Rect.prototype.intersected$ = function (rect) {
            return new Rect(this.intersected(rect));
        };

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

        Rect.prototype.normalized = function () {
            var temp;
            var l = this.left;
            var r = this.right;
            if (r < l) {
                temp = l;
                l = r;
                r = temp;
            }
            var t = this.top;
            var b = this.bottom;
            if (b < t) {
                temp = t;
                t = b;
                b = temp;
            }
            return { x: l, y: t, width: r - l, height: b - t };
        };

        Rect.prototype.normalized$ = function () {
            return new Rect(this.normalized());
        };

        Rect.prototype.translate = function (dx, dy) {
            this.left += dx;
            this.top += dy;
            this.right += dx;
            this.bottom += dy;
        };

        Rect.prototype.translated = function (dx, dy) {
            var x = this.left + dx;
            var y = this.top + dy;
            var w = this.width;
            var h = this.height;
            return { x: x, y: y, width: w, height: h };
        };

        Rect.prototype.translated$ = function (dx, dy) {
            return new Rect(this.translated(dx, dy));
        };

        Rect.prototype.united = function (rect) {
            if (this.isNull()) {
                return copyRect(rect);
            }
            if (isNull(rect)) {
                return copyRect(this);
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
            var x = Math.min(l1, l2);
            var y = Math.min(t1, t2);
            var width = Math.max(r1, r2) - x;
            var height = Math.max(b1, b2) - y;
            return { x: x, y: y, width: width, height: height };
        };

        Rect.prototype.united$ = function (rect) {
            return new Rect(this.united(rect));
        };
        return Rect;
    })();
    porcelain.Rect = Rect;

    function nullRect() {
        return { x: 0, y: 0, width: 0, height: 0 };
    }

    function copyRect(rect) {
        return {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
        };
    }

    function isNull(rect) {
        return rect.width === 0 || rect.height === 0;
    }
})(porcelain || (porcelain = {}));
//# sourceMappingURL=rect.js.map
