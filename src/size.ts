/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Size implements ISize {

        width: number;
        height: number;

        constructor(size: ISize = { width: -1, height: -1 }) {
            this.width = size.width;
            this.height = size.height;
        }

        get size(): ISize {
            return { width: this.width, height: this.height };
        }

        set size(size: ISize) {
            this.width = size.width;
            this.height = size.height;
        }

        get size$(): Size {
            return new Size(this.size);
        }

        set size$(size: Size) {
            this.size = size;
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

        boundedTo(other: ISize): ISize {
            var w = Math.min(this.width, other.width);
            var h = Math.min(this.height, other.height);
            return { width: w, height: h };
        }

        boundedTo$(other: ISize): Size {
            return new Size(this.boundedTo(other));
        }

        expandedTo(other: ISize): ISize {
            var w = Math.max(this.width, other.width);
            var h = Math.max(this.height, other.height);
            return { width: w, height: h };
        }

        expandedTo$(other: ISize): Size {
            return new Size(this.expandedTo(other));
        }

        transpose(): void {
            var w = this.width;
            this.width = this.height;
            this.height = w;
        }

        transposed(): ISize {
            return { width: this.height, height: this.width };
        }

        transposed$(): Size {
            return new Size(this.transposed());
        }

        equals(other: ISize): boolean {
            return this.width == other.width && this.height == other.height;
        }

        add(other: ISize): void {
            this.width += other.width;
            this.height += other.height;
        }

        added(other: ISize): ISize {
            var w = this.width + other.width;
            var h = this.height + other.height;
            return { width: w, height: h };
        }
        
        added$(other: ISize): Size { 
            return new Size(this.added(other));
        }

        subtract(other: ISize): void {
            this.width -= other.width;
            this.height -= other.height;
        }

        subtracted(other: ISize): ISize {
            var w = this.width - other.width;
            var h = this.height - other.height;
            return { width: w, height: h };
        }

        subtracted$(other: ISize): Size {
            return new Size(this.subtracted(other));
        }

        multiply(factor: number): void {
            this.width *= factor;
            this.height *= factor;
        }

        multiplied(factor: number): ISize {
            var w = this.width * factor;
            var h = this.height * factor;
            return { width: w, height: h };
        }

        multiplied$(factor: number): Size {
            return new Size(this.multiplied(factor));
        }

        divide(factor: number): void {
            this.width = Math.floor(this.width / factor);
            this.height = Math.floor(this.height / factor);
        }

        divided(factor: number): ISize {
            var w = Math.floor(this.width / factor);
            var h = Math.floor(this.height / factor);
            return { width: w, height: h };
        }

        divided$(factor: number): Size {
            return new Size(this.divided(factor));
        }
    }

}
