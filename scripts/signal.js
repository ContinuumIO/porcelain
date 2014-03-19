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
            this._handlers = null;
        }
        Signal.prototype.connect = function (handler) {
            if (!this._handlers) {
                this._handlers = [];
            }
            var i = this._handlers.indexOf(handler);
            if (i === -1) {
                this._handlers.push(handler);
            }
        };

        Signal.prototype.disconnect = function (handler) {
            if (!this._handlers) {
                return;
            }
            var i = this._handlers.indexOf(handler);
            if (i !== -1) {
                this._handlers.splice(i, 1);
            }
        };

        Signal.prototype.emit = function (arg) {
            if (!this._handlers || !this._handlers.length) {
                return;
            }
            $.each(this._handlers.slice(), function (index, handler) {
                handler(arg);
            });
        };
        return Signal;
    })();
    porcelain.Signal = Signal;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=signal.js.map
