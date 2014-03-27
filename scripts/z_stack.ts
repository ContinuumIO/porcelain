/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    interface ClassifyResult {
        oldItems: Item[];
        newItems: Item[];
    }


    export class ZStack {

        constructor(minZ: number) {
            this._minZ = minZ;
        }

        get top(): Item {
            if (this._stack.length) {
                return this._stack[this._stack.length - 1];
            }
            return null;
        }

        get bottom(): Item {
            if (this._stack.length) {
                return this._stack[0];
            }
            return null;
        }

        contains(item: Item): boolean {
            return this._stack.indexOf(item) !== -1;
        }

        add(item: Item): void {
            if (!item || this.contains(item)) {
                return;
            }
            var z = this._minZ + this._stack.length;
            this._stack.push(item);
            item.element.style.zIndex = z.toString();
        }

        remove(item: Item): void {
            var index = this._stack.indexOf(item);
            if (index >= 0) {
                this._stack.splice(index, 1);
                this._updateIndices();
            }
        }

        raise(...items: Item[]): void {
            if (items.length === 1 && items[0] === this.top) {
                return;
            }
            var cr = this._classify(items);
            this._stack = cr.oldItems.concat(cr.newItems);
            this._updateIndices();
        }

        lower(...items: Item[]): void {
            if (items.length === 1 && items[0] === this.bottom) {
                return;
            }
            var cr = this._classify(items);
            this._stack = cr.newItems.concat(cr.oldItems);
            this._updateIndices();
        }

        private _classify(items: Item[]): ClassifyResult {
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
                var z1 = parseInt(a.element.style.zIndex) || 0;
                var z2 = parseInt(a.element.style.zIndex) || 0;
                return z1 - z2;
            });
            return { oldItems: oldItems, newItems: newItems };
        }

        private _updateIndices(): void {
            var minZ = this._minZ;
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                stack[i].element.style.zIndex = (i + minZ).toString();
            }
        }

        private _stack: Item[] = [];
        private _minZ: number;
    }

}
