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
        * The width and height of the size.
        */
        public size : ISize;
        /**
        * Whether the width OR height is zero.
        */
        public isEmpty(): boolean;
        /**
        * Whether the width AND height are zero.
        */
        public isNull(): boolean;
        /**
        * Whether the width AND height are non-negative.
        */
        public isValid(): boolean;
        /**
        * Test the size for equality with another.
        */
        public equals(other: ISize): boolean;
        /**
        * A new size bounded in each dimension by another size.
        */
        public boundedTo(other: ISize): Size;
        /**
        * A new size expanded in each dimension to another size.
        */
        public expandedTo(other: ISize): Size;
        /**
        * Swap the width and height of this size.
        */
        public transpose(): void;
        /**
        * A new size with the width and height swapped.
        */
        public transposed(): Size;
        /**
        * Increment this size by the given size.
        */
        public add(other: ISize): void;
        /**
        * A new size increased in each dimension by another.
        */
        public added(other: ISize): Size;
        /**
        * Decrement this size by the given size.
        */
        public subtract(other: ISize): void;
        /**
        * A new size decreased in each dimension by another.
        */
        public subtracted(other: ISize): Size;
        /**
        * Scale this size by the given factor.
        */
        public multiply(factor: number): void;
        /**
        * A new size scaled in each dimension by a factor.
        */
        public multiplied(factor: number): Size;
        /**
        * Scale this size by the given divisor.
        */
        public divide(divisor: number): void;
        /**
        * A new size scaled in each dimension by a divisor.
        */
        public divided(divisor: number): Size;
    }
}
