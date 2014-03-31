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
    export class MoveGrip extends Widget {

        /** 
         * Construct a new MoveGrip.
         *
         * @param target The adjustable object moved by the grip.
         */
        constructor(target: IAdjustable) {
            super();
            this._target = target;
            this.addClass(MOVE_GRIP_CLASS);
            this.bind("mousedown", this.onMouseDown);
        }

        /**
         * Destroy the title bar.
         */
        destroy(): void {
            super.destroy();
            this._target = null;
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
            this.bind("mouseup", this.onMouseUp, document);
            this.bind("mousemove", this.onMouseMove, document);
            var geo = this._target.layoutItem.geometry();
            this._offsetX = event.pageX - geo.left;
            this._offsetY = event.pageY - geo.top;
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
            this.unbind("mouseup", this.onMouseUp, document);
            this.unbind("mousemove", this.onMouseMove, document);
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
            var origin = { x: x - this._offsetX, y: y - this._offsetY };
            var item = this._target.layoutItem;
            var rect = item.geometry();
            rect.moveTopLeft(origin);
            item.setGeometry(rect);
        }

        private _target: IAdjustable;
        private _offsetX: number = 0;
        private _offsetY: number = 0;
    }

}
