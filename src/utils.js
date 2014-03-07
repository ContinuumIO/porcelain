﻿/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    function removeItem(array, item) {
        var i = array.indexOf(item);
        if (i !== -1) {
            array.splice(i, 1);
            return true;
        }
        return false;
    }
    porcelain.removeItem = removeItem;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=utils.js.map
