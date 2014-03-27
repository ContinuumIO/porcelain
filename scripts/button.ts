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
     * A basic button class.
     *
     * A Button provides the basic behavior of a simple push button. 
     * This class is intented to be subclassed to provide features
     * such as button text and default visual styling, but it is 
     * useful on its own when decorated with custom CSS styling.
     *
     * @class
     */
    export class Button extends Widget {

        /**
         * A signal emitted when the button is clicked.
         */
        clicked = this.createSignal();

        /**
         * A signal emitted when the button is pressed.
         */
        pressed = this.createSignal();

        /**
         * A signal emitted when the button is released.
         */
        released = this.createSignal();

        /**
         * Construct a new Button instance.
         */
        constructor() {
            super();
            this.addClass(BUTTON_CLASS);
            this.elementEvents.enable("mousedown");
        }

        /**
         * The element mousedown event handler.
         *
         * @private
         */
        private onElement_mousedown(event: MouseEvent): void {
            if (event.button === 0) {
                event.preventDefault();
                this.documentEvents.enable("mouseup");
                this.pressed.emit();
            }
        }

        /**
         * The document mouseup event handler.
         *
         * @private
         */
        private onDocument_mouseup(event: MouseEvent): void {
            if (event.button === 0) {
                this.documentEvents.disable("mouseup");
                this.released.emit();
                if (event.target === this.element) {
                    event.preventDefault();
                    this.clicked.emit();
                }
            }
        }
    }

}
