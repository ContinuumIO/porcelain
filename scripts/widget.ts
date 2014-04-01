/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

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
    export class Widget extends Item {

        /**
         * Construct a new Widget.
         */
        constructor() {
            super();
            this.addClass(WIDGET_CLASS);
        }

        /**
         * Show the underlying DOM element.
         *
         * This is a convenience for setVisible(true);
         */
        show(): void {
            this.setVisible(true);
        }

        /**
         * Hide the underlying div element.
         *
         * This is a convenience for setVisible(false);
         */
        hide(): void {
            this.setVisible(false);
        }

        /**
         * Set the visibility of the underlying div element.
         *
         * The default implementation of this method sets and clears
         * the display property of the element style. This may be
         * reimplemented by subclasses which require more control.
         */
        setVisible(visible: boolean): void {
            var style = this.element.style;
            if (visible) {
                style.removeProperty("display");
            } else {
                style.display = "none";
            }
        }

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
        sizeHint(): Size {
            return new Size();
        }

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
        minimumSizeHint(): Size {
            return new Size();
        }

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
        maximumSizeHint(): Size {
            return new Size();
        }

    }

}
