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
    * The class added to a TitleBar instance.
    */
    var TITLE_BAR_CLASS = "p-TitleBar";

    /**
    * The class added to a title bar icon item.
    */
    var ICON_CLASS = "p-TitleBar-icon";

    /**
    * The class added to a title bar label item.
    */
    var LABEL_CLASS = "p-TitleBar-label";

    /**
    * The class added to a title bar button box.
    */
    var BUTTON_BOX_CLASS = "p-TitleBar-buttonBox";

    /**
    * The class added to a title bar close button.
    */
    var CLOSE_BUTTON_CLASS = "p-TitleBar-closeButton";

    /**
    * The class added to a title bar close button.
    */
    var MINIMIZE_BUTTON_CLASS = "p-TitleBar-minimizeButton";

    /**
    * The class added to a title bar close button.
    */
    var MAXIMIZE_BUTTON_CLASS = "p-TitleBar-maximizeButton";

    /**
    * The class added to a title bar close button.
    */
    var RESTORE_BUTTON_CLASS = "p-TitleBar-restoreButton";

    

    /**
    * A simple title bar widget for use in a typical window.
    *
    * The title bar is a dumb container widget. The window is
    * responsible for interacting directly with its sub items.
    *
    * @class
    */
    var TitleBar = (function (_super) {
        __extends(TitleBar, _super);
        /**
        * Construct a new TitleBar
        *
        * @param target The component to move with the title bar.
        */
        function TitleBar(target) {
            _super.call(this, target);
            this.addClass(TITLE_BAR_CLASS);

            var icon = new porcelain.Component();
            icon.addClass(ICON_CLASS);

            var label = new porcelain.Label();
            label.addClass(LABEL_CLASS);

            var minBtn = new porcelain.Button();
            minBtn.addClass(MINIMIZE_BUTTON_CLASS);

            var maxBtn = new porcelain.Button();
            maxBtn.addClass(MAXIMIZE_BUTTON_CLASS);

            var rstBtn = new porcelain.Button();
            rstBtn.addClass(RESTORE_BUTTON_CLASS);

            var clsBtn = new porcelain.Button();
            clsBtn.addClass(CLOSE_BUTTON_CLASS);

            var btnBox = new porcelain.Component();
            btnBox.addClass(BUTTON_BOX_CLASS);
            btnBox.append(minBtn, rstBtn, maxBtn, clsBtn);

            this._subItems = {
                icon: icon,
                label: label,
                minimizeButton: minBtn,
                maximizeButton: maxBtn,
                restoreButton: rstBtn,
                closeButton: clsBtn,
                buttonBox: btnBox
            };

            // the order is important for CSS float layout
            this.append(icon, btnBox, label);
        }
        /**
        * Destroy the title bar.
        */
        TitleBar.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._subItems = null;
        };

        /**
        * Returns the icon item attached to the title bar.
        */
        TitleBar.prototype.icon = function () {
            return this._subItems.icon;
        };

        /**
        * Returns the label item attached to the title bar.
        */
        TitleBar.prototype.label = function () {
            return this._subItems.label;
        };

        /**
        * Returns the close button attached to the title bar.
        */
        TitleBar.prototype.closeButton = function () {
            return this._subItems.closeButton;
        };

        /**
        * Returns the restore button attached to the title bar.
        */
        TitleBar.prototype.restoreButton = function () {
            return this._subItems.restoreButton;
        };

        /**
        * Returns the minimize button attached to the title bar.
        */
        TitleBar.prototype.minimizeButton = function () {
            return this._subItems.minimizeButton;
        };

        /**
        * Returns the maximize button attached to the title bar.
        */
        TitleBar.prototype.maximizeButton = function () {
            return this._subItems.maximizeButton;
        };

        /**
        * The mousedown handler.
        *
        * This is a reimplemented parent class method. The mouse press
        * is ignored when clicking within the bounds of the button box.
        *
        * @protected
        */
        TitleBar.prototype.onMouseDown = function (event) {
            if (event.button !== 0) {
                return;
            }
            var elem = this._subItems.buttonBox.element();
            var rect = new porcelain.Rect(elem.getBoundingClientRect());
            var point = new porcelain.Point(event.clientX, event.clientY);
            if (rect.contains(point)) {
                return;
            }
            _super.prototype.onMouseDown.call(this, event);
        };
        return TitleBar;
    })(porcelain.MoveGrip);
    porcelain.TitleBar = TitleBar;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=title_bar.js.map
