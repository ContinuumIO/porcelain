declare module porcelain {
    class Item implements IRect, IBox {
        constructor();
        public left : number;
        public top : number;
        public right : number;
        public bottom : number;
        public x : number;
        public y : number;
        public width : number;
        public height : number;
        public topLeft : IPoint;
        public topRight : IPoint;
        public bottomLeft : IPoint;
        public bottomRight : IPoint;
        public pos : IPoint;
        public size : ISize;
        public rect : IRect;
        public minimumSize : ISize;
        public maximumSize : ISize;
        public element : HTMLDivElement;
        public _create(): void;
        private _syncGeometry();
        private _geometry;
        private _minSize;
        private _maxSize;
        private _element;
    }
}
