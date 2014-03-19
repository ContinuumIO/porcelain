/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    var HANDLE_CLASS = "porcelain-ResizeHandle";

    export class ResizeHandle<T> extends Item {

        pressed: Signal<ITaggedPoint<T>> = new Signal<ITaggedPoint<T>>();

        released: Signal<ITaggedPoint<T>> = new Signal<ITaggedPoint<T>>();

        moved: Signal<ITaggedPoint<T>> = new Signal<ITaggedPoint<T>>();

        constructor(tag: T) {
            super();
            this._tag = tag;
        }

        create(): void {
            if (this.element) {
                return;
            }
            super.create();
            $(this.element).addClass(HANDLE_CLASS).mousedown(this._onMouseDown);
        }

        private _onMouseDown = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                var doc = $(document);
                doc.on("mouseup", this._onMouseUp);
                doc.on("mousemove", this._onMouseMove);
                event.preventDefault();
                var arg = { x: event.pageX, y: event.pageY, tag: this._tag };
                this.pressed.emit(arg);
            }
        }

        private _onMouseUp = (event: JQueryMouseEventObject) => {
            if (event.button === 0) {
                var doc = $(document);
                doc.off("mouseup", this._onMouseUp);
                doc.off("mousemove", this._onMouseMove);
                event.preventDefault();
                this.pressed.emit({ x: event.pageX, y: event.pageY, });
            }
        }

        private _onMouseMove = (event: JQueryMouseEventObject) => {
            event.preventDefault();
            this.moved.emit({ x: event.pageX, y: event.pageY });
        }

        private _tag: T;
    }

}