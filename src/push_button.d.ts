declare module porcelain {
    /**
    * A component which renders like a canonical push button.
    */
    class PushButton extends Button {
        /**
        * The CSS class added to PushButton instances.
        */
        static Class: string;
        /**
        * The CSS class added to a PushButton text element.
        */
        static TextClass: string;
        /**
        * The CSS class added to PushButton image element.
        */
        static ImageClass: string;
        /**
        * Construct a new PushButton.
        */
        constructor(text?: string, image?: string);
        /**
        * Destroy the PushButton.
        */
        public destroy(): void;
        /**
        * Returns the text displayed in the push button.
        */
        public text(): string;
        /**
        * Set the text displayed in the push button.
        */
        public setText(value: string): void;
        /**
        * Returns the source url of the button image.
        */
        public image(): string;
        /**
        * Set the source url of the button image.
        */
        public setImage(image: string): void;
        /**
        * The element creation method.
        *
        * @protected
        */
        public createElement(): HTMLElement;
        /**
        * A helper method for clearing the text element.
        *
        * @private
        */
        private _clearText();
        /**
        * A helper method for creating the text element.
        *
        * @private
        */
        private _ensureText();
        /**
        * A helper method for clearing the image element.
        *
        * @private
        */
        private _clearImage();
        /**
        * A helper method for creating the image element.
        *
        * @private
        */
        private _ensureImage();
        private _textElement;
        private _imageElement;
    }
}
