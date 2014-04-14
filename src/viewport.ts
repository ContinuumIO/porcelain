/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * An object which provides viewport measurement functions.
     */
    export
    var Viewport = {

        /**
         * The position of the left edge of the viewport, in pixels.
         *
         * This is equal to the X scroll position of the page.
         */
        left: function(): number {
            return window.pageXOffset;
        },

        /**
         * The position of the top edge of the viewport, in pixels.
         *
         * This is equal to the Y scroll position of the page.
         */
        top: function(): number {
            return window.pageYOffset;
        },

        /**
         * The position of the right edge of the viewport, in pixels.
         *
         * This value *does not* include the vertical scrollbar.
         */
        clientRight: function(): number {
            return this.left() + this.clientWidth();
        },

        /**
         * The position of the bottom edge of the viewport, in pixels.
         *
         * This value *does not* include the horizontal scrollbar.
         */
        clientBottom: function(): number {
            return this.top() + this.clientHeight();
        },

        /**
         * The width of the viewport, in pixels.
         *
         * This value *does not* include the vertical scrollbar.
         */
        clientWidth: function(): number {
            return document.documentElement.clientWidth;
        },

        /**
         * The height of the viewport, in pixels.
         *
         * This value *does not* include the horizontal scrollbar.
         */
        clientHeight: function(): number {
            return document.documentElement.clientHeight;
        },

        /**
         * The position of the right edge of the viewport, in pixels.
         *
         * This value *includes* the vertical scrollbar.
         */
        windowRight: function(): number {
            return this.left() + this.windowWidth();
        },

        /**
         * The position of the bottom edge of the viewport, in pixels.
         *
         * This value *includes* the horizontal scrollbar.
         */
        windowBottom: function(): number {
            return this.top() + this.windowHeight();
        },

        /**
         * The width of the viewport, in pixels.
         *
         * This value *include* the vertical scrollbar.
         */
        windowWidth: function(): number {
            return window.innerWidth;
        },

        /**
         * The height of the viewport, in pixels.
         *
         * This value does *includes* the horizontal scrollbar.
         */
        windowHeight: function (): number {
            return window.innerHeight;
        },
    };

}
