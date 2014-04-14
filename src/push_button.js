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
    * A component which renders like a canonical push button.
    */
    var PushButton = (function (_super) {
        __extends(PushButton, _super);
        /**
        * Construct a new PushButton.
        */
        function PushButton(text, image) {
            _super.call(this);
            this._textElement = null;
            this._imageElement = null;
            this.addClass(PushButton.Class);
            this.addClass(porcelain.CommonClass.SmallText);
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
            var elem = this._textElement;
            return elem ? elem.textContent : "";
        };

        /**
        * Set the text displayed in the push button.
        */
        PushButton.prototype.setText = function (value) {
            if (!value) {
                this._clearText();
            } else {
                this._ensureText().textContent = value;
            }
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
            } else {
                this._ensureImage().src = image;
            }
        };

        /**
        * The element creation method.
        *
        * @protected
        */
        PushButton.prototype.createElement = function () {
            var elem = document.createElement("button");
            elem.type = "button";
            return elem;
        };

        /**
        * A helper method for clearing the text element.
        *
        * @private
        */
        PushButton.prototype._clearText = function () {
            var elem = this._textElement;
            if (elem) {
                this.element().removeChild(elem);
                this._textElement = null;
            }
        };

        /**
        * A helper method for creating the text element.
        *
        * @private
        */
        PushButton.prototype._ensureText = function () {
            var elem = this._textElement;
            if (!elem) {
                elem = document.createElement("span");
                elem.className = PushButton.TextClass;
                this.element().appendChild(elem);
                this._textElement = elem;
            }
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
                elem.className = PushButton.ImageClass;
                this.element().appendChild(elem);
                this._imageElement = elem;
            }
            return elem;
        };
        PushButton.Class = "p-PushButton";

        PushButton.TextClass = "p-PushButton-text";

        PushButton.ImageClass = "p-PushButton-image";
        return PushButton;
    })(porcelain.Button);
    porcelain.PushButton = PushButton;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=push_button.js.map
