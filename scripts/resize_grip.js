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
    /**
    * A resize grip for use with a top-level window.
    *
    * A ResizeGrip updates the geometry of a window in response to a
    * left mouse button drag.
    *
    * @class
    */
    var ResizeGrip = (function (_super) {
        __extends(ResizeGrip, _super);
        /**
        * Construct a new ResizeGrip.
        *
        * @param border - the border position of the grip
        * @param windowGeometry - the geometry handler for the window
        */
        function ResizeGrip(border, windowGeometry) {
            var _this = this;
            _super.call(this);
            /**
            * The internal mousedown handler.
            *
            * @private
            */
            this._onMouseDown = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(document).mouseup(_this._onMouseUp).mousemove(_this._onMouseMove);
                    switch (_this._border) {
                        case 0 /* Left */:
                        case 4 /* TopLeft */:
                        case 6 /* BottomLeft */:
                            _this._offsetX = event.pageX - _this._windowGeometry.left;
                            break;
                        case 2 /* Right */:
                        case 5 /* TopRight */:
                        case 7 /* BottomRight */:
                            _this._offsetX = event.pageX - _this._windowGeometry.right;
                            break;
                        default:
                            break;
                    }
                    switch (_this._border) {
                        case 1 /* Top */:
                        case 4 /* TopLeft */:
                        case 5 /* TopRight */:
                            _this._offsetY = event.pageY - _this._windowGeometry.top;
                            break;
                        case 3 /* Bottom */:
                        case 6 /* BottomLeft */:
                        case 7 /* BottomRight */:
                            _this._offsetY = event.pageY - _this._windowGeometry.bottom;
                            break;
                        default:
                            break;
                    }
                }
            };
            /**
            * The internal mouseup handler.
            *
            * @private
            */
            this._onMouseUp = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    _this._offsetX = 0;
                    _this._offsetY = 0;
                    $(document).off("mouseup", _this._onMouseUp).off("mousemove", _this._onMouseMove);
                }
            };
            /**
            * The internal mousemove handler.
            *
            * @private
            */
            this._onMouseMove = function (event) {
                event.preventDefault();
                event.stopPropagation();
                var vp = porcelain.viewport;
                var x = event.pageX - _this._offsetX;
                var y = event.pageY - _this._offsetY;
                x = Math.min(Math.max(vp.left, x), vp.windowRight);
                y = Math.min(Math.max(vp.top, y), vp.windowBottom);
                switch (_this._border) {
                    case 0 /* Left */:
                        _this._windowGeometry.left = x;
                        break;
                    case 1 /* Top */:
                        _this._windowGeometry.top = y;
                        break;
                    case 2 /* Right */:
                        _this._windowGeometry.right = x;
                        break;
                    case 3 /* Bottom */:
                        _this._windowGeometry.bottom = y;
                        break;
                    case 4 /* TopLeft */:
                        _this._windowGeometry.topLeft = { x: x, y: y };
                        break;
                    case 5 /* TopRight */:
                        _this._windowGeometry.topRight = { x: x, y: y };
                        break;
                    case 6 /* BottomLeft */:
                        _this._windowGeometry.bottomLeft = { x: x, y: y };
                        break;
                    case 7 /* BottomRight */:
                        _this._windowGeometry.bottomRight = { x: x, y: y };
                        break;
                    default:
                        break;
                }
            };
            this._offsetX = 0;
            this._offsetY = 0;
            this._border = border;
            this._windowGeometry = windowGeometry;
            $(this.element).mousedown(this._onMouseDown);
        }
        /**
        * Destroy the ResizeGrip.
        */
        ResizeGrip.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._windowGeometry = null;
        };
        return ResizeGrip;
    })(porcelain.Item);
    porcelain.ResizeGrip = ResizeGrip;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=resize_grip.js.map
