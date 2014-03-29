declare module porcelain {
    /**
    * A base class for creating interactive porcelain widgets.
    *
    * The Widget class adds support for events and signals.
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
        * Bind a listener to the specified event.
        *
        * The listener will be removed when the widget is destroyed.
        *
        * @param type The string type of the event to bind.
        * @param listener The event listener to bind to the target.
        * @param [target] The event target. The default is the widget div.
        * @param [context] The listener context. The default is the widget.
        */
        public bind(type: string, listener: EventListener, target?: EventTarget, context?: any): void;
        /**
        * Unbind a listener from the specified event.
        *
        * @param type The string type of the event.
        * @param listener The event listener which was bound.
        * @param [target] The event target. The default is the widget div.
        * @param [context] The listener context. The default is the widget.
        */
        public unbind(type: string, listener: EventListener, target?: EventTarget, context?: any): void;
        /**
        * Create a new Signal with a lifetime bound to the widget.
        */
        public createSignal(): Signal;
        /**
        * A helper method for destroying the event binders.
        *
        * @private
        */
        private _destroyBinders();
        /**
        * A helper method for destroying the widget signals.
        *
        * @private
        */
        private _destroySignals();
        private _binders;
        private _signals;
    }
}
