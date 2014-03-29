/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /*
     * A class which manages an event listener binding.
     *
     * @class
     */
    export class EventBinder {

        /**
         * Construct a new event binder.
         *
         * @param target The target of the event.
         * @param type The event type to bind for the target.
         * @param listener The event listener to bind to the target.
         * @param context The context to bind to the listener.
         */
        constructor(
            target: EventTarget,
            type: string,
            listener: EventListener,
            context: any)
        {
            this._target = target;
            this._type = type;
            this._listener = listener;
            this._context = context;
        }

        /**
         * Destroy the event binder.
         */
        destroy(): void {
            this.detach();
            this._target = null;
            this._listener = null;
            this._context = null;
        }

        /**
         * Get the target for the binder.
         *
         * @readonly
         */
        get target(): EventTarget {
            return this._target;
        }

        /**
         * Get the event type for the binder.
         *
         * @readonly
         */
        get type(): string {
            return this._type;
        }

        /**
         * Get the listener for the binder.
         *
         * @readonly
         */
        get listener(): EventListener {
            return this._listener;
        }

        /**
         * Get the context for the binder.
         *
         * @readonly
         */
        get context(): any {
            return this._context;
        }

        /**
         * Returns true if this binder is equivalent to another.
         *
         * @param other The binder to test for equality.
         */
        equals(other: EventBinder): boolean {
            return this._target === other._target &&
                   this._type === other._type &&
                   this._listener === other._listener &&
                   this._context === other._context;
        }

        /**
         * Attach the binder to the event target.
         */
        attach(): void {
            var listener = <EventListener>(<any>this);  // workaround http://typescript.codeplex.com/workitem/45
            this._target.addEventListener(this._type, listener, false);
        }

        /**
         * Detach the binder from the event target.
         */
        detach(): void {
            var listener = <EventListener>(<any>this);  // workaround http://typescript.codeplex.com/workitem/45
            this._target.removeEventListener(this._type, listener, false);
        }

        /**
         * The event listener dispatch method.
         *
         * This should not be called directly by user code.
         */
        handleEvent(event: Event): void {
            this._listener.call(this._context, event);
        }

        private _target: EventTarget;
        private _type: string;
        private _listener: EventListener;
        private _context: any;
    }

}
