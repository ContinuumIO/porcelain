/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The class added to a SizeGrip instance.
     */
    var SIZE_GRIP_CLASS = "p-SizeGrip";

    /**
     * The prefix for the border class added to a size grip.
     */
    var BORDER_PREFIX = "p-Border-";


    /**
     * A widget which enables drag-sizing of an element's geometry.
     *
     * @class
     */
    export class SizeGrip extends Widget {

        /**
         * Construct a new SizeGrip.
         */
        constructor(border: Border) {
            super();
            this._border = border;
            this.addClass(SIZE_GRIP_CLASS);
            this.addClass(BORDER_PREFIX + Border[border]);
            //this.elementEvents.enable("mousedown");
        }

        /**
         * Destroy the size grip.
         */
        destroy(): void {
            super.destroy();
            this._target = null;
        }

        /**
         * The internal mousedown handler.
         *
         * @private
         */
        /*
        private _onMouseDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                event.preventDefault();
                $(document).mouseup(this._onMouseUp)
                    .mousemove(this._onMouseMove);
                switch (this._border) {
                    case Border.Left:
                    case Border.TopLeft:
                    case Border.BottomLeft:
                        this._offsetX = event.pageX - this._target.left;
                        break;
                    case Border.Right:
                    case Border.TopRight:
                    case Border.BottomRight:
                        this._offsetX = event.pageX - this._target.right;
                        break;
                    default:
                        break;
                }
                switch (this._border) {
                    case Border.Top:
                    case Border.TopLeft:
                    case Border.TopRight:
                        this._offsetY = event.pageY - this._target.top;
                        break;
                    case Border.Bottom:
                    case Border.BottomLeft:
                    case Border.BottomRight:
                        this._offsetY = event.pageY - this._target.bottom;
                        break;
                    default:
                        break;
                }
            }
        }
        */

        /**
         * The internal mouseup handler.
         *
         * @private
         */
        /*
        private _onMouseUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                event.preventDefault();
                this._offsetX = 0;
                this._offsetY = 0;
                $(document).off("mouseup", this._onMouseUp)
                    .off("mousemove", this._onMouseMove);
            }
        }
        */

        /**
         * The internal mousemove handler.
         *
         * @private
         */
        /*
        private _onMouseMove = (event: JQueryMouseEventObject) => {
            event.preventDefault();
            var vp = viewport;
            var x = event.pageX - this._offsetX;
            var y = event.pageY - this._offsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            switch (this._border) {
                case Border.Left:
                    this._target.left = x;
                    break;
                case Border.Top:
                    this._target.top = y;
                    break;
                case Border.Right:
                    this._target.right = x;
                    break;
                case Border.Bottom:
                    this._target.bottom = y;
                    break;
                case Border.TopLeft:
                    this._target.topLeft = { x: x, y: y };
                    break;
                case Border.TopRight:
                    this._target.topRight = { x: x, y: y };
                    break;
                case Border.BottomLeft:
                    this._target.bottomLeft = { x: x, y: y };
                    break;
                case Border.BottomRight:
                    this._target.bottomRight = { x: x, y: y };
                    break;
                default:
                    break;
            }
        }
        */

        private _border: Border;
        private _target: Geometry;
        private _offsetX: number = 0;
        private _offsetY: number = 0;
    }

}
