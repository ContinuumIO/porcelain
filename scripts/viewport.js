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
    * The internal IViewport implementation.
    *
    * @class
    */
    var Viewport = (function () {
        function Viewport() {
        }
        Object.defineProperty(Viewport.prototype, "left", {
            get: function () {
                return window.pageXOffset;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "top", {
            get: function () {
                return window.pageYOffset;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "clientRight", {
            get: function () {
                return this.left + this.clientWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "clientBottom", {
            get: function () {
                return this.top + this.clientHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "clientWidth", {
            get: function () {
                return document.documentElement.clientWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "clientHeight", {
            get: function () {
                return document.documentElement.clientHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "windowRight", {
            get: function () {
                return this.left + this.windowWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "windowBottom", {
            get: function () {
                return this.top + this.windowHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "windowWidth", {
            get: function () {
                return window.innerWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Viewport.prototype, "windowHeight", {
            get: function () {
                return window.innerHeight;
            },
            enumerable: true,
            configurable: true
        });
        return Viewport;
    })();

    /**
    * The singelton IViewport instance.
    */
    porcelain.viewport = new Viewport();
})(porcelain || (porcelain = {}));
//# sourceMappingURL=viewport.js.map
