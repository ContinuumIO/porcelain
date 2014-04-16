/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A class which supports procedural layout of its children.
     *
     * A Panel is used in conjunction with an ILayout instance to
     * layout child components when traditional CSS layout is not
     * sufficient.
     *
     * @class
     */
    export
    class Panel extends Component {

        constructor() { super(); }

        /**
         * Returns the layout installed on this panel.
         */
        layout(): ILayout {

        }

        private _layout: ILayout = null;
    }

}
