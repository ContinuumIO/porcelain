declare module porcelain {
    class EventBinder {
        /**
        * Construct a new event binder.
        *
        * @param target The target of the event.
        * @param type The event type to bind for the target.
        * @param listener The event listener to bind to the target.
        * @param context The context to bind to the listener.
        */
        constructor(target: EventTarget, type: string, listener: EventListener, context: any);
        /**
        * Destroy the event binder.
        */
        public destroy(): void;
        /**
        * Get the target for the binder.
        *
        * @readonly
        */
        public target : EventTarget;
        /**
        * Get the event type for the binder.
        *
        * @readonly
        */
        public type : string;
        /**
        * Get the listener for the binder.
        *
        * @readonly
        */
        public listener : EventListener;
        /**
        * Get the context for the binder.
        *
        * @readonly
        */
        public context : any;
        /**
        * Returns true if this binder is equivalent to another.
        */
        public equals(other: EventBinder): boolean;
        /**
        * Attach the binder to the event target.
        */
        public attach(): void;
        /**
        * Detach the binder from the event target.
        */
        public detach(): void;
        /**
        * The event listener dispatch method.
        *
        * This should not be called directly by user code.
        */
        public handleEvent(event: Event): void;
        private _target;
        private _type;
        private _listener;
        private _context;
    }
}
