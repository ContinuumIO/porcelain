declare module porcelain {
    /**
    * The Slot interface.
    *
    * This interface can be extended to create custom strongly typed slots.
    */
    interface ISlot {
        (): void;
    }
    /**
    * The Signal interface.
    *
    * This interface can be extended to create custom strongly typed signals.
    */
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
    class Signal implements ISignal {
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
        public connect(slot: ISlot, context?: any): void;
        /**
        * Disconnect a slot from the signal.
        *
        * If the slot is not connected to the signal, this is a no-op.
        * If no slot is provided, all slots will be disconnected.
        *
        * @param slot - the function to disconnect from the signal.
        * @param [context] The context provided with the slot.
        */
        public disconnect(slot?: ISlot, context?: any): void;
        /**
        * Emit the signal with the given parameters.
        *
        * This will invoke all slots with the provided parameters in
        * the order in which they were connected. It is safe to
        * connect and disconnect slots while the signal is emitting.
        */
        public emit(...args: any[]): void;
        private _connections;
    }
}
