/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Rect implements IRect, IBox {

        left: number;
        top: number;
        right: number;
        bottom: number;

        constructor(rect: IRect = { x: 0, y: 0, width: 0, height: 0 }) {
            this.left = rect.x;
            this.top = rect.y;
            this.right = rect.x + rect.width;
            this.bottom = rect.y + rect.height;
        }

        get x(): number {
            return this.left;
        }

        set x(pos: number) {
            this.left = pos;
        }

        get y(): number {
            return this.top;
        }

        set y(pos: number) {
            this.top = pos;
        }

        get width(): number {
            return this.right - this.left;
        }

        set width(width: number) {
            this.right = this.left + width;
        }

        get height(): number {
            return this.bottom - this.top;
        }

        set height(height: number) {
            this.bottom = this.top + height;
        }

        get topLeft(): IPoint {
            return { x: this.left, y: this.top };
        }

        set topLeft(point: IPoint) {
            this.left = point.x;
            this.top = point.y;
        }

        get topLeft$(): Point {
            return new Point(this.topLeft);
        }

        set topLeft$(point: Point) {
            this.topLeft = point;
        }

        get topRight(): IPoint {
            return { x: this.right, y: this.top };
        }

        set topRight(point: IPoint) {
            this.right = point.x;
            this.top = point.y;
        }

        get topRight$(): Point {
            return new Point(this.topRight);
        }

        set topRight$(point: Point) {
            this.topRight = point;
        }

        get bottomLeft(): IPoint {
            return { x: this.left, y: this.bottom };
        }

        set bottomLeft(point: IPoint) {
            this.left = point.x;
            this.bottom = point.y;
        }

        get bottomLeft$(): Point {
            return new Point(this.bottomLeft);
        }

        set bottomLeft$(point: Point) {
            this.bottomLeft = point;
        }

        get bottomRight(): IPoint {
            return { x: this.right, y: this.bottom };
        }

        set bottomRight(point: IPoint) {
            this.right = point.x;
            this.bottom = point.y;
        }

        get bottomRight$(): Point {
            return new Point(this.bottomRight);
        }

        set bottomRight$(point: Point) {
            this.bottomRight = point;
        }

        get center(): IPoint {
            var x = this.left + Math.floor(this.width / 2);
            var y = this.top + Math.floor(this.height / 2);
            return { x: x, y: y };
        }

        get center$(): Point {
            return new Point(this.center);
        }

        get size(): ISize {
            return { width: this.width, height: this.height };
        }

        set size(size: ISize) {
            this.width = size.width;
            this.height = size.height;
        }

        get size$(): Size {
            return new Size(this.size);
        }

        set size$(size: Size) {
            this.size = size;
        }

        get rect(): IRect {
            var x = this.left;
            var y = this.top;
            var w = this.width;
            var h = this.height;
            return { x: x, y: y, width: w, height: h };
        }

        set rect(rect: IRect) {
            this.left = rect.x;
            this.top = rect.y;
            this.right = rect.x + rect.width;
            this.bottom = rect.y + rect.height;
        }

        get rect$(): Rect {
            return new Rect(this.rect);
        }

        set rect$(rect: Rect) {
            this.rect = rect;
        }

        get box(): IBox {
            var l = this.left;
            var t = this.top;
            var r = this.right;
            var b = this.bottom;
            return { left: l, top: t, right: r, bottom: b };
        }

        set box(box: IBox) {
            this.left = box.left;
            this.top = box.top;
            this.right = box.right;
            this.bottom = box.bottom;
        }

        moveLeft(pos: number): void {
            this.right += pos - this.left;
            this.left = pos;
        }

        moveTop(pos: number): void {
            this.bottom += pos - this.top;
            this.top = pos;
        }

        moveRight(pos: number): void {
            this.left += pos - this.right;
            this.right = pos;
        }

        moveBottom(pos: number): void {
            this.top = pos - this.bottom;
            this.bottom = pos;
        }

        moveTo(point: IPoint): void {
            this.moveTopLeft(point);
        }

        moveTopLeft(point: IPoint): void {
            this.moveLeft(point.x);
            this.moveTop(point.y);
        }

        moveTopRight(point: IPoint): void {
            this.moveRight(point.x);
            this.moveTop(point.y);
        }

        moveBottomLeft(point: IPoint): void {
            this.moveLeft(point.x);
            this.moveBottom(point.y);
        }

        moveBottomRight(point: IPoint): void {
            this.moveRight(point.x);
            this.moveBottom(point.y);
        }

        moveCenter(point: IPoint): void {
            this.left = point.x + Math.floor(this.width / 2);
            this.top = point.y + Math.floor(this.height / 2);
        }

        isEmpty(): boolean {
            return this.left >= this.right || this.top >= this.bottom;
        }

        isNull(): boolean {
            return this.left === this.right && this.top === this.bottom;
        }

        isValid(): boolean {
            return this.left < this.right && this.top < this.bottom;
        }

        adjust(dx1: number, dy1: number, dx2: number, dy2: number): void {
            this.left += dx1;
            this.top += dy1;
            this.right += dx2;
            this.bottom += dy2;
        }

        adjusted(dx1: number, dy1: number, dx2: number, dy2: number): IRect {
            var x = this.left + dx1;
            var y = this.top + dy1;
            var w = this.right + dx2 - x;
            var h = this.bottom + dy2 - y;
            return { x: x, y: y, width: w, height: h };
        }

        adjusted$(dx1: number, dy1: number, dx2: number, dy2: number): Rect {
            return new Rect(this.adjusted(dx1, dy2, dx2, dy2));
        }

        contains(point: IPoint): boolean {
            if (this.isNull()) {
                return false;
            }
            var temp: number
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

        intersects(rect: IRect): boolean {
            if (this.isNull()) {
                return false;
            }
            if (rect.width === 0 && rect.height === 0) {
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
        }

        /*
        intersected
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

        normalized(): IRect {
            var temp: number;
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
        }

        normalized$(): Rect {
            return new Rect(this.normalized());
        }

        translate(dx: number, dy: number): void {
            this.left += dx;
            this.top += dy;
            this.right += dx;
            this.bottom += dy;
        }

        translated(dx: number, dy: number): IRect {
            var x = this.left + dx;
            var y = this.top + dy;
            var w = this.width;
            var h = this.height;
            return { x: x, y: y, width: w, height: h };
        }

        translated$(dx: number, dy: number): Rect {
            return new Rect(this.translated(dx, dy));
        }

        /*
        united

        */
    }

}