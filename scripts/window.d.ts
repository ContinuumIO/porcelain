declare module porcelain {
    class Window extends Widget {
        constructor();
        public destroy(): void;
        public layoutItem : LayoutItem;
        public zIndex : number;
        public sizeHint(): Size;
        public setVisible(visible: boolean): void;
        public raise(): void;
        public lower(): void;
        private _onMouseDown(event);
        private _body;
        private _titleBar;
        private _layoutItem;
    }
}
