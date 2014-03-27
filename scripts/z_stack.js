/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var ZStack = (function () {
        function ZStack(minZ) {
            this._stack = [];
            this._minZ = minZ;
        }
        Object.defineProperty(ZStack.prototype, "top", {
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
            get: function () {
                if (this._stack.length) {
                    return this._stack[0];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });

        ZStack.prototype.contains = function (item) {
            return this._stack.indexOf(item) !== -1;
        };

        ZStack.prototype.add = function (item) {
            if (!item || this.contains(item)) {
                return;
            }
            var z = this._minZ + this._stack.length;
            this._stack.push(item);
            item.element.style.zIndex = z.toString();
        };

        ZStack.prototype.remove = function (item) {
            var index = this._stack.indexOf(item);
            if (index >= 0) {
                this._stack.splice(index, 1);
                this._updateIndices();
            }
        };

        ZStack.prototype.raise = function () {
            var items = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                items[_i] = arguments[_i + 0];
            }
            if (items.length === 1 && items[0] === this.top) {
                return;
            }
            var cr = this._classify(items);
            this._stack = cr.oldItems.concat(cr.newItems);
            this._updateIndices();
        };

        ZStack.prototype.lower = function () {
            var items = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                items[_i] = arguments[_i + 0];
            }
            if (items.length === 1 && items[0] === this.bottom) {
                return;
            }
            var cr = this._classify(items);
            this._stack = cr.newItems.concat(cr.oldItems);
            this._updateIndices();
        };

        ZStack.prototype._classify = function (items) {
            var oldItems = [];
            var newItems = [];
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
        };

        ZStack.prototype._updateIndices = function () {
            var minZ = this._minZ;
            var stack = this._stack;
            for (var i = 0, n = stack.length; i < n; ++i) {
                stack[i].element.style.zIndex = (i + minZ).toString();
            }
        };
        return ZStack;
    })();
    porcelain.ZStack = ZStack;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=z_stack.js.map
