declare module porcelain {
    class Item {
        constructor();
        public x : number;
        public y : number;
        public width : number;
        public height : number;
        public pos : IPoint;
        public size : ISize;
        public rect : IRect;
        public minimumSize : ISize;
        public maximumSize : ISize;
        public sizeHint(): Size;
        public element : HTMLDivElement;
        public createElement(): HTMLDivElement;
        public render(): void;
        private _syncGeometry();
        private _geometry;
        private _minSize;
        private _maxSize;
        private _element;
    }
}
