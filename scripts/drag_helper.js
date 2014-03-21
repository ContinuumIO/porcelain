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
    * The DragHelper class.
    *
    * A DragHelper can be used to help implement moving/dragging of an
    * html element. The helper takes care of boiler plate required for
    * handling the necessary DOM events for proper mouse capture.
    *
    * @class
    */
    var DragHelper = (function () {
        /**
        * Construct a new DragHelper.
        *
        * @param element - the html element to use as the drag target
        * @param context - additional context to add the event objects
        */
        function DragHelper(element, context) {
            var _this = this;
            /**
            * An optional handler to react to a left mouse press.
            */
            this.pressed = null;
            /**
            * An optional handler to react to a left mouse release.
            */
            this.released = null;
            /**
            * An optional handler to react to a mouse move. This will
            * be invoked only while the left mouse button is pressed.
            */
            this.moved = null;
            /** The handler for the element mousedown event.
            *
            * @private
            */
            this._onMouseDown = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    $(document).mouseup(_this._onMouseUp).mousemove(_this._onMouseMove);
                    if (_this.pressed) {
                        _this.pressed({
                            pageX: event.pageX,
                            pageY: event.pageY,
                            context: _this._context
                        });
                    }
                }
            };
            /** The handler for the element mouseup event.
            *
            * @private
            */
            this._onMouseUp = function (event) {
                if (event.button === 0) {
                    event.preventDefault();
                    $(document).off("mouseup", _this._onMouseUp).off("mousemove", _this._onMouseMove);
                    if (_this.released) {
                        _this.released({
                            pageX: event.pageX,
                            pageY: event.pageY,
                            context: _this._context
                        });
                    }
                }
            };
            /** The handler for the element mousemove event.
            *
            * @private
            */
            this._onMouseMove = function (event) {
                event.preventDefault();
                if (_this.moved) {
                    _this.moved({
                        pageX: event.pageX,
                        pageY: event.pageY,
                        context: _this._context
                    });
                }
            };
            this._element = element;
            this._context = context;
            $(element).mousedown(this._onMouseDown);
        }
        /**
        * Destroy the drag helper.
        *
        * This will release the internal references to the element,
        * context, and handlers.
        */
        DragHelper.prototype.destroy = function () {
            $(this._element).off("mousedown", this._onMouseDown);
            this._element = null;
            this._context = null;
            this.pressed = null;
            this.released = null;
            this.moved = null;
        };

        Object.defineProperty(DragHelper.prototype, "element", {
            /**
            * Get the drag target element.
            *
            * @readonly
            */
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DragHelper.prototype, "context", {
            /**
            * Get the user-provided drag context.
            * @readonly
            */
            get: function () {
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        return DragHelper;
    })();
    porcelain.DragHelper = DragHelper;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=drag_helper.js.map
