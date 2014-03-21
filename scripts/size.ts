/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The interface for a size defined by width and height.
     */
    export interface ISize {
        width: number;
        height: number;
    }


    /**
     * An implementation of the ISize interface.
     */
    export class Size implements ISize {

        /**
         * The width, in pixels.
         */
        width: number;

        /**
         * The height, in pixels.
         */
        height: number;
        
        /**
         * Construct a new Size.
         */
        constructor();
        constructor(size: ISize);
        constructor(width: number, height: number);
        constructor(first?, second?) {
            switch (arguments.length) {
                case 0:
                    this.width = -1;
                    this.height = -1;
                    break;
                case 1:
                    var size = <ISize>first;
                    this.width = size.width;
                    this.height = size.height;
                    break;
                case 2:
                    var width = <number>first;
                    var height = <number>second;
                    this.width = width;
                    this.height = height;
                    break;
                default:
                    throw "invalid constructor call";
            }
        }

        /**
         * The width and height of the size.
         */
        get size(): ISize {
            return { width: this.width, height: this.height };
        }

        set size(size: ISize) {
            this.width = size.width;
            this.height = size.height;
        }

        /**
         * Whether the width OR height is zero.
         */
        isEmpty(): boolean {
            return this.width == 0 || this.height == 0;
        }

        /**
         * Whether the width AND height are zero.
         */
        isNull(): boolean {
            return this.width == 0 && this.height == 0;
        }

        /**
         * Whether the width AND height are non-negative.
         */
        isValid(): boolean {
            return this.width >= 0 && this.height >= 0;
        }

        /**
         * Test the size for equality with another.
         */
        equals(other: ISize): boolean {
            return this.width == other.width && this.height == other.height;
        }

        /**
         * A new size bounded in each dimension by another size.
         */
        boundedTo(other: ISize): Size {
            var w = Math.min(this.width, other.width);
            var h = Math.min(this.height, other.height);
            return new Size(w, h);
        }

        /**
         * A new size expanded in each dimension to another size.
         */
        expandedTo(other: ISize): Size {
            var w = Math.max(this.width, other.width);
            var h = Math.max(this.height, other.height);
            return new Size(w, h);
        }

        /**
         * Swap the width and height of this size.
         */
        transpose(): void {
            var temp = this.width;
            this.width = this.height;
            this.height = temp;
        }

        /**
         * A new size with the width and height swapped.
         */
        transposed(): Size {
            return new Size(this.height, this.width);
        }

        /**
         * Increment this size by the given size.
         */
        add(other: ISize): void {
            this.width += other.width;
            this.height += other.height;
        }

        /**
         * A new size increased in each dimension by another.
         */
        added(other: ISize): Size {
            var w = this.width + other.width;
            var h = this.height + other.height;
            return new Size(w, h);
        }

        /**
         * Decrement this size by the given size.
         */
        subtract(other: ISize): void {
            this.width -= other.width;
            this.height -= other.height;
        }

        /**
         * A new size decreased in each dimension by another.
         */
        subtracted(other: ISize): Size {
            var w = this.width - other.width;
            var h = this.height - other.height;
            return new Size(w, h);
        }

        /**
         * Scale this size by the given factor.
         */
        multiply(factor: number): void {
            this.width *= factor;
            this.height *= factor;
        }

        /**
         * A new size scaled in each dimension by a factor.
         */
        multiplied(factor: number): Size {
            var w = this.width * factor;
            var h = this.height * factor;
            return new Size(w, h);
        }

        /**
         * Scale this size by the given divisor.
         */
        divide(divisor: number): void {
            this.width /= divisor;
            this.height /= divisor;
        }

        /**
         * A new size scaled in each dimension by a divisor.
         */
        divided(divisor: number): Size {
            var w = Math.floor(this.width / divisor);
            var h = Math.floor(this.height / divisor);
            return new Size(w, h);
        }
    }

}
