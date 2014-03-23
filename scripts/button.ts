/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

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
    export class Button extends Item {

        /**
         * A signal emitted when the button is clicked.
         */
        clicked = new Signal<void>();

        /**
         * A signal emitted when the button is pressed.
         */
        pressed = new Signal<void>();

        /**
         * A signal emitted when the button is released.
         */
        released = new Signal<void>();

        /**
         * Construct a new Button instance.
         */
        constructor() {
            super();
            $(this.element)
                .mouseenter(this._onMouseEnter)
                .mouseleave(this._onMouseLeave)
                .mousedown(this._onMouseDown);
        }

        /**
         * Destroy the Button insance.
         */
        destroy(): void {
            super.destroy();
            this.clicked.disconnect();
            this.pressed.disconnect();
            this.released.disconnect();
        }

        /**
         * The internal mouse enter handler.
         *
         * @private
         */
        private _onMouseEnter = () => {
            $(this.element).addClass(HOVERED_CLASS);
        }

        /**
         * The internal mouse leave handler.
         *
         * @private
         */
        private _onMouseLeave = () => {
            $(this.element).removeClass(HOVERED_CLASS);
        }

        /**
         * The internal mouse down handler.
         *
         * @private
         */
        private _onMouseDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                event.preventDefault();
                event.stopPropagation();
                $(document).mouseup(this._onMouseUp);
                $(this.element).addClass(PRESSED_CLASS);
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
                $(this.element).removeClass(PRESSED_CLASS);
                this.released.emit(null);
                if (event.target === this.element) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.clicked.emit(null);
                }
            }
        }
    }

}
