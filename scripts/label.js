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
    * The class added to a Label instance.
    */
    var LABEL_CLASS = "p-Label";

    /**
    * A component for displaying readonly text.
    *
    * @class
    */
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Label.prototype, "text", {
            /**
            * The text displayed as the inner html of the label.
            */
            get: function () {
                return this.element.innerHTML;
            },
            set: function (value) {
                this.element.innerHTML = value;
            },
            enumerable: true,
            configurable: true
        });

        return Label;
    })(porcelain.Component);
    porcelain.Label = Label;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=label.js.map
