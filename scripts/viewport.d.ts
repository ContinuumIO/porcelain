declare module porcelain {
    /**
    * An object which provides viewport measurement functions.
    */
    var Viewport: {
        left: () => number;
        top: () => number;
        clientRight: () => number;
        clientBottom: () => number;
        clientWidth: () => number;
        clientHeight: () => number;
        windowRight: () => number;
        windowBottom: () => number;
        windowWidth: () => number;
        windowHeight: () => number;
    };
}
