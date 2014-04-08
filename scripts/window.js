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
    

    /**
    * An enum defining the window state.
    */
    var WindowState;
    (function (WindowState) {
        WindowState[WindowState["Normal"] = 0] = "Normal";
        WindowState[WindowState["Minimized"] = 1] = "Minimized";
        WindowState[WindowState["Maximized"] = 2] = "Maximized";
    })(WindowState || (WindowState = {}));

    /**
    * A top-level Window component.
    *
    * A Window looks and behaves much like its desktop counterpart.
    * It should never be added as the child of another component.
    */
    var Window = (function (_super) {
        __extends(Window, _super);
        /**
        * Construct a new Window.
        */
        function Window() {
            _super.call(this);
            /**
            * The mousedown event handler.
            */
            this.evtMouseDown = new porcelain.EventBinder("mousedown", this.element());
            this._windowState = 0 /* Normal */;
            this.addClass(Window.Class);

            // The children to be added to the window.
            var children = [];

            // The body component which holds the window content.
            var body = new porcelain.Component();
            body.addClass(Window.BodyClass);
            children.push(body);

            // The size grips for interactive window resizing.
            var gripAreas = porcelain.enumValues(porcelain.GripArea);
            for (var i = 0, n = gripAreas.length; i < n; ++i) {
                var grip = new porcelain.SizeGrip(gripAreas[i], this);
                grip.addClass(Window.SizeGripClass);
                children.push(grip);
            }

            // The window title bar.
            var titleBar = new porcelain.TitleBar(this);
            titleBar.addClass(Window.TitleBarClass);
            children.push(titleBar);

            // The restore button is hidden by default, and shown
            // when the window is maximized.
            titleBar.restoreButton().setDisplay("none");

            // Connect the title bar button clicked signals.
            titleBar.restoreButton().clicked.connect(this.restore, this);
            titleBar.maximizeButton().clicked.connect(this.maximize, this);
            titleBar.minimizeButton().clicked.connect(this.minimize, this);
            titleBar.closeButton().clicked.connect(this.close, this);

            // Store the sub items for later use.
            this._subItems = {
                titleBar: titleBar,
                body: body
            };

            // Add the window children.
            this.append.apply(this, children);

            // Set the positioning mode and initial size of the window.
            this.setPosition("absolute");
            this.setMinimumSize(new porcelain.Size(192, 192));

            // Bind the Window mousedown handler.
            this.evtMouseDown.bind(this.onMouseDown, this);

            // Add the window to the global Z stack.
            porcelain.normalWindowStack.add(this);
        }
        /**
        * Destroy the Window component.
        */
        Window.prototype.destroy = function () {
            porcelain.normalWindowStack.remove(this);
            _super.prototype.destroy.call(this);
            this._subItems = null;
        };

        /**
        * Returns the title text in the Window title bar.
        */
        Window.prototype.title = function () {
            return this._subItems.titleBar.label().text();
        };

        /**
        * Set the title text in the Window title bar.
        */
        Window.prototype.setTitle = function (value) {
            this._subItems.titleBar.label().setText(value);
        };

        /**
        * Attach the Window to the given DOM element.
        *
        * If not provided, it will be attached to the document body.
        */
        Window.prototype.attach = function (elem) {
            (elem || document.body).appendChild(this.element());
            this.afterAttach();
        };

        /**
        * Raise the window to the top of the Z order.
        */
        Window.prototype.raise = function () {
            porcelain.normalWindowStack.raise(this);
        };

        /**
        * Lower the window to the bottom of the Z order.
        */
        Window.prototype.lower = function () {
            porcelain.normalWindowStack.lower(this);
        };

        /**
        * Maximize the window to fit the browser page.
        */
        Window.prototype.maximize = function () {
            this._setWindowState(2 /* Maximized */);
        };

        /**
        * Restore the window to its normal size.
        */
        Window.prototype.restore = function () {
            this._setWindowState(0 /* Normal */);
        };

        /**
        * Minimize the window to the task bar.
        */
        Window.prototype.minimize = function () {
            this._setWindowState(1 /* Minimized */);
        };

        /**
        * Close the window.
        *
        * This will hide the window and then destroy it.
        */
        Window.prototype.close = function () {
            this.setDisplay("none");
            this.destroy();
        };

        /**
        * The mousedown event handler.
        *
        * @protected
        */
        Window.prototype.onMouseDown = function (event) {
            this.raise();
        };

        /**
        * An internal helper method for setting the window state.
        */
        Window.prototype._setWindowState = function (state) {
            if (state === this._windowState) {
                return;
            }
            this._windowState = state;
            var titleBar = this._subItems.titleBar;
            var maxBtn = titleBar.maximizeButton();
            var rstBtn = titleBar.restoreButton();
            switch (state) {
                case 0 /* Normal */:
                case 1 /* Minimized */:
                    rstBtn.setDisplay("none");
                    maxBtn.setDisplay("");
                    this.removeClass(porcelain.CommonClass.Maximized);
                    this.setRect(this._stored);
                    break;
                case 2 /* Maximized */:
                    maxBtn.setDisplay("none");
                    rstBtn.setDisplay("");
                    this._stored = this.rect();
                    this.addClass(porcelain.CommonClass.Maximized);
                    this.setRect(new porcelain.Rect(0, 0, -1, -1));
                    break;
                default:
                    break;
            }
        };
        Window.Class = "p-Window";

        Window.BodyClass = "p-Window-body";

        Window.SizeGripClass = "p-Window-sizeGrip";

        Window.TitleBarClass = "p-Window-titleBar";
        return Window;
    })(porcelain.Component);
    porcelain.Window = Window;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=window.js.map
