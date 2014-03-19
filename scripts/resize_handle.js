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
    var HANDLE_CLASS = "porcelain-ResizeHandle";

    var ResizeHandle = (function (_super) {
        __extends(ResizeHandle, _super);
        function ResizeHandle(tag) {
            var _this = this;
            _super.call(this);
            this.pressed = new porcelain.Signal();
            this.released = new porcelain.Signal();
            this.moved = new porcelain.Signal();
            this._onMouseDown = function (event) {
                if (event.button === 0) {
                    var doc = $(document);
                    doc.on("mouseup", _this._onMouseUp);
                    doc.on("mousemove", _this._onMouseMove);
                    event.preventDefault();
                    var arg = { x: event.pageX, y: event.pageY, tag: _this._tag };
                    _this.pressed.emit(arg);
                }
            };
            this._onMouseUp = function (event) {
                if (event.button === 0) {
                    var doc = $(document);
                    doc.off("mouseup", _this._onMouseUp);
                    doc.off("mousemove", _this._onMouseMove);
                    event.preventDefault();
                    _this.pressed.emit({ x: event.pageX, y: event.pageY });
                }
            };
            this._onMouseMove = function (event) {
                event.preventDefault();
                _this.moved.emit({ x: event.pageX, y: event.pageY });
            };
            this._tag = tag;
        }
        ResizeHandle.prototype.create = function () {
            if (this.element) {
                return;
            }
            _super.prototype.create.call(this);
            $(this.element).addClass(HANDLE_CLASS).mousedown(this._onMouseDown);
        };
        return ResizeHandle;
    })(porcelain.Item);
    porcelain.ResizeHandle = ResizeHandle;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=resize_handle.js.map
