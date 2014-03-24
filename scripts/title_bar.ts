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
     * A title bar for use in a top level window.
     *
     * @class
     */
    export class TitleBar extends Item {

        constructor(target: Geometry, parent: Item = null) {
            super(parent);
            this._target = target;

            var minBtn = this._minimizeButton = new Button(this);
            minBtn.$.addClass(MINIMIZE_BUTTON_CLASS);

            var maxBtn = this._maximizeButton = new Button(this);
            maxBtn.$.addClass(MAXIMIZE_BUTTON_CLASS)

            var rstBtn = this._restoreButton = new Button(this);
            rstBtn.$.addClass(RESTORE_BUTTON_CLASS);

            var clsBtn = this._closeButton = new Button(this);
            clsBtn.$.addClass(CLOSE_BUTTON_CLASS);

            var btnBox = this._buttonBox = new Item(this);
            btnBox.$.addClass(BUTTON_BOX_CLASS)
                .append(
                    minBtn.element,
                    maxBtn.element,
                    rstBtn.element,
                    clsBtn.element
                );

            var textItem = this._textItem = new Item(this);
            textItem.$.addClass(TEXT_CLASS);
            textItem.element.innerHTML = "The Window Title";

            this.$.addClass(TITLE_BAR_CLASS)
                .append(
                    textItem.element,
                    btnBox.element
                );
        }

        destroy(): void {
            super.destroy();
            this._target = null;
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

        private _target: Geometry;
        private _textItem: Item;
        private _buttonBox: Item;
        private _closeButton: Button;
        private _restoreButton: Button;
        private _minimizeButton: Button;
        private _maximizeButton: Button;
    }

}
