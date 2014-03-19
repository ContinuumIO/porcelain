declare module porcelain {
    interface HandleData<T> {
        point: IPoint;
        tag: T;
    }
    class ResizeHandle<T> extends Item {
        public pressed: Signal<IPoint>;
        public released: Signal<IPoint>;
        public moved: Signal<IPoint>;
        constructor(tag: T);
        public create(): void;
        private _onMouseDown;
        private _onMouseUp;
        private _onMouseMove;
        private _tag;
    }
}
