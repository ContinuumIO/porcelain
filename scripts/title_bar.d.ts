declare module porcelain {
    /**
    * A simple title bar widget for use in a typical window.
    *
    * The title bar is a dumb container widget. The window is
    * responsible for interacting directly with its sub items.
    *
    * @class
    */
    class TitleBar extends MoveGrip {
        /**
        * Construct a new TitleBar
        *
        * @param target The component to move with the title bar.
        */
        constructor(target: Component);
        /**
        * Destroy the title bar.
        */
        public destroy(): void;
        /**
        * Returns the icon item attached to the title bar.
        */
        public icon(): Component;
        /**
        * Returns the label item attached to the title bar.
        */
        public label(): Label;
        /**
        * Returns the close button attached to the title bar.
        */
        public closeButton(): Button;
        /**
        * Returns the restore button attached to the title bar.
        */
        public restoreButton(): Button;
        /**
        * Returns the minimize button attached to the title bar.
        */
        public minimizeButton(): Button;
        /**
        * Returns the maximize button attached to the title bar.
        */
        public maximizeButton(): Button;
        /**
        * The mousedown handler.
        *
        * This is a reimplemented parent class method. The mouse press
        * is ignored when clicking within the bounds of the button box.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        private _subItems;
    }
}
