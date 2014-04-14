/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * An interface defining a rectangle in Cartesian space.
     */
    export
    interface IRect {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }


    /**
     * A class represeting a rectangle in Cartesian space.
     *
     * @class
     */
    export
    class Rect implements IRect {

        /**
         * The left edge of the rect, in pixels.
         *
         * Modifying this value will change the width, but will not
         * change the right edge.
         */
        left: number;

        /**
         * The top edge of the rect, in pixels.
         *
         * Modifying this value will change the height, but will not
         * change the bottom edge.
         */
        top: number;

        /**
         * The right edge of the rect, in pixels.
         *
         * Modifying this value will change the width, but will not
         * change the left edge.
         */
        right: number;

        /**
         * The bottom edge of the rect, in pixel.
         *
         * Modifying this value will change the height, but will not
         * change the bottom edge.
         */
        bottom: number;

        /**
         * Construct a new Rect.
         */
        constructor();
        constructor(rect: IRect);
        constructor(topLeft: IPoint, bottomRight: IPoint);
        constructor(x: number, y: number, width: number, height: number);
        constructor(arg1?: any, arg2?: any, arg3?: any, arg4?: any){
            switch (arguments.length) {
                case 0:
                    this.left = 0;
                    this.top = 0;
                    this.right = 0;
                    this.bottom = 0;
                    break;
                case 1:
                    this.left = (<IRect>arg1).left;
                    this.top = (<IRect>arg1).top;
                    this.right = (<IRect>arg1).right;
                    this.bottom = (<IRect>arg1).bottom;
                    break;
                case 2:
                    this.left = (<IPoint>arg1).x;
                    this.top = (<IPoint>arg1).y;
                    this.right = (<IPoint>arg2).x;
                    this.bottom = (<IPoint>arg2).y;
                    break;
                case 4:
                    this.left = <number>arg1;
                    this.top = <number>arg2
                    this.right = this.left + <number>arg3;
                    this.bottom = this.top + <number>arg4;
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
        width(): number {
            return this.right - this.left;
        }

        /**
         * Set the width of the rect.
         *
         * This will move the right edge.
         */
        setWidth(width: number): void {
            this.right = this.left + width;
        }

        /**
         * Returns the height of the rect.
         *
         * This is Equivalent to `bottom - top`.
         */
        height(): number {
            return this.bottom - this.top;
        }

        /**
         * Set the height of the rect.
         *
         * This will move the bottom edge.
         */
        setHeight(height: number) {
            this.bottom = this.top + height;
        }

        /**
         * Returns the size of the rect.
         */
        size(): Size {
            return new Size(this.width(), this.height());
        }

        /**
         * Set the size of the rect.
         *
         * This will move the left and right edges.
         */
        setSize(size: Size) {
            this.setWidth(size.width);
            this.setHeight(size.height);
        }

        /**
         * Returns the top left corner of the rect.
         */
        topLeft(): Point {
            return new Point(this.left, this.top);
        }

        /**
         * Set the top left corner of the rect.
         *
         * This will change the width and height, but will not change
         * change the right or bottom edges.
         */
        setTopLeft(point: Point) {
            this.left = point.x;
            this.top = point.y;
        }

        /**
         * Returns the top right corner of the rect.
         */
        topRight(): Point {
            return new Point(this.right, this.top);
        }

        /**
         * Set the top right corner of the rect.
         *
         * This will change the width and height, but will not change
         * the left or bottom edges.
         */
        setTopRight(point: Point) {
            this.right = point.x;
            this.top = point.y;
        }

        /**
         * Returns bottom left corner of the rect.
         */
        bottomLeft(): Point {
            return new Point(this.left, this.bottom);
        }

        /**
         * Set the bottom left corner of the rect.
         *
         * This will change the width and height, but will not change
         * the right or top edges.
         */
        setBottomLeft(point: Point) {
            this.left = point.x;
            this.bottom = point.y;
        }

        /**
         * Returns bottom right corner of the rect.
         */
        bottomRight(): Point {
            return new Point(this.right, this.bottom);
        }

        /** Set the bottom right corner of the rect.
         *
         * This will change the width and height, but will not change
         * the left or top edges.
         */
        setBottomRight(point: Point) {
            this.right = point.x;
            this.bottom = point.y;
        }

        /**
         * Returns the center point of the rect.
         */
        center(): Point {
            var x = this.left + Math.floor(this.width() / 2);
            var y = this.top + Math.floor(this.height() / 2);
            return new Point(x, y);
        }

        /**
         * Move the left edge of the rect.
         *
         * This will change the right edge, but will not change
         * the width.
         */
        moveLeft(pos: number): void {
            this.right += pos - this.left;
            this.left = pos;
        }

        /**
         * Move the top edge of the rect.
         *
         * This will change the bottom edge, but will not change
         * the height.
         */
        moveTop(pos: number): void {
            this.bottom += pos - this.top;
            this.top = pos;
        }

        /**
         * Move the right edge of the rect.
         *
         * This will change the left edge, but will not change
         * the width.
         */
        moveRight(pos: number): void {
            this.left += pos - this.right;
            this.right = pos;
        }

        /**
         * Move the bottom edge of the rect.
         *
         * This will change the top edge, but will not change the
         * height.
         */
        moveBottom(pos: number): void {
            this.top = pos - this.bottom;
            this.bottom = pos;
        }

        /**
         * Move the top left corner of the rect.
         *
         * This is equivalent to moving the top and left edges.
         */
        moveTopLeft(point: Point): void {
            this.moveLeft(point.x);
            this.moveTop(point.y);
        }

        /**
         * Move the top right corner of the rect.
         *
         * This is equivalent to moving the top and right edges.
         */
        moveTopRight(point: Point): void {
            this.moveRight(point.x);
            this.moveTop(point.y);
        }

        /**
         * Move the bottom left corner of the rect.
         *
         * This is equivalent to moving the bottom and left edges.
         */
        moveBottomLeft(point: Point): void {
            this.moveLeft(point.x);
            this.moveBottom(point.y);
        }

        /**
         * Move the bottom right corner of the rect.
         *
         * This is equivalent to moving the bottom and right edges.
         */
        moveBottomRight(point: Point): void {
            this.moveRight(point.x);
            this.moveBottom(point.y);
        }

        /**
         * Move the center point of the rect.
         *
         * This will not change the width or height.
         */
        moveCenter(point: Point): void {
            this.moveLeft(point.x + Math.floor(this.width() / 2));
            this.moveTop(point.y + Math.floor(this.height() / 2));
        }

        /**
         * Returns true if the width OR height is zero or negative.
         */
        isEmpty(): boolean {
            return this.left >= this.right || this.top >= this.bottom;
        }

        /**
         * Returns true if the width AND height are zero.
         */
        isNull(): boolean {
            return this.left === this.right && this.top === this.bottom;
        }

        /**
         * Returns true the width AND height are positive non-zero.
         */
        isValid(): boolean {
            return this.left < this.right && this.top < this.bottom;
        }

        /**
         * Returns true if this rect is equivalent to another.
         */
        equals(other: Rect): boolean {
            return this.left == other.left &&
                this.top == other.top &&
                this.right == other.right &&
                this.bottom == other.bottom;
        }

        /**
         * Adjust the rect edges by the given deltas.
         */
        adjust(dx1: number, dy1: number, dx2: number, dy2: number): void {
            this.left += dx1;
            this.top += dy1;
            this.right += dx2;
            this.bottom += dy2;
        }

        /**
         * Returns a new rect adjusted by the given deltas.
         */
        adjusted(dx1: number, dy1: number, dx2: number, dy2: number): Rect {
            var rect = new Rect(this);
            rect.adjust(dx1, dy1, dx2, dy2);
            return rect;
        }

        /**
         * Normalize the rect so that right >= left and bottom >= top.
         */
        normalize(): void {
            var temp: number;
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
        }

        /**
         * Returns a new rect with normalized edges.
         */
        normalized(): Rect {
            var rect = new Rect(this);
            rect.normalize();
            return rect;
        }

        /**
         * Translate the rect by the given deltas.
         */
        translate(dx: number, dy: number): void {
            this.left += dx;
            this.top += dy;
            this.right += dx;
            this.bottom += dy;
        }

        /**
         * Returns a new rect translated by the given deltas.
         */
        translated(dx: number, dy: number): Rect {
            var rect = new Rect(this);
            rect.translate(dx, dy);
            return rect;
        }

        /**
         * Returns true if this rect contains the given point.
         */
        contains(point: Point): boolean {
            if (this.isNull()) {
                return false;
            }
            var temp: number;
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
        }

        /**
         * Returns true if this rect intersects the given rect.
         */
        intersects(rect: Rect): boolean {
            if (this.isNull() || rect.isNull()) {
                return false;
            }
            var temp: number;
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
        }

        /**
         * Returns the bounding rect of this rect and the given rect.
         */
        intersectected(rect: Rect): Rect {
            if (this.isNull() || rect.isNull()) {
                return new Rect();
            }
            var temp: number;
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
        }

        /**
         * Returns the bounding rect of this rect and the given rect.
         */
        united(rect: Rect): Rect {
            if (this.isNull()) {
                return new Rect(rect);;
            }
            if (rect.isNull()) {
                return new Rect(this);
            }
            var temp: number;
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
        }
    }

}
