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

    var Window = (function (_super) {
        __extends(Window, _super);
        function Window() {
            _super.call(this);
            this.mousedown = new porcelain.EventBinder("mousedown", this.element);
            this.addClass(WINDOW_CLASS);

            var children = [];

            var body = this._body = new porcelain.Component();
            body.addClass(BODY_CLASS);
            children.push(body);

            var self = this;
            GRIP_AREAS.forEach(function (area) {
                var grip = new porcelain.SizeGrip(area, self);
                grip.addClass(SIZE_GRIP_CLASS);
                children.push(grip);
            });

            var titleBar = this._titleBar = new porcelain.TitleBar(self);
            titleBar.addClass(TITLE_BAR_CLASS);
            titleBar.restoreButton.hide();
            titleBar.restoreButton.clicked.connect(this.restore, this);
            titleBar.maximizeButton.clicked.connect(this.maximize, this);
            titleBar.minimizeButton.clicked.connect(this.minimize, this);
            titleBar.closeButton.clicked.connect(this.close, this);
            titleBar.label.element.innerHTML = "The Window Title";

            children.push(titleBar);

            this.append.apply(this, children);

            this.mousedown.bind(this.onMouseDown, this);

            this.position = "absolute";
            this.offsetSize = this.minimumSizeHint();

            porcelain.globalNormalWindowStack.add(this);
        }
        Window.prototype.destroy = function () {
            porcelain.globalNormalWindowStack.remove(this);
            _super.prototype.destroy.call(this);
            this._titleBar = null;
            this._body = null;
        };

        Window.prototype.minimumSizeHint = function () {
            return new porcelain.Size(192, 192);
        };

        Window.prototype.attach = function (elem) {
            if (!elem) {
                elem = document.getElementsByTagName("body")[0];
            }
            elem.appendChild(this.element);
        };

        Window.prototype.raise = function () {
            porcelain.globalNormalWindowStack.raise(this);
        };

        Window.prototype.lower = function () {
            porcelain.globalNormalWindowStack.lower(this);
        };

        Window.prototype.onMouseDown = function (event) {
            this.raise();
        };

        Window.prototype.maximize = function () {
            var titleBar = this._titleBar;
            titleBar.maximizeButton.hide();
            titleBar.restoreButton.show();
            console.log("maximize me");
        };

        Window.prototype.restore = function () {
            var titleBar = this._titleBar;
            titleBar.restoreButton.hide();
            titleBar.maximizeButton.show();
            console.log("restore me");
        };

        Window.prototype.minimize = function () {
            console.log("minimize me");
        };

        Window.prototype.close = function () {
            console.log("close me");
            this.hide();
            this.destroy();
        };
        return Window;
    })(porcelain.Component);
    porcelain.Window = Window;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=window.js.map
