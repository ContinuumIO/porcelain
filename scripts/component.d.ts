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
        * The CSS class added to Component instances.
        */
        static Class: string;
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
        * Returns the parent Component of this component.
        */
        public parent(): Component;
        /**
        * Returns the array of child Components of this component.
        */
        public children(): Component[];
        /**
        * Unparent the Component and detach its element from the DOM.
        *
        */
        public detach(): void;
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
        * Returns the component's internal DOM element.
        */
        public element(): HTMLElement;
        /**
        * Returns the id of the component and its DOM element.
        */
        public id(): string;
        /**
        * Set the id of the component and its DOM element.
        */
        public setId(id: string): void;
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
        * Returns the inline style object for the component element.
        */
        public style(): CSSStyleDeclaration;
        /**
        * Returns the computed style object for the component element.
        */
        public computedStyle(): CSSStyleDeclaration;
        /**
        * Returns the CSS display value for the component element.
        */
        public display(): string;
        /**
        * Set the CSS display value for the component element.
        */
        public setDisplay(value: string): void;
        /**
        * Returns CSS position value for the component element.
        */
        public position(): string;
        /**
        * Set the CSS position value for the component element.
        */
        public setPosition(value: string): void;
        /**
        * Returns the offset position of the component.
        */
        public pos(): Point;
        /**
        * Set the offset position of the component.
        */
        public setPos(point: Point): void;
        /**
        * Returns the offset size of the component.
        */
        public size(): Size;
        /**
        * Set the offset size of the component.
        */
        public setSize(size: Size): void;
        /**
        * Returns the offset rect of the component.
        */
        public rect(): Rect;
        /**
        * Set the offset rect of the component.
        */
        public setRect(rect: Rect): void;
        /**
        * Returns the minimum size of the component.
        */
        public minimumSize(): Size;
        /**
        * Set the minimum size of the component.
        */
        public setMinimumSize(size: Size): void;
        /**
        * Returns the maximum size of the component.
        */
        public maximumSize(): Size;
        /**
        * Set the maximum size of the component.
        */
        public setMaximumSize(size: Size): void;
        /**
        * Invoked when the component is resized.
        *
        * This will be invoked when the geometry of the component is
        * changed through the geometry methods, or when the parent of
        * the component can safely assume that the component's size
        * has been changed due to some user interaction.
        *
        * This method is invoked whenever it is *reasonable* to assume
        * that the size of the component has changed. Since it may be
        * invoked when the size has not actually changed, components
        * which perform expensive computation on a resize should cache
        * the previous size value and only take action when the size
        * has actually changed.
        *
        * The default implementation of this method does nothing. A
        * subclass should reimplement this method as needed to handle
        * the resize event and/or dispatch to the appropriate children.
        *
        * @protected
        */
        public onResize(): void;
        /**
        * Returns the preferred size of the component.
        *
        * This computes the natural size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * @protected
        */
        public sizeHint(): Size;
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
