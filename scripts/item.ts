/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The CSS class applied to Item instances.
     */
    var ITEM_CLASS = "p-Item";


    /**
     * The most base class of visible porcelain objects.
     *
     * Instances are represented by a single <div>.
     *
     * @class
     */
    export class Item {

        /**
         * Construct a new Item.
         */
        constructor(parent: Item = null) {
            this._element = document.createElement("div");
            this.$.addClass(ITEM_CLASS);
            this.setParent(parent);
        }

        /**
         * Destroy the item and its children.
         */
        destroy(): void {
            this.$.remove();
            this._destroyChildren();
            this._destroySignals();
            this.setParent(null);
            this._element = null;
        }

        /**
         * The item's internal div element.
         *
         * @readonly
         */
        get element(): HTMLDivElement {
            return this._element;
        }

        /**
         * A JQuery wrapper around the internal div element.
         *
         * Creates a *new* wrapper each time it is accessed.
         *
         * @readonly
         */
        get $(): JQuery {
            return $(this._element);
        }

        /**
         * The parent Item of this item.
         *
         * @readonly
         */
        get parent(): Item {
            return this._parent;
        }

        /**
         * The child Items of this item.
         *
         * @readonly
         */
        get children(): Item[] {
            if (!this._children) {
                return [];
            }
            return this._children.slice();
        }

        /**
         * Set the parent of the item.
         */
        setParent(parent: Item): void {
            if (parent === this._parent) {
                return;
            }
            if (this._parent) {
                this._parent._removeChild(this);
            }
            this._parent = parent;
            if (parent) {
                parent._addChild(this);
            }
        }

        /**
         * Create a new Signal owned by the item.
         *
         * The signal will be destroyed automatically by the item.
         */
        createSignal<T>(): Signal<T> {
            if (!this._signals) {
                this._signals = [];
            }
            var signal = new Signal<T>();
            this._signals.push(signal);
            return signal;
        }

        /**
         * An internal helper method for adding a child item.
         *
         * @private
         */
        private _addChild(child: Item): void {
            if (!this._children) {
                this._children = [];
            }
            this._children.push(child);
        }

        /**
         * An internal helper method for removing a child item.
         */
        private _removeChild(child: Item): void {
            if (!this._children) {
                return;
            }
            var index = this._children.indexOf(child);
            this._children.splice(index, 1);
        }

        /**
         * An internal helper method for destroying the children.
         */
        private _destroyChildren(): void {
            if (!this._children) {
                return;
            }
            var children = this._children;
            this._children = null;
            $.each(children, function (index, child) {
                child.destroy();
            });
        }

        /**
         * An internal helper method for destroying the signals.
         */
        private _destroySignals(): void {
            if (!this._signals) {
                return;
            }
            var signals = this._signals;
            this._signals = null;
            $.each(signals, function (index, signal) {
                signal.disconnect();
            });
        }

        private _element: HTMLDivElement;
        private _parent: Item = null;
        private _children: Item[] = null;
        private _signals: Signal<any>[] = null;
    }

}
