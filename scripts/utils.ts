/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Viewport {

        get left(): number {
            return window.pageXOffset;
        }

        get top(): number {
            return window.pageYOffset;
        }

        get right(): number {
            return this.left + this.width;
        }

        get bottom(): number {
            return this.top + this.height;
        }

        get width(): number {
            return document.documentElement.clientWidth;
        }

        get height(): number {
            return document.documentElement.clientHeight;
        }

        get windowWidth(): number {
            return window.innerWidth;
        }

        get windowHeight(): number {
            return window.innerHeight;
        }

        get windowRight(): number {
            return this.left + this.windowWidth;
        }

        get windowBottom(): number {
            return this.top + this.windowHeight;
        }
    }


    export var viewport = new Viewport();

}
