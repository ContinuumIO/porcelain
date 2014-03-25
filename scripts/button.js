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
        function Button() {
            var _this = this;
            _super.call(this);
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
            * The internal mouse down handler.
            *
            * @private
            */
            this._onMouseDown = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    $(document).mouseup(_this._onMouseUp);
                    _this.pressed.emit();
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
                    _this.released.emit();
                    if (event.target === _this.element) {
                        event.preventDefault();
                        _this.clicked.emit();
                    }
                }
            };
            this.addClass(BUTTON_CLASS);
            //mousedown(this._onMouseDown);
        }
        return Button;
    })(porcelain.Item);
    porcelain.Button = Button;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=button.js.map
