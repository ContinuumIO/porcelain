/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    export class Signal<T> {

        connect(handler: IEventHandler<T>): void {
            if (!this._handlers) {
                this._handlers = [];
            }
            var i = this._handlers.indexOf(handler);
            if (i === -1) {
                this._handlers.push(handler);
            }
        }

        disconnect(handler: IEventHandler<T>): void {
            if (!this._handlers) {
                return;
            }
            var i = this._handlers.indexOf(handler);
            if (i !== -1) {
                this._handlers.splice(i, 1);
            }
        }

        emit(arg: T): void {
            if (!this._handlers || !this._handlers.length) {
                return;
            }
            $.each(this._handlers.slice(), function (index, handler) {
                handler(arg);
            });
        }

        private _handlers: IEventHandler<T>[] = null;
    }

}
