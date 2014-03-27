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
    * The prefix used for dispatching element events.
    */
    var ELEMENT_EVENT_PREFIX = "onElement_";

    /**
    * The prefix used for dispatching document events.
    */
    var DOCUMENT_EVENT_PREFIX = "onDocument_";

    /**
    * A base class for creating interactive porcelain widgets.
    *
    * The Widget class adds support for signals and events.
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
            this._signals = null;
            this._elementEvents = null;
            this._documentEvents = null;
            this.addClass(WIDGET_CLASS);
        }
        /**
        * Destroy the widget and disconnect all listeners.
        */
        Widget.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._destroyEvents();
            this._destroySignals();
        };

        Object.defineProperty(Widget.prototype, "elementEvents", {
            /**
            * The event tracker for element events.
            *
            * @readonly
            */
            get: function () {
                if (!this._elementEvents) {
                    this._elementEvents = new porcelain.EventTracker(this, this.element, ELEMENT_EVENT_PREFIX);
                }
                return this._elementEvents;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Widget.prototype, "documentEvents", {
            /**
            * The event tracker for document events.
            *
            * @readonly
            */
            get: function () {
                if (!this._documentEvents) {
                    this._documentEvents = new porcelain.EventTracker(this, document, DOCUMENT_EVENT_PREFIX);
                }
                return this._documentEvents;
            },
            enumerable: true,
            configurable: true
        });

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
        * A helper method for destroying the event trackers.
        *
        * @private
        */
        Widget.prototype._destroyEvents = function () {
            if (this._elementEvents) {
                this._elementEvents.destroy();
                this._elementEvents = null;
            }
            if (this._documentEvents) {
                this._documentEvents.destroy();
                this._documentEvents = null;
            }
        };

        /**
        * A helper method for destroying the widget signals.
        *
        * @private
        */
        Widget.prototype._destroySignals = function () {
            if (!this._signals) {
                return;
            }
            var signals = this._signals;
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
