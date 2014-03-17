/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Item {

        constructor() { }

        //
        // Geometry Methods
        //
        get x(): number {
            return this._geometry.left;
        }

        get y(): number {
            return this._geometry.top;
        }

        get width(): number {
            return this._geometry.width;
        }

        get height(): number {
            return this._geometry.height;
        }

        get pos(): IPoint {
            return this._geometry.topLeft;
        }

        get size(): ISize {
            return this._geometry.size;
        }

        get rect(): IRect {
            return this._geometry.rect;
        }

        move(point: IPoint): void {
            this._geometry.moveTopLeft(point);
            this._updateElementGeometry(true, false);
        }

        resize(size: ISize): void {
            this._geometry.size = size;
            this._updateElementGeometry(false, true);
        }

        setGeometry(rect: IRect): void {
            this._geometry.rect = rect;
            this._updateElementGeometry(true, true);
        }

        sizeHint(): Size {
            return new Size();
        }

        //
        // DOM Methods
        //
        get element(): HTMLDivElement {
            return this._element;
        }

        render(): void {
            this._element = document.createElement("div");
            this._element.className = "porcelain-Item";
            this._updateElementGeometry(true, true);
        }
        
        // 
        // Private API
        //
        private _updateElementGeometry(pos: boolean, size: boolean): void {
            var geo = this._geometry;
            var style = this._element.style;
            if (pos) {
                style.left = geo.left + "px";
                style.top = geo.top + "px";
            }
            if (size) {
                style.width = geo.width + "px";
                style.height = geo.height + "px";
            }
        }

        private _geometry: Rect = new Rect();
        private _element: HTMLDivElement = null;
    }

}
