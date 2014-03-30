declare module porcelain {
    class Window extends Widget {
        constructor();
        public destroy(): void;
        public zIndex : number;
        public show(): void;
        public raise(): void;
        public lower(): void;
        private _onMouseDown(event);
        private _body;
        private _titleBar;
    }
}
