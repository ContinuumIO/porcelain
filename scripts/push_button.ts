/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The CSS class added to a PushButton instance.
     */
    var PUSH_BUTTON_CLASS = "p-PushButton";

    /**
     * The CSS class assigned to a PushButton text element.
     */
    var PUSH_BUTTON_TEXT_CLASS = "p-PushButton-text";

    /**
     * The CSS class assigned to a PushButton image element.
     */
    var PUSH_BUTTON_IMAGE_CLASS = "p-PushButton-image";


    /** 
     * A component which renders like a canonical push button.
     */
    export class PushButton extends Button {

        /**
         * Construct a new PushButton.
         */
        constructor(text?: string, image?: string) {
            super();
            this.addClass(PUSH_BUTTON_CLASS);
            this.addClass(SMALL_TEXT_CLASS);
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
            super.destroy();
            this._textElement = null;
            this._imageElement = null;
        }

        /**
         * Returns the text displayed in the push button.
         */
        text(): string {
            return this._textElement.textContent;
        }

        /**
         * Set the text displayed in the push button.
         */
        setText(value: string) {
            this._textElement.textContent = value;
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
            }
            var elem = this._ensureImage();
            elem.src = image;
        }

        /**
         * The element creation method.
         *
         * @protected
         */
        createElement(): HTMLElement {
            var elem = document.createElement("button");
            elem.type = "button";
            var textElem = document.createElement("span");
            textElem.className = PUSH_BUTTON_TEXT_CLASS;
            elem.appendChild(textElem);
            this._textElement = textElem;
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
                elem.className = PUSH_BUTTON_IMAGE_CLASS;
                this.element().appendChild(elem);
                this._imageElement = elem;
            }
            return elem;
        }

        private _textElement: HTMLSpanElement;
        private _imageElement: HTMLImageElement = null;
    }

}
