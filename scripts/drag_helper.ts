/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * The interface for a drag helper event.
     */
    export interface DragHelperEvent<T> {
        pageX: number;
        pageY: number;
        context: T;
    }
    

    /**
     * The interface for a drag helper handler.
     */
    export interface DragHelperHandler<T> {
        (event: DragHelperEvent<T>): void;
    }


    /**
     * The DragHelper class.
     *
     * A DragHelper can be used to help implement moving/dragging of an
     * html element. The helper takes care of boiler plate required for
     * handling the necessary DOM events for proper mouse capture.
     *
     * @class
     */
    export class DragHelper<T> {

        /**
         * An optional handler to react to a left mouse press.
         */
        pressed: DragHelperHandler<T> = null;

        /**
         * An optional handler to react to a left mouse release.
         */
        released: DragHelperHandler<T> = null;

        /**
         * An optional handler to react to a mouse move. This will
         * be invoked only while the left mouse button is pressed.
         */
        moved: DragHelperHandler<T> = null;

        /**
         * Construct a new DragHelper.
         *
         * @param element - the html element to use as the drag target
         * @param context - additional context to add the event objects
         */
        constructor(element: Element, context: T) {
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
        destroy(): void {
            $(this._element).off("mousedown", this._onMouseDown);
            this._element = null;
            this._context = null;
            this.pressed = null;
            this.released = null;
            this.moved = null;
        }

        /**
         * Get the drag target element.
         *
         * @readonly
         */
        get element(): Element {
            return this._element;
        }

        /**
         * Get the user-provided drag context.
         * @readonly
         */
        get context(): T {
            return this._context;
        }

        /** The handler for the element mousedown event.
         * 
         * @private
         */
        private _onMouseDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                event.preventDefault();
                $(document)
                    .mouseup(this._onMouseUp)
                    .mousemove(this._onMouseMove);
                if (this.pressed) {
                    this.pressed({
                        pageX: event.pageX,
                        pageY: event.pageY,
                        context: this._context
                    });
                }
            }
        }
        
        /** The handler for the element mouseup event.
         * 
         * @private
         */
        private _onMouseUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                event.preventDefault();
                $(document)
                    .off("mouseup", this._onMouseUp)
                    .off("mousemove", this._onMouseMove);
                if (this.released) {
                    this.released({
                        pageX: event.pageX,
                        pageY: event.pageY,
                        context: this._context
                    });
                }
            }
        }

        /** The handler for the element mousemove event.
         * 
         * @private
         */
        private _onMouseMove = (event: JQueryMouseEventObject) => {
            event.preventDefault();
            if (this.moved) {
                this.moved({
                    pageX: event.pageX,
                    pageY: event.pageY,
                    context: this._context
                });
            }
        }

        private _element: Element;
        private _context: T;
    }

}
