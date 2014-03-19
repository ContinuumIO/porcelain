declare module porcelain {
    class Window extends Item {
        constructor();
        public show(): void;
        public raise(): void;
        public lower(): void;
        public _create(): void;
        private _onMouseDown;
        private _onLeftHandleDown;
        private _onLeftHandleUp;
        private _onLeftHandleMove;
        private _onTopHandleDown;
        private _onTopHandleUp;
        private _onTopHandleMove;
        private _onRightHandleDown;
        private _onRightHandleUp;
        private _onRightHandleMove;
        private _onBottomHandleDown;
        private _onBottomHandleUp;
        private _onBottomHandleMove;
        private _onTopLeftHandleDown;
        private _onTopLeftHandleUp;
        private _onTopLeftHandleMove;
        private _onTopRightHandleDown;
        private _onTopRightHandleUp;
        private _onTopRightHandleMove;
        private _onBottomLeftHandleDown;
        private _onBottomLeftHandleUp;
        private _onBottomLeftHandleMove;
        private _onBottomRightHandleDown;
        private _onBottomRightHandleUp;
        private _onBottomRightHandleMove;
        private _onTitleBarDown;
        private _onTitleBarUp;
        private _onTitleBarMove;
        private _pressOffsetX;
        private _pressOffsetY;
        private _body;
    }
}
