/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Point implements IPoint {

        x: number;
        y: number;

        constructor(point: IPoint = { x: 0, y: 0 }) {
            this.x = point.x;
            this.y = point.y;
        }

        get point(): IPoint {
            return { x: this.x, y: this.y };
        }

        set point(point: IPoint) {
            this.x = point.x;
            this.y = point.y;
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
            return new Point({ x: this.x + other.x, y: this.y + other.y });
        }

        subtract(other: IPoint): void {
            this.x -= other.x;
            this.y -= other.y;
        }

        subtracted(other: IPoint): Point {
            return new Point({ x: this.x - other.x, y: this.y - other.y });
        }

        multiply(factor: number): void {
            this.x *= factor;
            this.y *= factor;
        }

        multiplied(factor: number): Point {
            return new Point({ x: this.x * factor, y: this.y * factor });
        }

        divide(factor: number): void {
            this.x = Math.floor(this.x / factor);
            this.y = Math.floor(this.y / factor);
        }

        divided(factor: number): Point {
            var x = Math.floor(this.x / factor);
            var y = Math.floor(this.y / factor);
            return new Point({ x: x, y: y });
        }
    }

}
