/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The Slot interface.
     *
     * This interface can be extended to create custom strongly typed slots.
     */
    export
    interface ISlot {
        (): void;
    }


    /**
     * The Signal interface.
     *
     * This interface can be extended to create custom strongly typed signals.
     */
    export
    interface ISignal {
        connect(slot: ISlot, context?: any): void;
        disconnect(slot: ISlot, context?: any): void;
        emit(...args: any[]): void;
    }


    /**
     * The Signal class.
     *
     * A Signal provides a type-safe one-to-many notification mechanism.
     * It allows objects to broadcast information without regard as to
     * whether or not anything is listening.
     *
     * @class
     */
    export
    class Signal implements ISignal {

        /**
         * Construct a new Signal.
         */
        constructor() { }

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
        connect(slot: ISlot, context: any = null): void {
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
        }

        /**
         * Disconnect a slot from the signal.
         *
         * If the slot is not connected to the signal, this is a no-op.
         * If no slot is provided, all slots will be disconnected.
         *
         * @param slot - the function to disconnect from the signal.
         * @param [context] The context object provided with the slot.
         */
        disconnect(slot: ISlot = null, context: any = null): void {
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
        }

        /**
         * Emit the signal with the given parameters.
         *
         * This will invoke all slots with the provided parameters in
         * the order in which they were connected. It is safe to
         * connect and disconnect slots while the signal is emitting.
         */
        emit(...args: any[]): void;
        emit(): void {
            var connections = this._connections;
            if (!connections || !connections.length) {
                return;
            }
            connections = connections.slice();
            for (var i = 0, n = connections.length; i < n; ++i) {
                var conn = connections[i];
                conn.slot.apply(conn.context, arguments);
            }
        }

        private _connections: IConnection[] = null;
    }


    /**
     * The internal interface defining a slot connection.
     */
    interface IConnection {
        slot: ISlot;
        context: any;
    }

}
