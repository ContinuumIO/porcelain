/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Size {

        constructor(width: number = -1, height: number = -1) {
            this._width = width;
            this._height = height;
        }

        width(): number {
            return this._width;
        }

        setWidth(width: number): void {
            this._width = width;
        }

        height(): number {
            return this._height;
        }

        setHeight(height: number): void {
            this._height = height;
        }

        isEmpty(): boolean {
            return this._width == 0 || this._height == 0;
        }

        isNull(): boolean {
            return this._width == 0 && this._height == 0;
        }

        isValid(): boolean {
            return this._width >= 0 && this._height >= 0;
        }

        boundedTo(other: Size): Size {
            var width = Math.min(this._width, other._width);
            var height = Math.min(this._height, other._height);
            return new Size(width, height);
        }

        expandedTo(other: Size): Size {
            var width = Math.max(this._width, other._width);
            var height = Math.max(this._height, other._height);
            return new Size(width, height);
        }

        transpose(): void {
            var width = this._width;
            this._width = this._height;
            this._height = width;
        }

        transposed(): Size {
            return new Size(this._height, this._width);
        }

        equals(other: Size): boolean {
            return this._width == other._width && this._height == other._height;
        }

        add(other: Size): void {
            this._width += other._width;
            this._height += other._height;
        }

        added(other: Size): Size {
            var width = this._width + other._width;
            var height = this._height + other._height;
            return new Size(width, height);
        }

        subtract(other: Size): void {
            this._width -= other._width;
            this._height -= other._height;
        }

        subtracted(other: Size): Size {
            var width = this._width - other._width;
            var height = this._height - other._height;
            return new Size(width, height);
        }

        multiply(factor: number): void {
            this._width *= factor;
            this._height *= factor;
        }

        multiplied(factor: number): Size {
            var width = this._width * factor;
            var height = this._height * factor;
            return new Size(width, height);
        }

        divide(factor: number): void {
            this._width /= factor;
            this._height /= factor;
        }

        divided(factor: number): Size {
            var width = this._width / factor;
            var height = this._height / factor;
            return new Size(width, height);
        }

        private _width: number;
        private _height: number;
    }

}
