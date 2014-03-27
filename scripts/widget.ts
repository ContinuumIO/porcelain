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
            this._destroyEvents();
            this._destroySignals();
        }

        /**
         * The event tracker for element events.
         *
         * @readonly
         */
        get elementEvents(): EventTracker {
            if (!this._elementEvents) {
                this._elementEvents = new EventTracker(
                    this, this.element, ELEMENT_EVENT_PREFIX
                );
            }
            return this._elementEvents;
        }

        /**
         * The event tracker for document events.
         *
         * @readonly
         */
        get documentEvents(): EventTracker {
            if (!this._documentEvents) {
                this._documentEvents = new EventTracker(
                    this, document, DOCUMENT_EVENT_PREFIX
                );
            }
            return this._documentEvents;
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
         * A helper method for destroying the event trackers.
         *
         * @private
         */
        private _destroyEvents(): void {
            if (this._elementEvents) {
                this._elementEvents.destroy();
                this._elementEvents = null;
            }
            if (this._documentEvents) {
                this._documentEvents.destroy();
                this._documentEvents = null;
            }
        }
     
        /**
         * A helper method for destroying the widget signals.
         *
         * @private
         */
        private _destroySignals(): void {
            if (!this._signals) {
                return;
            }
            var signals = this._signals;
            this._signals = null;
            for (var i = 0, n = signals.length; i < n; ++i) {
                signals[i].disconnect();
            }
        }

        private _signals: Signal[] = null;
        private _elementEvents: EventTracker = null;
        private _documentEvents: EventTracker = null;
    }

}
