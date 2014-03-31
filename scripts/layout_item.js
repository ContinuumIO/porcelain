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
    * The target's element will be forced to absolute positioning.
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
            this._minimumSize = new porcelain.Size(porcelain.MIN_ITEM_SIZE);
            this._maximumSize = new porcelain.Size(porcelain.MAX_ITEM_SIZE);
            this._target = target;
            initStyleGeometry(target.element.style);
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
            current.setSize(current.size().expandedTo(this._minimumSize).boundedTo(this._maximumSize));
            var previous = this._geometry;
            this._geometry = current;
            var style = this._target.element.style;
            updateStyleGeometry(style, previous, current);
        };

        /**
        * Returns the minimum allowed size of the item.
        */
        LayoutItem.prototype.minimumSize = function () {
            return new porcelain.Size(this._minimumSize);
        };

        /**
        * Set the minimum allowed size of the item.
        */
        LayoutItem.prototype.setMinimumSize = function (size) {
            this._minimumSize = new porcelain.Size(size).expandedTo(porcelain.MIN_ITEM_SIZE).boundedTo(this._maximumSize);
            this.setGeometry(this._geometry);
        };

        /**
        * Returns the maximum allowed size of the item.
        */
        LayoutItem.prototype.maximumSize = function () {
            return new porcelain.Size(this._maximumSize);
        };

        /**
        * Set the maximum allowed size of the item.
        */
        LayoutItem.prototype.setMaximumSize = function (size) {
            this._maximumSize = new porcelain.Size(size).expandedTo(this._minimumSize).boundedTo(porcelain.MAX_ITEM_SIZE);
            this.setGeometry(this._geometry);
        };

        /**
        * Returns the preferred size of the item.
        */
        LayoutItem.prototype.sizeHint = function () {
            return this._target.sizeHint();
        };
        return LayoutItem;
    })();
    porcelain.LayoutItem = LayoutItem;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=layout_item.js.map
