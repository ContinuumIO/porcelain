/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var Signal = (function () {
        function Signal() {
        }
        Signal.prototype.connect = function (handler) {
        };

        Signal.prototype.disconnect = function (handler) {
        };
        return Signal;
    })();
    porcelain.Signal = Signal;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=signal.js.map
