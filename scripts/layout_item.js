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
            this.component = component;
        }
        /**
        * Returns the current geometry of the component.
        */
        ComponentItem.prototype.geometry = function () {
            return this.component.geometry;
        };

        /**
        * Compute the minimum size of the component.
        */
        ComponentItem.prototype.minimumSize = function () {
            var component = this.component;
            var size = component.minimumSize;
            if (size.isValid() && !size.isNull()) {
                size = size.boundedTo(porcelain.MAX_ITEM_SIZE);
                size = size.expandedTo(porcelain.MIN_ITEM_SIZE);
                return size;
            }
            size = component.minimumSizeHint();
            if (size.isValid()) {
                size = size.boundedTo(porcelain.MAX_ITEM_SIZE);
                size = size.expandedTo(porcelain.MIN_ITEM_SIZE);
                return size;
            }
            return new porcelain.Size(porcelain.MIN_ITEM_SIZE);
        };

        /**
        * Compute the maximum size of the component.
        */
        ComponentItem.prototype.maximumSize = function () {
            var component = this.component;
            var size = component.maximumSize;
            if (size.isValid()) {
                size = size.boundedTo(porcelain.MAX_ITEM_SIZE);
                size = size.expandedTo(porcelain.MIN_ITEM_SIZE);
                return size;
            }
            size = component.maximumSizeHint();
            if (size.isValid()) {
                size = size.boundedTo(porcelain.MAX_ITEM_SIZE);
                size = size.expandedTo(porcelain.MIN_ITEM_SIZE);
                return size;
            }
            return new porcelain.Size(porcelain.MAX_ITEM_SIZE);
        };

        /**
        * Compute the preferred size of the component.
        */
        ComponentItem.prototype.sizeHint = function () {
            var size = this.component.sizeHint();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            return size;
        };

        /**
        * Set the current geometry of the component.
        */
        ComponentItem.prototype.setGeometry = function (rect) {
            this.component.geometry = rect;
        };
        return ComponentItem;
    })();
    porcelain.ComponentItem = ComponentItem;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=layout_item.js.map
