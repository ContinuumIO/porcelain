/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The class added to a Window instance.
     */
    var WINDOW_CLASS = "p-Window";

    /**
     * The class added to the body div of a Window.
     */
    var BODY_CLASS = "p-Window-body";

    /**
     * The class added to a size grip on a Window.
     */
    var SIZE_GRIP_CLASS = "p-Window-sizeGrip";

    /**
     * The class added to a Window title bar.
     */
    var TITLE_BAR_CLASS = "p-Window-titleBar";

    /**
     * The class added to a minimized Window.
     */
    var MINIMIZED_CLASS = "p-minimized";

    /**
     * The class added to a maximized Window.
     */
    var MAXIMIZED_CLASS = "p-maximized";


    /**
     * An interface for storing the sub items of a Window.
     */
    interface IWindowSubItems {
        titleBar: TitleBar;
        body: Component;
    }


    /**
     * An enum defining the window state.
     */
    enum WindowState {
        Normal,
        Minimized,
        Maximized
    }


    /**
     * A top-level Window component.
     *
     * A Window looks and behaves much like its desktop counterpart. 
     * It should never be added as the child of another component.
     */
    export class Window extends Component {

        /** 
         * The mousedown event handler.
         */
        evtMouseDown = new EventBinder("mousedown", this.element());

        /**
         * Construct a new Window.
         */
        constructor() {
            super();
            this.addClass(WINDOW_CLASS);
            
            // The children to be added to the window.
            var children: Component[] = [];

            // The body component which holds the window content.
            var body = new Component();
            body.addClass(BODY_CLASS);
            children.push(body);

            // The size grips for interactive window resizing.
            var gripAreas = enumValues<GripArea>(GripArea);
            for (var i = 0, n = gripAreas.length; i < n; ++i) {
                var grip = new SizeGrip(gripAreas[i], this);
                grip.addClass(SIZE_GRIP_CLASS);
                children.push(grip);
            }

            // The window title bar.
            var titleBar = new TitleBar(this);
            titleBar.addClass(TITLE_BAR_CLASS);
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
                body: body,
            };

            // Add the window children.
            this.append.apply(this, children);

            // Set the positioning mode and initial size of the window.
            this.setPosition("absolute");
            this.setMinimumSize(new Size(192, 192));

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
            super.destroy()
            this._subItems = null;
        }

        /**
         * Returns the title text in the Window title bar.
         */
        title(): string {
            return this._subItems.titleBar.label().text();
        }

        /**
         * Set the title text in the Window title bar.
         */
        setTitle(value: string) {
            this._subItems.titleBar.label().setText(value);
        }

        /**
         * Attach the Window to the given DOM element.
         *
         * If not provided, it will be attached to the document body.
         */
        attach(elem?: HTMLElement): void {
            (elem || document.body).appendChild(this.element());
            this.afterAttach();
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
            console.log("maximize me");
            this._setWindowState(WindowState.Maximized);
        }

        /**
         * Restore the window to its normal size.
         */
        restore(): void {
            console.log("restore me");
            this._setWindowState(WindowState.Normal);
        }

        /**
         * Minimize the window to the task bar.
         */
        minimize(): void {
            console.log("minimize me");
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
            var titleBar = this._subItems.titleBar;
            var maxBtn = titleBar.maximizeButton();
            var rstBtn = titleBar.restoreButton();
            switch (state) {
                case WindowState.Normal:
                case WindowState.Minimized:
                    rstBtn.setDisplay("none");
                    maxBtn.setDisplay("");
                    this.removeClass(MAXIMIZED_CLASS);
                    this.setRect(this._stored);
                    break;
                case WindowState.Maximized:
                    maxBtn.setDisplay("none");
                    rstBtn.setDisplay("");
                    this._stored = this.rect();
                    this.addClass(MAXIMIZED_CLASS);
                    this.setRect(new Rect(0, 0, -1, -1));
                    break;
                default:
                    break;
            }
        }

        private _stored: Rect;
        private _subItems: IWindowSubItems;
        private _windowState = WindowState.Normal;
    }

}
