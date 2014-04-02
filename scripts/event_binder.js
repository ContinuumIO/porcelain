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
    * An internal class which implements an event listener proxy.
    */
    var ProxyListener = (function () {
        /**
        * Construct a new proxy listener.
        *
        * @param listener The listener function to invoke.
        * @param context The 'this' context to pass to the listener.
        */
        function ProxyListener(listener, context) {
            this.listener = listener;
            this.context = context;
        }
        /**
        * The event listener dispatch method.
        */
        ProxyListener.prototype.handleEvent = function (event) {
            this.listener.call(this.context, event);
        };
        return ProxyListener;
    })();

    /*
    * A class which manages an event listener binding.
    *
    * @class
    */
    var EventBinder = (function () {
        /**
        * Construct a new event binder.
        *
        * @param type The event type to bind for the target.
        * @param target The target of the event.
        */
        function EventBinder(type, target) {
            this._proxies = null;
            this._type = type;
            this._target = target;
        }
        /**
        * Destroy the event binder.
        */
        EventBinder.prototype.destroy = function () {
            this.unbind();
            this._target = null;
            this._proxies = null;
        };

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

        Object.defineProperty(EventBinder.prototype, "target", {
            /**
            * Get the event target for the binder.
            *
            * @readonly
            */
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Bind a listener to the event.
        *
        * If the listener is already attached, this is a no-op.
        *
        * @param listener The event listener to bind to the event.
        * @param [context] The 'this' context to pass to the listener.
        */
        EventBinder.prototype.bind = function (listener, context) {
            if (typeof context === "undefined") { context = null; }
            var proxies = this._proxies;
            if (!proxies) {
                proxies = this._proxies = [];
            }
            for (var i = 0, n = proxies.length; i < n; ++i) {
                var p = proxies[i];
                if (p.listener === listener && p.context === context) {
                    return;
                }
            }
            var proxy = new ProxyListener(listener, context);

            // workaround http://typescript.codeplex.com/workitem/45
            this._target.addEventListener(this._type, proxy, false);
            proxies.push(proxy);
        };

        /**
        * Unbind a listener from the event.
        *
        * If the listener is not attached, this is a no-op. If
        * no listener is supplied, all listeners will be unbound.
        *
        * @param [listener] The event listener to bind to the event.
        * @param [context] The 'this' context to pass to the listener.
        */
        EventBinder.prototype.unbind = function (listener, context) {
            if (typeof listener === "undefined") { listener = null; }
            if (typeof context === "undefined") { context = null; }
            var proxies = this._proxies;
            if (!proxies) {
                return;
            }
            if (!listener) {
                var type = this._type;
                var target = this._target;
                for (var i = 0, n = proxies.length; i < n; ++i) {
                    target.removeEventListener(type, proxies[i]);
                }
                this._proxies = null;
                return;
            }
            for (var i = 0, n = proxies.length; i < n; ++i) {
                var p = proxies[i];
                if (p.listener === listener && p.context === context) {
                    // workaround http://typescript.codeplex.com/workitem/45
                    this._target.removeEventListener(this._type, p);
                    this._proxies.splice(i, 1);
                    return;
                }
            }
        };
        return EventBinder;
    })();
    porcelain.EventBinder = EventBinder;

    /**
    * IComponentExtra interface.
    *
    * This should not be manipulated directly by user code.
    */
    EventBinder.prototype.porcelain_ComponentExtra = true;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=event_binder.js.map
