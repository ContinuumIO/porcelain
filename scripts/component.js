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

        /**
        * Returns the parent Component of this component.
        */
        Component.prototype.parent = function () {
            return this._parent;
        };

        /**
        * Returns the array of child Components of this component.
        */
        Component.prototype.children = function () {
            var children = this._children;
            if (children) {
                return children.slice();
            }
            return [];
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
        * Returns the component's internal DOM element.
        */
        Component.prototype.element = function () {
            return this._element;
        };

        /**
        * Returns the id of the component and its DOM element.
        */
        Component.prototype.id = function () {
            return this._element.id;
        };

        /**
        * Set the id of the component and its DOM element.
        */
        Component.prototype.setId = function (id) {
            this._element.id = id;
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

        /**
        * Returns the inline style object for the component element.
        */
        Component.prototype.style = function () {
            return this._element.style;
        };

        /**
        * Returns the computed style object for the component element.
        */
        Component.prototype.computedStyle = function () {
            return window.getComputedStyle(this._element);
        };

        /**
        * Returns the CSS display value for the component element.
        */
        Component.prototype.display = function () {
            return window.getComputedStyle(this._element).display;
        };

        /**
        * Set the CSS display value for the component element.
        */
        Component.prototype.setDisplay = function (value) {
            this._element.style.display = value;
        };

        /**
        * Returns CSS position value for the component element.
        */
        Component.prototype.position = function () {
            return window.getComputedStyle(this._element).position;
        };

        /**
        * Set the CSS position value for the component element.
        */
        Component.prototype.setPosition = function (value) {
            this._element.style.position = value;
        };

        /**
        * Returns the offset position of the component.
        */
        Component.prototype.pos = function () {
            var elem = this._element;
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            return new porcelain.Point(x, y);
        };

        /**
        * Set the offset position of the component.
        */
        Component.prototype.setPos = function (point) {
            var style = this._element.style;
            style.left = point.x + "px";
            style.top = point.y + "px";
        };

        /**
        * Returns the offset size of the component.
        */
        Component.prototype.size = function () {
            var elem = this._element;
            var w = elem.offsetWidth;
            var h = elem.offsetHeight;
            return new porcelain.Size(w, h);
        };

        /**
        * Set the offset size of the component.
        */
        Component.prototype.setSize = function (size) {
            var style = this._element.style;
            if (size.isValid()) {
                style.width = size.width + "px";
                style.height = size.height + "px";
            } else {
                style.width = "";
                style.height = "";
            }
        };

        /**
        * Returns the offset rect of the component.
        */
        Component.prototype.rect = function () {
            var elem = this._element;
            var x = elem.offsetLeft;
            var y = elem.offsetTop;
            var w = elem.offsetWidth;
            var h = elem.offsetHeight;
            return new porcelain.Rect(x, y, w, h);
        };

        /**
        * Set the offset rect of the component.
        */
        Component.prototype.setRect = function (rect) {
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
        };

        /**
        * Returns the minimum size of the component.
        */
        Component.prototype.minimumSize = function () {
            var style = window.getComputedStyle(this._element);
            var w = parseInt(style.minWidth);
            var h = parseInt(style.minHeight);
            if (w !== w || h !== h) {
                return new porcelain.Size();
            }
            return new porcelain.Size(w, h);
        };

        /**
        * Set the minimum size of the component.
        */
        Component.prototype.setMinimumSize = function (size) {
            var style = this._element.style;
            if (size.isValid()) {
                style.minWidth = size.width + "px";
                style.minHeight = size.height + "px";
            } else {
                style.minWidth = "";
                style.minHeight = "";
            }
        };

        /**
        * Returns the maximum size of the component.
        */
        Component.prototype.maximumSize = function () {
            var style = window.getComputedStyle(this._element);
            var w = parseInt(style.maxWidth);
            var h = parseInt(style.maxHeight);
            if (w !== w || h !== h) {
                return new porcelain.Size();
            }
            return new porcelain.Size(w, h);
        };

        /**
        * Set the maximum size of the component.
        */
        Component.prototype.setMaximumSize = function (size) {
            var style = this._element.style;
            if (size.isValid()) {
                style.maxWidth = size.width + "px";
                style.maxHeight = size.height + "px";
            } else {
                style.maxWidth = "";
                style.maxHeight = "";
            }
        };

        /**
        * Returns the preferred size of the component.
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
        * Returns the preferred minimum size of the component.
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
        * Returns the preferred maximum size of the component.
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
        * Invoked by a root node when the tree is attached to the DOM.
        *
        * The default implementation of this method dispatches to its
        * children in a bottom-up fashion. A component should not
        * modify the tree structure during this method.
        *
        * @protected
        */
        Component.prototype.afterAttach = function () {
            var children = this._children;
            if (!children) {
                return;
            }
            for (var i = 0, n = children.length; i < n; ++i) {
                children[i].afterAttach();
            }
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
