/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A component which serves as a move grip for a component.
     *
     * @class
     */
    export
    class MoveGrip extends Component {

        /**
         * The CSS class added to MoveGrip instances.
         */
        static Class = "p-MoveGrip";

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
         * The mousemove event binder.
         *
         * @readonly
         */
        evtMouseMove = new EventBinder("mousemove", document);

        /**
         * Construct a new MoveGrip.
         *
         * @param item The layout item to manipulate with the grip.
         */
        constructor(target: ILayoutItem) {
            super();
            this._target = target;
            this.addClass(MoveGrip.Class);
            this.evtMouseDown.bind(this.onMouseDown, this);
        }

        /**
         * Destroy the MoveGrip.
         */
        destroy(): void {
            this.evtMouseDown.destroy();
            this.evtMouseUp.destroy();
            this.evtMouseMove.destroy();
            this._target = null;
            super.destroy();
        }

        /**
         * The target layout item manipulated by the grip.
         */
        target(): ILayoutItem {
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
            this.evtMouseUp.bind(this.onMouseUp, this);
            this.evtMouseMove.bind(this.onMouseMove, this);
            var rect = this._target.rect();
            this._offsetX = event.pageX - rect.left;
            this._offsetY = event.pageY - rect.top;
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
            this.evtMouseUp.unbind(this.onMouseUp, this);
            this.evtMouseMove.unbind(this.onMouseMove, this);
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
            var v = Viewport;
            var x = Math.min(Math.max(v.left(), event.pageX), v.windowRight());
            var y = Math.min(Math.max(v.top(), event.pageY), v.windowBottom());
            var rect = this._target.rect();
            rect.moveLeft(x - this._offsetX);
            rect.moveTop(y - this._offsetY);
            this._target.setRect(rect);
        }

        private _target: ILayoutItem;
        private _offsetX: number = 0;
        private _offsetY: number = 0;
    }

}
