declare module porcelain {
    interface SignalHandler<T> {
        (T: any): void;
    }
    class Signal<T> {
        public connect(handler: SignalHandler<T>): void;
        public disconnect(handler: SignalHandler<T>): void;
        public emit(arg: T): void;
        private _handlers;
    }
}
