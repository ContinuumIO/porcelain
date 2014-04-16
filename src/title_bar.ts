/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * An enum defining the available title bar buttons.
     */
    export
    enum TitleBarButton {
        NoButton = 0x0,
        Close = 0x1,
        Maximize = 0x2,
        Minimize = 0x4,
        Restore = 0x8,
        Mask = 0xF,
    }


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
         * @param target The layout item to move with the title bar.
         */
        constructor(target: ILayoutItem) {
            super(target);
            this.addClass(TitleBar.Class);

            var icon = this._icon = new Component();
            icon.addClass(TitleBar.IconClass);

            var label = this._label = new Label();
            label.addClass(TitleBar.LabelClass);
            label.addClass(CommonClass.LargeText);

            var clsBtn = this._closeButton = new Button();
            clsBtn.addClass(TitleBar.CloseButtonClass);

            var maxBtn = this._maximizeButton = new Button();
            maxBtn.addClass(TitleBar.MaximizeButtonClass);

            var minBtn = this._minimizeButton = new Button();
            minBtn.addClass(TitleBar.MinimizeButtonClass);

            var rstBtn = this._restoreButton = new Button();
            rstBtn.addClass(TitleBar.RestoreButtonClass);

            var btnBox = this._buttonBox = new Component();
            btnBox.addClass(TitleBar.ButtonBoxClass);
            btnBox.append(minBtn, rstBtn, maxBtn, clsBtn);

            // the order is important for CSS float layout
            this.append(icon, btnBox, label);

            this.setButtons(TitleBarButton.Mask & ~TitleBarButton.Restore);
        }

        /**
         * Destroy the title bar.
         */
        destroy(): void {
            this._icon = null;
            this._label = null;
            this._minimizeButton = null;
            this._maximizeButton = null;
            this._restoreButton = null;
            this._closeButton = null;
            this._buttonBox = null;
            super.destroy();
        }

        /**
         * A signal emitted when the close button is clicked.
         */
        get closeButtonClicked(): Signal {
            return this._closeButton.clicked;
        }

        /**
         * A signal emitted when the maximize button is clicked.
         */
        get maximizeButtonClicked(): Signal {
            return this._maximizeButton.clicked;
        }

        /**
         * A signal emitted when the minimize button is clicked.
         */
        get minimizeButtonClicked(): Signal {
            return this._minimizeButton.clicked;
        }

        /**
         * A signal emitted when the restore button is clicked.
         */
        get restoreButtonClicked(): Signal {
            return this._restoreButton.clicked;
        }

        /**
         * Returns the title text of the title bar.
         */
        title(): string {
            return this._label.text();
        }

        /**
         * Set the title text of the title bar.
         */
        setTitle(title: string): void {
            this._label.setText(title);
        }

        /**
         * Returns an OR'd combination of visible TitleBarButtons.
         */
        buttons(): number {
            return this._buttons;
        }

        /**
         * Set the OR'd combination of visible TitleBarButtons.
         */
        setButtons(buttons: number): void {
            this._buttons = buttons & TitleBarButton.Mask;
            this._closeButton.setDisplay(
                buttons & TitleBarButton.Close ? "" : "none");
            this._maximizeButton.setDisplay(
                buttons & TitleBarButton.Maximize ? "" : "none");
            this._minimizeButton.setDisplay(
                buttons & TitleBarButton.Minimize ? "" : "none");
            this._restoreButton.setDisplay(
                buttons & TitleBarButton.Restore ? "" : "none");
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
            var elem = this._buttonBox.element();
            var rect = new Rect(elem.getBoundingClientRect());
            var point = new Point(event.clientX, event.clientY);
            if (rect.contains(point)) {
                return;
            }
            super.onMouseDown(event);
        }

        private _icon: Component;
        private _label: Label;
        private _minimizeButton: Button;
        private _maximizeButton: Button;
        private _restoreButton: Button;
        private _closeButton: Button;
        private _buttonBox: Component;
        private _buttons = TitleBarButton.NoButton;
    }

}
