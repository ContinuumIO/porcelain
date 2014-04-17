/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A class which implements ILayoutItem for a Component.
     *
     * @class
     */
    export
    class ComponentItem implements ILayoutItem {

        /**
         * Construct a new ComponentItem.
         *
         * @param component The component to manipulate.
         */
        constructor(component: Component) {
            this._component = component;
        }

        /**
         * Returns the component handled by this item.
         */
        component(): Component {
            return this._component;
        }

        /**
         * Returns the computed minimum size of the component.
         */
        minimumSize(): Size {
            var component = this._component;
            var cache = component.cachedGeometry();
            var minSize = cache.minimumSize;
            if (!minSize) {
                var style = component.computedStyle();
                var w = parseInt(style.minWidth) || 0;
                var h = parseInt(style.minHeight) || 0;
                w = Math.min(Math.max(0, w), MAX_ITEM_DIM);
                h = Math.min(Math.max(0, h), MAX_ITEM_DIM);
                minSize = cache.minimumSize = new Size(w, h);
            }
            return new Size(minSize);
        }

        /**
         * Compute the maximum size of the component.
         */
        maximumSize(): Size {
            var component = this._component;
            var cache = component.cachedGeometry();
            var maxSize = cache.maximumSize;
            if (!maxSize) {
                var style = component.computedStyle();
                var w = parseInt(style.maxWidth) || MAX_ITEM_DIM;
                var h = parseInt(style.maxHeight) || MAX_ITEM_DIM;
                w = Math.min(Math.max(0, w), MAX_ITEM_DIM);
                h = Math.min(Math.max(0, h), MAX_ITEM_DIM);
                maxSize = cache.maximumSize = new Size(w, h);
            }
            return new Size(maxSize);
        }

        /**
         * Compute the preferred size of the component.
         */
        sizeHint(): Size {
            var component = this._component;
            var cache = component.cachedGeometry();
            var sizeHint = cache.sizeHint;
            if (!sizeHint) {
                var ns = this.minimumSize();
                var xs = this.maximumSize();
                var sh = component.sizeHint();
                var w = Math.min(Math.max(ns.width, sh.width), xs.width);
                var h = Math.min(Math.max(ns.height, sh.height), xs.height);
                sizeHint = cache.sizeHint = new Size(w, h);
            }
            return new Size(sizeHint);
        }

        /**
         * Returns the layout rect of the component.
         */
        rect(): Rect {
            var component = this._component;
            var cache = component.cachedGeometry();
            var rect = cache.rect;
            if (!rect) {
                var elem = component.element();
                var x = elem.offsetLeft;
                var y = elem.offsetTop;
                var w = elem.offsetWidth;
                var h = elem.offsetHeight;
                rect = cache.rect = new Rect(x, y, w, h);
            }
            return new Rect(rect);
        }

        /**
         * Set the layout rect of the component.
         *
         * @param rect The layout rect to apply to the component.
         */
        setRect(rect: Rect): void {
            var min = this.minimumSize();
            var max = this.maximumSize();
            var x = rect.left;
            var y = rect.top;
            var w = Math.min(Math.max(min.width, rect.width()), max.width);
            var h = Math.min(Math.max(min.height, rect.height()), max.height);
            var component = this._component;
            var cache = component.cachedGeometry();
            var style = component.style();
            cache.rect = new Rect(x, y, w, h);
            style.left = x + "px";
            style.top = y + "px";
            style.width = w + "px";
            style.height = h + "px";
        }

        private _component: Component;
    }

}
