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


    export class Window extends Item {

        constructor(parent: Item = null) {
            super(parent);

            var geo = this._geometry = new Geometry(this.element);

            var body = this._body = new Item(this);
            $(body.element).addClass(BODY_CLASS);

            var titleBar = this._titleBar = new TitleBar(geo, this);
            $(titleBar.element).addClass(TITLE_BAR_CLASS);

            var tgrip = new SizeGrip(Border.Top, geo, this);
            tgrip.$.addClass(SIZE_GRIP_CLASS);

            var lgrip = new SizeGrip(Border.Left, geo, this);
            lgrip.$.addClass(SIZE_GRIP_CLASS);

            var rgrip = new SizeGrip(Border.Right, geo, this);
            rgrip.$.addClass(SIZE_GRIP_CLASS);
            
            var bgrip = new SizeGrip(Border.Bottom, geo, this);
            bgrip.$.addClass(SIZE_GRIP_CLASS);

            var tlgrip = new SizeGrip(Border.TopLeft, geo, this);
            tlgrip.$.addClass(SIZE_GRIP_CLASS);

            var trgrip = new SizeGrip(Border.TopRight, geo, this);
            trgrip.$.addClass(SIZE_GRIP_CLASS);

            var blgrip = new SizeGrip(Border.BottomLeft, geo, this);
            blgrip.$.addClass(SIZE_GRIP_CLASS);
            
            var brgrip = new SizeGrip(Border.BottomRight, geo, this);
            brgrip.$.addClass(SIZE_GRIP_CLASS);

            $(this.element).addClass(WINDOW_CLASS)
                .mousedown(this._onMouseDown)
                .append(
                    body.element,
                    tgrip.element,
                    lgrip.element,
                    rgrip.element,
                    bgrip.element,
                    tlgrip.element,
                    trgrip.element,
                    blgrip.element,
                    brgrip.element,
                    titleBar.element
                );

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
            $("body").append(this.element);
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

        private _onMouseDown = (event: JQueryMouseEventObject) => {
            this.raise();
        }

        private _body: Item;
        private _titleBar: Item;
        private _geometry: Geometry;
    }

}
