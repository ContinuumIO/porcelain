/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A class which tracks and dispatches events to an Item.
     *
     * The attached events will be removed when the tracker is destroyed.
     *
     * @class
     */
    export class EventTracker {

        /**
         * Create a new EventHelper instance.
         *
         * @param item The item to which events are dispatched.
         * @param target The event target to which listeners are added.
         * @param prefix The prefix for constructing handler names.
         */
        constructor(item: Item, target: EventTarget, prefix: string) {
            this._item = item;
            this._target = target;
            this._prefix = prefix;
        }

        /**
         * Destroy the event helper.
         *
         * This will remove all event listeners and release the internal
         * references to the item and event target.
         */
        destroy(): void {
            this.disable();
            this._item = null;
            this._target = null;
        }

        /**
         * The item to which events are dispatched.
         * 
         *  @readonly
         */
        get item(): Item {
            return this._item;
        }

        /**
         * The event target to which listeners are added.
         * 
         *  @readonly
         */
        get target(): EventTarget {
            return this._target;
        }

        /**
         * The prefix used for dispatching events.
         *
         * @readonly
         */
        get prefix(): string {
            return this._prefix;
        }

        /**
         * The array of events which are currently enabled.
         * 
         *  @readonly
         */
        get events(): string[] {
            return this._events.slice();
        }

        /**
         * Enable event listening for the specified events.
         *
         * When the event is triggered the specially named handler method
         * will be automatically invoked.
         */
        enable(...events: string[]): void {
            var target = this._target;
            var listener = <EventListener>(<any>this);  // http://typescript.codeplex.com/workitem/45
            for (var i = 0, n = events.length; i < n; ++i) {
                target.addEventListener(events[i], listener, false);
            }
            this._events = _.union(this._events, events);
        }
        
        /**
         * Disable event listenening for the specified events.
         *
         * If no events are specified, all events will be disabled.
         */
        disable(...events: string[]): void {
            var target = this._target;
            var listener = <EventListener>(<any>this);  // http://typescript.codeplex.com/workitem/45
            events = events.length ? events : this._events;
            for (var i = 0, n = events.length; i < n; ++i) {
                target.removeEventListener(events[i], listener, false);
            }
            this._events = _.difference(this._events, events);
        }
        
        /**
         * The primary event listener dispatcher.
         *
         * This should not be invoked by user code.
         */
        handleEvent(event: Event): void {
            var name = this._prefix + event.type;
            var handler = this._item[name];
            if (handler) {
                handler.call(this._item, event);
            } else {
                throw new Error("Item has no handler '" + name + "'.");
            }
        }

        private _item: Item;
        private _target: EventTarget;
        private _prefix: string;
        private _events: string[] = [];
    }

}
