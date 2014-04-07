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
    * The class added to a Button when pressed.
    */
    var PRESSED_CLASS = 'p-Button-pressed';

    /**
    * A basic button class.
    *
    * A Button provides the basic behavior of a simple push button.
    *
    * @class
    */
    var Button = (function (_super) {
        __extends(Button, _super);
        /**
        * Construct a new Button instance.
        */
        function Button() {
            _super.call(this);
            /**
            * A signal emitted when the button is clicked.
            *
            * @readonly
            */
            this.clicked = new porcelain.Signal();
            /**
            * A signal emitted when the button is pressed.
            *
            * @readonly
            */
            this.pressed = new porcelain.Signal();
            /**
            * A signal emitted when the button is released.
            *
            * @readonly
            */
            this.released = new porcelain.Signal();
            /**
            * The mousedown event binder.
            *
            * @readonly
            */
            this.evtMouseDown = new porcelain.EventBinder("mousedown", this.element());
            /**
            * The mouseup event binder.
            *
            * @readonly
            */
            this.evtMouseUp = new porcelain.EventBinder("mouseup", document);
            this.addClass(BUTTON_CLASS);
            this.evtMouseDown.bind(this.onMouseDown, this);
        }
        /**
        * The mousedown event handler.
        *
        * @protected
        */
        Button.prototype.onMouseDown = function (event) {
            if (event.button === 0) {
                event.preventDefault();

                // This is needed for firefox since event.preventDefault()
                // will prevent the:active CSS class from being applied.
                this.addClass(PRESSED_CLASS);
                this.evtMouseUp.bind(this.onMouseUp, this);
                this.pressed.emit();
            }
        };

        /**
        * The mouseup event handler.
        *
        * @protected
        */
        Button.prototype.onMouseUp = function (event) {
            if (event.button === 0) {
                this.removeClass(PRESSED_CLASS);
                this.evtMouseUp.unbind(this.onMouseUp, this);
                this.released.emit();
                if (event.target === this.element()) {
                    event.preventDefault();
                    this.clicked.emit();
                }
            }
        };
        return Button;
    })(porcelain.Component);
    porcelain.Button = Button;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=button.js.map
