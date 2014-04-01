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
     * An interface for storing the sub items of a title bar.
     */
    interface ITitleBarSubItems {
        icon: Component;
        label: Component;
        minimizeButton: Button;
        maximizeButton: Button;
        restoreButton: Button;
        closeButton: Button;
        buttonBox: Component;
    }


    /**
     * A simple title bar widget for use in a typical window.
     *
     * The title bar is a dumb container widget. The window is 
     * responsible for interacting directly with its sub items.
     *
     * @class
     */
    export class TitleBar extends MoveGrip {

        /** 
         * Construct a new TitleBar
         *
         * @param target The adjustable item moved by the title bar.
         */
        constructor(target: ILayoutItem) {
            super(target);
            this.addClass(TITLE_BAR_CLASS);

            var icon = new Component();
            icon.addClass(ICON_CLASS);

            var label = new Component();
            label.addClass(LABEL_CLASS);

            var minBtn = new Button();
            minBtn.addClass(MINIMIZE_BUTTON_CLASS);

            var maxBtn = new Button();
            maxBtn.addClass(MAXIMIZE_BUTTON_CLASS);

            var rstBtn = new Button();
            rstBtn.addClass(RESTORE_BUTTON_CLASS);

            var clsBtn = new Button();
            clsBtn.addClass(CLOSE_BUTTON_CLASS);

            var btnBox = new Component();
            btnBox.addClass(BUTTON_BOX_CLASS);
            btnBox.append(minBtn, maxBtn, rstBtn, clsBtn);

            this._subItems = {
                icon: icon,
                label: label,
                minimizeButton: minBtn,
                maximizeButton: maxBtn,
                restoreButton: rstBtn,
                closeButton: clsBtn,
                buttonBox: btnBox,
            };

            // the order is important for CSS float layout
            this.append(icon, btnBox, label);
        }

        /**
         * Destroy the title bar.
         */
        destroy(): void {
            super.destroy();
            this._subItems = null;
        }

        /**
         * The icon item attached to the title bar.
         *
         * @readonly
         */
        get icon(): Component {
            return this._subItems.icon;
        }

        /**
         * The label item attached to the title bar.
         *
         * @readonly
         */
        get label(): Component {
            return this._subItems.label;
        }

        /**
         * The close button attached to the title bar.
         *
         * @readonly
         */
        get closeButton(): Button {
            return this._subItems.closeButton;
        }

        /**
         * The restore button attached to the title bar.
         *
         * @readonly
         */
        get restoreButton(): Button {
            return this._subItems.restoreButton;
        }

        /**
         * The minimize button attached to the title bar.
         *
         * @readonly
         */
        get minimizeButton(): Button {
            return this._subItems.minimizeButton;
        }

        /**
         * The maximize button attached to the title bar.
         *
         * @readonly
         */
        get maximizeButton(): Button {
            return this._subItems.maximizeButton;
        }

        /**
         * The mousedown handler.
         *
         * This is a reimplemented parent class method. The mouse press 
         * is ignored when clicking within the bounds of the button box.
         *
         * @protected
         */
        onMouseDown(event: MouseEvent): void {
            if (event.button !== 0) {
                return;
            }
            var btnBox = this._subItems.buttonBox;
            var rect = new Rect(btnBox.element.getBoundingClientRect());
            var point = { x: event.clientX, y: event.clientY };
            if (rect.contains(point)) {
                return;
            }
            super.onMouseDown(event);
        }

        private _subItems: ITitleBarSubItems;
    }

}
