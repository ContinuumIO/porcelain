/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

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
    export class Button extends Item {

        /**
         * A signal emitted when the button is clicked.
         */
        clicked = this.createSignal<void>();

        /**
         * A signal emitted when the button is pressed.
         */
        pressed = this.createSignal<void>();

        /**
         * A signal emitted when the button is released.
         */
        released = this.createSignal<void>();

        /**
         * Construct a new Button instance.
         */
        constructor(parent: Item = null) {
            super(parent);
            this.$.addClass(BUTTON_CLASS)
                .mouseenter(this._onMouseEnter)
                .mouseleave(this._onMouseLeave)
                .mousedown(this._onMouseDown);
        }

        /**
         * The internal mouse enter handler.
         *
         * @private
         */
        private _onMouseEnter = () => {
            this.$.addClass(HOVERED_CLASS);
        }

        /**
         * The internal mouse leave handler.
         *
         * @private
         */
        private _onMouseLeave = () => {
            this.$.removeClass(HOVERED_CLASS);
        }

        /**
         * The internal mouse down handler.
         *
         * @private
         */
        private _onMouseDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                event.preventDefault();
                $(document).mouseup(this._onMouseUp);
                this.$.addClass(PRESSED_CLASS);
                this.pressed.emit(null);
            }
        }

        /**
         * The internal mouse up handler.
         *
         * @private
         */
        private _onMouseUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                $(document).off("mouseup", this._onMouseUp);
                this.$.removeClass(PRESSED_CLASS);
                this.released.emit(null);
                if (event.target === this.element) {
                    event.preventDefault();
                    this.clicked.emit(null);
                }
            }
        }
    }

}
