/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var DragHelper = (function () {
        function DragHelper(element, context) {
            var _this = this;
            this.pressed = null;
            this.released = null;
            this.moved = null;
            this._onMouseDown = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    $(document).mouseup(_this._onMouseUp).mousemove(_this._onMouseMove);
                    if (_this.pressed) {
                        _this.pressed({
                            pageX: event.pageX,
                            pageY: event.pageY,
                            context: _this._context
                        });
                    }
                }
            };
            this._onMouseUp = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    $(document).off("mouseup", _this._onMouseUp).off("mousemove", _this._onMouseMove);
                    if (_this.released) {
                        _this.released({
                            pageX: event.pageX,
                            pageY: event.pageY,
                            context: _this._context
                        });
                    }
                }
            };
            this._onMouseMove = function (event) {
                event.preventDefault();
                if (_this.moved) {
                    _this.moved({
                        pageX: event.pageX,
                        pageY: event.pageY,
                        context: _this._context
                    });
                }
            };
            this._element = element;
            this._context = context;
            $(element).mousedown(this._onMouseDown);
        }
        DragHelper.prototype.destroy = function () {
            $(this._element).off("mousedown", this._onMouseDown);
            this._element = null;
            this._context = null;
            this.pressed = null;
            this.released = null;
            this.moved = null;
        };

        Object.defineProperty(DragHelper.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DragHelper.prototype, "context", {
            get: function () {
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        return DragHelper;
    })();
    porcelain.DragHelper = DragHelper;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=drag_helper.js.map
