declare module porcelain {
    /**
    * The interface for a size defined by width and height.
    */
    interface ISize {
        width: number;
        height: number;
    }
    /**
    * An implementation of the ISize interface.
    *
    * @class
    */
    class Size implements ISize {
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
        * Returns true if this size is equivalent to another.
        */
        public equals(other: ISize): boolean;
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
        public boundedTo(other: ISize): Size;
        /**
        * Returns a new size expaned in each dimension to another size.
        */
        public expandedTo(other: ISize): Size;
        /**
        * Return a new size with the width and height values swapped.
        */
        public transpose(): Size;
        /**
        * Returns a new size which is the sum of two sizes.
        */
        public add(other: ISize): Size;
        /**
        * Returns a new size which is the difference of two sizes.
        */
        public subtract(other: ISize): Size;
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
