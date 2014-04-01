/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The CSS class added to Component instances.
     */
    var COMPONENT_CLASS = "p-Component";


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
         * A signal emitted when the component is destroyed.
         */
        destroyed = new Signal();

        /**
         * Construct a new Component.
         */
        constructor() {
            this._element = this.createElement();
            this.addClass(COMPONENT_CLASS);
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
         * The parent Component of this component.
         *
         * @readonly
         */
        get parent(): Component {
            return this._parent;
        }

        /**
         * The array of child Components of this component.
         *
         * @readonly
         */
        get children(): Component[] {
            var children = this._children;
            if (!children) {
                return [];
            }
            return children.slice();
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
         * Unparent the Component and detach its element from the DOM.
         *
         */
        detach(): void {
            this._detachElement();
            this._deparent();
        }

        /**
         * The component's internal DOM element.
         *
         * @readonly
         */
        get element(): HTMLElement {
            return this._element;
        }

        /**
         * The id of the component's DOM element.
         */
        get id(): string {
            return this._element.id
        }

        set id(id: string) {
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
         * Show the underlying DOM element.
         *
         * This is a convenience for setVisible(true);
         */
        show(): void {
            this.setVisible(true);
        }

        /**
         * Hide the underlying DOM element.
         *
         * This is a convenience for setVisible(false);
         */
        hide(): void {
            this.setVisible(false);
        }

        /**
         * Set the visibility of the underlying DOM element.
         *
         * The default implementation of this method sets and clears
         * the display property of the element style. This may be
         * reimplemented by subclasses which require more control.
         */
        setVisible(visible: boolean): void {
            var style = this.element.style;
            if (visible) {
                style.removeProperty("display");
            } else {
                style.display = "none";
            }
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
         * The preferred size of the component.
         *
         * This value is used by procedural layout systems to retrieve
         * the preferred layout size of the component. It is ignored 
         * when using CSS to position the element.
         *
         * This should be reimplemented by subclasses. The default 
         * implementation returns an invalid size.
         * 
         * @protected
         */
        sizeHint(): Size {
            return new Size();
        }

        /**
         * The preferred minimum size of the component.
         *
         * This value is used by procedural layout systems to retrieve
         * the preferred minimum layout size of the component. It is 
         * ignored when using CSS to position the element. 
         *
         * This should be reimplemented by subclasses. The default 
         * implementation returns an invalid size.
         * 
         * @protected
         */
        minimumSizeHint(): Size {
            return new Size();
        }

        /**
         * The preferred maximum size of the component.
         *
         * This value is used by procedural layout systems to retrieve
         * the preferred maximum layout size of the component. It is 
         * ignored when using CSS to position the element.
         *
         * This should be reimplemented by subclasses. The default 
         * implementation returns an invalid size.
         * 
         * @protected
         */
        maximumSizeHint(): Size {
            return new Size();
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
                var name = names[i];
                var value = this[name];
                if (value && value.porcelain_ComponentExtra) {
                    (<IComponentExtra>value).destroy();
                    this[name] = null;
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
