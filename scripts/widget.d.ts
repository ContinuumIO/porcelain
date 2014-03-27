declare module porcelain {
    /**
    * A base class for creating interactive porcelain widgets.
    *
    * The Widget class adds support for signals and events.
    *
    * @class
    */
    class Widget extends Item {
        /**
        * Construct a new Widget.
        */
        constructor();
        /**
        * Destroy the widget and disconnect all listeners.
        */
        public destroy(): void;
        /**
        * The event tracker for element events.
        *
        * @readonly
        */
        public elementEvents : EventTracker;
        /**
        * The event tracker for document events.
        *
        * @readonly
        */
        public documentEvents : EventTracker;
        /**
        * Create a new Signal with a lifetime bound to the widget.
        */
        public createSignal(): Signal;
        /**
        * A helper method for destroying the event trackers.
        *
        * @private
        */
        private _destroyEvents();
        /**
        * A helper method for destroying the widget signals.
        *
        * @private
        */
        private _destroySignals();
        private _signals;
        private _elementEvents;
        private _documentEvents;
    }
}
