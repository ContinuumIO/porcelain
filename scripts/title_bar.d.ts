declare module porcelain {
    /**
    * A title bar for use in a top level window.
    *
    * @class
    */
    class TitleBar extends Item {
        constructor(target: Geometry, parent?: Item);
        public destroy(): void;
        public closeButton : Button;
        public restoreButton : Button;
        public minimizeButton : Button;
        public maximizeButton : Button;
        private _target;
        private _textItem;
        private _buttonBox;
        private _closeButton;
        private _restoreButton;
        private _minimizeButton;
        private _maximizeButton;
    }
}
