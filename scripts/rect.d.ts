declare module porcelain {
    /**
    * The interface for a box defined by four edges.
    */
    interface IBox {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }
    /**
    * The interface for a rect defined by position and size.
    */
    interface IRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    /**
    * An implementation of IBox and IRect
    *
    * @class
    */
    class Rect implements IBox, IRect {
        /**
        * The left edge of the rect, in pixels.
        *
        * This is equivalent to `x`. Modifying this value will
        * change the width, but will not change the right edge.
        */
        public left: number;
        /**
        * The top edge of the rect, in pixel.
        *
        * This is equivalent to `y`. Modifying this value will
        * change the height, but will not change the bottom edge.
        */
        public top: number;
        /**
        * The right edge of the rect, in pixels.
        *
        * This is equivalent to `x + width`. Modifying this value
        * will change the width, but will not change the left edge.
        */
        public right: number;
        /**
        * The bottom edge of the rect, in pixel.
        *
        * This is equivalent to `y + height`. Modifying this value
        * will change the height, but will not change the bottom edge.
        */
        public bottom: number;
        /**
        * Construct a new Rect.
        */
        constructor();
        constructor(box: IBox);
        constructor(rect: IRect);
        constructor(topLeft: IPoint, size: ISize);
        constructor(topLeft: IPoint, bottomRight: IPoint);
        constructor(x: number, y: number, width: number, height: number);
        /**
        * The X-coordinate of the rect.
        *
        * This is equivalent to `left`. Modifying this value will
        * change the right edge, but will not change the width.
        */
        public x : number;
        /**
        * The Y-coordinate of the rect.
        *
        * This is equivalent to `top`. Modifying this value will
        * change the bottom edge, but will not change the height.
        */
        public y : number;
        /**
        * The width of the rect.
        *
        * This is equivalent to `right - left`. Modifying this value
        * will change the right edge.
        */
        public width : number;
        /**
        * The height of the rect.
        *
        * This is equivalent to `bottom - top`. Modifying this value
        * will change the bottom edge.
        */
        public height : number;
        /**
        * The top left corner of the rect.
        *
        * Modifying this value will change the width and height but
        * will not change the right or bottom edge.
        */
        public topLeft : IPoint;
        /**
        * The top right corner of the rect.
        *
        * Modifying this value will change the width and height but
        * will not change the left or bottom edge.
        */
        public topRight : IPoint;
        /**
        * The bottom left corner of the rect.
        *
        * Modifying this value will change the width and height but
        * will not change the top or right edge.
        */
        public bottomLeft : IPoint;
        /**
        * The bottom right corner of the rect.
        *
        * Modifying this value will change the width and height but
        * will not change the top or left edge.
        */
        public bottomRight : IPoint;
        /**
        * The center point of the rect.
        *
        * @readonly
        */
        public center : IPoint;
        /**
        * The position of the rect.
        *
        * This is equivalent to `topLeft`. Modifying this value will
        * change the right and bottom edges but will not change the
        * width or height.
        */
        public pos : IPoint;
        /**
        * The size of the rect.
        *
        * Modifying this value will change the right and bottom
        * edges but will not change the left or top edge.
        */
        public size : ISize;
        /**
        * The position and size of the rect.
        */
        public rect : IRect;
        /**
        * The box edges of the rect.
        */
        public box : IBox;
        /**
        * Move the left edge of the rect.
        *
        * This will not change the width of the rect.
        *
        * @param pos - the new location of the left edge
        */
        public moveLeft(pos: number): void;
        /**
        * Move the top edge of the rect.
        *
        * This will not change the height of the rect.
        *
        * @param pos - the new location of the top edge
        */
        public moveTop(pos: number): void;
        /**
        * Move the right edge of the rect.
        *
        * This will not change the width of the rect.
        *
        * @param pos - the new location of the right edge
        */
        public moveRight(pos: number): void;
        /**
        * Move the bottom edge of the rect.
        *
        * This will not change the height of the rect.
        *
        * @param pos - the new location of the bottom edge
        */
        public moveBottom(pos: number): void;
        /**
        * Move the top left corner of the rect.
        *
        * This is equivalent to moving the top and left edges
        * separately.
        *
        * @param point - the new location of the corner
        */
        public moveTopLeft(point: IPoint): void;
        /**
        * Move the top right corner of the rect.
        *
        * This is equivalent to moving the top and right edges
        * separately.
        *
        * @param point - the new location of the corner
        */
        public moveTopRight(point: IPoint): void;
        /**
        * Move the bottom left corner of the rect.
        *
        * This is equivalent to moving the bottom and left edges
        * separately.
        *
        * @param point - the new location of the corner
        */
        public moveBottomLeft(point: IPoint): void;
        /**
        * Move the bottom right corner of the rect.
        *
        * This is equivalent to moving the bottom and right edges
        * separately.
        *
        * @param point - the new location of the corner
        */
        public moveBottomRight(point: IPoint): void;
        /**
        * Move the center point of the rect.
        *
        * This will not change the width or height.
        *
        * @param point - the new center point of the rect
        */
        public moveCenter(point: IPoint): void;
        /**
        * Whether the width OR height is zero or negative.
        */
        public isEmpty(): boolean;
        /**
        * Whether the width AND height are zero.
        */
        public isNull(): boolean;
        /**
        * Whether the width AND height are positive non-zero.
        */
        public isValid(): boolean;
        /**
        * Add the given deltas to the left, top, right and bottom edges.
        */
        public adjust(dx1: number, dy1: number, dx2: number, dy2: number): void;
        /**
        * Create a new rect with edges adjusted by the given deltas.
        */
        public adjusted(dx1: number, dy1: number, dx2: number, dy2: number): Rect;
        /**
        * Test whether this rect contains the given point.
        */
        public contains(point: IPoint): boolean;
        /**
        * Test whether this rect intersects the given rect.
        */
        public intersects(rect: IRect): boolean;
        /**
        * The intersection of this rect with the given rect.
        */
        public intersected(rect: IRect): Rect;
        /**
        * Normalize the rect so that right >= left and bottom >= top.
        */
        public normalize(): void;
        /**
        * Create a new rect with normalized edges.
        */
        public normalized(): Rect;
        /**
        * Translate the rect by the given deltas.
        */
        public translate(dx: number, dy: number): void;
        /**
        * Create a new rect translated by the given deltas.
        */
        public translated(dx: number, dy: number): Rect;
        /**
        * The bounding rect of this rect and the given rect.
        */
        public united(rect: IRect): Rect;
    }
}
