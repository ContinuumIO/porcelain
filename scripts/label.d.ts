declare module porcelain {
    /**
    * A component for displaying readonly text.
    *
    * @class
    */
    class Label extends Component {
        /**
        * Construct a new Label.
        */
        constructor(text?: string);
        /**
        * Returns the text content of the label.
        */
        public text(): string;
        /**
        * Set the text content of the label.
        */
        public setText(value: string): void;
    }
}
