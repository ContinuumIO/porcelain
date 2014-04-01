declare module porcelain {
    /**
    * The interface for defining a rectangle in terms of edges.
    */
    interface IRect {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }
    /**
    * An implementation of the IRect interface.
    *
    * @class
    */
    class Rect implements IRect {
        /**
        * The left edge of the rect, in pixels.
        *
        * Modifying this value will change the width, but will not
        * change the right edge.
        */
        public left: number;
        /**
        * The top edge of the rect, in pixels.
        *
        * Modifying this value will change the height, but will not
        * change the bottom edge.
        */
        public top: number;
        /**
        * The right edge of the rect, in pixels.
        *
        * Modifying this value will change the width, but will not
        * change the left edge.
        */
        public right: number;
        /**
        * The bottom edge of the rect, in pixel.
        *
        * Modifying this value will change the height, but will not
        * change the bottom edge.
        */
        public bottom: number;
        /**
        * Construct a new Rect.
        */
        constructor();
        constructor(rect: IRect);
        constructor(topLeft: IPoint, bottomRight: IPoint);
        constructor(x: number, y: number, width: number, height: number);
        /**
        * Returns the width of the rect.
        *
        * This is equivalent to `right - left`
        */
        public width(): number;
        /**
        * Set the width of the rect.
        *
        * This will move the right edge.
        */
        public setWidth(width: number): void;
        /**
        * Returns the height of the rect.
        *
        * This is Equivalent to `bottom - top`.
        */
        public height(): number;
        /**
        * Set the height of the rect.
        *
        * This will move the bottom edge.
        */
        public setHeight(height: number): void;
        /**
        * Returns the size of the rect.
        */
        public size(): Size;
        /**
        * Set the size of the rect.
        *
        * This will move the left and right edges.
        */
        public setSize(size: ISize): void;
        /**
        * Returns the top left corner of the rect.
        */
        public topLeft(): Point;
        /**
        * Set the top left corner of the rect.
        *
        * This will change the width and height, but will not change
        * change the right or bottom edges.
        */
        public setTopLeft(point: IPoint): void;
        /**
        * Returns the top right corner of the rect.
        */
        public topRight(): Point;
        /**
        * Set the top right corner of the rect.
        *
        * This will change the width and height, but will not change
        * the left or bottom edges.
        */
        public setTopRight(point: IPoint): void;
        /**
        * Returns bottom left corner of the rect.
        */
        public bottomLeft(): Point;
        /**
        * Set the bottom left corner of the rect.
        *
        * This will change the width and height, but will not change
        * the right or top edges.
        */
        public setBottomLeft(point: IPoint): void;
        /**
        * Returns bottom right corner of the rect.
        */
        public bottomRight(): Point;
        /** Set the bottom right corner of the rect.
        *
        * This will change the width and height, but will not change
        * the left or top edges.
        */
        public setBottomRight(point: IPoint): void;
        /**
        * Returns the center point of the rect.
        */
        public center(): Point;
        /**
        * Move the left edge of the rect.
        *
        * This will change the right edge, but will not change
        * the width.
        */
        public moveLeft(pos: number): void;
        /**
        * Move the top edge of the rect.
        *
        * This will change the bottom edge, but will not change
        * the height.
        */
        public moveTop(pos: number): void;
        /**
        * Move the right edge of the rect.
        *
        * This will change the left edge, but will not change
        * the width.
        */
        public moveRight(pos: number): void;
        /**
        * Move the bottom edge of the rect.
        *
        * This will change the top edge, but will not change the
        * height.
        */
        public moveBottom(pos: number): void;
        /**
        * Move the top left corner of the rect.
        *
        * This is equivalent to moving the top and left edges.
        */
        public moveTopLeft(point: IPoint): void;
        /**
        * Move the top right corner of the rect.
        *
        * This is equivalent to moving the top and right edges.
        */
        public moveTopRight(point: IPoint): void;
        /**
        * Move the bottom left corner of the rect.
        *
        * This is equivalent to moving the bottom and left edges.
        */
        public moveBottomLeft(point: IPoint): void;
        /**
        * Move the bottom right corner of the rect.
        *
        * This is equivalent to moving the bottom and right edges.
        */
        public moveBottomRight(point: IPoint): void;
        /**
        * Move the center point of the rect.
        *
        * This will not change the width or height.
        */
        public moveCenter(point: IPoint): void;
        /**
        * Returns true if this rect is equivalent to another.
        */
        public equals(other: IRect): boolean;
        /**
        * Returns true if the width OR height is zero or negative.
        */
        public isEmpty(): boolean;
        /**
        * Returns true if the width AND height are zero.
        */
        public isNull(): boolean;
        /**
        * Returns true the width AND height are positive non-zero.
        */
        public isValid(): boolean;
        /**
        * Adjust the rect edges by the given deltas.
        */
        public adjust(dx1: number, dy1: number, dx2: number, dy2: number): void;
        /**
        * Returns a new rect adjusted by the given deltas.
        */
        public adjusted(dx1: number, dy1: number, dx2: number, dy2: number): Rect;
        /**
        * Normalize the rect so that right >= left and bottom >= top.
        */
        public normalize(): void;
        /**
        * Returns a new rect with normalized edges.
        */
        public normalized(): Rect;
        /**
        * Translate the rect by the given deltas.
        */
        public translate(dx: number, dy: number): void;
        /**
        * Returns a new rect translated by the given deltas.
        */
        public translated(dx: number, dy: number): Rect;
        /**
        * Returns true if this rect contains the given point.
        */
        public contains(point: IPoint): boolean;
        /**
        * Returns true if this rect intersects the given rect.
        */
        public intersects(rect: IRect): boolean;
        /**
        * Returns the bounding rect of this rect and the given rect.
        */
        public intersection(rect: IRect): Rect;
        /**
        * Returns the bounding rect of this rect and the given rect.
        */
        public union(rect: IRect): Rect;
    }
}
