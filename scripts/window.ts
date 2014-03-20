/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var WINDOW_CLASS = "porcelain-Window";
    var BODY_CLASS = "porcelain-Window-Body";
    var TITLE_BAR_CLASS = "porcelain-Window-TitleBar";
    var RESIZE_GRIP_CLASS = "porcelain-Window-ResizeGrip";
    var LOCATION_PREFIX = "porcelain-BoxLocation-";

    var GRIP_LOCATIONS = [
        BoxLocation.Top,
        BoxLocation.Left,
        BoxLocation.Right,
        BoxLocation.Bottom,
        BoxLocation.TopLeft,
        BoxLocation.TopRight,
        BoxLocation.BottomLeft,
        BoxLocation.BottomRight
    ]

    var windowStack = new ZStack(1000);


    class TitleBar extends Item {

        constructor(parent: Window) {
            super();
            this._parent = parent;
            this._helper = new DragHelper(this.element, null);
            this._helper.pressed = this._onPressed;
            this._helper.released = this._onReleased;
            this._helper.moved = this._onMoved;
            $(this.element).addClass(TITLE_BAR_CLASS);
        }

        destroy(): void {
            super.destroy();
            this._helper.destroy();
            this._helper = null;
            this._parent = null;
        }

        private _onPressed = (event: DragHelperEvent<void>) => {
            this._offsetX = event.pageX - this._parent.left;
            this._offsetY = event.pageY - this._parent.top;
        }

        private _onReleased = (event: DragHelperEvent<void>) => {
            this._offsetX = 0;
            this._offsetY = 0;
        }

        private _onMoved = (event: DragHelperEvent<void>) => {
            var vp = viewport;
            var x = Math.min(Math.max(vp.left, event.pageX), vp.windowRight);
            var y = Math.min(Math.max(vp.top, event.pageY), vp.windowBottom);
            this._parent.pos = { x: x - this._offsetX, y: y - this._offsetY };
        }

        private _offsetX: number = 0;
        private _offsetY: number = 0;
        private _helper: DragHelper<void>;
        private _parent: Window;
    }


    class ResizeGrip extends Item {

        constructor(parent: Window, location: BoxLocation) {
            super();
            this._parent = parent;
            this._helper = new DragHelper(this.element, location);
            this._helper.pressed = this._onPressed;
            this._helper.released = this._onReleased;
            this._helper.moved = this._onMoved;
            $(this.element)
                .addClass(RESIZE_GRIP_CLASS)
                .addClass(LOCATION_PREFIX + BoxLocation[location]);
        }

        destroy(): void {
            super.destroy();
            this._helper.destroy();
            this._helper = null;
            this._parent = null;
        }
        
        private _onPressed = (event: DragHelperEvent<BoxLocation>) => {
            switch (event.context) {
                case BoxLocation.Left:
                case BoxLocation.TopLeft:
                case BoxLocation.BottomLeft:
                    this._offsetX = event.pageX - this._parent.left;
                    break;
                case BoxLocation.Right:
                case BoxLocation.TopRight:
                case BoxLocation.BottomRight:
                    this._offsetX = event.pageX - this._parent.right;
                    break;
                default:
                    break;
            }
            switch (event.context) {
                case BoxLocation.Top:
                case BoxLocation.TopLeft:
                case BoxLocation.TopRight:
                    this._offsetY = event.pageY - this._parent.top;
                    break;
                case BoxLocation.Bottom:
                case BoxLocation.BottomLeft:
                case BoxLocation.BottomRight:
                    this._offsetY = event.pageY - this._parent.bottom;
                    break;
                default:
                    break;
            }
        }

        private _onReleased = (event: DragHelperEvent<BoxLocation>) => {
            this._offsetX = 0;
            this._offsetY = 0;
        }

        private _onMoved = (event: DragHelperEvent<BoxLocation>) => {
            var vp = viewport;
            var x = event.pageX - this._offsetX;
            var y = event.pageY - this._offsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            switch (event.context) {
                case BoxLocation.Left:
                    this._parent.left = x;
                    break;
                case BoxLocation.Top:
                    this._parent.top = y;
                    break;
                case BoxLocation.Right:
                    this._parent.right = x;
                    break;
                case BoxLocation.Bottom:
                    this._parent.bottom = y;
                    break;
                case BoxLocation.TopLeft:
                    this._parent.topLeft = { x: x, y: y };
                    break;
                case BoxLocation.TopRight:
                    this._parent.topRight = { x: x, y: y };
                    break;
                case BoxLocation.BottomLeft:
                    this._parent.bottomLeft = { x: x, y: y };
                    break;
                case BoxLocation.BottomRight:
                    this._parent.bottomRight = { x: x, y: y };
                    break;
                default:
                    break;
            }
        }

        private _offsetX: number = 0;
        private _offsetY: number = 0;
        private _helper: DragHelper<BoxLocation>;
        private _parent: Window;
    }


    class Body extends Item {

        constructor() {
            super();
            $(this.element).addClass(BODY_CLASS);
        }
    }


    export class Window extends Widget {

        constructor() {
            super();
            var element = $(this.element);
            element.addClass(WINDOW_CLASS);
            element.mousedown(this._onMouseDown);

            var body = this._body = new Body();
            element.append(body.element);

            var self = this;
            var grips = this._resizeGrips = [];
            $.each(GRIP_LOCATIONS, function (index, location) {
                var grip = new ResizeGrip(self, location);
                element.append(grip.element);
                grips.push(grip);
            });

            var titleBar = this._titleBar = new TitleBar(this);
            element.append(titleBar.element);

            // XXX temporary
            this.minimumSize = { width: 192, height: 192 };
            this.maximumSize = { width: 640, height: 480 };
            this.rect = { x: 50, y: 50, width: 100, height: 100 };
        }

        destroy(): void {
            super.destroy()
            this._body.destroy();
            this._titleBar.destroy();
            $.each(this._resizeGrips, function (index, grip) {
                grip.destroy();
            });
            this._body = null;
            this._titleBar = null;
            this._resizeGrips = null;
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

        private _onMouseDown = (event: JQueryMouseEventObject) => {
            this.raise();
        }

        private _body: Body;
        private _titleBar: TitleBar;
        private _resizeGrips: ResizeGrip[];
    }

}
