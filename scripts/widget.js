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
    * The CSS class added to Widget instances.
    */
    var WIDGET_CLASS = "p-Widget";

    /**
    * A base class for creating interactive porcelain widgets.
    *
    * The Widget class adds the methods required for procedural layout.
    *
    * @class
    */
    var Widget = (function (_super) {
        __extends(Widget, _super);
        /**
        * Construct a new Widget.
        */
        function Widget() {
            _super.call(this);
            this.addClass(WIDGET_CLASS);
        }
        /**
        * Show the underlying DOM element.
        *
        * This is a convenience for setVisible(true);
        */
        Widget.prototype.show = function () {
            this.setVisible(true);
        };

        /**
        * Hide the underlying div element.
        *
        * This is a convenience for setVisible(false);
        */
        Widget.prototype.hide = function () {
            this.setVisible(false);
        };

        /**
        * Set the visibility of the underlying div element.
        *
        * The default implementation of this method sets and clears
        * the display property of the element style. This may be
        * reimplemented by subclasses which require more control.
        */
        Widget.prototype.setVisible = function (visible) {
            var style = this.element.style;
            if (visible) {
                style.removeProperty("display");
            } else {
                style.display = "none";
            }
        };

        /**
        * The preferred size of the widget.
        *
        * When using the procedural layout system, this value is used
        * to take into account the preferred size of the widget. It
        * is ignored when using CSS layout.
        *
        * An invalid size will be ignored by the layout system.
        *
        * @protected
        */
        Widget.prototype.sizeHint = function () {
            return new porcelain.Size();
        };

        /**
        * The suggested minimum size of the widget.
        *
        * When using the procedural layout system, this value is used
        * to take into account the preferred minimum size of the widget.
        * It is ignored when using CSS layout.
        *
        * An invalid size will be ignored by the layout system. If the
        * user has specified a concrete minimum size, this hint will
        * have no effect.
        *
        * @protected
        */
        Widget.prototype.minimumSizeHint = function () {
            return new porcelain.Size();
        };

        /**
        * The suggested maximum size of the element.
        *
        * When using the procedural layout system, this value is used
        * to take into account the preferred minimum size of the widget.
        * It is ignored when using CSS layout.
        *
        * An invalid size will be ignored by the layout system. If the
        * user has specified a concrete maximum size, this hint will
        * have no effect.
        *
        * @protected
        */
        Widget.prototype.maximumSizeHint = function () {
            return new porcelain.Size();
        };
        return Widget;
    })(porcelain.Item);
    porcelain.Widget = Widget;
})(porcelain || (porcelain = {}));
//# sourceMappingURL=widget.js.map
