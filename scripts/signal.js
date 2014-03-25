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
    * The Signal class.
    *
    * A Signal provides a type-safe on-to-many notification mechanism.
    * It allows objects to broadcast information without regard as to
    * whether or not anything is listening.
    *
    * @class
    */
    var Signal = (function () {
        function Signal() {
            this._slots = null;
        }
        /**
        * Connect a slot to the signal.
        *
        * The slot will be invoked when the signal is emitted. The
        * arguments emitted by the signal will be passed to the slot.
        * If the slot is already connected, this is a no-op.
        *
        * @param slot - the function to connect to the signal.
        */
        Signal.prototype.connect = function (slot) {
            if (!this._slots) {
                this._slots = [slot];
            } else if (this._slots.indexOf(slot) === -1) {
                this._slots.push(slot);
            }
        };

        /**
        * Disconnect a slot from the signal.
        *
        * If the slot is not connected to the signal, this is a no-op.
        * If no slot is provided, all slots will be disconnected.
        *
        * @param slot - the function to disconnect from the signal.
        */
        Signal.prototype.disconnect = function (slot) {
            if (typeof slot === "undefined") { slot = null; }
            if (!this._slots) {
                return;
            }
            if (!slot) {
                this._slots = null;
                return;
            }
            var index = this._slots.indexOf(slot);
            if (index !== -1) {
                this._slots.splice(index, 1);
                if (this._slots.length === 0) {
                    this._slots = null;
                }
            }
        };

        Signal.prototype.emit = function () {
            if (!this._slots) {
                return;
            }
            var context = {};
            var slots = this._slots.slice();
            for (var i = 0, n = slots.length; i < n; ++i) {
                slots[i].apply(context, arguments);
            }
        };
        return Signal;
    })();
    porcelain.Signal = Signal;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=signal.js.map
