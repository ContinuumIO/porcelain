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
                    return this._stack[this._stack.length - 1].item;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ZStack.prototype, "bottom", {
            get: function () {
                if (this._stack.length) {
                    return this._stack[0].item;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });

        ZStack.prototype.contains = function (item) {
            var found = false;
            $.each(this._stack, function (index, pair) {
                if (pair.item === item) {
                    found = true;
                    return false;
                }
            });
            return found;
        };

        ZStack.prototype.add = function (item) {
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
        };

        ZStack.prototype.remove = function (item) {
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
            this._stack = cr.oldPairs.concat(cr.newPairs);
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
            this._stack = cr.newPairs.concat(cr.oldPairs);
            this._updateIndices();
        };

        ZStack.prototype._classify = function (items) {
            var oldPairs = [];
            var newPairs = [];
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
        };

        ZStack.prototype._updateIndices = function () {
            var minZ = this._minZ;
            $.each(this._stack, function (index, pair) {
                pair.jq.css("z-index", index + minZ);
            });
        };
        return ZStack;
    })();
    porcelain.ZStack = ZStack;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=zstack.js.map
