/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /** 
     * An interface for declaring component extras.
     *
     * The lifetime of a component extra is bound to the lifetime
     * of the component on which it exists. When the component is
     * destroyed, the extra will be destroyed. Therefore, an extra
     * must not be shared amongst components.
     */
    export interface IComponentExtra {

        /**
         * Destroy the extra and release its resources.
         */
        destroy(): void;

        /**
         * Identifies this object as an extra.
         */
        porcelain_ComponentExtra: boolean;
    }


    /**
     * The most base class of porcelain objects.
     *
     * @class
     */
    export class Component {

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
            this._detachElement();
            this._destroyExtras();
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
         * Returns the id of the component and its DOM element.
         */
        id(): string {
            return this._element.id
        }

        /** 
         * Set the id of the component and its DOM element.
         */
        setId(id: string) {
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
         */
        setDisplay(value: string) {
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
         */
        setPosition(value: string) {
            this._element.style.position = value;
        }

        /**
         * Returns the offset position of the component.
         */
        pos(): Point {
            var elem = this._element;
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            return new Point(x, y);
        }

        /**
         * Set the offset position of the component.
         */
        setPos(point: Point) {
            var style = this._element.style;
            style.left = point.x + "px";
            style.top = point.y + "px";
        }

        /**
         * Returns the offset size of the component.
         */
        size(): Size {
            var elem = this._element;
            var w = elem.offsetWidth;
            var h = elem.offsetHeight;
            return new Size(w, h);
        }

        /**
         * Set the offset size of the component.
         */
        setSize(size: Size) {
            var style = this._element.style;
            if (size.isValid()) {
                style.width = size.width + "px";
                style.height = size.height + "px";
            } else {
                style.width = "";
                style.height = "";
            }
        }

        /**
         * Returns the offset rect of the component.
         */
        rect(): Rect {
            var elem = this._element;
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            var w = elem.offsetWidth;
            var h = elem.offsetHeight;
            return new Rect(x, y, w, h);
        }
        
        /**
         * Set the offset rect of the component.
         */
        setRect(rect: Rect) {
            var style = this._element.style;
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
        }

        /**
         * Returns the minimum size of the component.
         */
        minimumSize(): Size {
            var style = window.getComputedStyle(this._element);
            var w = parseInt(style.minWidth)
            var h = parseInt(style.minHeight)
            if (w !== w || h !== h) {  // fast isNaN
                return new Size();
            }
            return new Size(w, h);
        }

        /** 
         * Set the minimum size of the component.
         */
        setMinimumSize(size: Size) {
            var style = this._element.style;
            if (size.isValid()) {
                style.minWidth = size.width + "px";
                style.minHeight = size.height + "px";
            } else {
                style.minWidth = "";
                style.minHeight = "";
            }
        }

        /**
         * Returns the maximum size of the component.
         */
        maximumSize(): Size {
            var style = window.getComputedStyle(this._element);
            var w = parseInt(style.maxWidth)
            var h = parseInt(style.maxHeight)
            if (w !== w || h !== h) {  // fast isNaN
                return new Size();
            }
            return new Size(w, h);
        }

        /**
         * Set the maximum size of the component.
         */
        setMaximumSize(size: Size) {
            var style = this._element.style;
            if (size.isValid()) {
                style.maxWidth = size.width + "px";
                style.maxHeight = size.height + "px";
            } else {
                style.maxWidth = "";
                style.maxHeight = "";
            }
        }

        /**
         * Returns the preferred size of the component.
         *
         * This computes the natural size of the component and is used
         * by the procedural layout system. The default implementation 
         * of this method returns an invalid size.
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
         * Invoked by a root node when the tree is attached to the DOM.
         *
         * The default implementation of this method dispatches to its
         * children in a bottom-up fashion. A component should not 
         * modify the tree structure during this method.
         *
         * @protected
         */
        afterAttach(): void {
            var children = this._children;
            if (!children) {
                return;
            }
            for (var i = 0, n = children.length; i < n; ++i) {
                children[i].afterAttach();
            }
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
         * A helper method for destroying the component extras.
         *
         * @private
         */
        private _destroyExtras(): void {
            var names = Object.getOwnPropertyNames(this);
            for (var i = 0, n = names.length; i < n; ++i) {
                var key = names[i];
                var value = this[key];
                if (value && value.porcelain_ComponentExtra) {
                    this[key] = null;
                    (<IComponentExtra>value).destroy();
                }
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
