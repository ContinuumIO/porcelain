/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

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

    export var viewport: IViewport = new Viewport();

}
