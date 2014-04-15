/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A component which renders like a canonical push button.
     */
    export
    class PushButton extends Button {

        /**
         * The CSS class added to PushButton instances.
         */
        static Class = "p-PushButton";

        /**
         * The CSS class added to a PushButton text element.
         */
        static TextClass = "p-PushButton-text";

        /**
         * The CSS class added to PushButton image element.
         */
        static ImageClass = "p-PushButton-image";

        /**
         * Construct a new PushButton.
         */
        constructor(text?: string, image?: string) {
            super();
            this.addClass(PushButton.Class);
            this.addClass(CommonClass.SmallText);
            if (text) {
                this.setText(text);
            }
            if (image) {
                this.setImage(image);
            }
        }

        /**
         * Destroy the PushButton.
         */
        destroy(): void {
            this._textElement = null;
            this._imageElement = null;
            super.destroy();
        }

        /**
         * Returns the text displayed in the push button.
         */
        text(): string {
            var elem = this._textElement;
            return elem ? elem.textContent : "";
        }

        /**
         * Set the text displayed in the push button.
         */
        setText(value: string) {
            if (!value) {
                this._clearText();
            } else {
                this._ensureText().textContent = value;
            }
        }

        /**
         * Returns the source url of the button image.
         */
        image(): string {
            var elem = this._imageElement;
            return elem ? elem.src : "";
        }

        /**
         * Set the source url of the button image.
         */
        setImage(image: string): void {
            if (!image) {
                this._clearImage();
            } else {
                this._ensureImage().src = image;
            }
        }

        /**
         * The element creation method.
         *
         * @protected
         */
        createElement(): HTMLElement {
            var elem = document.createElement("button");
            elem.type = "button";
            return elem;
        }

        /**
         * A helper method for clearing the text element.
         *
         * @private
         */
        private _clearText(): void {
            var elem = this._textElement;
            if (elem) {
                this.element().removeChild(elem);
                this._textElement = null;
            }
        }

        /**
         * A helper method for creating the text element.
         *
         * @private
         */
        private _ensureText(): HTMLSpanElement {
            var elem = this._textElement;
            if (!elem) {
                elem = document.createElement("span");
                elem.className = PushButton.TextClass;
                this.element().appendChild(elem);
                this._textElement = elem;
            }
            return elem;
        }

        /**
         * A helper method for clearing the image element.
         *
         * @private
         */
        private _clearImage(): void {
            var elem = this._imageElement;
            if (elem) {
                this.element().removeChild(elem);
                this._imageElement = null;
            }
        }

        /**
         * A helper method for creating the image element.
         *
         * @private
         */
        private _ensureImage(): HTMLImageElement {
            var elem = this._imageElement
            if (!elem) {
                elem = document.createElement("img");
                elem.className = PushButton.ImageClass;
                this.element().appendChild(elem);
                this._imageElement = elem;
            }
            return elem;
        }

        private _textElement: HTMLSpanElement = null;
        private _imageElement: HTMLImageElement = null;
    }

}
