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
        * The icon item attached to the title bar.
        *
        * @readonly
        */
        public icon : Component;
        /**
        * The label item attached to the title bar.
        *
        * @readonly
        */
        public label : Label;
        /**
        * The close button attached to the title bar.
        *
        * @readonly
        */
        public closeButton : Button;
        /**
        * The restore button attached to the title bar.
        *
        * @readonly
        */
        public restoreButton : Button;
        /**
        * The minimize button attached to the title bar.
        *
        * @readonly
        */
        public minimizeButton : Button;
        /**
        * The maximize button attached to the title bar.
        *
        * @readonly
        */
        public maximizeButton : Button;
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
