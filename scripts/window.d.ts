declare module porcelain {
    class Window extends Widget {
        constructor();
        public destroy(): void;
        public show(): void;
        public raise(): void;
        public lower(): void;
        public geometry : Geometry;
        private _body;
        private _titleBar;
        private _geometry;
    }
}
