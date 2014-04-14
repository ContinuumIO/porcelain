/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * Create an array of values defined an enum object.
     */
    export
    function enumValues<T extends number>(enumObj: any): T[] {
        var values: T[] = [];
        for (var k in enumObj) {
            var v = enumObj[k];
            if (typeof v === "number") {
                values.push(v);
            }
        }
        return values;
    }

}
