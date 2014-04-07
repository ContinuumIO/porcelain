/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
    /**
    * A class which provides viewport measurement functions.
    *
    * @class
    */
    var Viewport = (function () {
        function Viewport() {
            throw new Error("cannot create Viewport instances");
        }
        /**
        * The position of the left edge of the viewport, in pixels.
        *
        * This is equal to the X scroll position of the page.
        */
        Viewport.left = function () {
            return window.pageXOffset;
        };

        /**
        * The position of the top edge of the viewport, in pixels.
        *
        * This is equal to the Y scroll position of the page.
        */
        Viewport.top = function () {
            return window.pageYOffset;
        };

        /**
        * The position of the right edge of the viewport, in pixels.
        *
        * This value *does not* include the vertical scrollbar.
        */
        Viewport.clientRight = function () {
            return Viewport.left() + Viewport.clientWidth();
        };

        /**
        * The position of the bottom edge of the viewport, in pixels.
        *
        * This value *does not* include the horizontal scrollbar.
        */
        Viewport.clientBottom = function () {
            return Viewport.top() + Viewport.clientHeight();
        };

        /**
        * The width of the viewport, in pixels.
        *
        * This value *does not* include the vertical scrollbar.
        */
        Viewport.clientWidth = function () {
            return document.documentElement.clientWidth;
        };

        /**
        * The height of the viewport, in pixels.
        *
        * This value *does not* include the horizontal scrollbar.
        */
        Viewport.clientHeight = function () {
            return document.documentElement.clientHeight;
        };

        /**
        * The position of the right edge of the viewport, in pixels.
        *
        * This value *includes* the vertical scrollbar.
        */
        Viewport.windowRight = function () {
            return Viewport.left() + Viewport.windowWidth();
        };

        /**
        * The position of the bottom edge of the viewport, in pixels.
        *
        * This value *includes* the horizontal scrollbar.
        */
        Viewport.windowBottom = function () {
            return Viewport.top() + Viewport.windowHeight();
        };

        /**
        * The width of the viewport, in pixels.
        *
        * This value *include* the vertical scrollbar.
        */
        Viewport.windowWidth = function () {
            return window.innerWidth;
        };

        /**
        * The height of the viewport, in pixels.
        *
        * This value does *includes* the horizontal scrollbar.
        */
        Viewport.windowHeight = function () {
            return window.innerHeight;
        };
        return Viewport;
    })();
    porcelain.Viewport = Viewport;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=viewport.js.map
