declare module porcelain {
    class Window extends Component {
        public mousedown: EventBinder;
        constructor();
        public destroy(): void;
        public sizeHint(): Size;
        public minimumSizeHint(): Size;
        public maximumSizeHint(): Size;
        public attach(elem?: HTMLElement): void;
        public raise(): void;
        public lower(): void;
        public onMouseDown(event: MouseEvent): void;
        public maximize(): void;
        public restore(): void;
        public minimize(): void;
        public close(): void;
        private _body;
        private _titleBar;
    }
}
