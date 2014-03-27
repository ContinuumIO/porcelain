declare module porcelain {
    /**
    * A title bar widget for use in a top level window.
    *
    * @class
    */
    class TitleBar extends Widget {
        /**
        * Construct a new TitleBar
        */
        constructor();
        /**
        * Destroy the title bar.
        */
        public destroy(): void;
        public closeButton : Button;
        public restoreButton : Button;
        public minimizeButton : Button;
        public maximizeButton : Button;
        private _iconItem;
        private _textItem;
        private _buttonBox;
        private _closeButton;
        private _restoreButton;
        private _minimizeButton;
        private _maximizeButton;
    }
}
