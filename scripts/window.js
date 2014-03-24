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

    var windowStack = new porcelain.ZStack(1000);

    var Window = (function (_super) {
        __extends(Window, _super);
        function Window(parent) {
            if (typeof parent === "undefined") { parent = null; }
            var _this = this;
            _super.call(this, parent);
            this._onMouseDown = function (event) {
                _this.raise();
            };

            var geo = this._geometry = new porcelain.Geometry(this.element);

            var body = this._body = new porcelain.Item(this);
            $(body.element).addClass(BODY_CLASS);

            var titleBar = this._titleBar = new porcelain.TitleBar(geo, this);
            $(titleBar.element).addClass(TITLE_BAR_CLASS);

            var tgrip = new porcelain.SizeGrip(1 /* Top */, geo, this);
            tgrip.$.addClass(SIZE_GRIP_CLASS);

            var lgrip = new porcelain.SizeGrip(0 /* Left */, geo, this);
            lgrip.$.addClass(SIZE_GRIP_CLASS);

            var rgrip = new porcelain.SizeGrip(2 /* Right */, geo, this);
            rgrip.$.addClass(SIZE_GRIP_CLASS);

            var bgrip = new porcelain.SizeGrip(3 /* Bottom */, geo, this);
            bgrip.$.addClass(SIZE_GRIP_CLASS);

            var tlgrip = new porcelain.SizeGrip(4 /* TopLeft */, geo, this);
            tlgrip.$.addClass(SIZE_GRIP_CLASS);

            var trgrip = new porcelain.SizeGrip(5 /* TopRight */, geo, this);
            trgrip.$.addClass(SIZE_GRIP_CLASS);

            var blgrip = new porcelain.SizeGrip(6 /* BottomLeft */, geo, this);
            blgrip.$.addClass(SIZE_GRIP_CLASS);

            var brgrip = new porcelain.SizeGrip(7 /* BottomRight */, geo, this);
            brgrip.$.addClass(SIZE_GRIP_CLASS);

            $(this.element).addClass(WINDOW_CLASS).mousedown(this._onMouseDown).append(body.element, tgrip.element, lgrip.element, rgrip.element, bgrip.element, tlgrip.element, trgrip.element, blgrip.element, brgrip.element, titleBar.element);

            // XXX temporary
            // Setup a default min, max, and initial size.
            this.geometry.minimumSize = { width: 192, height: 192 };
            this.geometry.maximumSize = { width: 640, height: 480 };
            this.geometry.rect = { x: 50, y: 50, width: 100, height: 100 };
        }
        Window.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._geometry.destroy();
            this._geometry = null;
            this._titleBar = null;
            this._body = null;
        };

        Window.prototype.show = function () {
            windowStack.add(this);
            $("body").append(this.element);
        };

        Window.prototype.raise = function () {
            windowStack.raise(this);
        };

        Window.prototype.lower = function () {
            windowStack.lower(this);
        };

        Object.defineProperty(Window.prototype, "geometry", {
            get: function () {
                return this._geometry;
            },
            enumerable: true,
            configurable: true
        });
        return Window;
    })(porcelain.Item);
    porcelain.Window = Window;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=window.js.map
