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
     * The class added to a title bar icon area.
     */
    var ICON_CLASS = "p-TitleBar-icon";

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
         *
         * @param actor The layout actor to move with the title bar.
         */
        constructor(actor: ILayoutActor) {
            super();
            this._actor = actor;
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
            iconItem.addClass(ICON_CLASS);

            var textItem = this._textItem = new Item();
            textItem.addClass(TEXT_CLASS);
            textItem.element.innerHTML = "The Window Title";

            this.append(iconItem, btnBox, textItem);

            this.bind("mousedown", this._onMouseDown);
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

        /**
         * The close button attached to the title bar.
         *
         * @readonly
         */
        get closeButton(): Button {
            return this._closeButton;
        }

        /**
         * The restore button attached to the title bar.
         *
         * @readonly
         */
        get restoreButton(): Button {
            return this._restoreButton;
        }

        /**
         * The minimize button attached to the title bar.
         *
         * @readonly
         */
        get minimizeButton(): Button {
            return this._minimizeButton;
        }

        /**
         * The maximize button attached to the title bar.
         *
         * @readonly
         */
        get maximizeButton(): Button {
            return this._maximizeButton;
        }

        /**
         * The internal mousedown handler.
         *
         * @private
         */
        private _onMouseDown(event: MouseEvent): void {
            if (event.button !== 0) {
                return;
            }
            var target = event.target;
            if (target !== this._textItem.element &&
                target !== this._iconItem.element &&
                target !== this.element) {
                return;
            }
            event.preventDefault();
            this.bind("mouseup", this._onMouseUp, document);
            this.bind("mousemove", this._onMouseMove, document);
            var geo = this._actor.geometry();
            this._offsetX = event.pageX - geo.left;
            this._offsetY = event.pageY - geo.top;
        }

        /**
         * The internal mouseup handler.
         *
         * @private
         */
        private _onMouseUp(event: MouseEvent): void {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.unbind("mouseup", this._onMouseUp, document);
            this.unbind("mousemove", this._onMouseMove, document);
            this._offsetX = 0;
            this._offsetY = 0;
        }

        /**
         * The internal mousemove handler.
         *
         * @private
         */
        private _onMouseMove(event: MouseEvent): void {
            event.preventDefault();
            var vp = viewport;
            var x = Math.min(Math.max(vp.left, event.pageX), vp.windowRight);
            var y = Math.min(Math.max(vp.top, event.pageY), vp.windowBottom);
            var origin = { x: x - this._offsetX, y: y - this._offsetY };
            var rect = this._actor.geometry();
            rect.moveTopLeft(origin);
            this._actor.setGeometry(rect);
        }

        private _actor: ILayoutActor;
        private _iconItem: Item;
        private _textItem: Item;
        private _buttonBox: Item;
        private _closeButton: Button;
        private _restoreButton: Button;
        private _minimizeButton: Button;
        private _maximizeButton: Button;
        private _offsetX: number = 0;
        private _offsetY: number = 0;
    }

}
