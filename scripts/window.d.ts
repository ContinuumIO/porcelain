declare module porcelain {
    class Window extends Widget {
        constructor();
        public destroy(): void;
        public layoutItem : LayoutItem;
        public sizeHint(): Size;
        public minimumSizeHint(): Size;
        public maximumSizeHint(): Size;
        public setVisible(visible: boolean): void;
        public raise(): void;
        public lower(): void;
        public onMouseDown(event: MouseEvent): void;
        public maximize(): void;
        public restore(): void;
        public minimize(): void;
        public close(): void;
        private _body;
        private _titleBar;
        private _layoutItem;
    }
}
