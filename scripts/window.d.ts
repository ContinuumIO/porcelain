declare module porcelain {
    class Window extends Item {
        constructor(parent?: Item);
        public destroy(): void;
        public show(): void;
        public raise(): void;
        public lower(): void;
        public geometry : Geometry;
        private _onMouseDown;
        private _body;
        private _titleBar;
        private _geometry;
    }
}
