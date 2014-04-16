/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A top-level Window component.
     *
     * A Window looks and behaves much like its desktop counterpart.
     * It should never be added as the child of another component.
     */
    export
    class Window extends Component {

        /**
         * The CSS class added to Window instances.
         */
        static Class = "p-Window";

        /**
         * The CSS class added to the Window body.
         */
        static BodyClass = "p-Window-body";

        /**
         * The CSS class added to a Window size grip.
         */
        static SizeGripClass = "p-Window-sizeGrip";

        /**
         * The CSS class added to a Window title bar.
         */
        static TitleBarClass = "p-Window-titleBar";

        /**
         * The CSS class added to the Window content.
         */
        static ContentClass = "p-Window-content";

        /**
         * The mousedown event handler.
         */
        evtMouseDown = new EventBinder("mousedown", this.element());

        /**
         * Construct a new Window.
         */
        constructor() {
            super();
            this.addClass(Window.Class);

            // Create the layout item for sizing the window.
            this._item = new ComponentItem(this);

            // The children to be added to the window.
            var children: Component[] = [];

            // The body component which holds the window content.
            var body = this._body = new Component();
            body.addClass(Window.BodyClass);
            children.push(body);

            // The size grips for interactive window resizing.
            var gripAreas = enumValues<GripArea>(GripArea);
            for (var i = 0, n = gripAreas.length; i < n; ++i) {
                var grip = new SizeGrip(gripAreas[i], this._item);
                grip.addClass(Window.SizeGripClass);
                children.push(grip);
            }

            // The window title bar.
            var titleBar = this._titleBar = new TitleBar(this._item);
            titleBar.addClass(Window.TitleBarClass);
            children.push(titleBar);

            // Connect the title bar button clicked signals.
            titleBar.closeButtonClicked.connect(this.close, this);
            titleBar.maximizeButtonClicked.connect(this.maximize, this);
            titleBar.minimizeButtonClicked.connect(this.minimize, this);
            titleBar.restoreButtonClicked.connect(this.restore, this);

            // Add the window children.
            this.append.apply(this, children);

            // Bind the Window mousedown handler.
            this.evtMouseDown.bind(this.onMouseDown, this);

            // Add the window to the global Z stack.
            normalWindowStack.add(this);
        }

        /**
         * Destroy the Window component.
         */
        destroy(): void {
            normalWindowStack.remove(this);
            this.evtMouseDown.destroy();
            this._item = null;
            this._titleBar = null;
            this._body = null;
            this._content = null;
            super.destroy();
        }

        /**
         * Returns the title text in the Window title bar.
         */
        title(): string {
            return this._titleBar.title();
        }

        /**
         * Set the title text in the Window title bar.
         */
        setTitle(title: string) {
            this._titleBar.setTitle(title);
        }

        /**
         * Returns the central content component of the window.
         */
        content(): Component {
            return this._content;
        }

        /**
         * Set the central content component of the window.
         *
         * The old window content will be detached from the window.
         *
         * @param content The component to add to the window.
         */
        setContent(content: Component): void {
            var old = this._content;
            if (content === old) {
                return;
            }
            if (old) {
                old.detach();
                old.removeClass(Window.ContentClass);
            }
            if (content) {
                content.addClass(Window.ContentClass);
                this._body.append(content);
            }
            this._content = content;
        }

        /**
         * Attach the Window to the given DOM element.
         *
         * If not provided, it will be attached to the document body.
         */
        attach(elem?: HTMLElement): void {
            (elem || document.body).appendChild(this.element());
        }

        /**
         * Raise the window to the top of the Z order.
         */
        raise(): void {
            normalWindowStack.raise(this);
        }

        /**
         * Lower the window to the bottom of the Z order.
         */
        lower(): void {
            normalWindowStack.lower(this);
        }

        /**
         * Maximize the window to fit the browser page.
         */
        maximize(): void {
            this._setWindowState(WindowState.Maximized);
        }

        /**
         * Restore the window to its normal size.
         */
        restore(): void {
            this._setWindowState(WindowState.Normal);
        }

        /**
         * Minimize the window to the task bar.
         */
        minimize(): void {
            this._setWindowState(WindowState.Minimized);
        }

        /**
         * Close the window.
         *
         * This will hide the window and then destroy it.
         */
        close(): void {
            this.setDisplay("none");
            this.destroy();
        }

        /**
         * The mousedown event handler.
         *
         * @protected
         */
        onMouseDown(event: MouseEvent): void {
            this.raise();
        }

        /**
         * An internal helper method for setting the window state.
         */
        private _setWindowState(state: WindowState): void {
            if (state === this._windowState) {
                return;
            }
            this._windowState = state;
            var buttons = TitleBarButton.Close;
            switch (state) {
                case WindowState.Normal:
                    buttons |= TitleBarButton.Minimize;
                    buttons |= TitleBarButton.Maximize;
                    this.removeClass(CommonClass.Maximized);
                    this._item.setRect(this._stored);
                    break;
                case WindowState.Minimized:
                    buttons |= TitleBarButton.Maximize;
                    buttons |= TitleBarButton.Restore;
                    this.removeClass(CommonClass.Maximized);
                    this._item.setRect(this._stored);
                    break;
                case WindowState.Maximized:
                    buttons |= TitleBarButton.Minimize;
                    buttons |= TitleBarButton.Restore;
                    this.addClass(CommonClass.Maximized);
                    this._stored = this._item.rect();
                    var style = this.style();
                    style.left = "";
                    style.top = "";
                    style.width = "";
                    style.height = "";
                    break;
                default:
                    break;
            }
            this._titleBar.setButtons(buttons);
        }

        private _stored: Rect;
        private _item: ComponentItem;
        private _titleBar: TitleBar;
        private _body: Component;
        private _content: Component = null;
        private _windowState = WindowState.Normal;
    }


    /**
     * An enum defining the window state.
     */
    enum WindowState {
        Normal,
        Minimized,
        Maximized
    }

}
