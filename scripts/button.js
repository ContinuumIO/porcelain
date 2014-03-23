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
    * The class added to the button when pressed.
    */
    var PRESSED_CLASS = "porcelain-Button-pressed";

    /**
    * The class added to the button when hovered.
    */
    var HOVERED_CLASS = "porcelain-Button-hovered";

    /**
    * A basic button class.
    *
    * A Button provides the basic behavior of a simple push button.
    * It is sufficient for standalone use as an image button when
    * the button backgroun image is provided by CSS.
    *
    * @class
    */
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
        * Construct a new Button instance.
        */
        function Button(parent) {
            if (typeof parent === "undefined") { parent = null; }
            var _this = this;
            _super.call(this, parent);
            /**
            * A signal emitted when the button is clicked.
            */
            this.clicked = this.createSignal();
            /**
            * A signal emitted when the button is pressed.
            */
            this.pressed = this.createSignal();
            /**
            * A signal emitted when the button is released.
            */
            this.released = this.createSignal();
            /**
            * The internal mouse enter handler.
            *
            * @private
            */
            this._onMouseEnter = function () {
                $(_this.element).addClass(HOVERED_CLASS);
            };
            /**
            * The internal mouse leave handler.
            *
            * @private
            */
            this._onMouseLeave = function () {
                $(_this.element).removeClass(HOVERED_CLASS);
            };
            /**
            * The internal mouse down handler.
            *
            * @private
            */
            this._onMouseDown = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(document).mouseup(_this._onMouseUp);
                    $(_this.element).addClass(PRESSED_CLASS);
                    _this.pressed.emit(null);
                }
            };
            /**
            * The internal mouse up handler.
            *
            * @private
            */
            this._onMouseUp = function (event) {
                if (event.button === 0) {
                    $(document).off("mouseup", _this._onMouseUp);
                    $(_this.element).removeClass(PRESSED_CLASS);
                    _this.released.emit(null);
                    if (event.target === _this.element) {
                        event.preventDefault();
                        event.stopPropagation();
                        _this.clicked.emit(null);
                    }
                }
            };
            $(this.element).mouseenter(this._onMouseEnter).mouseleave(this._onMouseLeave).mousedown(this._onMouseDown);
        }
        return Button;
    })(porcelain.Item);
    porcelain.Button = Button;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=button.js.map
