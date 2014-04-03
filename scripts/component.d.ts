declare module porcelain {
    /**
    * An interface for declaring component extras.
    *
    * The lifetime of a component extra is bound to the lifetime
    * of the component on which it exists. When the component is
    * destroyed, the extra will be destroyed. Therefore, an extra
    * must not be shared amongst components.
    */
    interface IComponentExtra {
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
    class Component {
        /**
        * A signal emitted when the component is destroyed.
        *
        * @readonly
        */
        public destroyed: Signal;
        /**
        * Construct a new Component.
        */
        constructor();
        /**
        * Destroy the component and its children.
        */
        public destroy(): void;
        /**
        * The component's internal DOM element.
        *
        * @readonly
        */
        public element : HTMLElement;
        /**
        * The id of the component's DOM element.
        */
        public id : string;
        /**
        * The CSS display value of the component's DOM element.
        */
        public display : string;
        /**
        * The CSS position value of the component's DOM element.
        */
        public position : string;
        /**
        * The parent Component of this component.
        *
        * @readonly
        */
        public parent : Component;
        /**
        * The array of child Components of this component.
        *
        * @readonly
        */
        public children : Component[];
        /**
        * Append children to the end of this component.
        *
        * If a component is already a child, it will be moved to the
        * end of the child array. The children *must* be unique.
        *
        * @param [...] The child Components to append.
        */
        public append(...children: Component[]): void;
        /**
        * Prepend children to the beginning of this component.
        *
        * If a component is already a child, it will be moved to the
        * beginning of the child array. The children *must* be unique.
        *
        * @param [...] The child Components to prepend.
        */
        public prepend(...children: Component[]): void;
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
        public insertBefore(before: Component, ...children: Component[]): void;
        /**
        * Unparent the Component and detach its element from the DOM.
        *
        */
        public detach(): void;
        /**
        * Add a name or names to the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to add to the element.
        */
        public addClass(className: string): void;
        /**
        * Remove a name or names from the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to remove from the element.
        */
        public removeClass(className: string): void;
        /**
        * Show the underlying DOM element.
        *
        * This is a convenience for `this.display = ""`;
        */
        public show(): void;
        /**
        * Hide the underlying DOM element.
        *
        * This is a convenience for `this.display = "none"`;
        */
        public hide(): void;
        /**
        * The offset position of the component.
        *
        * This should only be set when position is "absolute".
        */
        public offsetPos : Point;
        /**
        * The offset size of the component.
        *
        * This should only be set when position is "absolute".
        */
        public offsetSize : Size;
        /**
        * The offset rect of the component.
        *
        * This should only be set when position is "absolute".
        */
        public offsetRect : Rect;
        /**
        * The minimum size of the component.
        */
        public minimumSize : Size;
        /**
        * The maximum size of the component.
        */
        public maximumSize : Size;
        /**
        * The preferred size of the component.
        *
        * This computes the natural size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * @protected
        */
        public sizeHint(): Size;
        /**
        * The preferred minimum size of the component.
        *
        * This computes the minimal size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * @protected
        */
        public minimumSizeHint(): Size;
        /**
        * The preferred maximum size of the component.
        *
        * This computes the maximal size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * @protected
        */
        public maximumSizeHint(): Size;
        /**
        * Create the underlying element for the component.
        *
        * The default implementation creates a div.
        *
        * @protected.
        */
        public createElement(): HTMLElement;
        /**
        * A helper method for preparing children to be inserted.
        *
        * @private
        */
        private _prepareChildren(children);
        /**
        * A helper method to detach the DOM element.
        *
        * @private
        */
        private _detachElement();
        /**
        * A helper method for destroying the component extras.
        *
        * @private
        */
        private _destroyExtras();
        /**
        * A helper method for destroying the component children.
        *
        * @private
        */
        private _destroyChildren();
        /**
        * A helper method for de-parenting the component.
        *
        * @private
        */
        private _deparent();
        private _element;
        private _parent;
        private _children;
    }
}
