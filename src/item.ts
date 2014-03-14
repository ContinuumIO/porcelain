/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Item {

        constructor(parent: Item = null) {
            this.parent = parent;
        }

        //
        //  parent-child methods
        //
        get parent(): Item {
            return this._parent;
        }

        set parent(parent: Item) {
            var old = this._parent;
            if (parent === old) {
                return;
            }
            if (parent === this) {
                throw "cannot use 'this' as Item parent";
            }
            this._parent = parent;
            if (old !== null) {
                var i = old._children.indexOf(this);
                if (i !== -1) {
                    old._children.splice(i, 1);
                    old.childRemoved(this);
                }
            }
            if (parent !== null) {
                parent._children.push(this);
                parent.childAdded(this);
            }
            this.parentChanged(old, parent);
        }

        get children(): Item[] {
            if (this._children !== null) {
                return this._children.slice();
            }
            return [];
        }

        childAdded(child: Item): void { }

        childRemoved(child: Item): void { }

        parentChanged(old: Item, parent: Item): void { }

        //
        // geometry methods
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

        sizeHint(): Size {
            return new Size();
        }

        move(point: IPoint): void {
            this._geometry.moveTopLeft(point);
            this.refreshElementGeometry(true, false);
        }

        resize(size: ISize): void {
            this._geometry.size = size;
            this.refreshElementGeometry(false, true);
        }

        setGeometry(rect: IRect): void {
            this._geometry.rect = rect;
            this.refreshElementGeometry(true, true);
        }

        //
        // DOM methods
        //
        get element(): HTMLDivElement {
            return this._element;
        }

        render(): void {
            this._element = document.createElement("div");
            this._element.style.position = "absolute";
        }
        
        refreshElementGeometry(pos: boolean, size: boolean): void {
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

        private _parent: Item = null;
        private _children: Item[] = null;
        private _geometry: Rect = new Rect();
        private _element: HTMLDivElement = null;
    }

}
