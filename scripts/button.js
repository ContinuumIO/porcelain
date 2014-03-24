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
    * The class added to a Button instance.
    */
    var BUTTON_CLASS = "p-Button";

    /**
    * The class added to a Button when it is pressed.
    */
    var PRESSED_CLASS = "p-Button-pressed";

    /**
    * The class added to a Button when it is hovered.
    */
    var HOVERED_CLASS = "p-Button-hovered";

    /**
    * A basic button class.
    *
    * A Button provides the basic behavior of a simple push button.
    * This class is intented to be subclassed to provide features
    * such as button text and default visual styling, but it is
    * useful on its own with CSS background images.
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
                _this.$.addClass(HOVERED_CLASS);
            };
            /**
            * The internal mouse leave handler.
            *
            * @private
            */
            this._onMouseLeave = function () {
                _this.$.removeClass(HOVERED_CLASS);
            };
            /**
            * The internal mouse down handler.
            *
            * @private
            */
            this._onMouseDown = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    $(document).mouseup(_this._onMouseUp);
                    _this.$.addClass(PRESSED_CLASS);
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
                    _this.$.removeClass(PRESSED_CLASS);
                    _this.released.emit(null);
                    if (event.target === _this.element) {
                        event.preventDefault();
                        _this.clicked.emit(null);
                    }
                }
            };
            this.$.addClass(BUTTON_CLASS).mouseenter(this._onMouseEnter).mouseleave(this._onMouseLeave).mousedown(this._onMouseDown);
        }
        return Button;
    })(porcelain.Item);
    porcelain.Button = Button;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=button.js.map
