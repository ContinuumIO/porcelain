/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /*
     * A class which manages an event listener binding.
     *
     * @class
     */
    export
    class EventBinder {

        /**
         * Construct a new event binder.
         *
         * @param type The event type to bind for the target.
         * @param target The target of the event.
         */
        constructor(type: string, target: EventTarget) {
            this._type = type;
            this._target = target;
        }

        /**
         * Destroy the event binder.
         */
        destroy(): void {
            this.unbind();
            this._target = null;
        }

        /**
         * Returns the event type for the binder.
         */
        type(): string {
            return this._type;
        }

        /**
         * Returns the event target for the binder.
         */
        target(): EventTarget {
            return this._target;
        }

        /**
         * Bind a listener to the event.
         *
         * If the listener is already attached, this is a no-op.
         *
         * @param listener The event listener to bind to the event.
         * @param [context] The 'this' context to pass to the listener.
         */
        bind(listener: EventListener, context: any = null): void {
            var proxies = this._proxies;
            if (!proxies) {
                proxies = this._proxies = [];
            }
            for (var i = 0, n = proxies.length; i < n; ++i) {
                var p = proxies[i]
                if (p.listener === listener && p.context === context) {
                    return;
                }
            }
            var proxy = new ProxyListener(listener, context);
            // workaround http://typescript.codeplex.com/workitem/45
            this._target.addEventListener(this._type, <any>proxy, false);
            proxies.push(proxy);
        }

        /**
         * Unbind a listener from the event.
         *
         * If the listener is not attached, this is a no-op. If
         * no listener is supplied, all listeners will be unbound.
         *
         * @param [listener] The event listener to bind to the event.
         * @param [context] The 'this' context to pass to the listener.
         */
        unbind(listener: EventListener = null, context: any = null): void {
            var proxies = this._proxies;
            if (!proxies) {
                return;
            }
            if (!listener) {
                var type = this._type;
                var target = this._target;
                for (var i = 0, n = proxies.length; i < n; ++i) {
                    target.removeEventListener(type, <any>proxies[i]);
                }
                this._proxies = null;
                return;
            }
            for (var i = 0, n = proxies.length; i < n; ++i) {
                var p = proxies[i];
                if (p.listener === listener && p.context === context) {
                    // workaround http://typescript.codeplex.com/workitem/45
                    this._target.removeEventListener(this._type, <any>p);
                    this._proxies.splice(i, 1);
                    return;
                }
            }
        }

        private _type: string;
        private _target: EventTarget;
        private _proxies: ProxyListener[] = null;
    }


    /**
     * An internal class which implements an event listener proxy.
     */
    class ProxyListener {

        /**
         * Construct a new proxy listener.
         *
         * @param listener The listener function to invoke.
         * @param context The 'this' context to pass to the listener.
         */
        constructor(public listener: EventListener, public context: any) { }

        /**
         * The event listener dispatch method.
         */
        handleEvent(event: Event): void {
            this.listener.call(this.context, event);
        }
    }

}
