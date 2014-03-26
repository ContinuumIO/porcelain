declare module porcelain {
    module arrayutil {
        /**
        * Returns the first index at which a given element can be
        * found in the array, or -1 if it is not present.
        *
        * This is 3x - 5x faster than the Array.indexOf method.
        *
        * @param array The array to be searched.
        * @param searchElement The element to locate in the array.
        * @param fromIndex The optional index at which to start the search.
        */
        function indexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
        /**
        * Returns whether an array contains a given element.
        *
        * @param array The array to be searched.
        * @param searchElement The element to locate in the array.
        */
        function contains<T>(array: T[], searchElement: T): boolean;
        /**
        * Remove the first occurrence of an element from an array.
        *
        * @param array The array to be modified.
        * @param element The element to remove from the array.
        */
        function remove<T>(array: T[], element: T): boolean;
        /**
        * Extend an array with elements from another array.
        *
        * @param array The array to be extended.
        * @param elements The array of elements to add the first array.
        */
        function extend<T>(array: T[], elements: T[]): void;
        /**
        * Count the number of occurrences of an item in the array.
        *
        * @param array The array containing the elements.
        * @param element The element which should be counted.
        */
        function count<T>(array: T[], element: T): number;
    }
}
