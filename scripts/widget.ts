/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The CSS class added to Widget instances.
     */
    var WIDGET_CLASS = "p-Widget";


    /**
     * A base class for creating interactive porcelain widgets.
     *
     * The Widget class adds support for events and signals.
     *
     * @class
     */
    export class Widget extends Item {

        /**
         * Construct a new Widget.
         */
        constructor() {
            super();
            this.addClass(WIDGET_CLASS);
        }

        /**
         * Destroy the widget and disconnect all listeners.
         */
        destroy(): void {
            super.destroy();
            this._destroyBinders();
            this._destroySignals();
        }

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
        bind(
            type: string,
            listener: EventListener,
            target: EventTarget = this.element,
            context: any = this): void
        {
            var binders = this._binders
            if (!binders) {
                binders = this._binders = [];
            }
            var binder = new EventBinder(target, type, listener, context);
            for (var i = 0, n = binders.length; i < n; ++i) {
                if (binder.equals(binders[i])) {
                    return;
                }
            }
            binder.attach();
            binders.push(binder);
        }

        /**
         * Unbind a listener from the specified event.
         *
         * @param type The string type of the event.
         * @param listener The event listener which was bound.
         * @param [target] The event target. The default is the widget div.
         * @param [context] The listener context. The default is the widget.
         */
        unbind(
            type: string,
            listener: EventListener,
            target: EventTarget = this.element,
            context: any = this): void
        {
            var binders = this._binders;
            if (!binders) {
                return;
            }
            var binder = new EventBinder(target, type, listener, context);
            for (var i = 0, n = binders.length; i < n; ++i) {
                if (binder.equals(binders[i])) {
                    binders[i].destroy();
                    binders.splice(i, 1);
                    return;
                }
            }
        }

        /**
         * Create a new Signal with a lifetime bound to the widget.
         */
        createSignal(): Signal {
            if (!this._signals) {
                this._signals = [];
            }
            var signal = new Signal();
            this._signals.push(signal);
            return signal;
        }

        /**
         * A helper method for destroying the event binders.
         *
         * @private
         */
        private _destroyBinders(): void {
            var binders = this._binders;
            if (!binders) {
                return;
            }
            this._binders = null;
            for (var i = 0, n = binders.length; i < n; ++i) {
                binders[i].destroy();
            }
        }
     
        /**
         * A helper method for destroying the widget signals.
         *
         * @private
         */
        private _destroySignals(): void {
            var signals = this._signals;
            if (!signals) {
                return;
            }
            this._signals = null;
            for (var i = 0, n = signals.length; i < n; ++i) {
                signals[i].disconnect();
            }
        }

        private _binders: EventBinder[] = null;
        private _signals: Signal[] = null;
    }

}
