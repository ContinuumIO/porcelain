/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var Item = (function () {
        function Item(parent) {
            if (typeof parent === "undefined") { parent = null; }
            this._parent = null;
            this._children = null;
            this.setParent(parent);
        }
        Item.prototype.parent = function () {
            return this._parent;
        };

        Item.prototype.setParent = function (parent) {
            var old_parent = this._parent;
            if (parent === old_parent) {
                return;
            }
            if (parent === this) {
                throw "cannot use 'this' as Item parent";
            }
            this._parent = parent;
            if (old_parent !== null) {
                porcelain.removeItem(old_parent._children, this);
                old_parent.childRemoved(this);
            }
            if (parent !== null) {
                parent._children.push(this);
                parent.childAdded(this);
            }
            this.parentChanged(old_parent, parent);
        };

        Item.prototype.children = function () {
            if (this._children === null) {
                return [];
            }
            return this._children.slice();
        };

        Item.prototype.childAdded = function (child) {
        };

        Item.prototype.childRemoved = function (child) {
        };

        Item.prototype.parentChanged = function (old_parent, new_parent) {
        };
        return Item;
    })();
    porcelain.Item = Item;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=item.js.map
