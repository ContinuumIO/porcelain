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
    * The class added to a SizeGrip instance.
    */
    var SIZE_GRIP_CLASS = "p-SizeGrip";

    /**
    * The prefix for the border class added to a size grip.
    */
    var BORDER_PREFIX = "p-Border-";

    /**
    * An item which enables drag-sizing of an element's geometry.
    *
    * @class
    */
    var SizeGrip = (function (_super) {
        __extends(SizeGrip, _super);
        /**
        * Construct a new SizeGrip.
        */
        function SizeGrip(border, target, parent) {
            if (typeof parent === "undefined") { parent = null; }
            var _this = this;
            _super.call(this, parent);
            /**
            * The internal mousedown handler.
            *
            * @private
            */
            this._onMouseDown = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    $(document).mouseup(_this._onMouseUp).mousemove(_this._onMouseMove);
                    switch (_this._border) {
                        case 0 /* Left */:
                        case 4 /* TopLeft */:
                        case 6 /* BottomLeft */:
                            _this._offsetX = event.pageX - _this._target.left;
                            break;
                        case 2 /* Right */:
                        case 5 /* TopRight */:
                        case 7 /* BottomRight */:
                            _this._offsetX = event.pageX - _this._target.right;
                            break;
                        default:
                            break;
                    }
                    switch (_this._border) {
                        case 1 /* Top */:
                        case 4 /* TopLeft */:
                        case 5 /* TopRight */:
                            _this._offsetY = event.pageY - _this._target.top;
                            break;
                        case 3 /* Bottom */:
                        case 6 /* BottomLeft */:
                        case 7 /* BottomRight */:
                            _this._offsetY = event.pageY - _this._target.bottom;
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
                var vp = porcelain.viewport;
                var x = event.pageX - _this._offsetX;
                var y = event.pageY - _this._offsetY;
                x = Math.min(Math.max(vp.left, x), vp.windowRight);
                y = Math.min(Math.max(vp.top, y), vp.windowBottom);
                switch (_this._border) {
                    case 0 /* Left */:
                        _this._target.left = x;
                        break;
                    case 1 /* Top */:
                        _this._target.top = y;
                        break;
                    case 2 /* Right */:
                        _this._target.right = x;
                        break;
                    case 3 /* Bottom */:
                        _this._target.bottom = y;
                        break;
                    case 4 /* TopLeft */:
                        _this._target.topLeft = { x: x, y: y };
                        break;
                    case 5 /* TopRight */:
                        _this._target.topRight = { x: x, y: y };
                        break;
                    case 6 /* BottomLeft */:
                        _this._target.bottomLeft = { x: x, y: y };
                        break;
                    case 7 /* BottomRight */:
                        _this._target.bottomRight = { x: x, y: y };
                        break;
                    default:
                        break;
                }
            };
            this._offsetX = 0;
            this._offsetY = 0;
            this._border = border;
            this._target = target;
            this.$.addClass(SIZE_GRIP_CLASS).addClass(BORDER_PREFIX + porcelain.Border[border]).mousedown(this._onMouseDown);
        }
        /**
        * Destroy the size grip.
        */
        SizeGrip.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._target = null;
        };
        return SizeGrip;
    })(porcelain.Item);
    porcelain.SizeGrip = SizeGrip;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size_grip.js.map
