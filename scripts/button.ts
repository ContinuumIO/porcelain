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
     * The class added to a Button when pressed.
     *
     * This is needed for firefox since event.preventDefault() 
     * will prevent the :active CSS class from being applied.
     */
    var PRESSED_CLASS = 'p-Button-pressed'


    /**
     * A basic button class.
     *
     * A Button provides the basic behavior of a simple push button. 
     *
     * @class
     */
    export class Button extends Component {

        /**
         * A signal emitted when the button is clicked.
         */
        clicked = new Signal();

        /**
         * A signal emitted when the button is pressed.
         */
        pressed = new Signal();

        /**
         * A signal emitted when the button is released.
         */
        released = new Signal();

        /** 
         * The mousedown event binder.
         */
        mousedown = new EventBinder("mousedown", this.element);

        /**
         * The mouseup event binder.
         */
        mouseup = new EventBinder("mouseup", document);

        /**
         * Construct a new Button instance.
         */
        constructor() {
            super();
            this.addClass(BUTTON_CLASS);
            this.mousedown.bind(this.onMouseDown, this);
        }

        /**
         * The mousedown event handler.
         *
         * @protected
         */
        onMouseDown(event: MouseEvent): void {
            if (event.button === 0) {
                event.preventDefault();
                this.addClass(PRESSED_CLASS);
                this.mouseup.bind(this.onMouseUp, this);
                this.pressed.emit();
            }
        }

        /**
         * The mouseup event handler.
         *
         * @protected
         */
        onMouseUp(event: MouseEvent): void {
            if (event.button === 0) {
                this.removeClass(PRESSED_CLASS);
                this.mouseup.unbind(this.onMouseUp, this);
                this.released.emit();
                if (event.target === this.element) {
                    event.preventDefault();
                    this.clicked.emit();
                }
            }
        }
    }

}
