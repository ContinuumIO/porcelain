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

    var TOP_HANDLE_CLASS = "porcelain-Window-topHandle";
    var LEFT_HANDLE_CLASS = "porcelain-Window-leftHandle";
    var RIGHT_HANDLE_CLASS = "porcelain-Window-rightHandle";
    var BOTTOM_HANDLE_CLASS = "porcelain-Window-bottomHandle";

    var TOP_LEFT_HANDLE_CLASS = "porcelain-Window-topLeftHandle";
    var TOP_RIGHT_HANDLE_CLASS = "porcelain-Window-topRightHandle";
    var BOTTOM_LEFT_HANDLE_CLASS = "porcelain-Window-bottomLeftHandle";
    var BOTTOM_RIGHT_HANDLE_CLASS = "porcelain-Window-bottomRightHandle";

    // XXX temporary
    porcelain.topLevelItems = [];

    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            var _this = this;
            _super.call(this);
            this._onMouseDown = function (event) {
                _this.raise();
            };
            this._onLeftHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.left;
                    var doc = $(document);
                    doc.on("mousemove", _this._onLeftHandleMove);
                    doc.on("mouseup", _this._onLeftHandleUp);
                    event.preventDefault();
                }
            };
            this._onLeftHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onLeftHandleMove);
                    doc.off("mouseup", _this._onLeftHandleUp);
                    event.preventDefault();
                }
            };
            this._onLeftHandleMove = function (event) {
                var vp = porcelain.viewport;
                var left = event.pageX - _this._pressOffsetX;
                _this.left = Math.min(Math.max(vp.left, left), vp.windowRight);
                event.preventDefault();
            };
            this._onTopHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetY = event.pageY - _this.top;
                    var doc = $(document);
                    doc.on("mousemove", _this._onTopHandleMove);
                    doc.on("mouseup", _this._onTopHandleUp);
                    event.preventDefault();
                }
            };
            this._onTopHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetY = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onTopHandleMove);
                    doc.off("mouseup", _this._onTopHandleUp);
                    event.preventDefault();
                }
            };
            this._onTopHandleMove = function (event) {
                var vp = porcelain.viewport;
                var top = event.pageY - _this._pressOffsetY;
                _this.top = Math.min(Math.max(vp.top, top), vp.windowBottom);
                event.preventDefault();
            };
            this._onRightHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.right;
                    var doc = $(document);
                    doc.on("mousemove", _this._onRightHandleMove);
                    doc.on("mouseup", _this._onRightHandleUp);
                    event.preventDefault();
                }
            };
            this._onRightHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onRightHandleMove);
                    doc.off("mouseup", _this._onRightHandleMove);
                    event.preventDefault();
                }
            };
            this._onRightHandleMove = function (event) {
                var vp = porcelain.viewport;
                var right = event.pageX - _this._pressOffsetX;
                _this.right = Math.min(Math.max(vp.left, right), vp.windowRight);
                event.preventDefault();
            };
            this._onBottomHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetY = event.pageY - _this.bottom;
                    var doc = $(document);
                    doc.on("mousemove", _this._onBottomHandleMove);
                    doc.on("mouseup", _this._onBottomHandleUp);
                    event.preventDefault();
                }
            };
            this._onBottomHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetY = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onBottomHandleMove);
                    doc.off("mouseup", _this._onBottomHandleUp);
                    event.preventDefault();
                }
            };
            this._onBottomHandleMove = function (event) {
                var vp = porcelain.viewport;
                var bottom = event.pageY - _this._pressOffsetY;
                _this.bottom = Math.min(Math.max(vp.top, bottom), vp.windowBottom);
                event.preventDefault();
            };
            this._onTopLeftHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.left;
                    _this._pressOffsetY = event.pageY - _this.top;
                    var doc = $(document);
                    doc.on("mousemove", _this._onTopLeftHandleMove);
                    doc.on("mouseup", _this._onTopLeftHandleUp);
                    event.preventDefault();
                }
            };
            this._onTopLeftHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    _this._pressOffsetY = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onTopLeftHandleMove);
                    doc.off("mouseup", _this._onTopLeftHandleUp);
                    event.preventDefault();
                }
            };
            this._onTopLeftHandleMove = function (event) {
                var vp = porcelain.viewport;
                var x = event.pageX - _this._pressOffsetX;
                var y = event.pageY - _this._pressOffsetY;
                x = Math.min(Math.max(vp.left, x), vp.windowRight);
                y = Math.min(Math.max(vp.top, y), vp.windowBottom);
                _this.topLeft = { x: x, y: y };
                event.preventDefault();
            };
            this._onTopRightHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.right;
                    _this._pressOffsetY = event.pageY - _this.top;
                    var doc = $(document);
                    doc.on("mousemove", _this._onTopRightHandleMove);
                    doc.on("mouseup", _this._onTopRightHandleUp);
                    event.preventDefault();
                }
            };
            this._onTopRightHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    _this._pressOffsetY = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onTopRightHandleMove);
                    doc.off("mouseup", _this._onTopRightHandleUp);
                    event.preventDefault();
                }
            };
            this._onTopRightHandleMove = function (event) {
                var vp = porcelain.viewport;
                var x = event.pageX - _this._pressOffsetX;
                var y = event.pageY - _this._pressOffsetY;
                x = Math.min(Math.max(vp.left, x), vp.windowRight);
                y = Math.min(Math.max(vp.top, y), vp.windowBottom);
                _this.topRight = { x: x, y: y };
                event.preventDefault();
            };
            this._onBottomLeftHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.left;
                    _this._pressOffsetY = event.pageY - _this.bottom;
                    var doc = $(document);
                    doc.on("mousemove", _this._onBottomLeftHandleMove);
                    doc.on("mouseup", _this._onBottomLeftHandleUp);
                    event.preventDefault();
                }
            };
            this._onBottomLeftHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    _this._pressOffsetY = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onBottomLeftHandleMove);
                    doc.off("mouseup", _this._onBottomLeftHandleUp);
                    event.preventDefault();
                }
            };
            this._onBottomLeftHandleMove = function (event) {
                var vp = porcelain.viewport;
                var x = event.pageX - _this._pressOffsetX;
                var y = event.pageY - _this._pressOffsetY;
                x = Math.min(Math.max(vp.left, x), vp.windowRight);
                y = Math.min(Math.max(vp.top, y), vp.windowBottom);
                _this.bottomLeft = { x: x, y: y };
                event.preventDefault();
            };
            this._onBottomRightHandleDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.right;
                    _this._pressOffsetY = event.pageY - _this.bottom;
                    var doc = $(document);
                    doc.on("mousemove", _this._onBottomRightHandleMove);
                    doc.on("mouseup", _this._onBottomRightHandleUp);
                    event.preventDefault();
                }
            };
            this._onBottomRightHandleUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    _this._pressOffsetY = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onBottomRightHandleMove);
                    doc.off("mouseup", _this._onBottomRightHandleUp);
                    event.preventDefault();
                }
            };
            this._onBottomRightHandleMove = function (event) {
                var vp = porcelain.viewport;
                var x = event.pageX - _this._pressOffsetX;
                var y = event.pageY - _this._pressOffsetY;
                x = Math.min(Math.max(vp.left, x), vp.windowRight);
                y = Math.min(Math.max(vp.top, y), vp.windowBottom);
                _this.bottomRight = { x: x, y: y };
                event.preventDefault();
            };
            this._onTitleBarDown = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = event.pageX - _this.left;
                    _this._pressOffsetY = event.pageY - _this.top;
                    var doc = $(document);
                    doc.on("mousemove", _this._onTitleBarMove);
                    doc.on("mouseup", _this._onTitleBarUp);
                    event.preventDefault();
                }
            };
            this._onTitleBarUp = function (event) {
                if (event.button === 0) {
                    _this._pressOffsetX = 0;
                    _this._pressOffsetY = 0;
                    var doc = $(document);
                    doc.off("mousemove", _this._onTitleBarMove);
                    doc.off("mouseup", _this._onTitleBarUp);
                    event.preventDefault();
                }
            };
            this._onTitleBarMove = function (event) {
                var vp = porcelain.viewport;
                var x = Math.min(Math.max(vp.left, event.pageX), vp.windowRight);
                var y = Math.min(Math.max(vp.top, event.pageY), vp.windowBottom);
                x -= _this._pressOffsetX;
                y -= _this._pressOffsetY;
                _this.pos = { x: x, y: y };
                event.preventDefault();
            };
            this._pressOffsetX = 0;
            this._pressOffsetY = 0;
            this._body = null;

            // XXX temporary
            porcelain.topLevelItems.push(this);
            this.minimumSize = { width: 192, height: 192 };
            this.maximumSize = { width: 640, height: 480 };
            this.rect = { x: 50, y: 50, width: 100, height: 100 };
        }
        Window.prototype.show = function () {
            this._create();

            // XXX temporary
            $("body").append(this.element);
        };

        Window.prototype.raise = function () {
            var z = 0;
            $.each(porcelain.topLevelItems, function (index, item) {
                var e = $(item.element);
                if (e.length) {
                    z = Math.max(z, parseInt(e.css("z-index")) || 0);
                }
            });
            $(this.element).css("z-index", z + 1);
        };

        // protected
        Window.prototype._create = function () {
            _super.prototype._create.call(this);

            if (this._body !== null) {
                return;
            }

            var titleBar = $("<div>").addClass(TITLE_BAR_CLASS).mousedown(this._onTitleBarDown);

            var leftHandle = $("<div>").addClass(LEFT_HANDLE_CLASS).mousedown(this._onLeftHandleDown);

            var topHandle = $("<div>").addClass(TOP_HANDLE_CLASS).mousedown(this._onTopHandleDown);

            var rightHandle = $("<div>").addClass(RIGHT_HANDLE_CLASS).mousedown(this._onRightHandleDown);

            var bottomHandle = $("<div>").addClass(BOTTOM_HANDLE_CLASS).mousedown(this._onBottomHandleDown);

            var topLeftHandle = $("<div>").addClass(TOP_LEFT_HANDLE_CLASS).mousedown(this._onTopLeftHandleDown);

            var topRightHandle = $("<div>").addClass(TOP_RIGHT_HANDLE_CLASS).mousedown(this._onTopRightHandleDown);

            var bottomLeftHandle = $("<div>").addClass(BOTTOM_LEFT_HANDLE_CLASS).mousedown(this._onBottomLeftHandleDown);

            var bottomRightHandle = $("<div>").addClass(BOTTOM_RIGHT_HANDLE_CLASS).mousedown(this._onBottomRightHandleDown);

            var body = $("<div>").addClass(BODY_CLASS);

            var element = $(this.element).addClass(WINDOW_CLASS).mousedown(this._onMouseDown).append(body, titleBar, topHandle, leftHandle, rightHandle, bottomHandle, topLeftHandle, topRightHandle, bottomLeftHandle, bottomRightHandle);

            this._body = body[0];
        };
        return Window;
    })(porcelain.Item);
    porcelain.Window = Window;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=window.js.map
