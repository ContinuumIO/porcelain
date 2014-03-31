var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    var WINDOW_CLASS = "p-Window";

    var BODY_CLASS = "p-Window-body";

    var SIZE_GRIP_CLASS = "p-Window-sizeGrip";

    var TITLE_BAR_CLASS = "p-Window-titleBar";

    var GRIP_AREAS = [
        0 /* Left */,
        1 /* Top */,
        2 /* Right */,
        3 /* Bottom */,
        4 /* TopLeft */,
        5 /* TopRight */,
        6 /* BottomLeft */,
        7 /* BottomRight */
    ];

    var windowStack = new porcelain.ZStack(1000);

    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            _super.call(this);
            this._layoutItem = new porcelain.LayoutItem(this);
            this.addClass(WINDOW_CLASS);

            var children = [];

            var body = this._body = new porcelain.Item();
            body.addClass(BODY_CLASS);
            children.push(body);

            var self = this;
            GRIP_AREAS.forEach(function (area) {
                var grip = new porcelain.SizeGrip(area, self);
                grip.addClass(SIZE_GRIP_CLASS);
                children.push(grip);
            });

            var titleBar = this._titleBar = new porcelain.TitleBar(this._layoutItem);
            titleBar.addClass(TITLE_BAR_CLASS);
            titleBar.restoreButton.element.style.display = "none";
            children.push(titleBar);

            this.append.apply(this, children);

            this._layoutItem.setMinimumSize({ width: 192, height: 192 });
            this._layoutItem.setGeometry(new porcelain.Rect(50, 50, 200, 200));

            this.bind("mousedown", this._onMouseDown);
        }
        Window.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._titleBar = null;
            this._body = null;
        };

        Object.defineProperty(Window.prototype, "layoutItem", {
            get: function () {
                return this._layoutItem;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Window.prototype, "zIndex", {
            get: function () {
                return parseInt(this.element.style.zIndex) || 0;
            },
            set: function (z) {
                this.element.style.zIndex = z ? z.toString() : "";
            },
            enumerable: true,
            configurable: true
        });


        Window.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        Window.prototype.setVisible = function (visible) {
            _super.prototype.setVisible.call(this, visible);
            if (visible && !this.element.parentNode) {
                windowStack.add(this);
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(this.element);
            }
        };

        Window.prototype.raise = function () {
            windowStack.raise(this);
        };

        Window.prototype.lower = function () {
            windowStack.lower(this);
        };

        Window.prototype._onMouseDown = function (event) {
            this.raise();
        };
        return Window;
    })(porcelain.Widget);
    porcelain.Window = Window;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=window.js.map
