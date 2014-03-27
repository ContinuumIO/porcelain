var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
    * The class added to a SizeGrip instance.
    */
    var SIZE_GRIP_CLASS = "p-SizeGrip";

    /**
    * The prefix for the border class added to a size grip.
    */
    var BORDER_PREFIX = "p-Border-";

    /**
    * A widget which enables drag-sizing of an element's geometry.
    *
    * @class
    */
    var SizeGrip = (function (_super) {
        __extends(SizeGrip, _super);
        /**
        * Construct a new SizeGrip.
        */
        function SizeGrip(border) {
            _super.call(this);
            this._offsetX = 0;
            this._offsetY = 0;
            this._border = border;
            this.addClass(SIZE_GRIP_CLASS);
            this.addClass(BORDER_PREFIX + porcelain.Border[border]);
            //this.elementEvents.enable("mousedown");
        }
        /**
        * Destroy the size grip.
        */
        SizeGrip.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._target = null;
        };
        return SizeGrip;
    })(porcelain.Widget);
    porcelain.SizeGrip = SizeGrip;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size_grip.js.map
