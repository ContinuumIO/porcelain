declare module porcelain {
    class Point implements IPoint {
        public x: number;
        public y: number;
        constructor();
        constructor(point: IPoint);
        constructor(x: number, y: number);
        public point : IPoint;
        public isNull(): boolean;
        public manhattanLength(): number;
        public equals(other: IPoint): boolean;
        public add(other: IPoint): void;
        public added(other: IPoint): Point;
        public subtract(other: IPoint): void;
        public subtracted(other: IPoint): Point;
        public multiply(factor: number): void;
        public multiplied(factor: number): Point;
        public divide(factor: number): void;
        public divided(factor: number): Point;
    }
}
