/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The most base class of porcelain objects.
     *
     * The Component class supports DOM element manipulation. It
     * will typically be subclassed to create concrete widgets.
     *
     * @class
     */
    export
    class Component extends Node {

        /**
         * The CSS class added to Component instances.
         */
        static Class = "p-Component";

        /**
         * Construct a new Component.
         */
        constructor() {
            super();
            this._element = this.createElement();
            this.addClass(Component.Class);
        }

        /**
         * Destroy the component and its subtree.
         */
        destroy(): void {
            this._detachElement();
            this._element = null;
            super.destroy();
        }

        /**
         * Returns the component's internal DOM element.
         */
        element(): HTMLElement {
            return this._element;
        }

        /**
         * Returns the id of the component's DOM element.
         */
        id(): string {
            return this._element.id
        }

        /**
         * Set the id of the component's DOM element.
         *
         * @param id The id string to apply to the element.
         */
        setId(id: string): void {
            this._element.id = id;
        }

        /**
         * Add a name or names to the element's CSS class name.
         *
         * Multiple names should be separated by whitespace.
         *
         * @param className - the class name(s) to add to the element.
         */
        addClass(className: string): void {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var newParts = className.match(/\S+/g) || [];
            var newName = _.union(currParts, newParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        }

        /**
         * Remove a name or names from the element's CSS class name.
         *
         * Multiple names should be separated by whitespace.
         *
         * @param className - the class name(s) to remove from the element.
         */
        removeClass(className: string): void {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var oldParts = className.match(/\S+/g) || [];
            var newName = _.difference(currParts, oldParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        }

        /**
         * Returns the inline style object for the component element.
         */
        style(): CSSStyleDeclaration {
            return this._element.style;
        }

        /**
         * Returns the computed style object for the component element.
         */
        computedStyle(): CSSStyleDeclaration {
            return window.getComputedStyle(this._element);
        }

        /**
         * Returns the CSS display value for the component element.
         */
        display(): string {
            return window.getComputedStyle(this._element).display;
        }

        /**
         * Set the CSS display value for the component element.
         *
         * @param value The display value to apply to the element.
         */
        setDisplay(value: string): void {
            this._element.style.display = value;
        }

        /**
         * Returns CSS position value for the component element.
         */
        position(): string {
            return window.getComputedStyle(this._element).position;
        }

        /**
         * Set the CSS position value for the component element.
         *
         * @param value The position value to apply to the element.
         */
        setPosition(value: string): void {
            this._element.style.position = value;
        }

        /**
         * Create the underlying element for the component.
         *
         * The default implementation creates a div.
         *
         * @protected.
         */
        createElement(): HTMLElement {
            return document.createElement("div");
        }

        /**
         * Returns the preferred size of the component.
         *
         * This computes the natural size of the component and is used
         * by the procedural layout system. The default implementation
         * of this method returns an invalid size.
         *
         * This should be implemented by subclasses which wish to be
         * used effectively by the procedural layout system.
         *
         * @protected
         */
        sizeHint(): Size {
            return new Size();
        }

        /**
         * Returns the cached geometry data for the object.
         *
         * This is intended for internal use by the framework. It is
         * subject to change without notice and should not be used
         * directly by user code.
         *
         * @internal
         */
        cachedGeometry(): IGeometryCache {
            var cache = this._geometryCache;
            if (!cache) {
                cache = this._geometryCache = {
                    rect: null,
                    sizeHint: null,
                    minimumSize: null,
                    maximumSize: null,
                };
            }
            return cache;
        }

        /**
         * A method invoked when a child is added to the node.
         *
         * This must *never* be called directly by user code. The
         * default implementation is a no-op.
         *
         * @param node The child node which was added.
         *
         * @protected
         */
        onChildAdded(node: Node): void { }

        /**
         * A method invoked when a child is removed from the node.
         *
         * This must *never* be called directly by user code. The
         * default implementation is a no-op.
         *
         * @param node The child node which was removed.
         *
         * @protected
         */
        onChildRemoved(node: Node): void { }

        /**
         * A method invoked when a child is moved among its siblings.
         *
         * This must *never* be called directly by user code. The
         * default implementation is a no-op.
         *
         * @param child The child component which was removed.
         *
         * @protected
         */
        onChildMoved(node: Node): void { }

        /**
         * The internal element detach method.
         *
         * @private
         */
        private _detachElement(): void {
            var element = this._element;
            var parentNode = element.parentNode;
            if (parentNode) {
                parentNode.removeChild(element);
            }
        }

        private _element: HTMLElement;
        private _rendered: boolean = false;
        private _geometryCache: IGeometryCache = null;
    }

    /**
     * An interface which defines the component geometry cache.
     *
     * This is intended for internal use by the framework. It is
     * subject to change without notice and should not be used
     * directly by user code.
     */
    export
    interface IGeometryCache {
        rect: Rect;
        sizeHint: Size;
        minimumSize: Size;
        maximumSize: Size;
    }

}
