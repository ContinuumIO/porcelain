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
     * @class
     */
    export
    class Component {

        /**
         * The CSS class added to Component instances.
         */
        static Class = "p-Component";

        /**
         * A signal emitted when the component is destroyed.
         *
         * @readonly
         */
        destroyed = new Signal();

        /**
         * Construct a new Component.
         */
        constructor() {
            this._element = this.createElement();
            this.addClass(Component.Class);
        }

        /**
         * Destroy the component and its children.
         */
        destroy(): void {
            this.destroyed.emit();
            this.destroyed.disconnect();
            this._detachElement();
            this._destroyChildren();
            this._deparent();
            this._element = null;
        }

        /**
         * Returns the parent Component of this component.
         */
        parent(): Component {
            return this._parent;
        }

        /**
         * Returns the array of child Components of this component.
         */
        children(): Component[] {
            var children = this._children;
            if (children) {
                return children.slice();
            }
            return [];
        }

        /**
         * Unparent the Component and detach its element from the DOM.
         *
         */
        detach(): void {
            this._detachElement();
            this._deparent();
        }

        /**
         * Append children to the end of this component.
         *
         * If a component is already a child, it will be moved to the
         * end of the child array. The children *must* be unique.
         *
         * @param [...] The child Components to append.
         */
        append(...children: Component[]): void {
            var fragment = this._prepareChildren(children);
            var current = this._children || [];
            this._children = current.concat(children);
            this._element.appendChild(fragment);
        }

        /**
         * Prepend children to the beginning of this component.
         *
         * If a component is already a child, it will be moved to the
         * beginning of the child array. The children *must* be unique.
         *
         * @param [...] The child Components to prepend.
         */
        prepend(...children: Component[]): void {
            var fragment = this._prepareChildren(children);
            var current = this._children || [];
            this._children = children.concat(current);
            var element = this._element;
            element.insertBefore(fragment, element.firstChild);
        }

        /**
         * Insert children before the given child.
         *
         * If a component is already a child, it will be moved to the
         * new location in the child array. The before child *must* be
         * a current child. The children *must* be unique.
         *
         * @param before The child marking the insert location.
         * @param [...] The child Components to insert.
         */
        insertBefore(before: Component, ...children: Component[]): void {
            if (before._parent !== this) {
                throw Error("'before' is not a child of this component.");
            }
            var fragment = this._prepareChildren(children);
            var current = this._children || [];
            var index = current.indexOf(before);
            if (index === -1) {
                this._children = current.concat(children);
                this._element.appendChild(fragment);
            } else {
                var leading = current.slice(0, index);
                var trailing = current.slice(index);
                this._children = leading.concat(children, trailing);
                this._element.insertBefore(fragment, before._element);
            }
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
         * Invoked when the component is resized by the framework.
         *
         * This method is invoked whenever the framework can reasonably
         * assume that the size of the component has changed. Since the
         * assumption may be wrong, components which perform expensive
         * computation on a resize should cache the previous size value
         * and only take action when the sizehas actually changed.
         *
         * The default implementation of this method does nothing. A
         * subclass should reimplement this method as needed to handle
         * the resize event and/or dispatch to the appropriate children.
         */
        onResize(): void { }

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
         * A helper method for preparing children to be inserted.
         *
         * @private
         */
        private _prepareChildren(children: Component[]): DocumentFragment {
            var fragment = document.createDocumentFragment();
            for (var i = 0, n = children.length; i < n; ++i) {
                var child = children[i];
                child._deparent();
                child._parent = this;
                fragment.appendChild(child._element);
            }
            return fragment;
        }

        /**
         * A helper method to detach the DOM element.
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

        /**
         * A helper method for destroying the component children.
         *
         * @private
         */
        private _destroyChildren(): void {
            var children = this._children;
            if (!children) {
                return;
            }
            this._children = null;
            for (var i = 0, n = children.length; i < n; ++i) {
                children[i].destroy();
            }
        }

        /**
         * A helper method for de-parenting the component.
         *
         * @private
         */
        private _deparent(): void {
            var parent = this._parent;
            if (!parent) {
                return;
            }
            this._parent = null;
            var siblings = parent._children;
            if (!siblings) {
                return;
            }
            _.pull(siblings, this);
        }

        private _element: HTMLElement;
        private _parent: Component = null;
        private _children: Component[] = null;
    }

}
