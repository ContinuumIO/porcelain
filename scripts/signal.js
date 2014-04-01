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
    * A Signal provides a type-safe one-to-many notification mechanism.
    * It allows objects to broadcast information without regard as to
    * whether or not anything is listening.
    *
    * @class
    */
    var Signal = (function () {
        function Signal() {
            this._connections = null;
        }
        /**
        * Connect a slot to the signal.
        *
        * The slot will be invoked when the signal is emitted. The
        * arguments emitted by the signal will be passed to the slot.
        * If the slot is already connected, this is a no-op.
        *
        * @param slot The function to connect to the signal.
        * @param [context] The context to bind to the function call.
        */
        Signal.prototype.connect = function (slot, context) {
            if (typeof context === "undefined") { context = null; }
            var connections = this._connections;
            if (!connections) {
                connections = this._connections = [];
            }
            for (var i = 0, n = connections.length; i < n; ++i) {
                var conn = connections[i];
                if (conn.slot === slot && conn.context === context) {
                    return;
                }
            }
            connections.push({ slot: slot, context: context });
        };

        /**
        * Disconnect a slot from the signal.
        *
        * If the slot is not connected to the signal, this is a no-op.
        * If no slot is provided, all slots will be disconnected.
        *
        * @param slot - the function to disconnect from the signal.
        * @param [context] The context object provided with the slot.
        */
        Signal.prototype.disconnect = function (slot, context) {
            if (typeof slot === "undefined") { slot = null; }
            if (typeof context === "undefined") { context = null; }
            var connections = this._connections;
            if (!connections) {
                return;
            }
            if (!slot) {
                this._connections = null;
                return;
            }
            for (var i = 0, n = connections.length; i < n; ++i) {
                var conn = connections[i];
                if (conn.slot === slot && conn.context === context) {
                    this._connections.splice(i, 1);
                    return;
                }
            }
        };

        Signal.prototype.emit = function () {
            var connections = this._connections;
            if (!connections || !connections.length) {
                return;
            }
            connections = connections.slice();
            for (var i = 0, n = connections.length; i < n; ++i) {
                var conn = connections[i];
                conn.slot.apply(conn.context, arguments);
            }
        };

        /**
        * IComponentExtra interface.
        *
        * This should not be called directly by user code.
        */
        Signal.prototype.destroy = function () {
            this._connections = null;
        };
        return Signal;
    })();
    porcelain.Signal = Signal;

    Signal.prototype.porcelain_ComponentExtra = true;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=signal.js.map
