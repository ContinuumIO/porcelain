/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var ITEM_CLASS = "porcelain-Item";

    var MAX_ITEM_DIM = (1 << 16) - 1;
    var MAX_ITEM_SIZE = new Size(MAX_ITEM_DIM, MAX_ITEM_DIM);


    export class Item {

        constructor() { }

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
            width = Math.max(this._minSize.width, width);
            width = Math.min(this._maxSize.width, width);
            this._geometry.width = width;
            this._syncGeometry();
        }

        get height(): number {
            return this._geometry.height;
        }

        set height(height: number) {
            height = Math.max(this._minSize.height, height);
            height = Math.min(this._maxSize.height, height);
            this._geometry.height = height;
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
            var sz = new Size(size);
            sz = sz.expandedTo(this._minSize).boundedTo(this._maxSize);
            this._geometry.size = sz;
            this._syncGeometry();
        }

        get rect(): IRect {
            return this._geometry.rect;
        }

        set rect(rect: IRect) {
            var sz = new Size(rect.width, rect.height);
            sz = sz.expandedTo(this._minSize).boundedTo(this._maxSize);
            this._geometry.rect = {
                x: rect.x,
                y: rect.y,
                width: sz.width,
                height: sz.height
            };
            this._syncGeometry();
        }

        get minimumSize(): ISize {
            return this._minSize.size;
        }

        set minimumSize(size: ISize) {
            this._minSize = new Size(size);
        }

        get maximumSize(): ISize {
            return this._maxSize.size;
        }

        set maximumSize(size: ISize) {
            this._maxSize = new Size(size);
        }

        sizeHint(): Size {
            return new Size();
        }

        get element(): HTMLDivElement {
            return this._element;
        }

        createElement(): HTMLDivElement {
            var element = document.createElement("div");
            element.className = ITEM_CLASS;
            return element
        }

        render(): void {
            if (this.element === null) {
                this._element = this.createElement();
            }
        }
        
        private _syncGeometry(): void {
            if (this._element !== null) {
                var geo = this._geometry;
                var style = this._element.style;
                style.left = geo.left + "px";
                style.top = geo.top + "px";
                style.width = geo.width + "px";
                style.height = geo.height + "px";
            }
        }

        private _geometry: Rect = new Rect();
        private _minSize: Size = new Size(0, 0);
        private _maxSize: Size = new Size(MAX_ITEM_SIZE);
        private _element: HTMLDivElement = null;
    }

}
