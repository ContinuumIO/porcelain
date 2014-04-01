/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var WINDOW_CLASS = "p-Window";

    var BODY_CLASS = "p-Window-body";

    var SIZE_GRIP_CLASS = "p-Window-sizeGrip";

    var TITLE_BAR_CLASS = "p-Window-titleBar";

    var GRIP_AREAS = [
        GripArea.Left,
        GripArea.Top,
        GripArea.Right,
        GripArea.Bottom,
        GripArea.TopLeft,
        GripArea.TopRight,
        GripArea.BottomLeft,
        GripArea.BottomRight
    ];


    export class Window extends Component {

        mousedown = new EventBinder("mousedown", this.element);

        constructor() {
            super();
            this._layoutItem = new ComponentItem(this);
            this.addClass(WINDOW_CLASS);

            var children: Component[] = [];

            var body = this._body = new Component();
            body.addClass(BODY_CLASS);
            children.push(body);

            var self = this;
            GRIP_AREAS.forEach(function (area) {
                var grip = new SizeGrip(area, self._layoutItem);
                grip.addClass(SIZE_GRIP_CLASS);
                children.push(grip);
            });

            var titleBar = this._titleBar = new TitleBar(this._layoutItem);
            titleBar.addClass(TITLE_BAR_CLASS);
            titleBar.restoreButton.hide();
            titleBar.restoreButton.clicked.connect(this.restore, this);
            titleBar.maximizeButton.clicked.connect(this.maximize, this);
            titleBar.minimizeButton.clicked.connect(this.minimize, this);
            titleBar.closeButton.clicked.connect(this.close, this);
            titleBar.label.element.innerHTML = "The Window Title";

            children.push(titleBar);

            this.append.apply(this, children);

            this.mousedown.bind(this.onMouseDown, this);

            globalNormalWindowStack.add(this);
        }

        destroy(): void {
            globalNormalWindowStack.remove(this);
            super.destroy()
            this._titleBar = null;
            this._body = null;
        }

        get layoutItem(): ILayoutItem {
            return this._layoutItem;
        }

        sizeHint(): Size {
            return new Size(192, 192);
        }

        minimumSizeHint(): Size {
            return this.sizeHint();
        }

        maximumSizeHint(): Size {
            return new Size();
        }

        setVisible(visible: boolean): void {
            super.setVisible(visible);
            if (visible && !this.element.parentNode) {
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(this.element);
            }
        }

        raise(): void {
            globalNormalWindowStack.raise(this);
        }

        lower(): void {
            globalNormalWindowStack.lower(this);
        }

        onMouseDown(event: MouseEvent): void {
            this.raise();
        }

        maximize(): void {
            var titleBar = this._titleBar;
            titleBar.maximizeButton.hide();
            titleBar.restoreButton.show();
            console.log("maximize me");
        }

        restore(): void {
            var titleBar = this._titleBar;
            titleBar.restoreButton.hide();
            titleBar.maximizeButton.show();
            console.log("restore me");
        }

        minimize(): void {
            console.log("minimize me");
        }

        close(): void {
            console.log("close me");
            this.hide();
            this.destroy();
        }

        private _body: Component;
        private _titleBar: TitleBar;
        private _layoutItem: ILayoutItem;
    }

}
