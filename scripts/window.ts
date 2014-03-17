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

    var LEFT_HANDLE_CLASS = "porcelain-Window-leftHandle";
    var TOP_HANDLE_CLASS = "porcelain-Window-topHandle";
    var RIGHT_HANDLE_CLASS = "porcelain-Window-rightHandle";
    var BOTTOM_HANDLE_CLASS = "porcelain-Window-bottomHandle";
    
    var TOP_LEFT_HANDLE_CLASS = "porcelain-Window-topLeftHandle";
    var TOP_RIGHT_HANDLE_CLASS = "porcelain-Window-topRightHandle";
    var BOTTOM_LEFT_HANDLE_CLASS = "porcelain-Window-bottomLeftHandle";
    var BOTTOM_RIGHT_HANDLE_CLASS = "porcelain-Window-bottomRightHandle";
    

    export var topLevelItems: Item[] = []


    export class Window extends Item {

        constructor() {
            super();
            this.minimumSize = { width: 50, height: 50 };
            topLevelItems.push(this);
        }

        show(): void {
            this.render();
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(this.element);
            this.rect = { x: 50, y: 50, width: 100, height: 100 };
        }

        createElement(): HTMLDivElement {
            var element = document.createElement("div");
            element.className = WINDOW_CLASS;
            element.addEventListener("mousedown", this.onMouseDown);

            var body = document.createElement("div");
            body.className = BODY_CLASS;
            element.appendChild(body);

            var titleBar = document.createElement("div");
            titleBar.className = TITLE_BAR_CLASS;
            element.appendChild(titleBar);

            var leftHandle = document.createElement("div");
            leftHandle.className = LEFT_HANDLE_CLASS;
            element.appendChild(leftHandle);

            var topHandle = document.createElement("div");
            topHandle.className = TOP_HANDLE_CLASS;
            element.appendChild(topHandle);

            var rightHandle = document.createElement("div");
            rightHandle.className = RIGHT_HANDLE_CLASS;
            element.appendChild(rightHandle);

            var bottomHandle = document.createElement("div");
            bottomHandle.className = BOTTOM_HANDLE_CLASS;
            element.appendChild(bottomHandle);

            var topLeftHandle = document.createElement("div");
            topLeftHandle.className = TOP_LEFT_HANDLE_CLASS;
            element.appendChild(topLeftHandle);

            var topRightHandle = document.createElement("div");
            topRightHandle.className = TOP_RIGHT_HANDLE_CLASS;
            element.appendChild(topRightHandle);

            var bottomLeftHandle = document.createElement("div");
            bottomLeftHandle.className = BOTTOM_LEFT_HANDLE_CLASS;
            element.appendChild(bottomLeftHandle);

            var bottomRightHandle = document.createElement("div");
            bottomRightHandle.className = BOTTOM_RIGHT_HANDLE_CLASS;
            element.appendChild(bottomRightHandle);

            titleBar.addEventListener("mousedown", this.onTitleBarDown);
            leftHandle.addEventListener("mousedown", this.onLeftHandleDown);
            topHandle.addEventListener("mousedown", this.onTopHandleDown);
            rightHandle.addEventListener("mousedown", this.onRightHandleDown);
            bottomHandle.addEventListener("mousedown", this.onBottomHandleDown);

            this._body = body;

            return element;
        }

        raise(): void {
            console.log("raise");
            var z = 0;
            topLevelItems.forEach(function (item) {
                var e = item.element;
                if (e !== null) {
                    z = Math.max(z, parseInt(e.style.zIndex) || 0);
                }
            });
            this.element.style.zIndex = (z + 1).toString();
        }

        private onMouseDown = (event: MouseEvent) => {
            this.raise();
        }

        private onLeftHandleDown = (event: MouseEvent) => {
            this.element.focus();
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.x;
                document.addEventListener("mousemove", this.onLeftHandleMove, true);
                document.addEventListener("mouseup", this.onLeftHandleUp, true);
                event.preventDefault();
            }
        }

        private onLeftHandleUp = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                document.removeEventListener("mousemove", this.onLeftHandleMove, true);
                document.removeEventListener("mouseup", this.onLeftHandleUp, true);
                event.preventDefault();
            }
        }

        private onLeftHandleMove = (event: MouseEvent) => {
            var rect = new Rect(this.rect);
            var left = event.pageX - this._pressOffsetX;
            var maxLeft = rect.right - this.minimumSize.width;
            rect.left = Math.min(Math.max(viewport.left, left), maxLeft, viewport.windowRight);
            this.rect = rect;
            event.preventDefault();
        }

        private onTopHandleDown = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetY = event.pageY - this.y;
                document.addEventListener("mousemove", this.onTopHandleMove, true);
                document.addEventListener("mouseup", this.onTopHandleUp, true);
                event.preventDefault();
            }
        }

        private onTopHandleUp = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetY = 0;
                document.removeEventListener("mousemove", this.onTopHandleMove, true);
                document.removeEventListener("mouseup", this.onTopHandleUp, true);
                event.preventDefault();
            }
        }

        private onTopHandleMove = (event: MouseEvent) => {
            var rect = new Rect(this.rect);
            var top = event.pageY - this._pressOffsetY;
            var maxTop = rect.bottom - this.minimumSize.height;
            rect.top = Math.min(Math.max(viewport.top, top), maxTop, viewport.windowBottom);
            this.rect = rect;
            event.preventDefault();
        }

        private onRightHandleDown = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - (this.x + this.width);
                document.addEventListener("mousemove", this.onRightHandleMove, true);
                document.addEventListener("mouseup", this.onRightHandleUp, true);
                event.preventDefault();
            }
        }

        private onRightHandleUp = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                document.removeEventListener("mousemove", this.onRightHandleMove, true);
                document.removeEventListener("mouseup", this.onRightHandleUp, true);
                event.preventDefault();
            }
        }

        private onRightHandleMove = (event: MouseEvent) => {
            var rect = new Rect(this.rect);
            var right = event.pageX - this._pressOffsetX;
            var minRight = rect.left + this.minimumSize.width;
            rect.right = Math.max(Math.min(viewport.windowRight, right), minRight, viewport.top);
            this.rect = rect;
            event.preventDefault();
        }

        private onBottomHandleDown = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetY = event.pageY - (this.y + this.height);
                document.addEventListener("mousemove", this.onBottomHandleMove, true);
                document.addEventListener("mouseup", this.onBottomHandleUp, true);
                event.preventDefault();
            }
        }

        private onBottomHandleUp = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetY = 0;
                document.removeEventListener("mousemove", this.onBottomHandleMove, true);
                document.removeEventListener("mouseup", this.onBottomHandleUp, true);
                event.preventDefault();
            }
        }

        private onBottomHandleMove = (event: MouseEvent) => {
            var rect = new Rect(this.rect);
            var bottom = event.pageY - this._pressOffsetY;
            var minBottom = rect.top + this.minimumSize.height;
            rect.bottom = Math.max(Math.min(viewport.windowBottom, bottom), minBottom, viewport.top);
            this.rect = rect;
            event.preventDefault();
        }

        private onTitleBarDown = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetX = event.pageX - this.x;
                this._pressOffsetY = event.pageY - this.y;
                document.addEventListener("mousemove", this.onTitleBarMove, true);
                document.addEventListener("mouseup", this.onTitleBarUp, true);
                event.preventDefault();
            }
        }

        private onTitleBarUp = (event: MouseEvent) => {
            if (event.button === 0) {
                this._pressOffsetX = 0;
                this._pressOffsetY = 0;
                document.removeEventListener("mousemove", this.onTitleBarMove, true);
                document.removeEventListener("mouseup", this.onTitleBarUp, true);
                event.preventDefault();
            }
        }

        private onTitleBarMove = (event: MouseEvent) => {
            var pageX = Math.max(viewport.left, Math.min(event.pageX, viewport.windowRight));
            var pageY = Math.max(viewport.top, Math.min(event.pageY, viewport.windowBottom));
            var x = pageX - this._pressOffsetX;
            var y = pageY - this._pressOffsetY;
            this.pos = { x: x, y: y };
            event.preventDefault();
        }

        private _pressOffsetX: number = 0;
        private _pressOffsetY: number = 0;
        private _body: HTMLDivElement = null;
    }

}