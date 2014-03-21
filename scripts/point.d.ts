declare module porcelain {
    /**
    * The interface for a point in Cartesian space.
    */
    interface IPoint {
        x: number;
        y: number;
    }
    /**
    * An implementation of the IPoint interface.
    */
    class Point implements IPoint {
        /**
        * The X-coordinate of the point, in pixels.
        */
        public x: number;
        /**
        * The Y-coordinate of the point, in pixels.
        */
        public y: number;
        /**
        * Construct a new Point.
        */
        constructor();
        constructor(point: IPoint);
        constructor(x: number, y: number);
        /**
        * The X and Y coordinates of the point.
        */
        public point : IPoint;
        /**
        * Whether both X and Y coordinates are zero.
        */
        public isNull(): boolean;
        /**
        * The sum of the absolute X and Y distances to the origin.
        */
        public manhattanLength(): number;
        /**
        * Test the point for equality with another.
        */
        public equals(other: IPoint): boolean;
        /**
        * Increment this point by another point.
        */
        public add(other: IPoint): void;
        /**
        * A new point which is the vector sum of the two points.
        */
        public added(other: IPoint): Point;
        /**
        * Decrement this point by another point.
        */
        public subtract(other: IPoint): void;
        /**
        * A new point which is the vector difference of the two points.
        */
        public subtracted(other: IPoint): Point;
        /**
        * Scale this point by the given factor.
        */
        public multiply(factor: number): void;
        /**
        * A new point scaled by the given factor.
        */
        public multiplied(factor: number): Point;
        /**
        * Scale this point by the given divisor.
        */
        public divide(divisor: number): void;
        /**
        * A new point scaled by the given divisor.
        */
        public divided(divisor: number): Point;
    }
}
