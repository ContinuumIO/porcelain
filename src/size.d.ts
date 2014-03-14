declare module porcelain {
    class Size implements ISize {
        public width: number;
        public height: number;
        constructor();
        constructor(size: ISize);
        constructor(width: number, height: number);
        public size : ISize;
        public isEmpty(): boolean;
        public isNull(): boolean;
        public isValid(): boolean;
        public boundedTo(other: ISize): Size;
        public expandedTo(other: ISize): Size;
        public transpose(): void;
        public transposed(): Size;
        public equals(other: ISize): boolean;
        public add(other: ISize): void;
        public added(other: ISize): Size;
        public subtract(other: ISize): void;
        public subtracted(other: ISize): Size;
        public multiply(factor: number): void;
        public multiplied(factor: number): Size;
        public divide(factor: number): void;
        public divided(factor: number): Size;
    }
}
