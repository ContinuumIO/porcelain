/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A component for displaying readonly text.
     *
     * @class
     */
    export
    class Label extends Component {

        /**
         * The CSS class added to Label instances.
         */
        static Class = "p-Label";

        /**
         * Construct a new Label.
         */
        constructor(text?: string) {
            super();
            this.addClass(Label.Class);
            this.addClass(CommonClass.SmallText);
            if (text) {
                this.setText(text);
            }
        }

        /**
         * Get the text content of the label.
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
