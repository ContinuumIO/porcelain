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
    * An enum of the eight border positions.
    */
    (function (Border) {
        Border[Border["Left"] = 0] = "Left";
        Border[Border["Top"] = 1] = "Top";
        Border[Border["Right"] = 2] = "Right";
        Border[Border["Bottom"] = 3] = "Bottom";
        Border[Border["TopLeft"] = 4] = "TopLeft";
        Border[Border["TopRight"] = 5] = "TopRight";
        Border[Border["BottomLeft"] = 6] = "BottomLeft";
        Border[Border["BottomRight"] = 7] = "BottomRight";
    })(porcelain.Border || (porcelain.Border = {}));
    var Border = porcelain.Border;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=enums.js.map
