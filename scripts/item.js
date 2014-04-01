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
    * The CSS class added to Item instances.
    */
    var ITEM_CLASS = "p-Item";

    /**
    * The most base class of visible porcelain objects.
    *
    * The Item class supports basic functionality for creating the
    * underlying DOM node, events, signals, and setting the node
    * classes and id. It also implements the parent-children tree.
    *
    * @class
    */
    var Item = (function () {
        /**
        * Construct a new Item.
        */
        function Item() {
            this._parent = null;
            this._children = null;
            this._binders = null;
            this._signals = null;
            this._element = this.createElement();
            this.addClass(ITEM_CLASS);
        }
        /**
        * Destroy the item and its children, and cleanup the DOM.
        */
        Item.prototype.destroy = function () {
            this._detachElement();
            this._destroyBinders();
            this._destroySignals();
            this._destroyChildren();
            this._deparent();
            this._element = null;
        };

        Object.defineProperty(Item.prototype, "element", {
            /**
            * The item's internal DOM element.
            *
            * @readonly
            */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "id", {
            /**
            * The id of the underlying DOM element.
            */
            get: function () {
                return this._element.id;
            },
            set: function (id) {
                this._element.id = id;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Item.prototype, "parent", {
            /**
            * The parent Item of this item.
            *
            * @readonly
            */
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Item.prototype, "children", {
            /**
            * The array child Items for this item.
            *
            * @readonly
            */
            get: function () {
                var children = this._children;
                if (!children) {
                    return [];
                }
                return children.slice();
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Unparent the Item and detach its element from the DOM.
        *
        */
        Item.prototype.detach = function () {
            this._detachElement();
            this._deparent();
        };

        /**
        * Append children to the end of this item.
        *
        * If an item is already a child, it will be moved to the
        * end of the child array. The children *must* be unique.
        *
        * @param [...] The child Items to append to the item.
        */
        Item.prototype.append = function () {
            var children = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                children[_i] = arguments[_i + 0];
            }
            var fragment = this._prepareChildren(children);
            var current = this._children || [];
            this._children = current.concat(children);
            this._element.appendChild(fragment);
        };

        /**
        * Prepend children to the beginning of this item.
        *
        * If an item is already a child, it will be moved to the
        * beginning of the child array. The children *must* be unique.
        *
        * @param [...] The child Items to prepend to the item.
        */
        Item.prototype.prepend = function () {
            var children = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                children[_i] = arguments[_i + 0];
            }
            var fragment = this._prepareChildren(children);
            var current = this._children || [];
            this._children = children.concat(current);
            var element = this._element;
            element.insertBefore(fragment, element.firstChild);
        };

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
        Item.prototype.insertBefore = function (before) {
            var children = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                children[_i] = arguments[_i + 1];
            }
            if (before._parent !== this) {
                throw Error("The 'before' item is not a child of this item.");
            }
            var fragment = this._prepareChildren(children);
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
        };

        /**
        * Add a name or names to the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to add to the element.
        */
        Item.prototype.addClass = function (className) {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var newParts = className.match(/\S+/g) || [];
            var newName = _.union(currParts, newParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        };

        /**
        * Remove a name or names from the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to remove from the element.
        */
        Item.prototype.removeClass = function (className) {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var oldParts = className.match(/\S+/g) || [];
            var newName = _.difference(currParts, oldParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        };

        /**
        * Bind a listener to the specified event.
        *
        * The listener will be removed when the item is destroyed.
        *
        * @param type The string type of the event to bind.
        * @param listener The event listener to bind to the target.
        * @param [target] The event target. The default is the item element.
        * @param [context] The listener context. The default is the item.
        */
        Item.prototype.bind = function (type, listener, target, context) {
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
        * @param [target] The event target. The default is the item element.
        * @param [context] The listener context. The default is the item.
        */
        Item.prototype.unbind = function (type, listener, target, context) {
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
        * Create a new Signal with a lifetime bound to the item.
        */
        Item.prototype.createSignal = function () {
            if (!this._signals) {
                this._signals = [];
            }
            var signal = new porcelain.Signal();
            this._signals.push(signal);
            return signal;
        };

        /**
        * Create the underlying element for the item.
        *
        * The default implementation of this method creates a div.
        *
        * @protected.
        */
        Item.prototype.createElement = function () {
            return document.createElement("div");
        };

        /**
        * A helper method for preparing children to be inserted.
        *
        * @private
        */
        Item.prototype._prepareChildren = function (children) {
            var fragment = document.createDocumentFragment();
            for (var i = 0, n = children.length; i < n; ++i) {
                var child = children[i];
                child._deparent();
                child._parent = this;
                fragment.appendChild(child._element);
            }
            return fragment;
        };

        /**
        * A helper method to detach the DOM element.
        *
        * @private
        */
        Item.prototype._detachElement = function () {
            var element = this._element;
            var parentNode = element.parentNode;
            if (parentNode) {
                parentNode.removeChild(element);
            }
        };

        /**
        * A helper method for destroying the event binders.
        *
        * @private
        */
        Item.prototype._destroyBinders = function () {
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
        * A helper method for destroying the item signals.
        *
        * @private
        */
        Item.prototype._destroySignals = function () {
            var signals = this._signals;
            if (!signals) {
                return;
            }
            this._signals = null;
            for (var i = 0, n = signals.length; i < n; ++i) {
                signals[i].disconnect();
            }
        };

        /**
        * A helper method for destroying the item children.
        *
        * @private
        */
        Item.prototype._destroyChildren = function () {
            var children = this._children;
            if (!children) {
                return;
            }
            this._children = null;
            for (var i = 0, n = children.length; i < n; ++i) {
                children[i].destroy();
            }
        };

        /**
        * A helper method for de-parenting the object.
        *
        * @private
        */
        Item.prototype._deparent = function () {
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
        };
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
