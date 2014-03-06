/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Size implements ISize {

        static fromISize(size: ISize): Size {
            return new Size(size.width, size.height);
        }

        width: number;
        height: number;

        constructor(width: number = -1, height: number = -1) {
            this.width = width;
            this.height = height;
        }

        copy(): Size {
            return new Size(this.width, this.height);
        }

        isEmpty(): boolean {
            return this.width == 0 || this.height == 0;
        }

        isNull(): boolean {
            return this.width == 0 && this.height == 0;
        }

        isValid(): boolean {
            return this.width >= 0 && this.height >= 0;
        }

        boundedTo(other: ISize): Size {
            var width = Math.min(this.width, other.width);
            var height = Math.min(this.height, other.height);
            return new Size(width, height);
        }

        expandedTo(other: ISize): Size {
            var width = Math.max(this.width, other.width);
            var height = Math.max(this.height, other.height);
            return new Size(width, height);
        }

        transpose(): void {
            var width = this.width;
            this.width = this.height;
            this.height = width;
        }

        transposed(): Size {
            return new Size(this.height, this.width);
        }

        equals(other: ISize): boolean {
            return this.width == other.width && this.height == other.height;
        }

        add(other: ISize): void {
            this.width += other.width;
            this.height += other.height;
        }

        added(other: ISize): Size {
            var width = this.width + other.width;
            var height = this.height + other.height;
            return new Size(width, height);
        }

        subtract(other: ISize): void {
            this.width -= other.width;
            this.height -= other.height;
        }

        subtracted(other: ISize): Size {
            var width = this.width - other.width;
            var height = this.height - other.height;
            return new Size(width, height);
        }

        multiply(factor: number): void {
            this.width *= factor;
            this.height *= factor;
        }

        multiplied(factor: number): Size {
            var width = this.width * factor;
            var height = this.height * factor;
            return new Size(width, height);
        }

        divide(factor: number): void {
            this.width = Math.floor(this.width / factor);
            this.height = Math.floor(this.height / factor);
        }

        divided(factor: number): Size {
            var width = Math.floor(this.width / factor);
            var height = Math.floor(this.height / factor);
            return new Size(width, height);
        }
    }

}
