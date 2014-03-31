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


    var windowStack = new ZStack(1000);


    export class Window extends Widget {

        constructor() {
            super();
            this._layoutItem = new LayoutItem(this);
            this.addClass(WINDOW_CLASS);

            var children: Item[] = [];

            var body = this._body = new Item();
            body.addClass(BODY_CLASS);
            children.push(body);

            var self = this;
            GRIP_AREAS.forEach(function (area) {
                var grip = new SizeGrip(area, self);
                grip.addClass(SIZE_GRIP_CLASS);
                children.push(grip);
            });

            var titleBar = this._titleBar = new TitleBar(this._layoutItem);
            titleBar.addClass(TITLE_BAR_CLASS);
            titleBar.restoreButton.element.style.display = "none";
            children.push(titleBar);

            this.append.apply(this, children);

            this._layoutItem.setMinimumSize({ width: 192, height: 192 });
            this._layoutItem.setGeometry(new Rect(50, 50, 200, 200));

            this.bind("mousedown", this._onMouseDown);
        }

        destroy(): void {
            super.destroy()
            this._titleBar = null;
            this._body = null;
        }

        get layoutItem(): LayoutItem {
            return this._layoutItem;
        }

        get zIndex(): number {
            return parseInt(this.element.style.zIndex) || 0;
        }

        set zIndex(z: number) {
            this.element.style.zIndex = z ? z.toString() : "";
        }

        sizeHint(): Size {
            return new Size();
        }

        setVisible(visible: boolean): void {
            super.setVisible(visible);
            if (visible && !this.element.parentNode) {
                windowStack.add(this);
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(this.element);
            }
        }

        raise(): void {
            windowStack.raise(this);
        }

        lower(): void {
            windowStack.lower(this);
        }

        private _onMouseDown(event: MouseEvent): void {
            this.raise();
        }

        private _body: Item;
        private _titleBar: Item;
        private _layoutItem: LayoutItem;
    }

}
