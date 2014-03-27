/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

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
    export class TitleBar extends Widget {

        /** 
         * Construct a new TitleBar
         */
        constructor() {
            super();
            this.addClass(TITLE_BAR_CLASS);

            var minBtn = this._minimizeButton = new Button();
            minBtn.addClass(MINIMIZE_BUTTON_CLASS);

            var maxBtn = this._maximizeButton = new Button();
            maxBtn.addClass(MAXIMIZE_BUTTON_CLASS)

            var rstBtn = this._restoreButton = new Button();
            rstBtn.addClass(RESTORE_BUTTON_CLASS);

            var clsBtn = this._closeButton = new Button();
            clsBtn.addClass(CLOSE_BUTTON_CLASS);

            var btnBox = this._buttonBox = new Item();
            btnBox.addClass(BUTTON_BOX_CLASS);
            btnBox.append(minBtn, maxBtn, rstBtn, clsBtn);

            var iconItem = this._iconItem = new Item();
            iconItem.addClass("p-TitleBar-icon");

            var textItem = this._textItem = new Item();
            textItem.addClass(TEXT_CLASS);
            textItem.element.innerHTML = "The Window Title";

            this.append(iconItem, btnBox, textItem);
        }

        /**
         * Destroy the title bar.
         */
        destroy(): void {
            super.destroy();
            this._iconItem = null;
            this._textItem = null;
            this._buttonBox = null;
            this._closeButton = null;
            this._restoreButton = null;
            this._minimizeButton = null;
            this._maximizeButton = null;
        }

        get closeButton(): Button {
            return this._closeButton;
        }

        get restoreButton(): Button {
            return this._restoreButton;
        }

        get minimizeButton(): Button {
            return this._minimizeButton;
        }

        get maximizeButton(): Button {
            return this._maximizeButton;
        }

        private _iconItem: Item;
        private _textItem: Item;
        private _buttonBox: Item;
        private _closeButton: Button;
        private _restoreButton: Button;
        private _minimizeButton: Button;
        private _maximizeButton: Button;
    }

}
