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
        * Returns true if this point is equivalent to another.
        */
        public equals(other: IPoint): boolean;
        /**
        * Returns true if both X AND Y coordinates are zero.
        */
        public isNull(): boolean;
        /**
        * Returns the sum of the abs X and Y distances to the origin.
        */
        public manhattanLength(): number;
        /**
        * Return a new size with the X and Y values swapped.
        */
        public transpose(): Point;
        /**
        * Returns a new point which is the sum of the two points.
        */
        public add(other: IPoint): Point;
        /**
        * Returns a new point which is the difference of the two points.
        */
        public subtract(other: IPoint): Point;
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
