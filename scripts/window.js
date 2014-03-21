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
    var BODY_CLASS = "porcelain-Window-Body";
    var TITLE_BAR_CLASS = "porcelain-Window-TitleBar";
    var RESIZE_GRIP_CLASS = "porcelain-Window-ResizeGrip";
    var BORDER_PREFIX = "porcelain-Border-";

    var GRIP_LOCATIONS = [
        1 /* Top */,
        0 /* Left */,
        2 /* Right */,
        3 /* Bottom */,
        4 /* TopLeft */,
        5 /* TopRight */,
        6 /* BottomLeft */,
        7 /* BottomRight */
    ];

    var windowStack = new porcelain.ZStack(1000);

    var TitleBar = (function (_super) {
        __extends(TitleBar, _super);
        function TitleBar(parent) {
            var _this = this;
            _super.call(this);
            this._onPressed = function (event) {
                _this._offsetX = event.pageX - _this._parent.left;
                _this._offsetY = event.pageY - _this._parent.top;
            };
            this._onReleased = function (event) {
                _this._offsetX = 0;
                _this._offsetY = 0;
            };
            this._onMoved = function (event) {
                var vp = porcelain.viewport;
                var x = Math.min(Math.max(vp.left, event.pageX), vp.windowRight);
                var y = Math.min(Math.max(vp.top, event.pageY), vp.windowBottom);
                _this._parent.pos = { x: x - _this._offsetX, y: y - _this._offsetY };
            };
            this._offsetX = 0;
            this._offsetY = 0;
            this._parent = parent;
            this._helper = new porcelain.DragHelper(this.element, null);
            this._helper.pressed = this._onPressed;
            this._helper.released = this._onReleased;
            this._helper.moved = this._onMoved;
            $(this.element).addClass(TITLE_BAR_CLASS);
        }
        TitleBar.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._helper.destroy();
            this._helper = null;
            this._parent = null;
        };
        return TitleBar;
    })(porcelain.Item);

    var ResizeGrip = (function (_super) {
        __extends(ResizeGrip, _super);
        function ResizeGrip(parent, location) {
            var _this = this;
            _super.call(this);
            this._onPressed = function (event) {
                switch (event.context) {
                    case 0 /* Left */:
                    case 4 /* TopLeft */:
                    case 6 /* BottomLeft */:
                        _this._offsetX = event.pageX - _this._parent.left;
                        break;
                    case 2 /* Right */:
                    case 5 /* TopRight */:
                    case 7 /* BottomRight */:
                        _this._offsetX = event.pageX - _this._parent.right;
                        break;
                    default:
                        break;
                }
                switch (event.context) {
                    case 1 /* Top */:
                    case 4 /* TopLeft */:
                    case 5 /* TopRight */:
                        _this._offsetY = event.pageY - _this._parent.top;
                        break;
                    case 3 /* Bottom */:
                    case 6 /* BottomLeft */:
                    case 7 /* BottomRight */:
                        _this._offsetY = event.pageY - _this._parent.bottom;
                        break;
                    default:
                        break;
                }
            };
            this._onReleased = function (event) {
                _this._offsetX = 0;
                _this._offsetY = 0;
            };
            this._onMoved = function (event) {
                var vp = porcelain.viewport;
                var x = event.pageX - _this._offsetX;
                var y = event.pageY - _this._offsetY;
                x = Math.min(Math.max(vp.left, x), vp.windowRight);
                y = Math.min(Math.max(vp.top, y), vp.windowBottom);
                switch (event.context) {
                    case 0 /* Left */:
                        _this._parent.left = x;
                        break;
                    case 1 /* Top */:
                        _this._parent.top = y;
                        break;
                    case 2 /* Right */:
                        _this._parent.right = x;
                        break;
                    case 3 /* Bottom */:
                        _this._parent.bottom = y;
                        break;
                    case 4 /* TopLeft */:
                        _this._parent.topLeft = { x: x, y: y };
                        break;
                    case 5 /* TopRight */:
                        _this._parent.topRight = { x: x, y: y };
                        break;
                    case 6 /* BottomLeft */:
                        _this._parent.bottomLeft = { x: x, y: y };
                        break;
                    case 7 /* BottomRight */:
                        _this._parent.bottomRight = { x: x, y: y };
                        break;
                    default:
                        break;
                }
            };
            this._offsetX = 0;
            this._offsetY = 0;
            this._parent = parent;
            this._helper = new porcelain.DragHelper(this.element, location);
            this._helper.pressed = this._onPressed;
            this._helper.released = this._onReleased;
            this._helper.moved = this._onMoved;
            $(this.element).addClass(RESIZE_GRIP_CLASS).addClass(BORDER_PREFIX + porcelain.Border[location]);
        }
        ResizeGrip.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._helper.destroy();
            this._helper = null;
            this._parent = null;
        };
        return ResizeGrip;
    })(porcelain.Item);

    var Body = (function (_super) {
        __extends(Body, _super);
        function Body() {
            _super.call(this);
            $(this.element).addClass(BODY_CLASS);
        }
        return Body;
    })(porcelain.Item);

    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            var _this = this;
            _super.call(this);
            this._onMouseDown = function (event) {
                _this.raise();
            };
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
        Window.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._body.destroy();
            this._titleBar.destroy();
            $.each(this._resizeGrips, function (index, grip) {
                grip.destroy();
            });
            this._body = null;
            this._titleBar = null;
            this._resizeGrips = null;
        };

        Window.prototype.show = function () {
            windowStack.add(this);
            $("body").append(this.element);
        };

        Window.prototype.raise = function () {
            windowStack.raise(this);
        };

        Window.prototype.lower = function () {
            windowStack.lower(this);
        };
        return Window;
    })(porcelain.Widget);
    porcelain.Window = Window;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=window.js.map
