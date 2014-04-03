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
    * Get the numeric Z-index of the given component.
    */
    function getZIndex(component) {
        return parseInt(component.computedStyle.zIndex) || 0;
    }

    /**
    * Set the numeric Z-index of the given component.
    */
    function setZIndex(component, index) {
        component.style.zIndex = index ? index.toString() : "";
    }

    /**
    * A class for managing the Z-order of a collection of Items.
    *
    * @class
    */
    var ZStack = (function () {
        /**
        * Construct a new ZStack.
        *
        * @param minIndex The minimum Z-index of the stack.
        */
        function ZStack(minIndex) {
            this._stack = [];
            this._minIndex = minIndex;
        }
        Object.defineProperty(ZStack.prototype, "top", {
            /**
            * The component on the top of the stack.
            *
            * @readonly
            */
            get: function () {
                if (this._stack.length) {
                    return this._stack[this._stack.length - 1];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ZStack.prototype, "bottom", {
            /**
            * The component on the bottom of the stack.
            *
            * @readonly
            */
            get: function () {
                if (this._stack.length) {
                    return this._stack[0];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Returns true if the stack contains the given component.
        *
        * @param component The component of interest.
        */
        ZStack.prototype.contains = function (component) {
            return this._stack.indexOf(component) !== -1;
        };

        /**
        * Add a component to the top of the stack.
        *
        * If the stack already contains the component, this is a no-op.
        *
        * @param component The component to add to the stack.
        */
        ZStack.prototype.add = function (component) {
            if (!component || this.contains(component)) {
                return;
            }
            var index = this._minIndex + this._stack.length;
            this._stack.push(component);
            setZIndex(component, index);
        };

        /**
        * Remove a component from the stack and clear its Z-index.
        *
        * If the stack does not contain the component, this is a no-op.
        */
        ZStack.prototype.remove = function (component) {
            var index = this._stack.indexOf(component);
            if (index >= 0) {
                this._stack.splice(index, 1);
                setZIndex(component, 0);
                this._updateIndices();
            }
        };

        /**
        * Raise the specified components to the top of the stack.
        *
        * The relative stacking order of the components will be maintained.
        */
        ZStack.prototype.raise = function () {
            var components = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                components[_i] = arguments[_i + 0];
            }
            if (components.length === 1 && components[0] === this.top) {
                return;
            }
            var cr = this._classify(components);
            this._stack = cr.oldComps.concat(cr.newComps);
            this._updateIndices();
        };

        /**
        * Lower the specified components to the bottom of the stack.
        *
        * The relative stacking order of the components will be maintained.
        */
        ZStack.prototype.lower = function () {
            var components = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                components[_i] = arguments[_i + 0];
            }
            if (components.length === 1 && components[0] === this.bottom) {
                return;
            }
            var cr = this._classify(components);
            this._stack = cr.newComps.concat(cr.oldComps);
            this._updateIndices();
        };

        /**
        * Classify the given and current components into old and new.
        *
        * @private
        */
        ZStack.prototype._classify = function (components) {
            var oldComps = [];
            var newComps = [];
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                var component = stack[i];
                if (components.indexOf(component) === -1) {
                    oldComps.push(component);
                } else {
                    newComps.push(component);
                }
            }
            newComps.sort(function (a, b) {
                return getZIndex(a) - getZIndex(b);
            });
            return { oldComps: oldComps, newComps: newComps };
        };

        /**
        * Update the Z-indices for the current stack components.
        *
        * @private
        */
        ZStack.prototype._updateIndices = function () {
            var minIndex = this._minIndex;
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                setZIndex(stack[i], minIndex + i);
            }
        };
        return ZStack;
    })();
    porcelain.ZStack = ZStack;

    /**
    * A predefinined Z-stack for normal window components.
    */
    porcelain.normalWindowStack = new ZStack(10000);

    /**
    * A predefined Z-stack for top-most window components.
    */
    porcelain.topMostWindowStack = new ZStack(20000);

    /**
    * A predefined Z-stack for popup window components.
    */
    porcelain.popupWindowStack = new ZStack(30000);
})(porcelain || (porcelain = {}));
//# sourceMappingURL=z_stack.js.map
