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

        constructor();
        constructor(box: IBox);
        constructor(rect: IRect);
        constructor(topLeft: IPoint, size: ISize);
        constructor(topLeft: IPoint, bottomRight: IPoint);
        constructor(x: number, y: number, width: number, height: number);
        constructor(first?, second?, third?, fourth?) {
            switch (arguments.length) {
                case 0:
                    this.left = 0;
                    this.top = 0;
                    this.right = 0;
                    this.bottom = 0;
                    break;
                case 1:
                    if (first.left === undefined) {
                        var rect = <IRect>first;
                        this.left = rect.x;
                        this.top = rect.y;
                        this.right = rect.x + rect.width;
                        this.bottom = rect.y + rect.height;
                    } else {
                        var box = <IBox>first;
                        this.left = box.left;
                        this.top = box.top;
                        this.right = box.right;
                        this.bottom = box.bottom;
                    }
                    break;
                case 2:
                    if (second.x === undefined) {
                        var topLeft = <IPoint>first;
                        var size = <ISize>second;
                        this.left = first.x;
                        this.top = first.y;
                        this.right = first.x + size.width;
                        this.bottom = first.y + size.height;
                    } else {
                        var topLeft = <IPoint>first;
                        var bottomRight = <IPoint>second;
                        this.left = topLeft.x;
                        this.top = topLeft.y;
                        this.right = bottomRight.x;
                        this.bottom = bottomRight.y;
                    }
                    break;
                case 4:
                    var x = <number>first;
                    var y = <number>second;
                    var width = <number>third;
                    var height = <number>fourth;
                    this.left = x;
                    this.top = y;
                    this.right = x + width;
                    this.bottom = y + height;
                    break;
                default:
                    throw "invalid constructor call";
            }
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

        get topRight(): IPoint {
            return { x: this.right, y: this.top };
        }

        set topRight(point: IPoint) {
            this.right = point.x;
            this.top = point.y;
        }

        get bottomLeft(): IPoint {
            return { x: this.left, y: this.bottom };
        }

        set bottomLeft(point: IPoint) {
            this.left = point.x;
            this.bottom = point.y;
        }

        get bottomRight(): IPoint {
            return { x: this.right, y: this.bottom };
        }

        set bottomRight(point: IPoint) {
            this.right = point.x;
            this.bottom = point.y;
        }

        get center(): IPoint {
            var x = this.left + Math.floor(this.width / 2);
            var y = this.top + Math.floor(this.height / 2);
            return { x: x, y: y };
        }

        get size(): ISize {
            return { width: this.width, height: this.height };
        }

        set size(size: ISize) {
            this.width = size.width;
            this.height = size.height;
        }

        get rect(): IRect {
            return {
                x: this.left,
                y: this.top,
                width: this.right - this.left,
                height: this.bottom - this.top,
            };
        }

        set rect(rect: IRect) {
            this.left = rect.x;
            this.top = rect.y;
            this.right = rect.x + rect.width;
            this.bottom = rect.y + rect.height;
        }

        get box(): IBox {
            return {
                left: this.left,
                top: this.top,
                right: this.right,
                bottom: this.bottom
            };
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
            this.moveLeft(point.x + Math.floor(this.width / 2));
            this.moveTop(point.y + Math.floor(this.height / 2));
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

        adjusted(dx1: number, dy1: number, dx2: number, dy2: number): Rect {
            var rect = new Rect(this);
            rect.adjust(dx1, dy1, dx2, dy2);
            return rect;
        }

        contains(point: IPoint): boolean {
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

        intersected(rect: IRect): Rect {
            if (this.isNull()) {
                return new Rect();
            }
            if (rect.width === 0 && rect.height === 0) {
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
        }

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

        normalized(): Rect {
            var rect = new Rect(this);
            rect.normalize();
            return rect;
        }

        translate(dx: number, dy: number): void {
            this.left += dx;
            this.top += dy;
            this.right += dx;
            this.bottom += dy;
        }

        translated(dx: number, dy: number): Rect {
            var rect = new Rect(this);
            rect.translate(dx, dy);
            return rect;
        }

        united(rect: IRect): Rect {
            if (this.isNull()) {
                return new Rect(rect);
            }
            if (rect.width === 0 && rect.height === 0) {
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
        }
    }

}
