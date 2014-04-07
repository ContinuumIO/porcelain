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
         * Construct a new Label.
         */
        constructor(text?: string) {
            super();
            this.addClass(LABEL_CLASS);
            this.addClass(SMALL_TEXT_CLASS);
            if (text) {
                this.setText(text);
            }
        }

        /**
         * Returns the text content of the label.
         */
        text(): string {
            return this.element().innerHTML;
        }

        /**
         * Set the text content of the label.
         */
        setText(value: string) {
            // yes, there is a potential XSS vector here
            // but, we need to allow html formatted label text
            // so, sanitizing needs to be handled elsewhere 
            this.element().innerHTML = value;
        }
    }

}
