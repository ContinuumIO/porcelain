/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    /**
    * The maximimum allowed width or height of an item.
    */
    porcelain.MAX_ITEM_DIM = 1073741823;

    /**
    * The minimum allowed size of an item.
    */
    porcelain.MIN_ITEM_SIZE = new porcelain.Size(0, 0);

    /**
    * The maximum allowed size of an item.
    */
    porcelain.MAX_ITEM_SIZE = new porcelain.Size(porcelain.MAX_ITEM_DIM, porcelain.MAX_ITEM_DIM);

    

    /**
    * A class which implements ILayoutItem for a Component.
    *
    * When a ComponentItem is instantiated an a Component, the
    * component element is forced into 'absolute' positioning.
    *
    * @class
    */
    var ComponentItem = (function () {
        /**
        * Construct a new ComponentItem.
        *
        * @param component The component to manipulate.
        */
        function ComponentItem(component) {
            this._geometry = new porcelain.Rect();
            this._minimumSize = new porcelain.Size();
            this._maximumSize = new porcelain.Size();
            this._component = component;
            this._initGeometry();
        }
        /**
        * Destroy the ComponentItem.
        */
        ComponentItem.prototype.destroy = function () {
            this._component = null;
        };

        Object.defineProperty(ComponentItem.prototype, "component", {
            /**
            * The component being manipulated by this item.
            *
            * @readonly
            */
            get: function () {
                return this._component;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns the top-left corner of the component.
        */
        ComponentItem.prototype.pos = function () {
            return this._geometry.topLeft();
        };

        /**
        * Set the top-left corner of the component.
        */
        ComponentItem.prototype.move = function (point) {
            var geo = this.geometry();
            geo.moveTopLeft(point);
            this._syncGeometry(geo);
        };

        /**
        * Returns the size of the component.
        */
        ComponentItem.prototype.size = function () {
            return this._geometry.size();
        };

        /**
        * Set the size of the component.
        */
        ComponentItem.prototype.resize = function (size) {
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            var geo = this.geometry();
            geo.setSize(size);
            this._syncGeometry(geo);
        };

        /**
        * Returns the current geometry of the component.
        */
        ComponentItem.prototype.geometry = function () {
            return new porcelain.Rect(this._geometry);
        };

        /**
        * Set the geometry of the component.
        */
        ComponentItem.prototype.setGeometry = function (rect) {
            var size = rect.size();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            var geo = new porcelain.Rect(rect.left, rect.top, size.width, size.height);
            this._syncGeometry(geo);
        };

        /**
        * Returns the minimum allowed size of the item.
        */
        ComponentItem.prototype.minimumSize = function () {
            var size = this._minimumSize;
            if (size.isValid()) {
                return new porcelain.Size(size);
            }
            size = this._component.minimumSizeHint();
            if (!size.isValid()) {
                return new porcelain.Size(porcelain.MIN_ITEM_SIZE);
            }
            size = size.boundedTo(porcelain.MAX_ITEM_SIZE);
            size = size.expandedTo(porcelain.MIN_ITEM_SIZE);
            return size;
        };

        /**
        * Set the minimum allowed size of the item.
        *
        * This will override the target's minimumSizeHint. It can be
        * set to an ivalid size to reset the value to minimum hint.
        */
        ComponentItem.prototype.setMinimumSize = function (size) {
            if (size.isValid()) {
                size = size.boundedTo(porcelain.MAX_ITEM_SIZE);
                size = size.expandedTo(porcelain.MIN_ITEM_SIZE);
                this._minimumSize = size;
            } else {
                this._minimumSize = new porcelain.Size();
            }
            this.resize(this.size());
        };

        /**
        * Returns the maximum allowed size of the item.
        */
        ComponentItem.prototype.maximumSize = function () {
            var size = this._maximumSize;
            if (size.isValid()) {
                return new porcelain.Size(size);
            }
            size = this._component.maximumSizeHint();
            if (!size.isValid()) {
                return new porcelain.Size(porcelain.MAX_ITEM_SIZE);
            }
            size = size.boundedTo(porcelain.MAX_ITEM_SIZE);
            size = size.expandedTo(porcelain.MIN_ITEM_SIZE);
            return size;
        };

        /**
        * Set the maximum allowed size of the item.
        */
        ComponentItem.prototype.setMaximumSize = function (size) {
            if (size.isValid()) {
                size = size.boundedTo(porcelain.MAX_ITEM_SIZE);
                size = size.expandedTo(porcelain.MIN_ITEM_SIZE);
                this._maximumSize = size;
            } else {
                this._maximumSize = new porcelain.Size();
            }
            this.resize(this.size());
        };

        /**
        * Returns the preferred size of the item.
        */
        ComponentItem.prototype.sizeHint = function () {
            var size = this._component.sizeHint();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            return size;
        };

        /**
        * Initialize the component style geometry.
        *
        * @private
        */
        ComponentItem.prototype._initGeometry = function () {
            var style = this._component.element.style;
            var size = this.sizeHint();
            this._geometry.setSize(size);
            style.position = "absolute";
            style.left = "0px";
            style.top = "0px";
            style.width = size.width + "px";
            style.height = size.height + "px";
        };

        /**
        * Synchronize the style geometry with the given rect.
        *
        * @private
        */
        ComponentItem.prototype._syncGeometry = function (rect) {
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
        };
        return ComponentItem;
    })();
    porcelain.ComponentItem = ComponentItem;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=layout_item.js.map
