/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    (function (BoxLocation) {
        BoxLocation[BoxLocation["Left"] = 0] = "Left";
        BoxLocation[BoxLocation["Top"] = 1] = "Top";
        BoxLocation[BoxLocation["Right"] = 2] = "Right";
        BoxLocation[BoxLocation["Bottom"] = 3] = "Bottom";
        BoxLocation[BoxLocation["TopLeft"] = 4] = "TopLeft";
        BoxLocation[BoxLocation["TopRight"] = 5] = "TopRight";
        BoxLocation[BoxLocation["BottomLeft"] = 6] = "BottomLeft";
        BoxLocation[BoxLocation["BottomRight"] = 7] = "BottomRight";
    })(porcelain.BoxLocation || (porcelain.BoxLocation = {}));
    var BoxLocation = porcelain.BoxLocation;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=enums.js.map
