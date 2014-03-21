/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The interface for a point in Cartesian space.
     */
    export interface IPoint {
        x: number;
        y: number;
    }


    /**
     * An implementation of the IPoint interface.
     */
    export class Point implements IPoint {

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
        constructor(first?, second?) {
            switch (arguments.length) {
                case 0:
                    this.x = 0;
                    this.y = 0;
                    break;
                case 1: 
                    var point = <IPoint>first;
                    this.x = point.x;
                    this.y = point.y;
                    break;
                case 2: 
                    var x = <number>first;
                    var y = <number>second;
                    this.x = x;
                    this.y = y;
                    break;
                default:
                    throw "invalid constructor call";
            }
        }

        /**
         * Whether both X and Y coordinates are zero.
         */
        isNull(): boolean {
            return this.x == 0 && this.y == 0;
        }

        /**
         * The sum of the absolute X and Y distances to the origin.
         */
        manhattanLength(): number {
            return Math.abs(this.x) + Math.abs(this.y);
        }

        /**
         * Test the point for equality with another.
         */
        equals(other: IPoint): boolean {
            return this.x == other.x && this.y == other.y;
        }

        /**
         * Increment this point by another point.
         */
        add(other: IPoint): void {
            this.x += other.x;
            this.y += other.y;
        }

        /**
         * A new point which is the vector sum of the two points.
         */
        added(other: IPoint): Point {
            return new Point(this.x + other.x, this.y + other.y);
        }

        /**
         * Decrement this point by another point.
         */
        subtract(other: IPoint): void {
            this.x -= other.x;
            this.y -= other.y;
        }

        /**
         * A new point which is the vector difference of the two points.
         */
        subtracted(other: IPoint): Point {
            return new Point(this.x - other.x, this.y - other.y);
        }

        /**
         * Scale this point by the given factor.
         */
        multiply(factor: number): void {
            this.x *= factor;
            this.y *= factor;
        }

        /**
         * A new point scaled by the given factor.
         */
        multiplied(factor: number): Point {
            return new Point(this.x * factor, this.y * factor);
        }

        /**
         * Scale this point by the given divisor.
         */
        divide(divisor: number): void {
            this.x /= divisor;
            this.y /= divisor;
        }

        /**
         * A new point scaled by the given divisor.
         */
        divided(divisor: number): Point {
            var x = Math.floor(this.x / divisor);
            var y = Math.floor(this.y / divisor);
            return new Point(x, y);
        }
    }

}
