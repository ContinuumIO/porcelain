/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {


    /**
     * The internal interface for a z-stack classification.
     */
    interface IClassifyResult {
        oldItems: Item[];
        newItems: Item[];
    }


    /**
     * Get the z-index of an item.
     */
    function getZIndex(item: Item): number {
        var style = item.element.style;
        return parseInt(style.zIndex) || 0;
    }


    /**
     * Set the z-index of an item. 
     */
    function setZIndex(item: Item, index: number): void {
        var style = item.element.style;
        style.zIndex = index.toString();
    }


    /**
     * Clear the z-index on an item.
     */
    function clearZIndex(item: Item): void {
        var style = item.element.style;
        style.removeProperty("z-index");
    }


    /**
     * A class for managing the Z-order of a collection of Items.
     *
     * @class
     */
    export class ZStack {

        /**
         * Construct a new ZStack.
         *
         * @param minZ The Z-index to use for the bottom of the stack.
         */
        constructor(minZ: number) {
            this._minZ = minZ;
        }

        /**
         * The item on the top of the stack.
         *
         * @readonly
         */
        get top(): Item {
            if (this._stack.length) {
                return this._stack[this._stack.length - 1];
            }
            return null;
        }
    
        /**
         * The item on the bottom of the stack.
         *
         * @readonly
         */
        get bottom(): Item {
            if (this._stack.length) {
                return this._stack[0];
            }
            return null;
        }

        /**
         * Returns true if the stack contains the item.
         *
         * @param item The item of interest.
         */
        contains(item: Item): boolean {
            return this._stack.indexOf(item) !== -1;
        }

        /**
         * Add an item to the top of the stack.
         *
         * If the stack already contains the item, this is a no-op.
         *
         * @param item The item to add to the stack.
         */
        add(item: Item): void {
            if (!item || this.contains(item)) {
                return;
            }
            var index = this._minZ + this._stack.length;
            this._stack.push(item);
            setZIndex(item, index);
        }

        /**
         * Remove an item from the stack and clear its Z-index.
         *
         * If the stack does not contain the item, this is a no-op.
         */
        remove(item: Item): void {
            var index = this._stack.indexOf(item);
            if (index >= 0) {
                this._stack.splice(index, 1);
                clearZIndex(item);
                this._updateIndices();
            }
        }

        /** 
         * Raise the specified items to the top of the stack.
         *
         * The relative stacking order of the items will be maintained.
         */
        raise(...items: Item[]): void {
            if (items.length === 1 && items[0] === this.top) {
                return;
            }
            var cr = this._classify(items);
            this._stack = cr.oldItems.concat(cr.newItems);
            this._updateIndices();
        }

        /**
         * Lower the specified items to the bottom of the stack.
         *
         * The relative stacking order of the items will be maintained.
         */
        lower(...items: Item[]): void {
            if (items.length === 1 && items[0] === this.bottom) {
                return;
            }
            var cr = this._classify(items);
            this._stack = cr.newItems.concat(cr.oldItems);
            this._updateIndices();
        }

        /**
         * Classify the given items and current items into old and new.
         *
         * @private
         */
        private _classify(items: Item[]): IClassifyResult {
            var oldItems: Item[] = [];
            var newItems: Item[] = [];
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                var item = stack[i];
                if (items.indexOf(item) === -1) {
                    oldItems.push(item);
                } else {
                    newItems.push(item);
                }
            }
            newItems.sort(function (a, b) {
                return getZIndex(a) - getZIndex(b); 
            });
            return { oldItems: oldItems, newItems: newItems };
        }

        /**
         * Update the Z-indices for the current stack items.
         *
         * @private
         */
        private _updateIndices(): void {
            var minZ = this._minZ;
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                setZIndex(stack[i], i + minZ);
            }
        }

        private _stack: Item[] = [];
        private _minZ: number;
    }


    /**
     * A predefinined Z-stack for normal window items.
     */
    export var globalNormalWindowStack = new ZStack(10000);


    /**
     * A predefined Z-stack for top-most Window items.
     */
    export var globalTopMostWindowStack = new ZStack(20000);


    /**
     * A predefined Z-stack for popup window items.
     */
    export var globalPopupWindowStack = new ZStack(30000);

}
