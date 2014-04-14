/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A class for managing the Z-order of a collection of Items.
     *
     * @class
     */
    export
    class ZStack {

        /**
         * Construct a new ZStack.
         *
         * @param minIndex The minimum Z-index of the stack.
         */
        constructor(minIndex: number) {
            this._minIndex = minIndex;
        }

        /**
         * Returns the component on the top of the stack.
         */
        top(): Component {
            if (this._stack.length) {
                return this._stack[this._stack.length - 1];
            }
            return null;
        }

        /**
         * Returns the component on the bottom of the stack.
         */
        bottom(): Component {
            if (this._stack.length) {
                return this._stack[0];
            }
            return null;
        }

        /**
         * Returns true if the stack contains the given component.
         *
         * @param component The component of interest.
         */
        contains(component: Component): boolean {
            return this._stack.indexOf(component) !== -1;
        }

        /**
         * Add a component to the top of the stack.
         *
         * If the stack already contains the component, this is a no-op.
         *
         * @param component The component to add to the stack.
         */
        add(component: Component): void {
            if (!component || this.contains(component)) {
                return;
            }
            var index = this._minIndex + this._stack.length;
            this._stack.push(component);
            setZIndex(component, index);
        }

        /**
         * Remove a component from the stack and clear its Z-index.
         *
         * If the stack does not contain the component, this is a no-op.
         */
        remove(component: Component): void {
            var index = this._stack.indexOf(component);
            if (index >= 0) {
                this._stack.splice(index, 1);
                setZIndex(component, 0);
                this._updateIndices();
            }
        }

        /**
         * Raise the specified components to the top of the stack.
         *
         * The relative stacking order of the components will be maintained.
         */
        raise(...components: Component[]): void {
            if (components.length === 1 && components[0] === this.top()) {
                return;
            }
            var cr = this._classify(components);
            this._stack = cr.oldComps.concat(cr.newComps);
            this._updateIndices();
        }

        /**
         * Lower the specified components to the bottom of the stack.
         *
         * The relative stacking order of the components will be maintained.
         */
        lower(...components: Component[]): void {
            if (components.length === 1 && components[0] === this.bottom()) {
                return;
            }
            var cr = this._classify(components);
            this._stack = cr.newComps.concat(cr.oldComps);
            this._updateIndices();
        }

        /**
         * Classify the given and current components into old and new.
         *
         * @private
         */
        private _classify(components: Component[]): IClassifyResult {
            var oldComps: Component[] = [];
            var newComps: Component[] = [];
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
        }

        /**
         * Update the Z-indices for the current stack components.
         *
         * @private
         */
        private _updateIndices(): void {
            var minIndex = this._minIndex;
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                setZIndex(stack[i], minIndex + i);
            }
        }

        private _minIndex: number;
        private _stack: Component[] = [];
    }


    /**
     * A predefinined Z-stack for normal window components.
     */
    export
    var normalWindowStack = new ZStack(10000);


    /**
     * A predefined Z-stack for top-most window components.
     */
    export
    var topMostWindowStack = new ZStack(20000);


    /**
     * A predefined Z-stack for popup window components.
     */
    export
    var popupWindowStack = new ZStack(30000);


    /**
     * The internal interface for a Z-stack classification.
     */
    interface IClassifyResult {
        oldComps: Component[];
        newComps: Component[];
    }


    /**
     * Get the numeric Z-index of the given component.
     */
    function getZIndex(component: Component): number {
        return parseInt(component.computedStyle().zIndex) || 0;
    }


    /**
     * Set the numeric Z-index of the given component.
     */
    function setZIndex(component: Component, index: number): void {
        component.style().zIndex = index ? index.toString() : "";
    }

}
