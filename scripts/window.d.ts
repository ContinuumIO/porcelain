declare module porcelain {
    var topLevelItems: Item[];
    class Window extends Item {
        constructor();
        public show(): void;
        public createElement(): HTMLDivElement;
        public raise(): void;
        private onMouseDown;
        private onLeftHandleDown;
        private onLeftHandleUp;
        private onLeftHandleMove;
        private onTopHandleDown;
        private onTopHandleUp;
        private onTopHandleMove;
        private onRightHandleDown;
        private onRightHandleUp;
        private onRightHandleMove;
        private onBottomHandleDown;
        private onBottomHandleUp;
        private onBottomHandleMove;
        private onTitleBarDown;
        private onTitleBarUp;
        private onTitleBarMove;
        private _pressOffsetX;
        private _pressOffsetY;
        private _body;
    }
}
