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
    * The class added to a MoveGrip instance.
    */
    var MOVE_GRIP_CLASS = "p-MoveGrip";

    /**
    * A widget which serves as move grip for an adjustable item.
    *
    * This can serve as a base class for more complex widgets
    * like a window title bar.
    *
    * @class
    */
    var MoveGrip = (function (_super) {
        __extends(MoveGrip, _super);
        /**
        * Construct a new MoveGrip.
        *
        * @param target The component to move with the grip.
        */
        function MoveGrip(target) {
            _super.call(this);
            /**
            * The mousedown event binder.
            */
            this.mousedown = new porcelain.EventBinder("mousedown", this.element);
            /**
            * The mouseup event binder.
            */
            this.mouseup = new porcelain.EventBinder("mouseup", document);
            /**
            * The mousemove event binder.
            */
            this.mousemove = new porcelain.EventBinder("mousemove", document);
            this._offsetX = 0;
            this._offsetY = 0;
            this._target = target;
            this.addClass(MOVE_GRIP_CLASS);
            this.mousedown.bind(this.onMouseDown, this);
        }
        /**
        * Destroy the title bar.
        */
        MoveGrip.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._target = null;
        };

        /**
        * The target component moved by the grip.
        *
        * @readonly
        */
        MoveGrip.prototype.target = function () {
            return this._target;
        };

        /**
        * The mousedown handler.
        *
        * @protected
        */
        MoveGrip.prototype.onMouseDown = function (event) {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.mouseup.bind(this.onMouseUp, this);
            this.mousemove.bind(this.onMouseMove, this);
            var pos = this._target.position;
            this._offsetX = event.pageX - pos.x;
            this._offsetY = event.pageY - pos.y;
        };

        /**
        * The mouseup handler.
        *
        * @protected
        */
        MoveGrip.prototype.onMouseUp = function (event) {
            if (event.button !== 0) {
                return;
            }
            event.preventDefault();
            this.mouseup.unbind(this.onMouseUp, this);
            this.mousemove.unbind(this.onMouseMove, this);
            this._offsetX = 0;
            this._offsetY = 0;
        };

        /**
        * The mousemove handler.
        *
        * @protected
        */
        MoveGrip.prototype.onMouseMove = function (event) {
            event.preventDefault();
            var vp = porcelain.viewport;
            var x = Math.min(Math.max(vp.left, event.pageX), vp.windowRight);
            var y = Math.min(Math.max(vp.top, event.pageY), vp.windowBottom);
            var origin = new porcelain.Point(x - this._offsetX, y - this._offsetY);
            this._target.position = origin;
        };
        return MoveGrip;
    })(porcelain.Component);
    porcelain.MoveGrip = MoveGrip;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=move_grip.js.map
