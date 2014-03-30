declare module porcelain {
    /**
    * A title bar widget for use in a top level window.
    *
    * @class
    */
    class TitleBar extends Widget {
        /**
        * Construct a new TitleBar
        *
        * @param actor The layout actor to move with the title bar.
        */
        constructor(actor: ILayoutActor);
        /**
        * Destroy the title bar.
        */
        public destroy(): void;
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
        * The internal mousedown handler.
        *
        * @private
        */
        private _onMouseDown(event);
        /**
        * The internal mouseup handler.
        *
        * @private
        */
        private _onMouseUp(event);
        /**
        * The internal mousemove handler.
        *
        * @private
        */
        private _onMouseMove(event);
        private _actor;
        private _iconItem;
        private _textItem;
        private _buttonBox;
        private _closeButton;
        private _restoreButton;
        private _minimizeButton;
        private _maximizeButton;
        private _offsetX;
        private _offsetY;
    }
}
