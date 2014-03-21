declare module porcelain {
    /**
    * The public interface for the viewport singleton.
    *
    * The "viewport" is the visible portion of the current page.
    */
    interface IViewport {
        /**
        * The position of the left edge of the viewport, in pixels.
        *
        * This is equal to the X scroll position of the page.
        *
        * @readonly
        */
        left: number;
        /**
        * The position of the top edge of the viewport, in pixels.
        *
        * This is equal to the Y scroll position of the page.
        *
        * @readonly
        */ 
        top: number;
        /**
        * The position of the right edge of the viewport, in pixels.
        *
        * This value *does not* include the vertical scrollbar.
        *
        * @readonly
        */
        clientRight: number;
        /**
        * The position of the bottom edge of the viewport, in pixels.
        *
        * This value *does not* include the horizontal scrollbar.
        *
        * @readonly
        */
        clientBottom: number;
        /**
        * The width of the viewport, in pixels.
        *
        * This value *does not* include the vertical scrollbar.
        *
        * @readonly
        */
        clientWidth: number;
        /**
        * The height of the viewport, in pixels.
        *
        * This value *does not* include the horizontal scrollbar.
        *
        * @readonly
        */
        clientHeight: number;
        /**
        * The position of the right edge of the viewport, in pixels.
        *
        * This value *includes* the vertical scrollbar.
        *
        * @readonly
        */
        windowRight: number;
        /**
        * The position of the bottom edge of the viewport, in pixels.
        *
        * This value *includes* the horizontal scrollbar.
        *
        * @readonly
        */
        windowBottom: number;
        /**
        * The width of the viewport, in pixels.
        *
        * This value *include* the vertical scrollbar.
        *
        * @readonly
        */
        windowWidth: number;
        /**
        * The height of the viewport, in pixels.
        *
        * This value does *includes* the horizontal scrollbar.
        *
        * @readonly
        */
        windowHeight: number;
    }
    /**
    * The singelton IViewport instance.
    */
    var viewport: IViewport;
}
