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
    export var MAX_ITEM_DIM = 1073741823;  // (1 << 30) - 1; 

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
        setGeometry(rect: Rect);

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
     * A class which implements ILayoutItem for a Component.
     *
     * When a ComponentItem is instantiated an a Component, the
     * component element is forced into 'absolute' positioning.
     *
     * @class
     */
    export class ComponentItem implements ILayoutItem {

        /**
         * Construct a new ComponentItem.
         *
         * @param component The component to manipulate.
         */
        constructor(component: Component) {
            this._component = component;
            this._initGeometry();
        }

        /**
         * Destroy the ComponentItem.
         */
        destroy(): void {
            this._component = null;
        }

        /**
         * The component being manipulated by this item.
         *
         * @readonly
         */
        get component(): Component {
            return this._component;
        }

        /**
         * Returns the top-left corner of the component.
         */
        pos(): Point {
            return this._geometry.topLeft();
        }

        /**
         * Set the top-left corner of the component.
         */
        move(point: Point): void {
            var geo = this.geometry();
            geo.moveTopLeft(point);
            this._syncGeometry(geo);
        }

        /**
         * Returns the size of the component.
         */
        size(): Size {
            return this._geometry.size();
        }

        /**
         * Set the size of the component. 
         */
        resize(size: Size): void {
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize()); 
            var geo = this.geometry();
            geo.setSize(size);
            this._syncGeometry(geo);
        }

        /**
         * Returns the current geometry of the component.
         */
        geometry(): Rect {
            return new Rect(this._geometry);
        }

        /**
         * Set the geometry of the component.
         */
        setGeometry(rect: Rect) {
            var size = rect.size();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            var geo = new Rect(rect.left, rect.top, size.width, size.height);
            this._syncGeometry(geo);
        }

        /**
         * Returns the minimum allowed size of the item.
         */
        minimumSize(): Size {
            var size = this._minimumSize;
            if (size.isValid()) {
                return new Size(size);
            }
            size = this._component.minimumSizeHint();
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
        setMinimumSize(size: Size): void {
            if (size.isValid()) {
                size = size.boundedTo(MAX_ITEM_SIZE);
                size = size.expandedTo(MIN_ITEM_SIZE);
                this._minimumSize = size;
            } else {
                this._minimumSize = new Size();
            }
            this.resize(this.size());
        }

        /**
         * Returns the maximum allowed size of the item.
         */
        maximumSize(): Size {
            var size = this._maximumSize;
            if (size.isValid()) {
                return new Size(size);
            }
            size = this._component.maximumSizeHint();
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
        setMaximumSize(size: Size): void {
            if (size.isValid()) {
                size = size.boundedTo(MAX_ITEM_SIZE);
                size = size.expandedTo(MIN_ITEM_SIZE);
                this._maximumSize = size;
            } else {
                this._maximumSize = new Size();
            }
            this.resize(this.size());
        }

        /**
         * Returns the preferred size of the item.
         */
        sizeHint(): Size {
            var size = this._component.sizeHint();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            return size;
        }

        /**
         * Initialize the component style geometry.
         *
         * @private
         */
        private _initGeometry(): void {
            var style = this._component.element.style;
            var size = this.sizeHint();
            this._geometry.setSize(size);
            style.position = "absolute";
            style.left = "0px";
            style.top = "0px";
            style.width = size.width + "px";
            style.height = size.height + "px";
        }

        /** 
         * Synchronize the style geometry with the given rect.
         *
         * @private
         */
        private _syncGeometry(rect: Rect): void {
            var left = rect.left;
            var top = rect.top;
            var width = rect.width();
            var height = rect.height();
            var style = this._component.element.style;
            var current = this._geometry;
            this._geometry = rect;
            if (current.left !== left) {
                style.left = left + "px";
            }
            if (current.top !== top) {
                style.top = top + "px";
            }
            if (current.width() !== width) {
                style.width = width + "px";
            }
            if (current.height() !== height) {
                style.height = height + "px";
            }
        }

        private _component: Component;
        private _geometry: Rect = new Rect();
        private _minimumSize: Size = new Size();
        private _maximumSize: Size = new Size();
    }

}
