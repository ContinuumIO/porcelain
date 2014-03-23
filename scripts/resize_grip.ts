/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {
    
    /**
     * A resize grip for use with a top-level window.
     *
     * A ResizeGrip updates the geometry of a window in response to a
     * left mouse button drag.
     *
     * @class
     */
    export class ResizeGrip extends Item {

        /**
         * Construct a new ResizeGrip.
         *
         * @param border - the border position of the grip
         * @param windowGeometry - the geometry handler for the window
         */
        constructor(border: Border, windowGeometry: Geometry) {
            super();
            this._border = border;
            this._windowGeometry = windowGeometry;
            $(this.element).mousedown(this._onMouseDown);
        }

        /**
         * Destroy the ResizeGrip.
         */
        destroy(): void {
            super.destroy();
            this._windowGeometry = null;
        }
        
        /**
         * The internal mousedown handler.
         *
         * @private
         */
        private _onMouseDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                event.preventDefault();
                event.stopPropagation();
                $(document)
                    .mouseup(this._onMouseUp)
                    .mousemove(this._onMouseMove);
                switch (this._border) {
                    case Border.Left:
                    case Border.TopLeft:
                    case Border.BottomLeft:
                        this._offsetX = event.pageX - this._windowGeometry.left;
                        break;
                    case Border.Right:
                    case Border.TopRight:
                    case Border.BottomRight:
                        this._offsetX = event.pageX - this._windowGeometry.right;
                        break;
                    default:
                        break;
                }
                switch (this._border) {
                    case Border.Top:
                    case Border.TopLeft:
                    case Border.TopRight:
                        this._offsetY = event.pageY - this._windowGeometry.top;
                        break;
                    case Border.Bottom:
                    case Border.BottomLeft:
                    case Border.BottomRight:
                        this._offsetY = event.pageY - this._windowGeometry.bottom;
                        break;
                    default:
                        break;
                }
            }
        }

        /**
         * The internal mouseup handler.
         *
         * @private
         */
        private _onMouseUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                event.preventDefault();
                event.stopPropagation();
                this._offsetX = 0;
                this._offsetY = 0;
                $(document)
                    .off("mouseup", this._onMouseUp)
                    .off("mousemove", this._onMouseMove);
            }
        }

        /**
         * The internal mousemove handler.
         *
         * @private
         */
        private _onMouseMove = (event: JQueryMouseEventObject) => {
            event.preventDefault();
            event.stopPropagation();
            var vp = viewport;
            var x = event.pageX - this._offsetX;
            var y = event.pageY - this._offsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            switch (this._border) {
                case Border.Left:
                    this._windowGeometry.left = x;
                    break;
                case Border.Top:
                    this._windowGeometry.top = y;
                    break;
                case Border.Right:
                    this._windowGeometry.right = x;
                    break;
                case Border.Bottom:
                    this._windowGeometry.bottom = y;
                    break;
                case Border.TopLeft:
                    this._windowGeometry.topLeft = { x: x, y: y };
                    break;
                case Border.TopRight:
                    this._windowGeometry.topRight = { x: x, y: y };
                    break;
                case Border.BottomLeft:
                    this._windowGeometry.bottomLeft = { x: x, y: y };
                    break;
                case Border.BottomRight:
                    this._windowGeometry.bottomRight = { x: x, y: y };
                    break;
                default:
                    break;
            }
        }

        private _offsetX: number = 0;
        private _offsetY: number = 0;
        private _windowGeometry: Geometry;
        private _border: Border;
    }

}
