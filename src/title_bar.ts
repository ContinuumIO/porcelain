/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A simple title bar widget for use in a typical window.
     *
     * The title bar is a dumb container widget. The window is
     * responsible for interacting directly with its sub items.
     *
     * @class
     */
    export
    class TitleBar extends MoveGrip {

        /**
         * The CSS class added to TitleBar instances.
         */
        static Class = "p-TitleBar";

        /**
         * The CSS class added to a TitleBar icon element.
         */
        static IconClass = "p-TitleBar-icon";

        /**
         * The CSS class added to a TitleBar label element.
         */
        static LabelClass = "p-TitleBar-label";

        /**
         * The CSS class added to a TitleBar button box.
         */
        static ButtonBoxClass = "p-TitleBar-buttonBox";

        /**
         * The CSS class added to a TitleBar close button.
         */
        static CloseButtonClass = "p-TitleBar-closeButton";

        /**
         * The CSS class added to a TitleBar minimize button.
         */
        static MinimizeButtonClass = "p-TitleBar-minimizeButton";

        /**
         * The CSS class added to a TitleBar maximize button.
         */
        static MaximizeButtonClass = "p-TitleBar-maximizeButton";

        /**
         * The CSS class added to a TitleBar restore button.
         */
        static RestoreButtonClass = "p-TitleBar-restoreButton";

        /**
         * Construct a new TitleBar
         *
         * @param target The component to move with the title bar.
         */
        constructor(target: Component) {
            super(target);
            this.addClass(TitleBar.Class);

            var icon = new Component();
            icon.addClass(TitleBar.IconClass);

            var label = new Label();
            label.addClass(TitleBar.LabelClass);
            label.addClass(CommonClass.LargeText);

            var minBtn = new Button();
            minBtn.addClass(TitleBar.MinimizeButtonClass);

            var maxBtn = new Button();
            maxBtn.addClass(TitleBar.MaximizeButtonClass);

            var rstBtn = new Button();
            rstBtn.addClass(TitleBar.RestoreButtonClass);

            var clsBtn = new Button();
            clsBtn.addClass(TitleBar.CloseButtonClass);

            var btnBox = new Component();
            btnBox.addClass(TitleBar.ButtonBoxClass);
            btnBox.append(minBtn, rstBtn, maxBtn, clsBtn);

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
         * Returns the icon item attached to the title bar.
         */
        icon(): Component {
            return this._subItems.icon;
        }

        /**
         * Returns the label item attached to the title bar.
         */
        label(): Label {
            return this._subItems.label;
        }

        /**
         * Returns the close button attached to the title bar.
         */
        closeButton(): Button {
            return this._subItems.closeButton;
        }

        /**
         * Returns the restore button attached to the title bar.
         */
        restoreButton(): Button {
            return this._subItems.restoreButton;
        }

        /**
         * Returns the minimize button attached to the title bar.
         */
        minimizeButton(): Button {
            return this._subItems.minimizeButton;
        }

        /**
         * Returns the maximize button attached to the title bar.
         */
        maximizeButton(): Button {
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
            var elem = this._subItems.buttonBox.element();
            var rect = new Rect(elem.getBoundingClientRect());
            var point = new Point(event.clientX, event.clientY);
            if (rect.contains(point)) {
                return;
            }
            super.onMouseDown(event);
        }

        private _subItems: ITitleBarSubItems;
    }


    /**
     * An interface for storing the sub items of a title bar.
     */
    interface ITitleBarSubItems {
        icon: Component;
        label: Label;
        minimizeButton: Button;
        maximizeButton: Button;
        restoreButton: Button;
        closeButton: Button;
        buttonBox: Component;
    }

}
