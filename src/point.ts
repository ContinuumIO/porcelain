/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Point implements IPoint {

        static fromIPoint(point: IPoint): Point {
            return new Point(point.x, point.y);
        }

        x: number;
        y: number;

        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }

        copy(): Point {
            return new Point(this.x, this.y);
        }

        isNull(): boolean {
            return this.x == 0 && this.y == 0;
        }

        manhattanLength(): number {
            return Math.abs(this.x) + Math.abs(this.y);
        }

        equals(other: IPoint): boolean {
            return this.x == other.x && this.y == other.y;
        }

        add(other: IPoint): void {
            this.x += other.x;
            this.y += other.y;
        }

        added(other: IPoint): Point {
            return new Point(this.x + other.x, this.y + other.y);
        }

        subtract(other: IPoint): void {
            this.x -= other.x;
            this.y -= other.y;
        }

        subtracted(other: IPoint): Point {
            return new Point(this.x - other.x, this.y - other.y);
        }

        multiply(factor: number): void {
            this.x *= factor;
            this.y *= factor;
        }

        multiplied(factor: number): Point {
            return new Point(this.x * factor, this.y * factor);
        }

        divide(factor: number): void {
            this.x = Math.floor(this.x / factor);
            this.y = Math.floor(this.y / factor);
        }

        divided(factor: number): Point {
            var x = Math.floor(this.x / factor);
            var y = Math.floor(this.y / factor);
            return new Point(x, y);
        }
    }

}
