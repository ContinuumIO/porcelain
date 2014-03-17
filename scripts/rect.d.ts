declare module porcelain {
    class Rect implements IRect, IBox {
        public left: number;
        public top: number;
        public right: number;
        public bottom: number;
        constructor();
        constructor(box: IBox);
        constructor(rect: IRect);
        constructor(topLeft: IPoint, size: ISize);
        constructor(topLeft: IPoint, bottomRight: IPoint);
        constructor(x: number, y: number, width: number, height: number);
        public x : number;
        public y : number;
        public width : number;
        public height : number;
        public topLeft : IPoint;
        public topRight : IPoint;
        public bottomLeft : IPoint;
        public bottomRight : IPoint;
        public center : IPoint;
        public pos : IPoint;
        public size : ISize;
        public rect : IRect;
        public box : IBox;
        public moveLeft(pos: number): void;
        public moveTop(pos: number): void;
        public moveRight(pos: number): void;
        public moveBottom(pos: number): void;
        public moveTopLeft(point: IPoint): void;
        public moveTopRight(point: IPoint): void;
        public moveBottomLeft(point: IPoint): void;
        public moveBottomRight(point: IPoint): void;
        public moveCenter(point: IPoint): void;
        public isEmpty(): boolean;
        public isNull(): boolean;
        public isValid(): boolean;
        public adjust(dx1: number, dy1: number, dx2: number, dy2: number): void;
        public adjusted(dx1: number, dy1: number, dx2: number, dy2: number): Rect;
        public contains(point: IPoint): boolean;
        public intersects(rect: IRect): boolean;
        public intersected(rect: IRect): Rect;
        public normalize(): void;
        public normalized(): Rect;
        public translate(dx: number, dy: number): void;
        public translated(dx: number, dy: number): Rect;
        public united(rect: IRect): Rect;
    }
}
