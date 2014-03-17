var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
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

    porcelain.topLevelItems = [];

    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            var _this = this;
            _super.call(this);
            this.onMouseDown = function (event) {
                _this.raise();
            };
            this.onLeftHandleDown = function (event) {
                _this.element.focus();
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.x;
                    document.addEventListener("mousemove", _this.onLeftHandleMove, true);
                    document.addEventListener("mouseup", _this.onLeftHandleUp, true);
                    event.preventDefault();
                }
            };
            this.onLeftHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    document.removeEventListener("mousemove", _this.onLeftHandleMove, true);
                    document.removeEventListener("mouseup", _this.onLeftHandleUp, true);
                    event.preventDefault();
                }
            };
            this.onLeftHandleMove = function (event) {
                var rect = new porcelain.Rect(_this.rect);
                var left = event.pageX - _this._pressOffsetX;
                var maxLeft = rect.right - _this.minimumSize.width;
                rect.left = Math.min(Math.max(porcelain.viewport.left, left), maxLeft, porcelain.viewport.windowRight);
                _this.rect = rect;
                event.preventDefault();
            };
            this.onTopHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetY = event.pageY - _this.y;
                    document.addEventListener("mousemove", _this.onTopHandleMove, true);
                    document.addEventListener("mouseup", _this.onTopHandleUp, true);
                    event.preventDefault();
                }
            };
            this.onTopHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetY = 0;
                    document.removeEventListener("mousemove", _this.onTopHandleMove, true);
                    document.removeEventListener("mouseup", _this.onTopHandleUp, true);
                    event.preventDefault();
                }
            };
            this.onTopHandleMove = function (event) {
                var rect = new porcelain.Rect(_this.rect);
                var top = event.pageY - _this._pressOffsetY;
                var maxTop = rect.bottom - _this.minimumSize.height;
                rect.top = Math.min(Math.max(porcelain.viewport.top, top), maxTop, porcelain.viewport.windowBottom);
                _this.rect = rect;
                event.preventDefault();
            };
            this.onRightHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - (_this.x + _this.width);
                    document.addEventListener("mousemove", _this.onRightHandleMove, true);
                    document.addEventListener("mouseup", _this.onRightHandleUp, true);
                    event.preventDefault();
                }
            };
            this.onRightHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    document.removeEventListener("mousemove", _this.onRightHandleMove, true);
                    document.removeEventListener("mouseup", _this.onRightHandleUp, true);
                    event.preventDefault();
                }
            };
            this.onRightHandleMove = function (event) {
                var rect = new porcelain.Rect(_this.rect);
                var right = event.pageX - _this._pressOffsetX;
                var minRight = rect.left + _this.minimumSize.width;
                rect.right = Math.max(Math.min(porcelain.viewport.windowRight, right), minRight, porcelain.viewport.top);
                _this.rect = rect;
                event.preventDefault();
            };
            this.onBottomHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetY = event.pageY - (_this.y + _this.height);
                    document.addEventListener("mousemove", _this.onBottomHandleMove, true);
                    document.addEventListener("mouseup", _this.onBottomHandleUp, true);
                    event.preventDefault();
                }
            };
            this.onBottomHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetY = 0;
                    document.removeEventListener("mousemove", _this.onBottomHandleMove, true);
                    document.removeEventListener("mouseup", _this.onBottomHandleUp, true);
                    event.preventDefault();
                }
            };
            this.onBottomHandleMove = function (event) {
                var rect = new porcelain.Rect(_this.rect);
                var bottom = event.pageY - _this._pressOffsetY;
                var minBottom = rect.top + _this.minimumSize.height;
                rect.bottom = Math.max(Math.min(porcelain.viewport.windowBottom, bottom), minBottom, porcelain.viewport.top);
                _this.rect = rect;
                event.preventDefault();
            };
            this.onTitleBarDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.x;
                    _this._pressOffsetY = event.pageY - _this.y;
                    document.addEventListener("mousemove", _this.onTitleBarMove, true);
                    document.addEventListener("mouseup", _this.onTitleBarUp, true);
                    event.preventDefault();
                }
            };
            this.onTitleBarUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    _this._pressOffsetY = 0;
                    document.removeEventListener("mousemove", _this.onTitleBarMove, true);
                    document.removeEventListener("mouseup", _this.onTitleBarUp, true);
                    event.preventDefault();
                }
            };
            this.onTitleBarMove = function (event) {
                var pageX = Math.max(porcelain.viewport.left, Math.min(event.pageX, porcelain.viewport.windowRight));
                var pageY = Math.max(porcelain.viewport.top, Math.min(event.pageY, porcelain.viewport.windowBottom));
                var x = pageX - _this._pressOffsetX;
                var y = pageY - _this._pressOffsetY;
                _this.pos = { x: x, y: y };
                event.preventDefault();
            };
            this._pressOffsetX = 0;
            this._pressOffsetY = 0;
            this._body = null;
            this.minimumSize = { width: 50, height: 50 };
            porcelain.topLevelItems.push(this);
        }
        Window.prototype.show = function () {
            this.render();
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(this.element);
            this.rect = { x: 50, y: 50, width: 100, height: 100 };
        };

        Window.prototype.createElement = function () {
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
        };

        Window.prototype.raise = function () {
            console.log("raise");
            var z = 0;
            porcelain.topLevelItems.forEach(function (item) {
                var e = item.element;
                if (e !== null) {
                    z = Math.max(z, parseInt(e.style.zIndex) || 0);
                }
            });
            this.element.style.zIndex = (z + 1).toString();
        };
        return Window;
    })(porcelain.Item);
    porcelain.Window = Window;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=window.js.map
