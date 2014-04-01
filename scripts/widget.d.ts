declare module porcelain {
    /**
    * A base class for creating interactive porcelain widgets.
    *
    * The Widget class adds the methods required for procedural layout.
    *
    * @class
    */
    class Widget extends Item {
        /**
        * Construct a new Widget.
        */
        constructor();
        /**
        * Show the underlying DOM element.
        *
        * This is a convenience for setVisible(true);
        */
        public show(): void;
        /**
        * Hide the underlying div element.
        *
        * This is a convenience for setVisible(false);
        */
        public hide(): void;
        /**
        * Set the visibility of the underlying div element.
        *
        * The default implementation of this method sets and clears
        * the display property of the element style. This may be
        * reimplemented by subclasses which require more control.
        */
        public setVisible(visible: boolean): void;
        /**
        * The preferred size of the widget.
        *
        * When using the procedural layout system, this value is used
        * to take into account the preferred size of the widget. It
        * is ignored when using CSS layout.
        *
        * An invalid size will be ignored by the layout system.
        *
        * @protected
        */
        public sizeHint(): Size;
        /**
        * The suggested minimum size of the widget.
        *
        * When using the procedural layout system, this value is used
        * to take into account the preferred minimum size of the widget.
        * It is ignored when using CSS layout.
        *
        * An invalid size will be ignored by the layout system. If the
        * user has specified a concrete minimum size, this hint will
        * have no effect.
        *
        * @protected
        */
        public minimumSizeHint(): Size;
        /**
        * The suggested maximum size of the element.
        *
        * When using the procedural layout system, this value is used
        * to take into account the preferred minimum size of the widget.
        * It is ignored when using CSS layout.
        *
        * An invalid size will be ignored by the layout system. If the
        * user has specified a concrete maximum size, this hint will
        * have no effect.
        *
        * @protected
        */
        public maximumSizeHint(): Size;
    }
}
