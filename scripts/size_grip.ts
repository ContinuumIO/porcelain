﻿/*-----------------------------------------------------------------------------
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
     * The prefix for the grip area class added to a size grip.
     */
    var GRIP_AREA_PREFIX = "p-GripArea-";

    
    /**
     * The areas which define the behavior of a size grip.
     */
    export enum GripArea {
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
     * A widget which enables mouse resizing of a layout actor.
     *
     * @class
     */
    export class SizeGrip extends Widget {

        /**
         * Construct a new SizeGrip.
         *
         * @param gripArea The grip area defining the size grip behavior.
         * @param target The adjustable object to be resized by the grip.
         */
        constructor(gripArea: GripArea, target: IAdjustable) {
            super();
            this._gripArea = gripArea;
            this._target = target;
            this.addClass(SIZE_GRIP_CLASS);
            this.addClass(GRIP_AREA_PREFIX + GripArea[gripArea]);
            this.bind("mousedown", this._onMouseDown);
        }

        /**
         * Destroy the edge grip.
         */
        destroy(): void {
            super.destroy();
            this._target = null;
        }

        /**
         * The grip area defining the size grip behavior.
         *
         * @readonly
         */
        get gripArea(): GripArea {
            return this._gripArea;
        }

        /**
         * The target object of the size grip.
         *
         * @readonly
         */
        get target(): IAdjustable {
            return this._target;
        }

        /**
         * The internal mousedown handler.
         *
         * @private
         */
        private _onMouseDown(event: MouseEvent): void {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.bind("mouseup", this._onMouseUp, document);
            this.bind("mousemove", this._onMouseMove, document);
            var geo = this._target.layoutItem.geometry();
            switch (this._gripArea) {
                case GripArea.Left:
                case GripArea.TopLeft:
                case GripArea.BottomLeft:
                    this._offsetX = event.pageX - geo.left;
                    break;
                case GripArea.Right:
                case GripArea.TopRight:
                case GripArea.BottomRight:
                    this._offsetX = event.pageX - geo.right;
                    break;
            }
            switch (this._gripArea) {
                case GripArea.Top:
                case GripArea.TopLeft:
                case GripArea.TopRight:
                    this._offsetY = event.pageY - geo.top;
                    break;
                case GripArea.Bottom:
                case GripArea.BottomLeft:
                case GripArea.BottomRight:
                    this._offsetY = event.pageY - geo.bottom;
                    break;
                default:
                    break;
            }
        }

        /**
         * The internal mouseup handler.
         *
         * @private
         */
        private _onMouseUp(event: MouseEvent): void {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.unbind("mouseup", this._onMouseUp, document);
            this.unbind("mousemove", this._onMouseMove, document);
            this._offsetX = 0;
            this._offsetY = 0;
        }

        /**
         * The internal mousemove handler.
         *
         * @private
         */
        private _onMouseMove(event: MouseEvent): void {
            event.preventDefault();
            var vp = viewport;
            var item = this._target.layoutItem;
            var geo = item.geometry();
            var minSize = item.minimumSize();
            var maxSize = item.maximumSize();
            var x = event.pageX - this._offsetX;
            var y = event.pageY - this._offsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            var minX: number, maxX: number;
            switch (this._gripArea) {
                case GripArea.Left:
                case GripArea.TopLeft:
                case GripArea.BottomLeft:
                    minX = geo.right - maxSize.width;
                    maxX = geo.right - minSize.width;
                    geo.left = Math.min(Math.max(minX, x), maxX);
                    break;
                case GripArea.Right:
                case GripArea.TopRight:
                case GripArea.BottomRight:
                    minX = geo.left + minSize.width;
                    maxX = geo.left + maxSize.width;
                    geo.right = Math.min(Math.max(minX, x), maxX);
                    break;
                default:
                    break;
            }
            var minY: number, maxY: number;
            switch (this._gripArea) {
                case GripArea.Top:
                case GripArea.TopLeft:
                case GripArea.TopRight:
                    minY = geo.bottom - maxSize.height;
                    maxY = geo.bottom - minSize.height;
                    geo.top = Math.min(Math.max(minY, y), maxY);
                    break;
                case GripArea.Bottom:
                case GripArea.BottomLeft:
                case GripArea.BottomRight:
                    minY = geo.top + minSize.height;
                    maxY = geo.top + maxSize.height;
                    geo.bottom = Math.min(Math.max(minY, y), maxY);
                    break;
                default:
                    break;
            }
            item.setGeometry(geo);
        }

        private _gripArea: GripArea;
        private _target: IAdjustable;
        private _offsetX: number = 0;
        private _offsetY: number = 0;
    }

}
