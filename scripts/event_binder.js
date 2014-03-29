/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    /*
    * A class which manages an event listener binding.
    *
    * @class
    */
    var EventBinder = (function () {
        /**
        * Construct a new event binder.
        *
        * @param target The target of the event.
        * @param type The event type to bind for the target.
        * @param listener The event listener to bind to the target.
        * @param context The context to bind to the listener.
        */
        function EventBinder(target, type, listener, context) {
            this._target = target;
            this._type = type;
            this._listener = listener;
            this._context = context;
        }
        /**
        * Destroy the event binder.
        */
        EventBinder.prototype.destroy = function () {
            this.detach();
            this._target = null;
            this._listener = null;
            this._context = null;
        };

        Object.defineProperty(EventBinder.prototype, "target", {
            /**
            * Get the target for the binder.
            *
            * @readonly
            */
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventBinder.prototype, "type", {
            /**
            * Get the event type for the binder.
            *
            * @readonly
            */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventBinder.prototype, "listener", {
            /**
            * Get the listener for the binder.
            *
            * @readonly
            */
            get: function () {
                return this._listener;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventBinder.prototype, "context", {
            /**
            * Get the context for the binder.
            *
            * @readonly
            */
            get: function () {
                return this._context;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns true if this binder is equivalent to another.
        *
        * @param other The binder to test for equality.
        */
        EventBinder.prototype.equals = function (other) {
            return this._target === other._target && this._type === other._type && this._listener === other._listener && this._context === other._context;
        };

        /**
        * Attach the binder to the event target.
        */
        EventBinder.prototype.attach = function () {
            var listener = this;
            this._target.addEventListener(this._type, listener, false);
        };

        /**
        * Detach the binder from the event target.
        */
        EventBinder.prototype.detach = function () {
            var listener = this;
            this._target.removeEventListener(this._type, listener, false);
        };

        /**
        * The event listener dispatch method.
        *
        * This should not be called directly by user code.
        */
        EventBinder.prototype.handleEvent = function (event) {
            this._listener.call(this._context, event);
        };
        return EventBinder;
    })();
    porcelain.EventBinder = EventBinder;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=event_binder.js.map
