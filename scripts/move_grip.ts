/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The class added to a MoveGrip instance.
     */
    var MOVE_GRIP_CLASS = "p-MoveGrip";


    /**
     * A widget which serves as move grip for an adjustable item.
     *
     * This can serve as a base class for more complex widgets 
     * like a window title bar.
     *
     * @class
     */
    export class MoveGrip extends Component {

        /**
         * The mousedown event binder.
         */
        mousedown = new EventBinder("mousedown", this.element);

        /**
         * The mouseup event binder.
         */
        mouseup = new EventBinder("mouseup", document);

        /**
         * The mousemove event binder.
         */
        mousemove = new EventBinder("mousemove", document);

        /** 
         * Construct a new MoveGrip.
         *
         * @param target The component to move with the grip.
         */
        constructor(target: Component) {
            super();
            this._target = target;
            this.addClass(MOVE_GRIP_CLASS);
            this.mousedown.bind(this.onMouseDown, this);
        }

        /**
         * Destroy the title bar.
         */
        destroy(): void {
            super.destroy();
            this._target = null;
        }

        /**
         * The target component moved by the grip.
         * 
         * @readonly
         */
        target(): Component {
            return this._target;
        }

        /**
         * The mousedown handler.
         *
         * @protected 
         */
        onMouseDown(event: MouseEvent): void {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.mouseup.bind(this.onMouseUp, this);
            this.mousemove.bind(this.onMouseMove, this);
            var pos = this._target.position;
            this._offsetX = event.pageX - pos.x;
            this._offsetY = event.pageY - pos.y;
        }

        /**
         * The mouseup handler.
         *
         * @protected
         */
        onMouseUp(event: MouseEvent): void {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.mouseup.unbind(this.onMouseUp, this);
            this.mousemove.unbind(this.onMouseMove, this);
            this._offsetX = 0;
            this._offsetY = 0;
        }

        /**
         * The mousemove handler.
         *
         * @protected
         */
        onMouseMove(event: MouseEvent): void {
            event.preventDefault();
            var vp = viewport;
            var x = Math.min(Math.max(vp.left, event.pageX), vp.windowRight);
            var y = Math.min(Math.max(vp.top, event.pageY), vp.windowBottom);
            var origin = new Point(x - this._offsetX, y - this._offsetY);
            this._target.position = origin;
        }

        private _target: Component;
        private _offsetX: number = 0;
        private _offsetY: number = 0;
    }

}
