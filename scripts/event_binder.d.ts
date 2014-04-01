declare module porcelain {
    class EventBinder implements IComponentExtra {
        /**
        * Construct a new event binder.
        *
        * @param type The event type to bind for the target.
        * @param target The target of the event.
        */
        constructor(type: string, target: EventTarget);
        /**
        * Destroy the event binder.
        */
        public destroy(): void;
        /**
        * Get the event type for the binder.
        *
        * @readonly
        */
        public type : string;
        /**
        * Get the event target for the binder.
        *
        * @readonly
        */
        public target : EventTarget;
        /**
        * Bind a listener to the event.
        *
        * If the listener is already attached, this is a no-op.
        *
        * @param listener The event listener to bind to the event.
        * @param [context] The 'this' context to pass to the listener.
        */
        public bind(listener: EventListener, context?: any): void;
        /**
        * Unbind a listener from the event.
        *
        * If the listener is not attached, this is a no-op. If
        * no listener is supplied, all listeners will be unbound.
        *
        * @param [listener] The event listener to bind to the event.
        * @param [context] The 'this' context to pass to the listener.
        */
        public unbind(listener?: EventListener, context?: any): void;
        /**
        * IComponentExtra interface. Prototype property.
        */
        public porcelain_ComponentExtra: boolean;
        private _type;
        private _target;
        private _proxies;
    }
}
