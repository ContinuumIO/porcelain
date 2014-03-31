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
         */
        sizeHint(): Size;
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
     * The target's element will be forced to absolute positioning.
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
            current.setSize(current.size()
                .expandedTo(this._minimumSize)
                .boundedTo(this._maximumSize));
            var previous = this._geometry;
            this._geometry = current;
            var style = this._target.element.style;
            updateStyleGeometry(style, previous, current);
        }

        /**
         * Returns the minimum allowed size of the item.
         */
        minimumSize(): Size {
            return new Size(this._minimumSize);
        }

        /**
         * Set the minimum allowed size of the item.
         */
        setMinimumSize(size: ISize): void {
            this._minimumSize = new Size(size)
                .expandedTo(MIN_ITEM_SIZE)
                .boundedTo(this._maximumSize);
            this.setGeometry(this._geometry);
        }

        /**
         * Returns the maximum allowed size of the item.
         */
        maximumSize(): Size {
            return new Size(this._maximumSize);
        }

        /**
         * Set the maximum allowed size of the item.
         */
        setMaximumSize(size: ISize): void {
            this._maximumSize = new Size(size)
                .expandedTo(this._minimumSize)
                .boundedTo(MAX_ITEM_SIZE);
            this.setGeometry(this._geometry);
        }

        /**
         * Returns the preferred size of the item.
         */
        sizeHint(): Size {
            return this._target.sizeHint();
        }

        private _target: ILayoutTarget;
        private _geometry: Rect = new Rect();
        private _minimumSize: Size = new Size(MIN_ITEM_SIZE);
        private _maximumSize: Size = new Size(MAX_ITEM_SIZE);
    }

}
