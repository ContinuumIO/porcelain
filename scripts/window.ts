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


    export class Window extends Widget {

        constructor() {
            super();
            this.addClass(WINDOW_CLASS);

            var geo = this._geometry = new Geometry(this.element);

            var body = this._body = new Item();
            body.addClass(BODY_CLASS);

            var titleBar = this._titleBar = new TitleBar();
            titleBar.addClass(TITLE_BAR_CLASS);
            titleBar.restoreButton.element.style.display = "none";

            var tgrip = new SizeGrip(Border.Top);
            tgrip.addClass(SIZE_GRIP_CLASS);

            var lgrip = new SizeGrip(Border.Left);
            lgrip.addClass(SIZE_GRIP_CLASS);

            var rgrip = new SizeGrip(Border.Right);
            rgrip.addClass(SIZE_GRIP_CLASS);
            
            var bgrip = new SizeGrip(Border.Bottom);
            bgrip.addClass(SIZE_GRIP_CLASS);

            var tlgrip = new SizeGrip(Border.TopLeft);
            tlgrip.addClass(SIZE_GRIP_CLASS);

            var trgrip = new SizeGrip(Border.TopRight);
            trgrip.addClass(SIZE_GRIP_CLASS);

            var blgrip = new SizeGrip(Border.BottomLeft);
            blgrip.addClass(SIZE_GRIP_CLASS);
            
            var brgrip = new SizeGrip(Border.BottomRight);
            brgrip.addClass(SIZE_GRIP_CLASS);

            this.append(body, tgrip, lgrip, rgrip, bgrip,
                        tlgrip, trgrip, blgrip, brgrip, titleBar);

            //this.elementEvents.enable("mousedown");
            
            // XXX temporary
            // Setup a default min, max, and initial size.
            this.geometry.minimumSize = { width: 192, height: 192 };
            this.geometry.maximumSize = { width: 640, height: 480 };
            this.geometry.rect = { x: 50, y: 50, width: 100, height: 100 };
        }

        destroy(): void {
            super.destroy()
            this._geometry.destroy();
            this._geometry = null;
            this._titleBar = null;
            this._body = null;
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

        get geometry(): Geometry {
            return this._geometry;
        }
        /*
        private _onMouseDown = (event: JQueryMouseEventObject) => {
            this.raise();
        }
        */

        private _body: Item;
        private _titleBar: Item;
        private _geometry: Geometry;
    }

}
