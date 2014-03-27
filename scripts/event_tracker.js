/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    /**
    * A class which tracks and dispatches events to an Item.
    *
    * The attached events will be removed when the tracker is destroyed.
    *
    * @class
    */
    var EventTracker = (function () {
        /**
        * Create a new EventHelper instance.
        *
        * @param item The item to which events are dispatched.
        * @param target The event target to which listeners are added.
        * @param prefix The prefix for constructing handler names.
        */
        function EventTracker(item, target, prefix) {
            this._events = [];
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
        EventTracker.prototype.destroy = function () {
            this.disable();
            this._item = null;
            this._target = null;
            this._events = null;
        };

        Object.defineProperty(EventTracker.prototype, "item", {
            /**
            * The item to which events are dispatched.
            *
            *  @readonly
            */
            get: function () {
                return this._item;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventTracker.prototype, "target", {
            /**
            * The event target to which listeners are added.
            *
            *  @readonly
            */
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventTracker.prototype, "prefix", {
            /**
            * The prefix used for dispatching events.
            *
            * @readonly
            */
            get: function () {
                return this._prefix;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventTracker.prototype, "events", {
            /**
            * The array of events which are currently enabled.
            *
            *  @readonly
            */
            get: function () {
                return this._events.slice();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Enable event listening for the specified events.
        *
        * @param [...] The string names of the events to enable.
        */
        EventTracker.prototype.enable = function () {
            var events = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                events[_i] = arguments[_i + 0];
            }
            var target = this._target;
            var listener = this;
            for (var i = 0, n = events.length; i < n; ++i) {
                target.addEventListener(events[i], listener, false);
            }
            this._events = _.union(this._events, events);
        };

        /**
        * Disable event listenening for the specified events.
        *
        * If no events are specified, all enabled events are disabled.
        *
        * @param [...] The string names of the events to disable.
        */
        EventTracker.prototype.disable = function () {
            var events = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                events[_i] = arguments[_i + 0];
            }
            var target = this._target;
            var listener = this;
            events = events.length ? events : this._events;
            for (var i = 0, n = events.length; i < n; ++i) {
                target.removeEventListener(events[i], listener, false);
            }
            this._events = _.difference(this._events, events);
        };

        /**
        * The primary event listener dispatcher.
        *
        * This should not be invoked by user code.
        */
        EventTracker.prototype.handleEvent = function (event) {
            var name = this._prefix + event.type;
            var item = this._item;
            var handler = item[name];
            if (handler) {
                handler.call(item, event);
            } else {
                throw new Error("Item has no handler '" + name + "'.");
            }
        };
        return EventTracker;
    })();
    porcelain.EventTracker = EventTracker;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=event_tracker.js.map
