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
     */
    export interface ISlot<T> {
        (param: T): void;
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
    export class Signal<T> {

        /**
         * Connect a slot to the signal.
         *
         * The slot will be invoked when the signal is emitted. The 
         * parameter emitted by the signal will be passed to the slot.
         * If the slot is already connect, this is a no-op.
         *
         * @param slot - the function to connect to the signal
         */
        connect(slot: ISlot<T>): void {
            if (!this._slots) {
                this._slots = [];
            }
            var i = this._slots.indexOf(slot);
            if (i === -1) {
                this._slots.push(slot);
            }
        }

        /**
         * Disconnect a slot from the signal.
         *
         * If the slot is not connected to the signal, this is a no-op.
         * If no slot is provided, all slots will be disconnected.
         * 
         * @param slot - the function to disconnect from the signal
         */
        disconnect(slot?: ISlot<T>): void {
            if (!this._slots) {
                return;
            }
            if (!slot) {
                this._slots = null;
                return;
            }
            var i = this._slots.indexOf(slot);
            if (i !== -1) {
                this._slots.splice(i, 1);
                if (!this._slots.length) {
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
        emit(param: T): void {
            if (!this._slots) {
                return;
            }
            $.each(this._slots.slice(), function (index, slot) {
                slot(param);
            });
        }

        private _slots: ISlot<T>[] = null;
    }

}
