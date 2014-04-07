/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A class which provides viewport measurement functions.
     *
     * @class
     */
    export class Viewport {

        constructor() {
            throw new Error("cannot create Viewport instances");
        }

        /**
         * The position of the left edge of the viewport, in pixels.
         *
         * This is equal to the X scroll position of the page.
         */
        static left(): number {
            return window.pageXOffset;
        }

        /**
         * The position of the top edge of the viewport, in pixels.
         *
         * This is equal to the Y scroll position of the page.
         */  
        static top(): number {
            return window.pageYOffset;
        }

        /**
         * The position of the right edge of the viewport, in pixels.
         *
         * This value *does not* include the vertical scrollbar.
         */
        static clientRight(): number {
            return Viewport.left() + Viewport.clientWidth();
        }

        /**
         * The position of the bottom edge of the viewport, in pixels.
         *
         * This value *does not* include the horizontal scrollbar.
         */
        static clientBottom(): number {
            return Viewport.top() + Viewport.clientHeight();
        }

        /**
         * The width of the viewport, in pixels.
         *
         * This value *does not* include the vertical scrollbar.
         */
        static clientWidth(): number {
            return document.documentElement.clientWidth;
        }

        /**
         * The height of the viewport, in pixels.
         *
         * This value *does not* include the horizontal scrollbar.
         */
        static clientHeight(): number {
            return document.documentElement.clientHeight;
        }

        /**
         * The position of the right edge of the viewport, in pixels.
         *
         * This value *includes* the vertical scrollbar.
         */
        static windowRight(): number {
            return Viewport.left() + Viewport.windowWidth();
        }

        /**
         * The position of the bottom edge of the viewport, in pixels.
         *
         * This value *includes* the horizontal scrollbar.
         */
        static windowBottom(): number {
            return Viewport.top() + Viewport.windowHeight();
        }

        /**
         * The width of the viewport, in pixels.
         *
         * This value *include* the vertical scrollbar.
         */
        static windowWidth(): number {
            return window.innerWidth;
        }

        /**
         * The height of the viewport, in pixels.
         *
         * This value does *includes* the horizontal scrollbar.
         */
        static windowHeight(): number {
            return window.innerHeight;
        }
    }

}
