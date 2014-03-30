var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
    var Widget = (function (_super) {
        __extends(Widget, _super);
        /**
        * Construct a new Widget.
        */
        function Widget() {
            _super.call(this);
            this._binders = null;
            this._signals = null;
            this.addClass(WIDGET_CLASS);
        }
        /**
        * Destroy the widget and disconnect all listeners.
        */
        Widget.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._destroyBinders();
            this._destroySignals();
        };

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
        Widget.prototype.bind = function (type, listener, target, context) {
            if (typeof target === "undefined") { target = this.element; }
            if (typeof context === "undefined") { context = this; }
            var binders = this._binders;
            if (!binders) {
                binders = this._binders = [];
            }
            var binder = new porcelain.EventBinder(target, type, listener, context);
            for (var i = 0, n = binders.length; i < n; ++i) {
                if (binder.equals(binders[i])) {
                    return;
                }
            }
            binder.attach();
            binders.push(binder);
        };

        /**
        * Unbind a listener from the specified event.
        *
        * @param type The string type of the event.
        * @param listener The event listener which was bound.
        * @param [target] The event target. The default is the widget div.
        * @param [context] The listener context. The default is the widget.
        */
        Widget.prototype.unbind = function (type, listener, target, context) {
            if (typeof target === "undefined") { target = this.element; }
            if (typeof context === "undefined") { context = this; }
            var binders = this._binders;
            if (!binders) {
                return;
            }
            var binder = new porcelain.EventBinder(target, type, listener, context);
            for (var i = 0, n = binders.length; i < n; ++i) {
                if (binder.equals(binders[i])) {
                    binders[i].destroy();
                    binders.splice(i, 1);
                    return;
                }
            }
        };

        /**
        * Create a new Signal with a lifetime bound to the widget.
        */
        Widget.prototype.createSignal = function () {
            if (!this._signals) {
                this._signals = [];
            }
            var signal = new porcelain.Signal();
            this._signals.push(signal);
            return signal;
        };

        /**
        * A helper method for destroying the event binders.
        *
        * @private
        */
        Widget.prototype._destroyBinders = function () {
            var binders = this._binders;
            if (!binders) {
                return;
            }
            this._binders = null;
            for (var i = 0, n = binders.length; i < n; ++i) {
                binders[i].destroy();
            }
        };

        /**
        * A helper method for destroying the widget signals.
        *
        * @private
        */
        Widget.prototype._destroySignals = function () {
            var signals = this._signals;
            if (!signals) {
                return;
            }
            this._signals = null;
            for (var i = 0, n = signals.length; i < n; ++i) {
                signals[i].disconnect();
            }
        };
        return Widget;
    })(porcelain.Item);
    porcelain.Widget = Widget;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=widget.js.map
