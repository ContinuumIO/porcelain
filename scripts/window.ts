/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var WINDOW_CLASS = "porcelain-Window";
    var BODY_CLASS = "porcelain-Window-body";
    var TITLE_BAR_CLASS = "porcelain-Window-titleBar";

    var TOP_HANDLE_CLASS = "porcelain-Window-topHandle";
    var LEFT_HANDLE_CLASS = "porcelain-Window-leftHandle";
    var RIGHT_HANDLE_CLASS = "porcelain-Window-rightHandle";
    var BOTTOM_HANDLE_CLASS = "porcelain-Window-bottomHandle";
    
    var TOP_LEFT_HANDLE_CLASS = "porcelain-Window-topLeftHandle";
    var TOP_RIGHT_HANDLE_CLASS = "porcelain-Window-topRightHandle";
    var BOTTOM_LEFT_HANDLE_CLASS = "porcelain-Window-bottomLeftHandle";
    var BOTTOM_RIGHT_HANDLE_CLASS = "porcelain-Window-bottomRightHandle";

    var windowStack = new ZStack(1000);

    export class Window extends Item {

        constructor() {
            super();
            this.minimumSize = { width: 192, height: 192 };
            this.maximumSize = { width: 640, height: 480 };
            this.rect = { x: 50, y: 50, width: 100, height: 100 };
        }

        show(): void {
            this._create();
            windowStack.add(this);
            $("body").append(this.element);
        }

        raise(): void {
            windowStack.raise(this);
        }

        lower(): void {
            windowStack.lower(this);
        }

        // protected
        _create(): void {
            super._create();

            if (this._body !== null) {
                return;
            }

            var titleBar = $("<div>")
                .addClass(TITLE_BAR_CLASS)
                .mousedown(this._onTitleBarDown);

            var leftHandle = $("<div>")
                .addClass(LEFT_HANDLE_CLASS)
                .mousedown(this._onLeftHandleDown);

            var topHandle = $("<div>")
                .addClass(TOP_HANDLE_CLASS)
                .mousedown(this._onTopHandleDown);

            var rightHandle = $("<div>")
                .addClass(RIGHT_HANDLE_CLASS)
                .mousedown(this._onRightHandleDown);

            var bottomHandle = $("<div>")
                .addClass(BOTTOM_HANDLE_CLASS)
                .mousedown(this._onBottomHandleDown);

            var topLeftHandle = $("<div>")
                .addClass(TOP_LEFT_HANDLE_CLASS)
                .mousedown(this._onTopLeftHandleDown);

            var topRightHandle = $("<div>")
                .addClass(TOP_RIGHT_HANDLE_CLASS)
                .mousedown(this._onTopRightHandleDown);

            var bottomLeftHandle = $("<div>")
                .addClass(BOTTOM_LEFT_HANDLE_CLASS)
                .mousedown(this._onBottomLeftHandleDown);

            var bottomRightHandle = $("<div>")
                .addClass(BOTTOM_RIGHT_HANDLE_CLASS)
                .mousedown(this._onBottomRightHandleDown);

            var body = $("<div>")
                .addClass(BODY_CLASS);

            var element = $(this.element)
                .addClass(WINDOW_CLASS)
                .mousedown(this._onMouseDown)
                .append(
                    body,
                    titleBar,
                    topHandle,
                    leftHandle,
                    rightHandle,
                    bottomHandle,
                    topLeftHandle,
                    topRightHandle,
                    bottomLeftHandle,
                    bottomRightHandle);

            this._body = <HTMLDivElement>body[0];
        }

        private _onMouseDown = (event: JQueryMouseEventObject) => {
            this.raise();
        }

        private _onLeftHandleDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.left;
                var doc = $(document);
                doc.on("mousemove", this._onLeftHandleMove);
                doc.on("mouseup", this._onLeftHandleUp);
                event.preventDefault();
            }
        }
        
        private _onLeftHandleUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                var doc = $(document);
                doc.off("mousemove", this._onLeftHandleMove);
                doc.off("mouseup", this._onLeftHandleUp);
                event.preventDefault();
            }
        }

        private _onLeftHandleMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var left = event.pageX - this._pressOffsetX;
            this.left = Math.min(Math.max(vp.left, left), vp.windowRight);
            event.preventDefault();
        }

        private _onTopHandleDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetY = event.pageY - this.top;
                var doc = $(document);
                doc.on("mousemove", this._onTopHandleMove);
                doc.on("mouseup", this._onTopHandleUp);
                event.preventDefault();
            }
        }

        private _onTopHandleUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetY = 0;
                var doc = $(document);
                doc.off("mousemove", this._onTopHandleMove);
                doc.off("mouseup", this._onTopHandleUp);
                event.preventDefault();
            }
        }

        private _onTopHandleMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var top = event.pageY - this._pressOffsetY;
            this.top = Math.min(Math.max(vp.top, top),vp.windowBottom);
            event.preventDefault();
        }

        private _onRightHandleDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.right;
                var doc = $(document);
                doc.on("mousemove", this._onRightHandleMove);
                doc.on("mouseup", this._onRightHandleUp);
                event.preventDefault();
            }
        }

        private _onRightHandleUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                var doc = $(document);
                doc.off("mousemove", this._onRightHandleMove);
                doc.off("mouseup", this._onRightHandleMove);
                event.preventDefault();
            }
        }

        private _onRightHandleMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var right = event.pageX - this._pressOffsetX;
            this.right = Math.min(Math.max(vp.left, right), vp.windowRight);
            event.preventDefault();
        }

        private _onBottomHandleDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetY = event.pageY - this.bottom;
                var doc = $(document);
                doc.on("mousemove", this._onBottomHandleMove);
                doc.on("mouseup", this._onBottomHandleUp);
                event.preventDefault();
            }
        }

        private _onBottomHandleUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetY = 0;
                var doc = $(document);
                doc.off("mousemove", this._onBottomHandleMove);
                doc.off("mouseup", this._onBottomHandleUp);
                event.preventDefault();
            }
        }

        private _onBottomHandleMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var bottom = event.pageY - this._pressOffsetY;
            this.bottom = Math.min(Math.max(vp.top, bottom), vp.windowBottom);
            event.preventDefault();
        }

        private _onTopLeftHandleDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.left;
                this._pressOffsetY = event.pageY - this.top;
                var doc = $(document);
                doc.on("mousemove", this._onTopLeftHandleMove);
                doc.on("mouseup", this._onTopLeftHandleUp);
                event.preventDefault();
            }
        }

        private _onTopLeftHandleUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                this._pressOffsetY = 0;
                var doc = $(document);
                doc.off("mousemove", this._onTopLeftHandleMove);
                doc.off("mouseup", this._onTopLeftHandleUp);
                event.preventDefault();
            }
        }

        private _onTopLeftHandleMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var x = event.pageX - this._pressOffsetX;
            var y = event.pageY - this._pressOffsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            this.topLeft = { x: x, y: y };
            event.preventDefault();
        }

        private _onTopRightHandleDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.right;
                this._pressOffsetY = event.pageY - this.top;
                var doc = $(document);
                doc.on("mousemove", this._onTopRightHandleMove);
                doc.on("mouseup", this._onTopRightHandleUp);
                event.preventDefault();
            }
        }

        private _onTopRightHandleUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                this._pressOffsetY = 0;
                var doc = $(document);
                doc.off("mousemove", this._onTopRightHandleMove);
                doc.off("mouseup", this._onTopRightHandleUp);
                event.preventDefault();
            }
        }

        private _onTopRightHandleMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var x = event.pageX - this._pressOffsetX;
            var y = event.pageY - this._pressOffsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            this.topRight = { x: x, y: y };
            event.preventDefault();
        }

        private _onBottomLeftHandleDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.left;
                this._pressOffsetY = event.pageY - this.bottom;
                var doc = $(document);
                doc.on("mousemove", this._onBottomLeftHandleMove);
                doc.on("mouseup", this._onBottomLeftHandleUp);
                event.preventDefault();
            }
        }

        private _onBottomLeftHandleUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                this._pressOffsetY = 0;
                var doc = $(document);
                doc.off("mousemove", this._onBottomLeftHandleMove);
                doc.off("mouseup", this._onBottomLeftHandleUp);
                event.preventDefault();
            }
        }

        private _onBottomLeftHandleMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var x = event.pageX - this._pressOffsetX;
            var y = event.pageY - this._pressOffsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            this.bottomLeft = { x: x, y: y };
            event.preventDefault();
        }

        private _onBottomRightHandleDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.right;
                this._pressOffsetY = event.pageY - this.bottom;
                var doc = $(document);
                doc.on("mousemove", this._onBottomRightHandleMove);
                doc.on("mouseup", this._onBottomRightHandleUp);
                event.preventDefault();
            }
        }

        private _onBottomRightHandleUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                this._pressOffsetY = 0;
                var doc = $(document);
                doc.off("mousemove", this._onBottomRightHandleMove);
                doc.off("mouseup", this._onBottomRightHandleUp);
                event.preventDefault();
            }
        }

        private _onBottomRightHandleMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var x = event.pageX - this._pressOffsetX;
            var y = event.pageY - this._pressOffsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            this.bottomRight = { x: x, y: y };
            event.preventDefault();
        }

        private _onTitleBarDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.left;
                this._pressOffsetY = event.pageY - this.top;
                var doc = $(document);
                doc.on("mousemove", this._onTitleBarMove);
                doc.on("mouseup", this._onTitleBarUp);
                event.preventDefault();
            }
        }

        private _onTitleBarUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                this._pressOffsetY = 0;
                var doc = $(document);
                doc.off("mousemove", this._onTitleBarMove);
                doc.off("mouseup", this._onTitleBarUp);
                event.preventDefault();
            }
        }

        private _onTitleBarMove = (event: JQueryMouseEventObject) => {
            var vp = viewport;
            var x = Math.min(Math.max(vp.left, event.pageX), vp.windowRight);
            var y = Math.min(Math.max(vp.top, event.pageY), vp.windowBottom);
            x -= this._pressOffsetX;
            y -= this._pressOffsetY;
            this.pos = { x: x, y: y };
            event.preventDefault();
        }

        private _pressOffsetX: number = 0;
        private _pressOffsetY: number = 0;
        private _body: HTMLDivElement = null;
    }

}
