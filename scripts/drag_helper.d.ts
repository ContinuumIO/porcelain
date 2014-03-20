declare module porcelain {
    interface DragHelperEvent<T> {
        pageX: number;
        pageY: number;
        context: T;
    }
    class DragHelper<T> {
        public pressed: IEventHandler<DragHelperEvent<T>>;
        public released: IEventHandler<DragHelperEvent<T>>;
        public moved: IEventHandler<DragHelperEvent<T>>;
        constructor(element: Element, context: T);
        public destroy(): void;
        public element : Element;
        public context : T;
        private _onMouseDown;
        private _onMouseUp;
        private _onMouseMove;
        private _element;
        private _context;
    }
}
