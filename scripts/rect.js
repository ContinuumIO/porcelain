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


        Object.defineProperty(Rect.prototype, "center", {
            get: function () {
                var x = this.left + Math.floor(this.width / 2);
                var y = this.top + Math.floor(this.height / 2);
                return { x: x, y: y };
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
            this.moveLeft(point.x + Math.floor(this.width / 2));
            this.moveTop(point.y + Math.floor(this.height / 2));
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
            var rect = new Rect(this);
            rect.adjust(dx1, dy1, dx2, dy2);
            return rect;
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
            var rect = new Rect(this);
            rect.normalize();
            return rect;
        };

        Rect.prototype.translate = function (dx, dy) {
            this.left += dx;
            this.top += dy;
            this.right += dx;
            this.bottom += dy;
        };

        Rect.prototype.translated = function (dx, dy) {
            var rect = new Rect(this);
            rect.translate(dx, dy);
            return rect;
        };

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
