/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * An interface defining a size in Cartesian space.
     */
    export
    interface ISize {
        width: number;
        height: number;
    }


    /**
     * A class representing a size in Cartesian space.
     *
     * @class
     */
    export
    class Size {

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
        constructor(arg1?: any, arg2?: any) {
            switch (arguments.length) {
                case 0:
                    this.width = -1;
                    this.height = -1;
                    break;
                case 1:
                    this.width = (<ISize>arg1).width;
                    this.height = (<ISize>arg1).height;
                    break;
                case 2:
                    this.width = <number>arg1;
                    this.height = <number>arg2;
                    break;
                default:
                    throw new Error("invalid constructor call");
            }
        }

        /**
         * Returns true if the width OR height is zero.
         */
        isEmpty(): boolean {
            return this.width == 0 || this.height == 0;
        }

        /**
         * Returns true if the height width AND height are zero.
         */
        isNull(): boolean {
            return this.width == 0 && this.height == 0;
        }

        /**
         * Returns true if the width AND height are non-negative.
         */
        isValid(): boolean {
            return this.width >= 0 && this.height >= 0;
        }

        /**
         * Returns a new size limited in each dimension by another size.
         */
        boundedTo(other: Size): Size {
            var w = Math.min(this.width, other.width);
            var h = Math.min(this.height, other.height);
            return new Size(w, h);
        }

        /**
         * Returns a new size expaned in each dimension to another size.
         */
        expandedTo(other: Size): Size {
            var w = Math.max(this.width, other.width);
            var h = Math.max(this.height, other.height);
            return new Size(w, h);
        }

        /**
         * Swap the width and height values.
         */
        transpose(): void {
            var temp = this.width;
            this.width = this.height;
            this.height = temp;
        }

        /**
         * Returns a new size with width and height swapped.
         */
        transposed(): Size {
            return new Size(this.height, this.width);
        }

        /**
         * Returns true if this size is equivalent to another.
         */
        equals(other: Size): boolean {
            return this.width == other.width && this.height == other.height;
        }

        /**
         * Returns a new size which is the sum of two sizes.
         */
        add(other: Size): Size {
            var w = this.width + other.width;
            var h = this.height + other.height;
            return new Size(w, h);
        }

        /**
         * Returns a new size which is the difference of two sizes.
         */
        subtract(other: Size): Size {
            var w = this.width - other.width;
            var h = this.height - other.height;
            return new Size(w, h);
        }

        /**
         * Returns a new size scaled by the given factor.
         */
        multiply(factor: number): Size {
            var w = Math.floor(this.width * factor);
            var h = Math.floor(this.height * factor);
            return new Size(w, h);
        }

        /**
         * Returns a new size scaled by the given divisor.
         */
        divide(divisor: number): Size {
            var w = Math.floor(this.width / divisor);
            var h = Math.floor(this.height / divisor);
            return new Size(w, h);
        }
    }

}
