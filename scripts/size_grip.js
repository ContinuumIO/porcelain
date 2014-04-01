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
    * The class added to a SizeGrip instance.
    */
    var SIZE_GRIP_CLASS = "p-SizeGrip";

    /**
    * The prefix for the grip area class added to a size grip.
    */
    var GRIP_AREA_PREFIX = "p-GripArea-";

    /**
    * The areas which define the behavior of a size grip.
    */
    (function (GripArea) {
        GripArea[GripArea["Left"] = 0] = "Left";
        GripArea[GripArea["Top"] = 1] = "Top";
        GripArea[GripArea["Right"] = 2] = "Right";
        GripArea[GripArea["Bottom"] = 3] = "Bottom";
        GripArea[GripArea["TopLeft"] = 4] = "TopLeft";
        GripArea[GripArea["TopRight"] = 5] = "TopRight";
        GripArea[GripArea["BottomLeft"] = 6] = "BottomLeft";
        GripArea[GripArea["BottomRight"] = 7] = "BottomRight";
    })(porcelain.GripArea || (porcelain.GripArea = {}));
    var GripArea = porcelain.GripArea;

    /**
    * A widget which enables mouse resizing of an adjustable item.
    *
    * @class
    */
    var SizeGrip = (function (_super) {
        __extends(SizeGrip, _super);
        /**
        * Construct a new SizeGrip.
        *
        * @param gripArea The grip area defining the size grip behavior.
        * @param target The adjustable object to be resized by the grip.
        */
        function SizeGrip(gripArea, target) {
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
            this._gripArea = gripArea;
            this._target = target;
            this.addClass(SIZE_GRIP_CLASS);
            this.addClass(GRIP_AREA_PREFIX + GripArea[gripArea]);
            this.mousedown.bind(this.onMouseDown, this);
        }
        /**
        * Destroy the edge grip.
        */
        SizeGrip.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._target = null;
        };

        Object.defineProperty(SizeGrip.prototype, "gripArea", {
            /**
            * The grip area defining the size grip behavior.
            *
            * @readonly
            */
            get: function () {
                return this._gripArea;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SizeGrip.prototype, "target", {
            /**
            * The target object of the size grip.
            *
            * @readonly
            */
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });

        /**
        * The mousedown handler.
        *
        * @protected
        */
        SizeGrip.prototype.onMouseDown = function (event) {
            if (event.button !== 0) {
                return;
            }
            console.log(this);
            event.preventDefault();
            this.mouseup.bind(this.onMouseUp, this);
            this.mousemove.bind(this.onMouseMove, this);
            var geo = this._target.geometry();
            switch (this._gripArea) {
                case 0 /* Left */:
                case 4 /* TopLeft */:
                case 6 /* BottomLeft */:
                    this._offsetX = event.pageX - geo.left;
                    break;
                case 2 /* Right */:
                case 5 /* TopRight */:
                case 7 /* BottomRight */:
                    this._offsetX = event.pageX - geo.right;
                    break;
            }
            switch (this._gripArea) {
                case 1 /* Top */:
                case 4 /* TopLeft */:
                case 5 /* TopRight */:
                    this._offsetY = event.pageY - geo.top;
                    break;
                case 3 /* Bottom */:
                case 6 /* BottomLeft */:
                case 7 /* BottomRight */:
                    this._offsetY = event.pageY - geo.bottom;
                    break;
                default:
                    break;
            }
        };

        /**
        * The mouseup handler.
        *
        * @protected
        */
        SizeGrip.prototype.onMouseUp = function (event) {
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
        SizeGrip.prototype.onMouseMove = function (event) {
            event.preventDefault();
            var vp = porcelain.viewport;
            var item = this._target;
            var geo = item.geometry();
            var minSize = item.minimumSize();
            var maxSize = item.maximumSize();
            var x = event.pageX - this._offsetX;
            var y = event.pageY - this._offsetY;
            x = Math.min(Math.max(vp.left, x), vp.windowRight);
            y = Math.min(Math.max(vp.top, y), vp.windowBottom);
            var minX, maxX;
            switch (this._gripArea) {
                case 0 /* Left */:
                case 4 /* TopLeft */:
                case 6 /* BottomLeft */:
                    minX = geo.right - maxSize.width;
                    maxX = geo.right - minSize.width;
                    geo.left = Math.min(Math.max(minX, x), maxX);
                    break;
                case 2 /* Right */:
                case 5 /* TopRight */:
                case 7 /* BottomRight */:
                    minX = geo.left + minSize.width;
                    maxX = geo.left + maxSize.width;
                    geo.right = Math.min(Math.max(minX, x), maxX);
                    break;
                default:
                    break;
            }
            var minY, maxY;
            switch (this._gripArea) {
                case 1 /* Top */:
                case 4 /* TopLeft */:
                case 5 /* TopRight */:
                    minY = geo.bottom - maxSize.height;
                    maxY = geo.bottom - minSize.height;
                    geo.top = Math.min(Math.max(minY, y), maxY);
                    break;
                case 3 /* Bottom */:
                case 6 /* BottomLeft */:
                case 7 /* BottomRight */:
                    minY = geo.top + minSize.height;
                    maxY = geo.top + maxSize.height;
                    geo.bottom = Math.min(Math.max(minY, y), maxY);
                    break;
                default:
                    break;
            }
            item.setGeometry(geo);
        };
        return SizeGrip;
    })(porcelain.Component);
    porcelain.SizeGrip = SizeGrip;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=size_grip.js.map
