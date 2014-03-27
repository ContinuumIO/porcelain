﻿var __extends = this.__extends || function (d, b) {
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
    * The class added to a title bar text area.
    */
    var TEXT_CLASS = "p-TitleBar-text";

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
    * A title bar widget for use in a top level window.
    *
    * @class
    */
    var TitleBar = (function (_super) {
        __extends(TitleBar, _super);
        /**
        * Construct a new TitleBar
        */
        function TitleBar() {
            _super.call(this);
            this.addClass(TITLE_BAR_CLASS);

            var minBtn = this._minimizeButton = new porcelain.Button();
            minBtn.addClass(MINIMIZE_BUTTON_CLASS);

            var maxBtn = this._maximizeButton = new porcelain.Button();
            maxBtn.addClass(MAXIMIZE_BUTTON_CLASS);

            var rstBtn = this._restoreButton = new porcelain.Button();
            rstBtn.addClass(RESTORE_BUTTON_CLASS);

            var clsBtn = this._closeButton = new porcelain.Button();
            clsBtn.addClass(CLOSE_BUTTON_CLASS);

            var btnBox = this._buttonBox = new porcelain.Item();
            btnBox.addClass(BUTTON_BOX_CLASS);
            btnBox.append(minBtn, maxBtn, rstBtn, clsBtn);

            var iconItem = this._iconItem = new porcelain.Item();
            iconItem.addClass("p-TitleBar-icon");

            var textItem = this._textItem = new porcelain.Item();
            textItem.addClass(TEXT_CLASS);
            textItem.element.innerHTML = "The Window Title";

            this.append(iconItem, btnBox, textItem);
        }
        /**
        * Destroy the title bar.
        */
        TitleBar.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._iconItem = null;
            this._textItem = null;
            this._buttonBox = null;
            this._closeButton = null;
            this._restoreButton = null;
            this._minimizeButton = null;
            this._maximizeButton = null;
        };

        Object.defineProperty(TitleBar.prototype, "closeButton", {
            get: function () {
                return this._closeButton;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TitleBar.prototype, "restoreButton", {
            get: function () {
                return this._restoreButton;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TitleBar.prototype, "minimizeButton", {
            get: function () {
                return this._minimizeButton;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TitleBar.prototype, "maximizeButton", {
            get: function () {
                return this._maximizeButton;
            },
            enumerable: true,
            configurable: true
        });
        return TitleBar;
    })(porcelain.Widget);
    porcelain.TitleBar = TitleBar;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=title_bar.js.map
