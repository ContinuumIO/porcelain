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
     * The extra data that may be needed by an Item at runtime.
     *
     * This interface can be extended by subclasses, but should
     * not be used by external code.
     */
    export interface ItemExtra {
        signals?: Signal[];
        elementEvents?: EventTracker;
        documentEvents?: EventTracker;
        windowEvents?: EventTracker;
    }


    /**
     * The most base class of visible porcelain objects.
     *
     * Instances are represented by a single <div> element.
     *
     * @class
     */
    export class Item {

        /**
         * Construct a new Item.
         */
        constructor() {
            this._element = document.createElement("div");
            this.addClass(ITEM_CLASS);
        }

        /**
         * Destroy the item and its children, and cleanup the dom.
         */
        destroy(): void {
            this._detachElement();
            this._destroyChildren();
            this._destroyExtra();
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
         * The array child Items for this item.
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
         * Append children to the end of this item.
         *
         * If an item is already a child, it will be moved to the
         * end of the child array. The children *must* be unique.
         *
         * @param [...] The child Items to append to the item.
         */
        append(...children: Item[]): void {
            var fragment = this._prepInsert(children);
            var current = this._children || [];
            this._children = current.concat(children);
            this._element.appendChild(fragment);
        }

        /**
         * Prepend children to the beginning of this item.
         *
         * If an item is already a child, it will be moved to the 
         * beginning of the child array. The children *must* be unique.
         *
         * @param [...] The child Items to prepend to the item.
         */
        prepend(...children: Item[]): void {
            var fragment = this._prepInsert(children);
            var current = this._children || [];
            this._children = children.concat(current);
            this._element.insertBefore(fragment, this._element.firstChild);
        }

        /**
         * Insert children before the given child.
         *
         * If an item is already a child, it will be moved to the new
         * location in the child array. The before child *must* be a 
         * current child. The children *must* be unique.
         *
         * @param before The child item marking the insert location.
         * @param [...] The child Items to insert into the item.
         */
        insertBefore(before: Item, ...children: Item[]): void {
            if (before._parent !== this) {
                throw Error("The 'before' item is not a child of this item.");
            }
            var fragment = this._prepInsert(children);
            var current = this._children || [];
            var index = current.indexOf(before);
            if (index === -1) {
                this._children = current.concat(children);
                this._element.appendChild(fragment);
            } else {
                var leading = current.slice(0, index);
                var trailing = current.slice(index);
                this._children = leading.concat(children, trailing);
                this._element.insertBefore(fragment, before._element);
            }
        }   

        /**
         * Unparent the Item and detach its element from the DOM.
         *
         */
        detach(): void {
            this._detachElement();
            this._deparent();
        }

        /**
         * Create a new Signal owned by the item.
         *
         * All handlers are disconnected when the item is destroyed.
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
         * Add a name or names to the element's CSS class name.
         *
         * Multiple names should be separated by whitespace.
         *
         * @param className - the class name(s) to add to the element.
         */
        addClass(className: string): void {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var newParts = className.match(/\S+/g) || [];
            var newName = _.union(currParts, newParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        }
                
        /**
         * Remove a name or names from the element's CSS class name.
         *
         * Multiple names should be separated by whitespace.
         *
         * @param className - the class name(s) to remove from the element.
         */
        removeClass(className: string): void {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var oldParts = className.match(/\S+/g) || [];
            var newName = _.difference(currParts, oldParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        }

        /**
         *
         * A 
        /**
         * A helper method to detach the div element.
         * 
         * @private
         */
        private _detachElement(): void {
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
         * A helper method for destroying the item event trackers.
         *
         * @private
         */
        private _destroyEventTrackers(): void {
            if (this._windowEvents) {
                this._windowEvents.destroy();
                this._windowEvents = null;
            }
            if (this._documentEvents) {
                this._documentEvents.destroy();
                this._documentEvents = null;
            }
            if (this._elementEvents) {
                this._elementEvents.destroy();
                this._elementEvents = null;
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
            _.pull(siblings, this);
        }

        /**
         * A helper method for preparing children to be inserted.
         *
         * @private 
         */
        private  _prepInsert(children: Item[]): DocumentFragment {
            var fragment = document.createDocumentFragment();
            for (var i = 0, n = children.length; i < n; ++i) {
                var child = children[i];
                child._deparent();
                child._parent = this;
                fragment.appendChild(child._element);
            }
            return fragment;
        }

        private _element: HTMLDivElement;
        private _parent: Item = null;
        private _children: Item[] = null;
        private _itemExtras: ItemExtras = null;

    }

}
