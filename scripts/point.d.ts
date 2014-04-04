declare module porcelain {
    /**
    * An interface defining point in Cartesian space.
    */
    interface IPoint {
        x: number;
        y: number;
    }
    /**
    * A class which represents a point in Cartesian space.
    *
    * @class
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
        * Returns true if both X AND Y coordinates are zero.
        */
        public isNull(): boolean;
        /**
        * Returns the sum of the abs X and Y distances to the origin.
        */
        public manhattanLength(): number;
        /**
        * Returns true if this point is equivalent to another.
        */
        public equals(other: Point): boolean;
        /**
        * Returns a new point which is the sum of the two points.
        */
        public add(other: Point): Point;
        /**
        * Returns a new point which is the difference of the two points.
        */
        public subtract(other: Point): Point;
        /**
        * Returns a new point scaled by the given factor.
        */
        public multiply(factor: number): Point;
        /**
        * Returns a new point scaled by the given divisor.
        */
        public divide(divisor: number): Point;
    }
}
