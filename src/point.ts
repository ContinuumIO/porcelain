/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * An interface defining point in Cartesian space.
     */
    export
    interface IPoint {
        x: number;
        y: number;
    }


    /**
     * A class which represents a point in Cartesian space.
     *
     * @class
     */
    export
    class Point implements IPoint {

        /**
         * The X-coordinate of the point, in pixels.
         */
        x: number;

        /**
         * The Y-coordinate of the point, in pixels.
         */
        y: number;

        /**
         * Construct a new Point.
         */
        constructor();
        constructor(point: IPoint);
        constructor(x: number, y: number);
        constructor(arg1?: any, arg2?: any) {
            switch (arguments.length) {
                case 0:
                    this.x = 0;
                    this.y = 0;
                    break;
                case 1:
                    this.x = (<IPoint>arg1).x;
                    this.y = (<IPoint>arg1).y;
                    break;
                case 2:
                    this.x = <number>arg1;
                    this.y = <number>arg2;
                    break;
                default:
                    throw new Error("invalid constructor call");
            }
        }

        /**
         * Returns true if both X AND Y coordinates are zero.
         */
        isNull(): boolean {
            return this.x == 0 && this.y == 0;
        }

        /**
         * Returns the sum of the abs X and Y distances to the origin.
         */
        manhattanLength(): number {
            return Math.abs(this.x) + Math.abs(this.y);
        }

        /**
         * Returns true if this point is equivalent to another.
         */
        equals(other: Point): boolean {
            return this.x == other.x && this.y == other.y;
        }

        /**
         * Returns a new point which is the sum of the two points.
         */
        add(other: Point): Point {
            return new Point(this.x + other.x, this.y + other.y);
        }

        /**
         * Returns a new point which is the difference of the two points.
         */
        subtract(other: Point): Point {
            return new Point(this.x - other.x, this.y - other.y);
        }

        /**
         * Returns a new point scaled by the given factor.
         */
        multiply(factor: number): Point {
            var x = Math.floor(this.x * factor);
            var y = Math.floor(this.y * factor);
            return new Point(x, y);
        }

        /**
         * Returns a new point scaled by the given divisor.
         */
        divide(divisor: number): Point {
            var x = Math.floor(this.x / divisor);
            var y = Math.floor(this.y / divisor);
            return new Point(x, y);
        }
    }

}
