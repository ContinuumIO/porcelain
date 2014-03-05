/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Point {

        constructor(x: number = 0, y: number = 0) {
            this._x = x;
            this._y = y;
        }

        x(): number {
            return this._x;
        }

        setX(x: number): void {
            this._x = x;
        }

        y(): number {
            return this._y;
        }

        setY(y: number): void {
            this._y = y;
        }

        isNull(): boolean {
            return this._x == 0 && this._y == 0;
        }

        manhattanLength(): number {
            return Math.abs(this._x) + Math.abs(this._y);
        }

        equals(other: Point): boolean {
            return this._x == other._x && this._y == other._y;
        }

        add(other: Point): void {
            this._x += other._x;
            this._y += other._y;
        }

        added(other: Point): Point {
            var x = this._x + other._x;
            var y = this._y + other._y;
            return new Point(x, y);
        }

        subtract(other: Point): void {
            this._x -= other._x;
            this._y -= other._y;
        }

        subtracted(other: Point): Point {
            var x = this._x - other._x;
            var y = this._y - other._y;
            return new Point(x, y);
        }

        multiply(factor: number): void {
            this._x *= factor;
            this._y *= factor;
        }

        multiplied(factor: number): Point {
            var x = this._x * factor;
            var y = this._y * factor;
            return new Point(x, y);
        }

        divide(factor: number): void {
            this._x /= factor;
            this._y /= factor;
        }

        divided(factor: number): Point {
            var x = this._x / factor;
            var y = this._y / factor;
            return new Point(x, y);
        }

        private _x: number;
        private _y: number;
    }

}
