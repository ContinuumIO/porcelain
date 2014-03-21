/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The public interface for the viewport singleton.
     *
     * The "viewport" is the visible portion of the current page.
     */
    export interface IViewport {

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
     * The internal IViewport implementation.
     */
    class Viewport implements IViewport {

        get left(): number {
            return window.pageXOffset;
        }

        get top(): number {
            return window.pageYOffset;
        }

        get clientRight(): number {
            return this.left + this.clientWidth;
        }

        get clientBottom(): number {
            return this.top + this.clientHeight;
        }

        get clientWidth(): number {
            return document.documentElement.clientWidth;
        }

        get clientHeight(): number {
            return document.documentElement.clientHeight;
        }

        get windowRight(): number {
            return this.left + this.windowWidth;
        }

        get windowBottom(): number {
            return this.top + this.windowHeight;
        }

        get windowWidth(): number {
            return window.innerWidth;
        }

        get windowHeight(): number {
            return window.innerHeight;
        }
    }


    /**
     * The singelton IViewport instance.
     */
    export var viewport: IViewport = new Viewport();

}
