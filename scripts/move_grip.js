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
    * A component which serves as a move grip for a component.
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
            *
            * @readonly
            */
            this.evtMouseDown = new porcelain.EventBinder("mousedown", this.element());
            /**
            * The mouseup event binder.
            *
            * @readonly
            */
            this.evtMouseUp = new porcelain.EventBinder("mouseup", document);
            /**
            * The mousemove event binder.
            *
            * @readonly
            */
            this.evtMouseMove = new porcelain.EventBinder("mousemove", document);
            this._offsetX = 0;
            this._offsetY = 0;
            this._target = target;
            this.addClass(MoveGrip.Class);
            this.evtMouseDown.bind(this.onMouseDown, this);
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
            this.evtMouseUp.bind(this.onMouseUp, this);
            this.evtMouseMove.bind(this.onMouseMove, this);
            var pos = this._target.pos();
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
            this.evtMouseUp.unbind(this.onMouseUp, this);
            this.evtMouseMove.unbind(this.onMouseMove, this);
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
            var vp = porcelain.Viewport;
            var x = Math.min(Math.max(vp.left(), event.pageX), vp.windowRight());
            var y = Math.min(Math.max(vp.top(), event.pageY), vp.windowBottom());
            var pos = new porcelain.Point(x - this._offsetX, y - this._offsetY);
            this._target.setPos(pos);
        };
        MoveGrip.Class = "p-MoveGrip";
        return MoveGrip;
    })(porcelain.Component);
    porcelain.MoveGrip = MoveGrip;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=move_grip.js.map
