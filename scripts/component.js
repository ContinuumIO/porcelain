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
    * The CSS class added to Component instances.
    */
    var COMPONENT_CLASS = "p-Component";

    

    /**
    * The most base class of porcelain objects.
    *
    * @class
    */
    var Component = (function () {
        /**
        * Construct a new Component.
        */
        function Component() {
            /**
            * A signal emitted when the component is destroyed.
            */
            this.destroyed = new porcelain.Signal();
            this._parent = null;
            this._children = null;
            this._element = this.createElement();
            this.addClass(COMPONENT_CLASS);
        }
        /**
        * Destroy the component and its children.
        */
        Component.prototype.destroy = function () {
            this.destroyed.emit();
            this._detachElement();
            this._destroyExtras();
            this._destroyChildren();
            this._deparent();
            this._element = null;
        };

        Object.defineProperty(Component.prototype, "parent", {
            /**
            * The parent Component of this component.
            *
            * @readonly
            */
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "children", {
            /**
            * The array of child Components of this component.
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
        * Append children to the end of this component.
        *
        * If a component is already a child, it will be moved to the
        * end of the child array. The children *must* be unique.
        *
        * @param [...] The child Components to append.
        */
        Component.prototype.append = function () {
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
        * Prepend children to the beginning of this component.
        *
        * If a component is already a child, it will be moved to the
        * beginning of the child array. The children *must* be unique.
        *
        * @param [...] The child Components to prepend.
        */
        Component.prototype.prepend = function () {
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
        * If a component is already a child, it will be moved to the
        * new location in the child array. The before child *must* be
        * a current child. The children *must* be unique.
        *
        * @param before The child marking the insert location.
        * @param [...] The child Components to insert.
        */
        Component.prototype.insertBefore = function (before) {
            var children = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                children[_i] = arguments[_i + 1];
            }
            if (before._parent !== this) {
                throw Error("'before' is not a child of this component.");
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
        * Unparent the Component and detach its element from the DOM.
        *
        */
        Component.prototype.detach = function () {
            this._detachElement();
            this._deparent();
        };

        Object.defineProperty(Component.prototype, "element", {
            /**
            * The component's internal DOM element.
            *
            * @readonly
            */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "id", {
            /**
            * The id of the component's DOM element.
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


        /**
        * Add a name or names to the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to add to the element.
        */
        Component.prototype.addClass = function (className) {
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
        Component.prototype.removeClass = function (className) {
            var currName = this._element.className;
            var currParts = currName.match(/\S+/g) || [];
            var oldParts = className.match(/\S+/g) || [];
            var newName = _.difference(currParts, oldParts).join(" ");
            if (newName !== currName) {
                this._element.className = newName;
            }
        };

        /**
        * Show the underlying DOM element.
        *
        * This is a convenience for setVisible(true);
        */
        Component.prototype.show = function () {
            this.setVisible(true);
        };

        /**
        * Hide the underlying DOM element.
        *
        * This is a convenience for setVisible(false);
        */
        Component.prototype.hide = function () {
            this.setVisible(false);
        };

        /**
        * Set the visibility of the underlying DOM element.
        *
        * The default implementation of this method sets and clears
        * the display property of the element style. This may be
        * reimplemented by subclasses which require more control.
        */
        Component.prototype.setVisible = function (visible) {
            var style = this.element.style;
            if (visible) {
                style.removeProperty("display");
            } else {
                style.display = "none";
            }
        };

        /**
        * Create the underlying element for the component.
        *
        * The default implementation creates a div.
        *
        * @protected.
        */
        Component.prototype.createElement = function () {
            return document.createElement("div");
        };

        /**
        * The preferred size of the component.
        *
        * This value is used by procedural layout systems to retrieve
        * the preferred layout size of the component. It is ignored
        * when using CSS to position the element.
        *
        * This should be reimplemented by subclasses. The default
        * implementation returns an invalid size.
        *
        * @protected
        */
        Component.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        /**
        * The preferred minimum size of the component.
        *
        * This value is used by procedural layout systems to retrieve
        * the preferred minimum layout size of the component. It is
        * ignored when using CSS to position the element.
        *
        * This should be reimplemented by subclasses. The default
        * implementation returns an invalid size.
        *
        * @protected
        */
        Component.prototype.minimumSizeHint = function () {
            return new porcelain.Size();
        };

        /**
        * The preferred maximum size of the component.
        *
        * This value is used by procedural layout systems to retrieve
        * the preferred maximum layout size of the component. It is
        * ignored when using CSS to position the element.
        *
        * This should be reimplemented by subclasses. The default
        * implementation returns an invalid size.
        *
        * @protected
        */
        Component.prototype.maximumSizeHint = function () {
            return new porcelain.Size();
        };

        /**
        * A helper method for preparing children to be inserted.
        *
        * @private
        */
        Component.prototype._prepareChildren = function (children) {
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
        Component.prototype._detachElement = function () {
            var element = this._element;
            var parentNode = element.parentNode;
            if (parentNode) {
                parentNode.removeChild(element);
            }
        };

        /**
        * A helper method for destroying the component extras.
        *
        * @private
        */
        Component.prototype._destroyExtras = function () {
            var names = Object.getOwnPropertyNames(this);
            for (var i = 0, n = names.length; i < n; ++i) {
                var name = names[i];
                var value = this[name];
                if (value && value.porcelain_ComponentExtra) {
                    value.destroy();
                    this[name] = null;
                }
            }
        };

        /**
        * A helper method for destroying the component children.
        *
        * @private
        */
        Component.prototype._destroyChildren = function () {
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
        * A helper method for de-parenting the component.
        *
        * @private
        */
        Component.prototype._deparent = function () {
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
        return Component;
    })();
    porcelain.Component = Component;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=component.js.map
