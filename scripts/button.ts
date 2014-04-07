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
     * A basic push button class.
     *
     * This class serves as a base class for more concrete button types.
     *
     * @class
     */
    export class Button extends Component {

        /**
         * A signal emitted when the button is clicked.
         *
         * @readonly
         */
        clicked = new Signal();

        /**
         * A signal emitted when the button is pressed.
         *
         * @readonly
         */
        pressed = new Signal();

        /**
         * A signal emitted when the button is released.
         *
         * @readonly
         */
        released = new Signal();

        /** 
         * The mousedown event binder.
         *
         * @readonly
         */
        evtMouseDown = new EventBinder("mousedown", this.element());

        /**
         * The mouseup event binder.
         *
         * @readonly
         */
        evtMouseUp = new EventBinder("mouseup", document);

        /**
         * Construct a new Button instance.
         */
        constructor() {
            super();
            this.addClass(BUTTON_CLASS);
            this.evtMouseDown.bind(this.onMouseDown, this);
        }

        /**
         * The mousedown event handler.
         *
         * @protected
         */
        onMouseDown(event: MouseEvent): void {
            if (event.button === 0) {
                event.preventDefault();
                // This is needed for firefox since event.preventDefault()
                // will prevent the :active CSS class from being applied.
                this.addClass(PRESSED_CLASS);
                this.evtMouseUp.bind(this.onMouseUp, this);
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
                this.evtMouseUp.unbind(this.onMouseUp, this);
                this.released.emit();
                if (event.target === this.element()) {
                    event.preventDefault();
                    this.clicked.emit();
                }
            }
        }
    }

}
