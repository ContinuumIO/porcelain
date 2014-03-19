/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var ITEM_CLASS = "porcelain-Item";

    var MIN_ITEM_SIZE = new Size(0, 0);
    var MAX_ITEM_DIM = (1 << 16) - 1;
    var MAX_ITEM_SIZE = new Size(MAX_ITEM_DIM, MAX_ITEM_DIM);

    export class Item implements IRect, IBox {

        constructor() { }

        get left(): number {
            return this._geometry.left;
        }

        set left(left: number) {
            var min = this._geometry.right - this._maxSize.width;
            var max = this._geometry.right - this._minSize.width;
            this._geometry.left = Math.min(Math.max(min, left), max);
            this._syncGeometry()
        }

        get top(): number {
            return this._geometry.top;
        }

        set top(top: number) {
            var min = this._geometry.bottom - this._maxSize.height;
            var max = this._geometry.bottom - this._minSize.height;
            this._geometry.top = Math.min(Math.max(min, top), max);
            this._syncGeometry()
        }

        get right(): number {
            return this._geometry.right;
        }

        set right(right: number) {
            var min = this._geometry.left + this._minSize.width;
            var max = this._geometry.left + this._maxSize.width;
            this._geometry.right = Math.min(Math.max(min, right), max);
            this._syncGeometry();
        }

        get bottom(): number {
            return this._geometry.bottom;
        }

        set bottom(bottom: number) {
            var min = this._geometry.top + this._minSize.height;
            var max = this._geometry.top + this._maxSize.height;
            this._geometry.bottom = Math.min(Math.max(min, bottom), max);
            this._syncGeometry();
        }

        get x(): number {
            return this._geometry.x;
        }

        set x(x: number) {
            this._geometry.x = x;
            this._syncGeometry();
        }

        get y(): number {
            return this._geometry.y;
        }

        set y(y: number) {
            this._geometry.y = y;
            this._syncGeometry();
        }

        get width(): number {
            return this._geometry.width;
        }

        set width(width: number) {
            var min = this._minSize.width;
            var max = this._maxSize.width;
            this._geometry.width = Math.min(Math.max(min, width), max);
            this._syncGeometry();
        }

        get height(): number {
            return this._geometry.height;
        }

        set height(height: number) {
            var min = this._minSize.height;
            var max = this._maxSize.height;
            this._geometry.height = Math.min(Math.max(min, height), max);
            this._syncGeometry();
        }

        get topLeft(): IPoint {
            return { x: this._geometry.left, y: this._geometry.top };
        }

        set topLeft(point: IPoint) {
            var minx = this._geometry.right - this._maxSize.width;
            var maxx = this._geometry.right - this._minSize.width;
            var miny = this._geometry.bottom - this._maxSize.height;
            var maxy = this._geometry.bottom - this._minSize.height;
            var x = Math.min(Math.max(minx, point.x), maxx);
            var y = Math.min(Math.max(miny, point.y), maxy);
            this._geometry.topLeft = { x: x, y: y };
            this._syncGeometry();
        }

        get topRight(): IPoint {
            return { x: this._geometry.right, y: this._geometry.top };
        }

        set topRight(point: IPoint) {
            var minx = this._geometry.left + this._minSize.width;
            var maxx = this._geometry.left + this._maxSize.width;
            var miny = this._geometry.bottom - this._maxSize.height;
            var maxy = this._geometry.bottom - this._minSize.height;
            var x = Math.min(Math.max(minx, point.x), maxx);
            var y = Math.min(Math.max(miny, point.y), maxy);
            this._geometry.topRight = { x: x, y: y };
            this._syncGeometry();
        }

        get bottomLeft(): IPoint {
            return { x: this._geometry.left, y: this._geometry.bottom };
        }

        set bottomLeft(point: IPoint) {
            var minx = this._geometry.right - this._maxSize.width;
            var maxx = this._geometry.right - this._minSize.width;
            var miny = this._geometry.top + this._minSize.height;
            var maxy = this._geometry.top + this._maxSize.height;
            var x = Math.min(Math.max(minx, point.x), maxx);
            var y = Math.min(Math.max(miny, point.y), maxy);
            this._geometry.bottomLeft = { x: x, y: y };
            this._syncGeometry();
        }

        get bottomRight(): IPoint {
            return { x: this._geometry.right, y: this._geometry.bottom };
        }

        set bottomRight(point: IPoint) {
            var minx = this._geometry.left + this._minSize.width;
            var maxx = this._geometry.left + this._maxSize.width;
            var miny = this._geometry.top + this._minSize.height;
            var maxy = this._geometry.top + this._maxSize.height;
            var x = Math.min(Math.max(minx, point.x), maxx);
            var y = Math.min(Math.max(miny, point.y), maxy);
            this._geometry.bottomRight = { x: x, y: y };
            this._syncGeometry();
        }

        get pos(): IPoint {
            return this._geometry.pos;
        }

        set pos(pos: IPoint) {
            this._geometry.pos = pos;
            this._syncGeometry();
        }

        get size(): ISize {
            return this._geometry.size;
        }

        set size(size: ISize) {
            var minw = this._minSize.width;
            var minh = this._minSize.height;
            var maxw = this._maxSize.width;
            var maxh = this._maxSize.height;
            var w = Math.min(Math.max(minw, size.width), maxw);
            var h = Math.min(Math.max(minh, size.height), maxh);
            this._geometry.size = { width: w, height: h };
            this._syncGeometry();
        }

        get rect(): IRect {
            return this._geometry.rect;
        }

        set rect(rect: IRect) {
            var minw = this._minSize.width;
            var minh = this._minSize.height;
            var maxw = this._maxSize.width;
            var maxh = this._maxSize.height;
            var w = Math.min(Math.max(minw, rect.width), maxw);
            var h = Math.min(Math.max(minh, rect.height), maxh);
            this._geometry.rect = { x: rect.x, y: rect.y, width: w, height: h };
            this._syncGeometry();
        }

        get minimumSize(): ISize {
            return this._minSize.size;
        }

        set minimumSize(size: ISize) {
            // XXX clip and update
            this._minSize = new Size(size);
        }

        get maximumSize(): ISize {
            return this._maxSize.size;
        }

        set maximumSize(size: ISize) {
            // XXX clip and update
            this._maxSize = new Size(size);
        }

        get element(): HTMLDivElement {
            return this._element;
        }

        // protected
        _create(): void {
            if (this._element !== null) {
                return;
            }
            this._element = document.createElement("div");
            $(this._element).addClass(ITEM_CLASS);
            this._syncGeometry();
        }

        private _syncGeometry(): void {
            if (this._element !== null) {
                var geo = this._geometry;
                $(this._element).css({
                    left: geo.left,
                    top: geo.top,
                    width: geo.width,
                    height: geo.height
                });
            }
        }

        private _geometry: Rect = new Rect();
        private _minSize: Size = new Size(MIN_ITEM_SIZE);
        private _maxSize: Size = new Size(MAX_ITEM_SIZE);
        private _element: HTMLDivElement = null;
    }

}
