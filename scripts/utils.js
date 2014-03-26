/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    (function (arrayutil) {
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
        function indexOf(array, searchElement, fromIndex) {
            if (typeof fromIndex === "undefined") { fromIndex = 0; }
            for (var i = fromIndex, n = array.length; i < n; ++i) {
                if (array[i] === searchElement) {
                    return i;
                }
            }
            return -1;
        }
        arrayutil.indexOf = indexOf;

        /**
        * Returns whether an array contains a given element.
        *
        * @param array The array to be searched.
        * @param searchElement The element to locate in the array.
        */
        function contains(array, searchElement) {
            return indexOf(array, searchElement) !== -1;
        }
        arrayutil.contains = contains;

        /**
        * Remove the first occurrence of an element from an array.
        *
        * @param array The array to be modified.
        * @param element The element to remove from the array.
        */
        function remove(array, element) {
            if (!array.length) {
                return false;
            }
            var index = indexOf(array, element);
            if (index !== -1) {
                array.splice(index, 1);
                return true;
            }
            return false;
        }
        arrayutil.remove = remove;

        /**
        * Extend an array with elements from another array.
        *
        * @param array The array to be extended.
        * @param elements The array of elements to add the first array.
        */
        function extend(array, elements) {
            for (var i = 0, n = elements.length; i < n; ++i) {
                array.push(elements[i]);
            }
        }
        arrayutil.extend = extend;

        /**
        * Count the number of occurrences of an item in the array.
        *
        * @param array The array containing the elements.
        * @param element The element which should be counted.
        */
        function count(array, element) {
            var count = 0;
            for (var i = 0, n = array.length; i < n; ++i) {
                if (array[i] === element) {
                    ++count;
                }
            }
            return count;
        }
        arrayutil.count = count;
    })(porcelain.arrayutil || (porcelain.arrayutil = {}));
    var arrayutil = porcelain.arrayutil;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=utils.js.map
