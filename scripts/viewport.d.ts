declare module porcelain {
    /**
    * A class which provides viewport measurement functions.
    *
    * @class
    */
    class Viewport {
        constructor();
        /**
        * The position of the left edge of the viewport, in pixels.
        *
        * This is equal to the X scroll position of the page.
        */
        static left(): number;
        /**
        * The position of the top edge of the viewport, in pixels.
        *
        * This is equal to the Y scroll position of the page.
        */ 
        static top(): number;
        /**
        * The position of the right edge of the viewport, in pixels.
        *
        * This value *does not* include the vertical scrollbar.
        */
        static clientRight(): number;
        /**
        * The position of the bottom edge of the viewport, in pixels.
        *
        * This value *does not* include the horizontal scrollbar.
        */
        static clientBottom(): number;
        /**
        * The width of the viewport, in pixels.
        *
        * This value *does not* include the vertical scrollbar.
        */
        static clientWidth(): number;
        /**
        * The height of the viewport, in pixels.
        *
        * This value *does not* include the horizontal scrollbar.
        */
        static clientHeight(): number;
        /**
        * The position of the right edge of the viewport, in pixels.
        *
        * This value *includes* the vertical scrollbar.
        */
        static windowRight(): number;
        /**
        * The position of the bottom edge of the viewport, in pixels.
        *
        * This value *includes* the horizontal scrollbar.
        */
        static windowBottom(): number;
        /**
        * The width of the viewport, in pixels.
        *
        * This value *include* the vertical scrollbar.
        */
        static windowWidth(): number;
        /**
        * The height of the viewport, in pixels.
        *
        * This value does *includes* the horizontal scrollbar.
        */
        static windowHeight(): number;
    }
}
