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
         * @param target The component to move with the grip.
         */
        constructor(target: Component) {
            super();
            this._item = new ComponentItem(target);
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
            this._item.component = null;
            this._item = null;
            super.destroy();
        }

        /**
         * The target component moved by the grip.
         */
        target(): Component {
            return this._item.component;
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
            var pos = this._item.pos();
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
            this._item.setPos(new Point(x - this._offsetX, y - this._offsetY));
        }

        private _item: ComponentItem;
        private _offsetX: number = 0;
        private _offsetY: number = 0;
    }

}
