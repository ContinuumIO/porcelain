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
        constructor(public component: Component) { }

        /**
         * Compute the minimum size of the component.
         */
        minimumSize(): Size {
            var style = this.component.computedStyle();
            var w = parseInt(style.minWidth);
            var h = parseInt(style.minHeight);
            if (w !== w || h !== h) {  // fast isNaN
                return new Size(MIN_LAYOUT_SIZE);
            }
            var size = new Size(w, h);
            size = size.boundedTo(MAX_LAYOUT_SIZE);
            size = size.expandedTo(MIN_LAYOUT_SIZE);
            return size;
        }

        /**
         * Set the minimum size of the component.
         *
         * @param size The minimum size to apply to the component.
         */
        setMinimumSize(size: Size): void {
            var style = this.component.style();
            if (size.isValid()) {
                style.minWidth = size.width + "px";
                style.minHeight = size.height + "px";
            } else {
                style.minWidth = "";
                style.minHeight = "";
            }
            this.component.onResize();
        }

        /**
         * Compute the maximum size of the component.
         */
        maximumSize(): Size {
            var style = this.component.computedStyle();
            var w = parseInt(style.minWidth);
            var h = parseInt(style.minHeight);
            if (w !== w || h !== h) {  // fast isNaN
                return new Size(MAX_LAYOUT_SIZE);
            }
            var size = new Size(w, h);
            size = size.boundedTo(MAX_LAYOUT_SIZE);
            size = size.expandedTo(MIN_LAYOUT_SIZE);
            return size;
        }

        /**
         * Set the maximum size of the component.
         *
         * @param size The maximum size to apply to the component.
         */
        setMaximumSize(size: Size): void {
            var style = this.component.style();
            if (size.isValid()) {
                style.maxWidth = size.width + "px";
                style.maxHeight = size.height + "px";
            } else {
                style.maxWidth = "";
                style.maxHeight = "";
            }
            this.component.onResize();
        }

        /**
         * Compute the preferred size of the component.
         */
        sizeHint(): Size {
            var size = this.component.sizeHint();
            size = size.boundedTo(this.maximumSize());
            size = size.expandedTo(this.minimumSize());
            return size;
        }

        /**
         * Returns the layout position of the component.
         */
        pos(): Point {
            var elem = this.component.element();
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            return new Point(x, y);
        }

        /**
         * Set the layout position of the component.
         */
        setPos(point: Point): void {
            var style = this.component.style();
            style.left = point.x + "px";
            style.top = point.y + "px";
        }

        /**
         * Returns the layout size of the component.
         */
        size(): Size {
            var elem = this.component.element();
            var w = elem.offsetWidth;
            var h = elem.offsetHeight;
            return new Size(w, h);
        }

        /**
         * Set the layout size of the component.
         */
        setSize(size: Size): void {
            var style = this.component.style();
            if (size.isValid()) {
                style.width = size.width + "px";
                style.height = size.height + "px";
            } else {
                style.width = "";
                style.height = "";
            }
            this.component.onResize();
        }

        /**
         * Returns the layout rect of the component.
         */
        rect(): Rect {
            var elem = this.component.element();
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            var w = elem.offsetWidth;
            var h = elem.offsetHeight;
            return new Rect(x, y, w, h);
        }

        /**
         * Set the layout rect of the component.
         *
         * @param rect The layout rect to apply to the component.
         */
        setRect(rect: Rect): void {
            var style = this.component.style();
            if (rect.isValid()) {
                style.left = rect.left + "px";
                style.top = rect.top + "px";
                style.width = rect.width() + "px";
                style.height = rect.height() + "px";
            } else {
                style.left = "";
                style.top = "";
                style.width = "";
                style.height = "";
            }
            this.component.onResize();
        }
    }

}
