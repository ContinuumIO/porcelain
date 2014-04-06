declare module porcelain {
    /**
    * An interface defining a size in Cartesian space.
    */
    interface ISize {
        width: number;
        height: number;
    }
    /**
    * A class representing a size in Cartesian space.
    *
    * @class
    */
    class Size {
        /**
        * The width, in pixels.
        */
        public width: number;
        /**
        * The height, in pixels.
        */
        public height: number;
        /**
        * Construct a new Size.
        */
        constructor();
        constructor(size: ISize);
        constructor(width: number, height: number);
        /**
        * Returns true if the width OR height is zero.
        */
        public isEmpty(): boolean;
        /**
        * Returns true if the height width AND height are zero.
        */
        public isNull(): boolean;
        /**
        * Returns true if the width AND height are non-negative.
        */
        public isValid(): boolean;
        /**
        * Returns a new size limited in each dimension by another size.
        */
        public boundedTo(other: Size): Size;
        /**
        * Returns a new size expaned in each dimension to another size.
        */
        public expandedTo(other: Size): Size;
        /**
        * Swap the width and height values.
        */
        public transpose(): void;
        /**
        * Returns a new size with width and height swapped.
        */
        public transposed(): Size;
        /**
        * Returns true if this size is equivalent to another.
        */
        public equals(other: Size): boolean;
        /**
        * Returns a new size which is the sum of two sizes.
        */
        public add(other: Size): Size;
        /**
        * Returns a new size which is the difference of two sizes.
        */
        public subtract(other: Size): Size;
        /**
        * Returns a new size scaled by the given factor.
        */
        public multiply(factor: number): Size;
        /**
        * Returns a new size scaled by the given divisor.
        */
        public divide(divisor: number): Size;
    }
}
