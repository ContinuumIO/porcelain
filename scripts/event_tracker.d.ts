declare module porcelain {
    /**
    * A class which tracks and dispatches events to an Item.
    *
    * The attached events will be removed when the tracker is destroyed.
    *
    * @class
    */
    class EventTracker {
        /**
        * Create a new EventHelper instance.
        *
        * @param item The item to which events are dispatched.
        * @param target The event target to which listeners are added.
        * @param prefix The prefix for constructing handler names.
        */
        constructor(item: Item, target: EventTarget, prefix: string);
        /**
        * Destroy the event helper.
        *
        * This will remove all event listeners and release the internal
        * references to the item and event target.
        */
        public destroy(): void;
        /**
        * The item to which events are dispatched.
        *
        *  @readonly
        */
        public item : Item;
        /**
        * The event target to which listeners are added.
        *
        *  @readonly
        */
        public target : EventTarget;
        /**
        * The prefix used for dispatching events.
        *
        * @readonly
        */
        public prefix : string;
        /**
        * The array of events which are currently enabled.
        *
        *  @readonly
        */
        public events : string[];
        /**
        * Enable event listening for the specified events.
        *
        * When the event is triggered the specially named handler method
        * will be automatically invoked.
        */
        public enable(...events: string[]): void;
        /**
        * Disable event listenening for the specified events.
        *
        * If no events are specified, all events will be disabled.
        */
        public disable(...events: string[]): void;
        /**
        * The primary event listener dispatcher.
        *
        * This should not be invoked by user code.
        */
        public handleEvent(event: Event): void;
        private _item;
        private _target;
        private _prefix;
        private _events;
    }
}
