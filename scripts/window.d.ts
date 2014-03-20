declare module porcelain {
    class Window extends Widget {
        constructor();
        public destroy(): void;
        public show(): void;
        public raise(): void;
        public lower(): void;
        private _onMouseDown;
        private _body;
        private _titleBar;
        private _resizeGrips;
    }
}
