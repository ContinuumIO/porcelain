var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
var porcelain;
(function (porcelain) {
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
    var PushButton = (function (_super) {
        __extends(PushButton, _super);
        /**
        * Construct a new PushButton.
        */
        function PushButton(text, image) {
            _super.call(this);
            this._imageElement = null;
            this.addClass(PUSH_BUTTON_CLASS);
            this.addClass(porcelain.SMALL_TEXT_CLASS);
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
        PushButton.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._textElement = null;
            this._imageElement = null;
        };

        /**
        * Returns the text displayed in the push button.
        */
        PushButton.prototype.text = function () {
            return this._textElement.textContent;
        };

        /**
        * Set the text displayed in the push button.
        */
        PushButton.prototype.setText = function (value) {
            this._textElement.textContent = value;
        };

        /**
        * Returns the source url of the button image.
        */
        PushButton.prototype.image = function () {
            var elem = this._imageElement;
            return elem ? elem.src : "";
        };

        /**
        * Set the source url of the button image.
        */
        PushButton.prototype.setImage = function (image) {
            if (!image) {
                this._clearImage();
            }
            var elem = this._ensureImage();
            elem.src = image;
        };

        /**
        * The element creation method.
        *
        * @protected
        */
        PushButton.prototype.createElement = function () {
            var elem = document.createElement("button");
            elem.type = "button";
            var textElem = document.createElement("span");
            textElem.className = PUSH_BUTTON_TEXT_CLASS;
            elem.appendChild(textElem);
            this._textElement = textElem;
            return elem;
        };

        /**
        * A helper method for clearing the image element.
        *
        * @private
        */
        PushButton.prototype._clearImage = function () {
            var elem = this._imageElement;
            if (elem) {
                this.element().removeChild(elem);
                this._imageElement = null;
            }
        };

        /**
        * A helper method for creating the image element.
        *
        * @private
        */
        PushButton.prototype._ensureImage = function () {
            var elem = this._imageElement;
            if (!elem) {
                elem = document.createElement("img");
                elem.className = PUSH_BUTTON_IMAGE_CLASS;
                this.element().appendChild(elem);
                this._imageElement = elem;
            }
            return elem;
        };
        return PushButton;
    })(porcelain.Button);
    porcelain.PushButton = PushButton;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=push_button.js.map
