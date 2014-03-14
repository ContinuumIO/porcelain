declare module porcelain {
    class Item {
        constructor(parent?: Item);
        public parent : Item;
        public children : Item[];
        public childAdded(child: Item): void;
        public childRemoved(child: Item): void;
        public parentChanged(old: Item, parent: Item): void;
        public x : number;
        public y : number;
        public width : number;
        public height : number;
        public pos : IPoint;
        public size : ISize;
        public rect : IRect;
        public sizeHint(): Size;
        public move(point: IPoint): void;
        public resize(size: ISize): void;
        public setGeometry(rect: IRect): void;
        public element : HTMLDivElement;
        public render(): void;
        public refreshElementGeometry(pos: boolean, size: boolean): void;
        private _parent;
        private _children;
        private _geometry;
        private _element;
    }
}
