declare module porcelain {
    class ZStack {
        constructor(minZ: number);
        public top : Item;
        public bottom : Item;
        public contains(item: Item): boolean;
        public add(item: Item): void;
        public remove(item: Item): void;
        public raise(...items: Item[]): void;
        public lower(...items: Item[]): void;
        private _classify(items);
        private _updateIndices();
        private _stack;
        private _minZ;
    }
}
