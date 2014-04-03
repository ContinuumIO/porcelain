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
            *
            * @readonly
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
            * The id of the component and its DOM element.
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


        Object.defineProperty(Component.prototype, "style", {
            /**
            * The inline style object for the component element.
            *
            * @readonly
            */
            get: function () {
                return this._element.style;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "computedStyle", {
            /**
            * The computed style object for the component element.
            *
            * @readonly
            */
            get: function () {
                return window.getComputedStyle(this._element);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "display", {
            /**
            * The CSS display value for the component element.
            */
            get: function () {
                return window.getComputedStyle(this._element).display;
            },
            set: function (value) {
                this._element.style.display = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Component.prototype, "position", {
            /**
            * The CSS position value for the component element.
            */
            get: function () {
                return window.getComputedStyle(this._element).position;
            },
            set: function (value) {
                this._element.style.position = value;
            },
            enumerable: true,
            configurable: true
        });


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

        Object.defineProperty(Component.prototype, "offsetPos", {
            /**
            * The offset position of the component.
            *
            * This should only be set when position is "absolute".
            */
            get: function () {
                var elem = this._element;
                var x = elem.offsetLeft;
                var y = elem.offsetTop;
                return new porcelain.Point(x, y);
            },
            set: function (point) {
                var style = this._element.style;
                style.left = point.x + "px";
                style.top = point.y + "px";
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Component.prototype, "offsetSize", {
            /**
            * The offset size of the component.
            *
            * This should only be set when position is "absolute".
            */
            get: function () {
                var elem = this._element;
                var w = elem.offsetWidth;
                var h = elem.offsetHeight;
                return new porcelain.Size(w, h);
            },
            set: function (size) {
                var style = this._element.style;
                if (size.isValid()) {
                    style.width = size.width + "px";
                    style.height = size.height + "px";
                } else {
                    style.width = "";
                    style.height = "";
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Component.prototype, "offsetRect", {
            /**
            * The offset rect of the component.
            *
            * This should only be set when position is "absolute".
            */
            get: function () {
                var elem = this._element;
                var x = elem.offsetLeft;
                var y = elem.offsetTop;
                var w = elem.offsetWidth;
                var h = elem.offsetHeight;
                return new porcelain.Rect(x, y, w, h);
            },
            set: function (rect) {
                var style = this._element.style;
                if (rect.isValid()) {
                    style.left = rect.left + "px";
                    style.top = rect.top + "px";
                    style.width = rect.width() + "px";
                    style.height = rect.height() + "px";
                } else {
                    style.left = "";
                    style.top = "";
                    style.width = "";
                    style.height = "";
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Component.prototype, "minimumSize", {
            /**
            * The minimum size of the component.
            */
            get: function () {
                var style = window.getComputedStyle(this._element);
                var w = parseInt(style.minWidth);
                var h = parseInt(style.minHeight);
                if (w !== w || h !== h) {
                    return new porcelain.Size();
                }
                return new porcelain.Size(w, h);
            },
            set: function (size) {
                var style = this._element.style;
                if (size.isValid()) {
                    style.minWidth = size.width + "px";
                    style.minHeight = size.height + "px";
                } else {
                    style.minWidth = "";
                    style.minHeight = "";
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Component.prototype, "maximumSize", {
            /**
            * The maximum size of the component.
            */
            get: function () {
                var style = window.getComputedStyle(this._element);
                var w = parseInt(style.maxWidth);
                var h = parseInt(style.maxHeight);
                if (w !== w || h !== h) {
                    return new porcelain.Size();
                }
                return new porcelain.Size(w, h);
            },
            set: function (size) {
                var style = this._element.style;
                if (size.isValid()) {
                    style.maxWidth = size.width + "px";
                    style.maxHeight = size.height + "px";
                } else {
                    style.maxWidth = "";
                    style.maxHeight = "";
                }
            },
            enumerable: true,
            configurable: true
        });


        /**
        * The preferred size of the component.
        *
        * This computes the natural size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * @protected
        */
        Component.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        /**
        * The preferred minimum size of the component.
        *
        * This computes the minimal size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * @protected
        */
        Component.prototype.minimumSizeHint = function () {
            return new porcelain.Size();
        };

        /**
        * The preferred maximum size of the component.
        *
        * This computes the maximal size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * @protected
        */
        Component.prototype.maximumSizeHint = function () {
            return new porcelain.Size();
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
                var key = names[i];
                var value = this[key];
                if (value && value.porcelain_ComponentExtra) {
                    this[key] = null;
                    value.destroy();
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
