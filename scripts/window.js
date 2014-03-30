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

    var Sizer = (function () {
        function Sizer(elem) {
            this._rect = new porcelain.Rect();
            this._elem = elem;
        }
        Sizer.prototype.minimumSize = function () {
            return new porcelain.Size(192, 192);
        };

        Sizer.prototype.maximumSize = function () {
            return new porcelain.Size(800, 800);
        };

        Sizer.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        Sizer.prototype.geometry = function () {
            return new porcelain.Rect(this._rect);
        };

        Sizer.prototype.setGeometry = function (rect) {
            this._rect = rect;
            var s = this._elem.style;
            s.top = this._rect.top + "px";
            s.left = this._rect.left + "px";
            s.width = this._rect.width() + "px";
            s.height = this._rect.height() + "px";
        };
        return Sizer;
    })();

    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            _super.call(this);
            this.addClass(WINDOW_CLASS);

            var body = this._body = new porcelain.Item();
            body.addClass(BODY_CLASS);

            var actor = new Sizer(this.element);

            var titleBar = this._titleBar = new porcelain.TitleBar(actor);
            titleBar.addClass(TITLE_BAR_CLASS);
            titleBar.restoreButton.element.style.display = "none";

            var tgrip = new porcelain.SizeGrip(1 /* Top */, actor);
            tgrip.addClass(SIZE_GRIP_CLASS);

            var lgrip = new porcelain.SizeGrip(0 /* Left */, actor);
            lgrip.addClass(SIZE_GRIP_CLASS);

            var rgrip = new porcelain.SizeGrip(2 /* Right */, actor);
            rgrip.addClass(SIZE_GRIP_CLASS);

            var bgrip = new porcelain.SizeGrip(3 /* Bottom */, actor);
            bgrip.addClass(SIZE_GRIP_CLASS);

            var tlgrip = new porcelain.SizeGrip(4 /* TopLeft */, actor);
            tlgrip.addClass(SIZE_GRIP_CLASS);

            var trgrip = new porcelain.SizeGrip(5 /* TopRight */, actor);
            trgrip.addClass(SIZE_GRIP_CLASS);

            var blgrip = new porcelain.SizeGrip(6 /* BottomLeft */, actor);
            blgrip.addClass(SIZE_GRIP_CLASS);

            var brgrip = new porcelain.SizeGrip(7 /* BottomRight */, actor);
            brgrip.addClass(SIZE_GRIP_CLASS);

            this.append(body, tgrip, lgrip, rgrip, bgrip, tlgrip, trgrip, blgrip, brgrip, titleBar);

            actor.setGeometry(new porcelain.Rect(50, 50, 200, 200));

            this.bind("mousedown", this._onMouseDown);
        }
        Window.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._titleBar = null;
            this._body = null;
        };

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


        Window.prototype.show = function () {
            windowStack.add(this);
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(this.element);
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
