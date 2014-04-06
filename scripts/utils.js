/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    /**
    * Create an array of values defined an enum object.
    */
    function enumValues(enumObj) {
        var values = [];
        for (var k in enumObj) {
            var v = enumObj[k];
            if (typeof v === "number") {
                values.push(v);
            }
        }
        return values;
    }
    porcelain.enumValues = enumValues;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=utils.js.map
