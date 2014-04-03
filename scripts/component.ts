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
         *
         * @readonly
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
         * The CSS display value of the component's DOM element.
         */
        get display(): string {
            return window.getComputedStyle(this._element).display;
        }

        set display(value: string) {
            this._element.style.display = value;
        }

        /**
         * The CSS position value of the component's DOM element.
         */
        get position(): string {
            return window.getComputedStyle(this._element).position;
        }

        set position(value: string) {
            this._element.style.position = value;
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
         * This is a convenience for `this.display = ""`;
         */
        show(): void {
            this.display = "";
        }

        /**
         * Hide the underlying DOM element.
         *
         * This is a convenience for `this.display = "none"`;
         */
        hide(): void {
            this.display = "none";
        }

        /**
         * The offset position of the component.
         *
         * This should only be set when position is "absolute".
         */
        get offsetPos(): Point {
            var elem = this._element;
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            return new Point(x, y);
        }

        set offsetPos(point: Point) {
            var style = this._element.style;
            style.left = point.x + "px";
            style.top = point.y + "px";
        }
        
        /**
         * The offset size of the component.
         *
         * This should only be set when position is "absolute".
         */
        get offsetSize(): Size {
            var elem = this._element;
            var w = elem.offsetWidth;
            var h = elem.offsetHeight;
            return new Size(w, h);
        }

        set offsetSize(size: Size) {
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
         * The offset rect of the component.
         *
         * This should only be set when position is "absolute".
         */
        get offsetRect(): Rect {
            var elem = this._element;
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            var w = elem.offsetWidth;
            var h = elem.offsetHeight;
            return new Rect(x, y, w, h);
        }
        
        set offsetRect(rect: Rect) {
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
         * The minimum size of the component.
         */
        get minimumSize(): Size {
            var style = window.getComputedStyle(this._element);
            var w = parseInt(style.minWidth)
            var h = parseInt(style.minHeight)
            if (w !== w || h !== h) {  // fast isNaN
                return new Size();
            }
            return new Size(w, h);
        }

        set minimumSize(size: Size) {
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
         * The maximum size of the component.
         */
        get maximumSize(): Size {
            var style = window.getComputedStyle(this._element);
            var w = parseInt(style.maxWidth)
            var h = parseInt(style.maxHeight)
            if (w !== w || h !== h) {  // fast isNaN
                return new Size();
            }
            return new Size(w, h);
        }

        set maximumSize(size: Size) {
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
         * The preferred size of the component.
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
         * The preferred minimum size of the component.
         *
         * This computes the minimal size of the component and is used
         * by the procedural layout system. The default implementation 
         * of this method returns an invalid size.
         * 
         * @protected
         */
        minimumSizeHint(): Size {
            return new Size();
        }

        /**
         * The preferred maximum size of the component.
         *
         * This computes the maximal size of the component and is used
         * by the procedural layout system. The default implementation 
         * of this method returns an invalid size.
         * 
         * @protected
         */
        maximumSizeHint(): Size {
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
