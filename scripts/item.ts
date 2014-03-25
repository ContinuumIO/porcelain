/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The CSS class added to Item instances.
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
        constructor() {
            this._element = document.createElement("div");
            this._element.className = ITEM_CLASS;
        }

        /**
         * Destroy the item and its children.
         */
        destroy(): void {
            this._detach();
            this._destroyChildren();
            this._destroySignals();
            this._deparent();
            this._element = null;
        } 

        /**
         * The item's div element.
         *
         * @readonly
         */
        get element(): HTMLDivElement {
            return this._element;
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
         * The array child items for this item.
         *
         * @readonly
         */
        get children(): Item[] {
            if (!this._children) {
                return [];
            }
            return this._children.slice();
        }

        append(...children: Item[]): void;
        append(): void {
            for (var i = 0, n = arguments.length; i < n; ++i) {
                this._append(<Item>arguments[i]);
            }
        }

        prepend(...children: Item[]): void;
        prepend(): void {
            for (var i = 0, n = arguments.length; i < n; ++i) {
                this._prepend(<Item>arguments[i]);
            }
        }

        insertBefore(before: Item, ...children: Item[]): void;
        insertBefore(): void {
            var target: Item = arguments[0];
            for (var i = 1, n = arguments.length; i < n; ++i) {
                this._insertBefore(target, <Item>arguments[i]);
            } 
        }

        insertAfter(after: Item, ...children: Item[]): void;
        insertAfter(): void {
            var target: Item = arguments[0];
            for (var i = 1, n = arguments.length; i < n; ++i) {
                this._insertBefore(target, <Item>arguments[i]);
            } 
        }

        remove(...children: Item[]): void;
        remove(): void {
            for (var i = 0, n = arguments.length; i < n; ++i) {
                this._remove(<Item>arguments[i]);
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
         * A helper method for appending an item.
         *
         * @private
         */
        private _append(child: Item): void {
            if (!this._children) {
                this._children = [];
            }
            child._deparent();
            child._parent = this;
            this._children.push(child);
            this._element.appendChild(child._element);
        }

        /**
         * A helper method for prepending an item.
         *
         * @private
         */
        private _prepend(child: Item): void {
            if (!this._children) {
                this._children = [];
            }
            child._deparent();
            child._parent = this;
            this._children.unshift(child);
            var elem = this._element;
            elem.insertBefore(child._element, elem.firstChild);
        }

        /**
         * A helper method for inserting an item.
         *
         */
        private _insertBefore(before: Item, child: Item): void {
            if (!this._children) {
                this._children = [];
            }
            child._deparent();
            child._parent = this;
            var elem = this._element;
            var index = this._children.indexOf(before);
            if (index === -1) {
                this._children.unshift(child);
                elem.insertBefore(child._element, elem.firstChild);
            } else {
                this._children.splice(index, 0, child);
                elem.insertBefore(child._element, before._element);
            }
        }

        /**
         * A helper method for inserting an item.
         *
         */
        private _insertAfter(after: Item, child: Item): void {
            if (!this._children) {
                this._children = [];
            }
            child._deparent();
            child._parent = this;
            var elem = this._element;
            var index = this._children.indexOf(after);
            if (index === -1) {
                this._children.push(child);
                elem.appendChild(child._element);
            } else {
                this._children.splice(index + 1, 0, child);
                elem.insertBefore(child._element, after._element.nextSibling);
            }
        }

        /**
         * A helper method for removing a child item.
         *
         * @private
         */
        private _remove(child: Item) {
            if (child._parent === this) {
                child._deparent();
                child._detach();
            }
        }

        /**
         * A helper method to detach the div element.
         * 
         * @private
         */
        private _detach(): void {
            var elem = this._element;
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
        }

        /**
         * A helper method for destroying the item children.
         * 
         * @private
         */
        private _destroyChildren(): void {
            if (!this._children) {
                return;
            }
            var children = this._children;
            this._children = null;
            for (var i = 0, n = children.length; i < n; ++i) {
                children[i].destroy();
            }
        }

        /**
         * A helper method for destroying the item signals.
         *
         * @private
         */
        private _destroySignals(): void {
            if (this._signals) {
                return;
            }
            var signals = this._signals;
            this._signals = null;
            for (var i = 0, n = signals.length; i < n; ++i) {
                signals[i].disconnect();
            }
        }

        /**
         * A helper method for de-parenting the object.
         *
         * @private
         */
        private _deparent(): void {
            var parent = this._parent;
            if (!parent) {
                return;
            }
            this._parent = null;
            var siblings = parent._children;
            if (!siblings) {
                return;
            }
            var index = siblings.indexOf(this);
            if (index !== -1) {
                siblings.splice(index, 1);
            }
        }

        private _element: HTMLDivElement;
        private _parent: Item = null;
        private _children: Item[] = null;
        private _signals: Signal<any>[] = null;
    }

}
