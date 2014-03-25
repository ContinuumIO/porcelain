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
         * @param [...] - the child Items to append to the item.
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
         * @param [...] - the child Items to prepend to the item.
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
         * @param before - the child item marking the insert location.
         * @param [...] - the child Items to insert into the item.
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
         * Detach the element from the dom and unparent the item.
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
            var names = className.match(/\S+/g) || [];
            var current = this._element.className;
            var parts = current.match(/\S+/g) || [];
            for (var i = 0, n = names.length; i < n; ++i) {
                var name = names[i];
                if (parts.indexOf(name) === -1) {
                    parts.push(name);
                }
            }
            var final = parts.join(" ");
            if (final !== current) {
                this._element.className = final;
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
            var names = className.match(/\S+/g) || [];
            var current = this._element.className;
            var parts = current.match(/\S+/g) || [];
            for (var i = 0, n = names.length; i < n; ++i) {
                var index = parts.indexOf(names[i]);
                if (index !== -1) {
                    parts.splice(index, 1);
                }
            }
            var final = parts.join(" ");
            if (final !== current) {
                this._element.className = final;
            }
        }

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
        private _signals: Signal[] = null;
    }

}
