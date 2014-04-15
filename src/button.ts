/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A basic push button class.
     *
     * This class serves as a base class for more concrete button types.
     *
     * @class
     */
    export
    class Button extends Component {

        /**
         * The CSS class added to Button instances.
         */
        static Class = "p-Button";

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
            this.addClass(Button.Class);
            this.evtMouseDown.bind(this.onMouseDown, this);
        }

        /**
         * Destroy the button instance.
         */
        destroy(): void {
            this.clicked.disconnect();
            this.pressed.disconnect();
            this.released.disconnect();
            this.evtMouseDown.destroy();
            this.evtMouseUp.destroy();
            super.destroy();
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
                this.addClass(CommonClass.Pressed);
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
                this.removeClass(CommonClass.Pressed);
                this.evtMouseUp.unbind(this.onMouseUp, this);
                this.released.emit();
                var rect = new Rect(this.element().getBoundingClientRect());
                var point = new Point(event.clientX, event.clientY);
                if (rect.contains(point)) {
                    event.preventDefault();
                    this.clicked.emit();
                }
            }
        }
    }

}
