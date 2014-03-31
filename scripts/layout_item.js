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
    porcelain.MAX_ITEM_DIM = (1 << 16) - 1;

    /**
    * The minimum allowed size of an item.
    */
    porcelain.MIN_ITEM_SIZE = new porcelain.Size(0, 0);

    /**
    * The maximum allowed size of an item.
    */
    porcelain.MAX_ITEM_SIZE = new porcelain.Size(porcelain.MAX_ITEM_DIM, porcelain.MAX_ITEM_DIM);

    

    

    

    /**
    * An internal style geometry initializer.
    */
    function initStyleGeometry(style) {
        style.position = "absolute";
        style.left = "0px";
        style.top = "0px";
        style.width = "0px";
        style.height = "0px";
    }

    /**
    * An internal style geometry updater.
    */
    function updateStyleGeometry(style, previous, current) {
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
    var LayoutItem = (function () {
        /**
        * Construct a new LayoutItem.
        *
        * @param target The target layout object to manipulate.
        */
        function LayoutItem(target) {
            this._geometry = new porcelain.Rect();
            this._minimumSize = new porcelain.Size();
            this._maximumSize = new porcelain.Size();
            this._target = target;
            initStyleGeometry(target.element.style);
            this.resize(this.sizeHint());
        }
        Object.defineProperty(LayoutItem.prototype, "target", {
            /**
            * The layout target of this layout item.
            *
            * @readonly
            */
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns the position of the top-left corner of the item.
        */
        LayoutItem.prototype.pos = function () {
            return this._geometry.topLeft();
        };

        /**
        * Move the top-left corner of the item to the given position.
        */
        LayoutItem.prototype.move = function (point) {
            var geo = this.geometry();
            geo.moveTopLeft(point);
            this.setGeometry(geo);
        };

        /**
        * Returns the current size of the item.
        */
        LayoutItem.prototype.size = function () {
            return this._geometry.size();
        };

        /**
        * Resize the item to the given size.
        */
        LayoutItem.prototype.resize = function (size) {
            var geo = this.geometry();
            geo.setSize(size);
            this.setGeometry(geo);
        };

        /**
        * Returns the current geometry of the item.
        */
        LayoutItem.prototype.geometry = function () {
            return new porcelain.Rect(this._geometry);
        };

        /**
        * Set the geometry of the item.
        */
        LayoutItem.prototype.setGeometry = function (rect) {
            var current = new porcelain.Rect(rect);
            var size = current.size();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            current.setSize(size);
            var previous = this._geometry;
            this._geometry = current;
            var style = this._target.element.style;
            updateStyleGeometry(style, previous, current);
        };

        /**
        * Returns the minimum allowed size of the item.
        */
        LayoutItem.prototype.minimumSize = function () {
            var size = this._minimumSize;
            if (size.isValid()) {
                return new porcelain.Size(size);
            }
            size = this._target.minimumSizeHint();
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
        LayoutItem.prototype.setMinimumSize = function (size) {
            var minSize = new porcelain.Size(size);
            if (minSize.isValid()) {
                minSize = minSize.boundedTo(porcelain.MAX_ITEM_SIZE);
                minSize = minSize.expandedTo(porcelain.MIN_ITEM_SIZE);
                this._minimumSize = minSize;
            } else {
                this._minimumSize = new porcelain.Size();
            }
            this.setGeometry(this._geometry);
        };

        /**
        * Returns the maximum allowed size of the item.
        */
        LayoutItem.prototype.maximumSize = function () {
            var size = this._maximumSize;
            if (size.isValid()) {
                return new porcelain.Size(size);
            }
            size = this._target.maximumSizeHint();
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
        LayoutItem.prototype.setMaximumSize = function (size) {
            var maxSize = new porcelain.Size(size);
            if (maxSize.isValid()) {
                maxSize = maxSize.boundedTo(porcelain.MAX_ITEM_SIZE);
                maxSize = maxSize.expandedTo(porcelain.MIN_ITEM_SIZE);
                this._maximumSize = maxSize;
            } else {
                this._maximumSize = new porcelain.Size();
            }
            this.setGeometry(this._geometry);
        };

        /**
        * Returns the preferred size of the item.
        */
        LayoutItem.prototype.sizeHint = function () {
            var size = this._target.sizeHint();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            return size;
        };
        return LayoutItem;
    })();
    porcelain.LayoutItem = LayoutItem;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=layout_item.js.map
