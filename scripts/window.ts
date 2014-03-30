/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var WINDOW_CLASS = "p-Window";

    var BODY_CLASS = "p-Window-body";

    var SIZE_GRIP_CLASS = "p-Window-sizeGrip";

    var TITLE_BAR_CLASS = "p-Window-titleBar";

    
    var windowStack = new ZStack(1000);


    class Sizer implements ILayoutActor {

        constructor(elem: HTMLElement) {
            this._elem = elem;
        }

        minimumSize(): Size {
            return new Size(192, 192);
        }

        maximumSize(): Size {
            return new Size(800, 800);
        }

        sizeHint(): Size {
            return new Size();
        }

        geometry(): Rect {
            return new Rect(this._rect);
        }

        setGeometry(rect: Rect) {
            this._rect = rect;
            var s = this._elem.style;
            s.top = this._rect.top + "px";
            s.left = this._rect.left + "px";
            s.width = this._rect.width() + "px";
            s.height = this._rect.height() + "px";
        }

        private _elem: HTMLElement;
        private _rect: Rect = new Rect();
    }


    export class Window extends Widget {

        constructor() {
            super();
            this.addClass(WINDOW_CLASS);

            var body = this._body = new Item();
            body.addClass(BODY_CLASS);

            var actor = new Sizer(this.element);

            var titleBar = this._titleBar = new TitleBar(actor);
            titleBar.addClass(TITLE_BAR_CLASS);
            titleBar.restoreButton.element.style.display = "none";

            var tgrip = new SizeGrip(GripArea.Top, actor);
            tgrip.addClass(SIZE_GRIP_CLASS);

            var lgrip = new SizeGrip(GripArea.Left, actor);
            lgrip.addClass(SIZE_GRIP_CLASS);

            var rgrip = new SizeGrip(GripArea.Right, actor);
            rgrip.addClass(SIZE_GRIP_CLASS);
            
            var bgrip = new SizeGrip(GripArea.Bottom, actor);
            bgrip.addClass(SIZE_GRIP_CLASS);

            var tlgrip = new SizeGrip(GripArea.TopLeft, actor);
            tlgrip.addClass(SIZE_GRIP_CLASS);

            var trgrip = new SizeGrip(GripArea.TopRight, actor);
            trgrip.addClass(SIZE_GRIP_CLASS);

            var blgrip = new SizeGrip(GripArea.BottomLeft, actor);
            blgrip.addClass(SIZE_GRIP_CLASS);
            
            var brgrip = new SizeGrip(GripArea.BottomRight, actor);
            brgrip.addClass(SIZE_GRIP_CLASS);

            this.append(body, tgrip, lgrip, rgrip, bgrip,
                        tlgrip, trgrip, blgrip, brgrip, titleBar);

            actor.setGeometry(new Rect(50, 50, 200, 200));

            this.bind("mousedown", this._onMouseDown);
        }

        destroy(): void {
            super.destroy()
            this._titleBar = null;
            this._body = null;
        }

        get zIndex(): number {
            return parseInt(this.element.style.zIndex) || 0;
        }

        set zIndex(z: number) {
            this.element.style.zIndex = z ? z.toString() : "";
        }

        show(): void {
            windowStack.add(this);
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(this.element);
        }

        raise(): void {
            windowStack.raise(this);
        }

        lower(): void {
            windowStack.lower(this);
        }

        private _onMouseDown(event: MouseEvent): void {
            this.raise();
        }

        private _body: Item;
        private _titleBar: Item;
    }

}
