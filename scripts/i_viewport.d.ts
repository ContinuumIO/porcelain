/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
declare module porcelain {

    // The "viewport" is the visible portion of the page. All 
    // dimensions are provided in until of pixels relative to 
    // the origin of the page. All properties are read-only.
    interface IViewport {
        left: number;           // x-scroll position              
        top: number;            // y-scroll position
        clientRight: number;    // Does not include vertical scrollbar   
        clientBottom: number;   // Does not include horizonal scrollbar
        clientWidth: number;    // Does not include vertical scrollbar
        clientHeight: number;   // Does not include horizontal scrollbar
        windowWidth: number;    // Includes vertical scrollbar
        windowHeight: number;   // Includes horizontal scrollbar
        windowRight: number;    // Includes vertical scrollbar
        windowBottom: number;   // Includes horizontal scrollbar
    }

}
