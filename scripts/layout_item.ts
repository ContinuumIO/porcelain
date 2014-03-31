/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The maximimum allowed width or height of an item.
     */
    export var MAX_ITEM_DIM = (1 << 16) - 1;

    /** 
     * The minimum allowed size of an item.
     */
    export var MIN_ITEM_SIZE = new Size(0, 0);

    /**
     * The maximum allowed size of an item.
     */
    export var MAX_ITEM_SIZE = new Size(MAX_ITEM_DIM, MAX_ITEM_DIM);


    /**
     * An interface for objects which can be procedurally layed out.
     */
    export interface ILayoutItem {

        /**
         * Returns the object's geometry rect.
         */
        geometry(): Rect;

        /**
         * Set the object's geometry to the given rect.
         */
        setGeometry(rect: IRect);

        /**
         * Returns the minimum allowed size of the object.
         */
        minimumSize(): Size;

        /**
         * Returns the maximum allowed size of the object.
         */
        maximumSize(): Size;

        /** 
         * Returns the preferred size of the object.
         */
        sizeHint(): Size;
    }


    /**
     * An interface describing a layout adjustable object.
     */
    export interface IAdjustable {

        /**
         * The layout item to use for adjusting the object.
         *
         * @readonly
         */
        layoutItem: ILayoutItem;
    }


    /**
     * An interface describing the target of a layout item.
     */
    export interface ILayoutTarget {

        /** 
         * The HTML element positioned by the item.
         *
         * @readonly
         */
        element: HTMLElement;

        /**
         * The preferred size of the element.
         *
         * An invalid size will be ignored. Expensive hints 
         * should be cached by the target.
         */
        sizeHint(): Size;

        /**
         * The suggested minimum size of the element.
         *
         * An invalid size will be ignored. Expensive hints 
         * should be cached by the target.
         */
        minimumSizeHint(): Size;

        /**
         * The suggested maximum size of the element.
         *
         * An invalid size will be ignored. Expensive hints 
         * should be cached by the target.
         */
        maximumSizeHint(): Size;
    }


    /**
     * An internal style geometry initializer.
     */
    function initStyleGeometry(style: CSSStyleDeclaration): void {
        style.position = "absolute";
        style.left = "0px";
        style.top = "0px";
        style.width = "0px";
        style.height = "0px";
    }


    /**
     * An internal style geometry updater.
     */
    function updateStyleGeometry(
        style: CSSStyleDeclaration,
        previous: Rect,
        current: Rect): void
    {
        var left = current.left;
        var top = current.top;
        var width = current.width();
        var height = current.height();
        if (previous.left !== left) {
            style.left = left + "px";
        }
        if (previous.top !== top) {
            style.top = top + "px";
        }
        if (previous.width() !== width) {
            style.width = width + "px";
        }
        if (previous.height() !== height) {
            style.height = height + "px";
        }
    }


    /**
     * A class which manipulates the geometry of a layout target.
     *
     * The target element's style will be forced to absolute positioning.
     *
     * @class
     */
    export class LayoutItem implements ILayoutItem { 

        /**
         * Construct a new LayoutItem.
         *
         * @param target The target layout object to manipulate.
         */
        constructor(target: ILayoutTarget) {
            this._target = target;
            initStyleGeometry(target.element.style);
            this.resize(this.sizeHint());
        }

        /**
         * The layout target of this layout item.
         *
         * @readonly
         */
        get target(): ILayoutTarget {
            return this._target;
        }

        /**
         * Returns the position of the top-left corner of the item.
         */
        pos(): Point {
            return this._geometry.topLeft();
        }

        /**
         * Move the top-left corner of the item to the given position.
         */
        move(point: IPoint): void {
            var geo = this.geometry();
            geo.moveTopLeft(point);
            this.setGeometry(geo);
        }

        /**
         * Returns the current size of the item.
         */
        size(): Size {
            return this._geometry.size();
        }

        /**
         * Resize the item to the given size.
         */
        resize(size: ISize): void {
            var geo = this.geometry();
            geo.setSize(size);
            this.setGeometry(geo);
        }

        /**
         * Returns the current geometry of the item.
         */
        geometry(): Rect {
            return new Rect(this._geometry);
        }

        /**
         * Set the geometry of the item.
         */
        setGeometry(rect: IRect) {
            var current = new Rect(rect);
            var size = current.size();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            current.setSize(size);
            var previous = this._geometry;
            this._geometry = current;
            var style = this._target.element.style;
            updateStyleGeometry(style, previous, current);
        }

        /**
         * Returns the minimum allowed size of the item.
         */
        minimumSize(): Size {
            var size = this._minimumSize;
            if (size.isValid()) {
                return new Size(size);
            }
            size = this._target.minimumSizeHint();
            if (!size.isValid()) {
                return new Size(MIN_ITEM_SIZE);
            }
            size = size.boundedTo(MAX_ITEM_SIZE);
            size = size.expandedTo(MIN_ITEM_SIZE);
            return size;
        }

        /**
         * Set the minimum allowed size of the item.
         *
         * This will override the target's minimumSizeHint. It can be
         * set to an ivalid size to reset the value to minimum hint.
         */
        setMinimumSize(size: ISize): void {
            var minSize = new Size(size);
            if (minSize.isValid()) {
                minSize = minSize.boundedTo(MAX_ITEM_SIZE);
                minSize = minSize.expandedTo(MIN_ITEM_SIZE);
                this._minimumSize = minSize;
            } else {
                this._minimumSize = new Size();
            }
            this.setGeometry(this._geometry);
        }

        /**
         * Returns the maximum allowed size of the item.
         */
        maximumSize(): Size {
            var size = this._maximumSize;
            if (size.isValid()) {
                return new Size(size);
            }
            size = this._target.maximumSizeHint();
            if (!size.isValid()) {
                return new Size(MAX_ITEM_SIZE);
            }
            size = size.boundedTo(MAX_ITEM_SIZE);
            size = size.expandedTo(MIN_ITEM_SIZE);
            return size;
        }

        /**
         * Set the maximum allowed size of the item.
         */
        setMaximumSize(size: ISize): void {
            var maxSize = new Size(size);
            if (maxSize.isValid()) {
                maxSize = maxSize.boundedTo(MAX_ITEM_SIZE);
                maxSize = maxSize.expandedTo(MIN_ITEM_SIZE);
                this._maximumSize = maxSize;
            } else {
                this._maximumSize = new Size();
            }
            this.setGeometry(this._geometry);
        }

        /**
         * Returns the preferred size of the item.
         */
        sizeHint(): Size {
            var size = this._target.sizeHint();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            return size;
        }

        private _target: ILayoutTarget;
        private _geometry: Rect = new Rect();
        private _minimumSize: Size = new Size();
        private _maximumSize: Size = new Size();
    }

}
