declare module porcelain {
    class Signal<T> {
        public connect(handler: IEventHandler<T>): void;
        public disconnect(handler: IEventHandler<T>): void;
        public emit(arg: T): void;
        private _handlers;
    }
}
