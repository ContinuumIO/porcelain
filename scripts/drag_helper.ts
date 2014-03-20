/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export interface DragHelperEvent<T> {
        pageX: number;
        pageY: number;
        context: T;
    }

    export class DragHelper<T> {

        pressed: IEventHandler<DragHelperEvent<T>> = null;

        released: IEventHandler<DragHelperEvent<T>> = null;

        moved: IEventHandler<DragHelperEvent<T>> = null;

        constructor(element: Element, context: T) {
            this._element = element;
            this._context = context;
            $(element).mousedown(this._onMouseDown);
        }

        destroy(): void {
            $(this._element).off("mousedown", this._onMouseDown);
            this._element = null;
            this._context = null;
            this.pressed = null;
            this.released = null;
            this.moved = null;
        }

        get element(): Element {
            return this._element;
        }

        get context(): T {
            return this._context;
        }

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
