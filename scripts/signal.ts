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
     * This interface should be extended to create custom strongly typed slots.
     */
    export interface ISlot {
        (): void;
    }


    /**
     * The Signal interface.
     * 
     * This interface should be extended to create custom strongly typed signals. 
     */
    export interface ISignal {
        connect(slot: ISlot): void;
        disconnect(slot: ISlot): void;
        emit(...args: any[]): void;
    }


    /** 
     * The Signal class.
     *
     * A Signal provides a type-safe on-to-many notification mechanism. 
     * It allows objects to broadcast information without regard as to 
     * whether or not anything is listening.
     *
     * @class
     */
    export class Signal implements ISignal {

        /**
         * Connect a slot to the signal.
         *
         * The slot will be invoked when the signal is emitted. The 
         * arguments emitted by the signal will be passed to the slot.
         * If the slot is already connected, this is a no-op.
         *
         * @param slot - the function to connect to the signal.
         */
        connect(slot: ISlot): void {
            if (!this._slots) {
                this._slots = [slot];
            } else if (this._slots.indexOf(slot) === -1) {
                this._slots.push(slot);
            }
        }

        /**
         * Disconnect a slot from the signal.
         *
         * If the slot is not connected to the signal, this is a no-op.
         * If no slot is provided, all slots will be disconnected.
         * 
         * @param slot - the function to disconnect from the signal.
         */
        disconnect(slot: ISlot = null): void {
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
        }

        /**
         * Emit the signal with the given parameter.
         *
         * This will invoke all slots with the provided parameter in 
         * the order in which they were connected. It is safe to
         * connect and disconnect slots while the signal is emitting.
         * 
         * @param param - the parameter to pass to the slots
         */
        emit(...args: any[]): void;
        emit(): void {
            if (!this._slots) {
                return;
            }
            var context = {};
            var slots = this._slots.slice();
            for (var i = 0, n = slots.length; i < n; ++i) {
                slots[i].apply(context, arguments);
            }
        }

        private _slots: ISlot[] = null;
    }

}
