/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /** 
     * The class added to a Label instance.
     */
    var LABEL_CLASS = "p-Label";


    /**
     * A component for displaying readonly text.
     *
     * @class
     */
    export class Label extends Component {

        /**
         * Returns the text displayed as the inner html of the label.
         */
        text(): string {
            return this.element().innerHTML;
        }

        /**
         * Set the text displayed in the label.
         */
        setText(value: string) {
            this.element().innerHTML = value;
        }
    }

}
