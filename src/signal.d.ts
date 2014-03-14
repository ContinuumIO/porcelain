declare module porcelain {
    class Signal<Payload> {
        public connect(handler: (Payload: any) => void): void;
        public disconnect(handler: (Payload: any) => void): void;
    }
}
