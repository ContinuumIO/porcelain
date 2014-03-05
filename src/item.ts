/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Item {

        constructor(parent: Item = null) {
            this.setParent(parent);
        }

        parent(): Item {
            return this._parent;
        }

        setParent(parent: Item): void {
            var old_parent = this._parent;
            if (parent === old_parent) {
                return;
            }
            if (parent === this) {
                throw "cannot use 'this' as Item parent";
            }
            this._parent = parent;
            if (old_parent !== null) {
                removeItem(old_parent._children, this);
                old_parent.childRemoved(this);
            }
            if (parent !== null) {
                parent._children.push(this);
                parent.childAdded(this);
            }
            this.parentChanged(old_parent, parent);
        }

        children(): Item[] {
            if (this._children === null) {
                return [];
            }
            return this._children.slice();
        }

        childAdded(child: Item): void { }

        childRemoved(child: Item): void { }

        parentChanged(old_parent: Item, new_parent: Item): void { }

        private _parent: Item = null;
        private _children: Item[] = null;
    }

}
