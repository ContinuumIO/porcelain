/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The areas which define the behavior of a size grip.
     */
    export
    enum GripArea {
        Left,
        Top,
        Right,
        Bottom,
        TopLeft,
        TopRight,
        BottomLeft,
        BottomRight
    }


    /**
     * A widget which enables mouse resizing of an adjustable item.
     *
     * @class
     */
    export
    class SizeGrip extends Component {

        /**
         * The CSS class added to SizeGrip instances.
         */
        static Class = "p-SizeGrip";

        /**
         * The CSS class prefix for GripArea values.
         */
        static GripAreaPrefix = "p-GripArea-";

        /**
         * The mousedown event binder.
         */
        evtMouseDown = new EventBinder("mousedown", this.element());

        /**
         * The mouseup event binder.
         */
        evtMouseUp = new EventBinder("mouseup", document);

        /**
         * The mousemove event binder.
         */
        evtMouseMove = new EventBinder("mousemove", document);

        /**
         * Construct a new SizeGrip.
         *
         * @param gripArea The grip area defining the size grip behavior.
         * @param target The layout item to resize with the grip.
         */
        constructor(gripArea: GripArea, target: ILayoutItem) {
            super();
            this._gripArea = gripArea;
            this._target = target;
            this.addClass(SizeGrip.Class);
            this.addClass(SizeGrip.GripAreaPrefix + GripArea[gripArea]);
            this.evtMouseDown.bind(this.onMouseDown, this);
        }

        /**
         * Destroy the SizeGrip.
         */
        destroy(): void {
            this.evtMouseDown.destroy();
            this.evtMouseUp.destroy();
            this.evtMouseMove.destroy();
            this._target = null;
            super.destroy();
        }

        /**
         * Returns the grip area defining the size grip behavior.
         */
        gripArea(): GripArea {
            return this._gripArea;
        }

        /**
         * Returns the target layout item resized by the size grip.
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
            switch (this._gripArea) {
                case GripArea.Left:
                case GripArea.TopLeft:
                case GripArea.BottomLeft:
                    this._offsetX = event.pageX - rect.left;
                    break;
                case GripArea.Right:
                case GripArea.TopRight:
                case GripArea.BottomRight:
                    this._offsetX = event.pageX - rect.right;
                    break;
            }
            switch (this._gripArea) {
                case GripArea.Top:
                case GripArea.TopLeft:
                case GripArea.TopRight:
                    this._offsetY = event.pageY - rect.top;
                    break;
                case GripArea.Bottom:
                case GripArea.BottomLeft:
                case GripArea.BottomRight:
                    this._offsetY = event.pageY - rect.bottom;
                    break;
                default:
                    break;
            }
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
            var vp = Viewport;
            var target = this._target;
            var rect = target.rect();
            var minSize = target.minimumSize();
            var maxSize = target.maximumSize();
            var x = event.pageX - this._offsetX;
            var y = event.pageY - this._offsetY;
            x = Math.min(Math.max(vp.left(), x), vp.windowRight());
            y = Math.min(Math.max(vp.top(), y), vp.windowBottom());
            var minX: number, maxX: number;
            switch (this._gripArea) {
                case GripArea.Left:
                case GripArea.TopLeft:
                case GripArea.BottomLeft:
                    minX = rect.right - maxSize.width;
                    maxX = rect.right - minSize.width;
                    rect.left = Math.min(Math.max(minX, x), maxX);
                    break;
                case GripArea.Right:
                case GripArea.TopRight:
                case GripArea.BottomRight:
                    minX = rect.left + minSize.width;
                    maxX = rect.left + maxSize.width;
                    rect.right = Math.min(Math.max(minX, x), maxX);
                    break;
                default:
                    break;
            }
            var minY: number, maxY: number;
            switch (this._gripArea) {
                case GripArea.Top:
                case GripArea.TopLeft:
                case GripArea.TopRight:
                    minY = rect.bottom - maxSize.height;
                    maxY = rect.bottom - minSize.height;
                    rect.top = Math.min(Math.max(minY, y), maxY);
                    break;
                case GripArea.Bottom:
                case GripArea.BottomLeft:
                case GripArea.BottomRight:
                    minY = rect.top + minSize.height;
                    maxY = rect.top + maxSize.height;
                    rect.bottom = Math.min(Math.max(minY, y), maxY);
                    break;
                default:
                    break;
            }
            target.setRect(rect);
        }

        private _gripArea: GripArea;
        private _target: ILayoutItem;
        private _offsetX: number = 0;
        private _offsetY: number = 0;
    }

}
