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
        public move(point: IPoint): void;
        public resize(size: ISize): void;
        public setGeometry(rect: IRect): void;
        public sizeHint(): Size;
        public element : HTMLDivElement;
        public render(): void;
        private _updateElementGeometry(pos, size);
        private _geometry;
        private _element;
    }
}
