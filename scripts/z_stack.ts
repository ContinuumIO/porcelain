/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The interface for defining a ZStackItem.
     */
    export interface IZStackItem {
        zIndex: number;
    }


    /**
     * The internal interface for a z-stack classification.
     */
    interface IClassifyResult {
        oldItems: IZStackItem[];
        newItems: IZStackItem[];
    }


    /**
     * A class for managing the z-order of a collection of items.
     */
    export class ZStack {

        /**
         * Construct a new ZStack.
         *
         * @param minZ The z-index to use for the bottom of the stack.
         */
        constructor(minZ: number) {
            this._minZ = minZ;
        }

        /**
         * The item on the top of the z-stack.
         *
         * @readonly
         */
        get top(): IZStackItem {
            if (this._stack.length) {
                return this._stack[this._stack.length - 1];
            }
            return null;
        }
    
        /**
         * The item on the bottom of the z-stack.
         *
         * @readonly
         */
        get bottom(): IZStackItem {
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
        contains(item: IZStackItem): boolean {
            return this._stack.indexOf(item) !== -1;
        }

        /**
         * Add an item to the top of the z-stack.
         *
         * If the stack already contains the item, this is a no-op.
         *
         * @param item The item to add to the stack.
         */
        add(item: IZStackItem): void {
            if (!item || this.contains(item)) {
                return;
            }
            var z = this._minZ + this._stack.length;
            this._stack.push(item);
            item.zIndex = z;
        }

        /**
         * Remove an item from the z-stack and reset its z-index.
         *
         * If the stack does not contain the item, this is a no-op.
         */
        remove(item: IZStackItem): void {
            var index = this._stack.indexOf(item);
            if (index >= 0) {
                this._stack.splice(index, 1);
                item.zIndex = null;
                this._updateIndices();
            }
        }

        /** 
         * Raise the specified items to the top of the stack.
         *
         * The relative stack order of the items will be maintained.
         */
        raise(...items: IZStackItem[]): void {
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
         * The relative stack order of the items will be maintained.
         */
        lower(...items: IZStackItem[]): void {
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
        private _classify(items: IZStackItem[]): IClassifyResult {
            var oldItems: IZStackItem[] = [];
            var newItems: IZStackItem[] = [];
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
                var z1 = a.zIndex || 0;
                var z2 = b.zIndex || 0;
                return z1 - z2;
            });
            return { oldItems: oldItems, newItems: newItems };
        }

        /**
         * Update the z indices for the current stack items.
         *
         * @private
         */
        private _updateIndices(): void {
            var minZ = this._minZ;
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                stack[i].zIndex = i + minZ;
            }
        }

        private _stack: IZStackItem[] = [];
        private _minZ: number;
    }

}
