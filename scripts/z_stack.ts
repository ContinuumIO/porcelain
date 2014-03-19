/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    interface StackPair {
        item: Item;
        jq: JQuery;
    }

    interface ClassifyResult {
        oldPairs: StackPair[];
        newPairs: StackPair[];
    }

    export class ZStack {

        constructor(minZ: number) {
            this._minZ = minZ;
        }

        get top(): Item {
            if (this._stack.length) {
                return this._stack[this._stack.length - 1].item;
            }
            return null;
        }

        get bottom(): Item {
            if (this._stack.length) {
                return this._stack[0].item;
            }
            return null;
        }

        contains(item: Item): boolean {
            var found = false;
            $.each(this._stack, function (index, pair) {
                if (pair.item === item) {
                    found = true;
                    return false;
                }
            });
            return found;
        }

        add(item: Item): void {
            if (this.contains(item)) {
                return;
            }
            if (item.element === null) {
                throw "null Item element";
            }
            var z = this._minZ + this._stack.length;
            var pair = { item: item, jq: $(item.element) };
            this._stack.push(pair);
            pair.jq.css("z-index", z);
        }

        remove(item: Item): void {
            var i = -1;
            $.each(this._stack, function (index, pair) {
                if (pair.item === item) {
                    i = index;
                    return false;
                }
            });
            if (i >= 0) {
                this._stack.splice(i, 1);
                this._updateIndices();
            }
        }

        raise(...items: Item[]): void {
            if (items.length === 1 && items[0] === this.top) {
                return;
            }
            var cr = this._classify(items);
            this._stack = cr.oldPairs.concat(cr.newPairs);
            this._updateIndices();
        }

        lower(...items: Item[]): void {
            if (items.length === 1 && items[0] === this.bottom) {
                return;
            }
            var cr = this._classify(items);
            this._stack = cr.newPairs.concat(cr.oldPairs);
            this._updateIndices();
        }

        private _classify(items: Item[]): ClassifyResult {
            var oldPairs: StackPair[] = [];
            var newPairs: StackPair[] = [];
            $.each(this._stack, function (index, pair) {
                if (items.indexOf(pair.item) === -1) {
                    oldPairs.push(pair);
                } else {
                    newPairs.push(pair);
                }
            });
            newPairs.sort(function (a, b) {
                var z1 = parseInt(a.jq.css("z-index")) || 0;
                var z2 = parseInt(b.jq.css("z-index")) || 0;
                return z1 - z2;
            });
            return { oldPairs: oldPairs, newPairs: newPairs };
        }

        private _updateIndices(): void {
            var minZ = this._minZ;
            $.each(this._stack, function (index, pair) {
                pair.jq.css("z-index", index + minZ);
            });
        }

        private _stack: StackPair[] = [];
        private _minZ: number;
    }

}
