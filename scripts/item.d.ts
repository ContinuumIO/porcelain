﻿declare module porcelain {
    class Item {
        /**
        * Construct a new Item.
        * @class
        * @classdesc The base class of porcelain visual items.
        * An Item is represented by a single <div>. The div
        * contents and layout are specified by subclasses.
        */
        constructor();
        /**
        * Get the width of the item in pixels.
        * @readonly
        * @type {number}
        */
        public width : number;
        /**
        * Get the height of the item in pixels.
        * @readonly
        * @type {number}
        */
        public height : number;
        /**
        * Get the size of the item. This is more efficient than
        * getting `width` and `height` independently.
        * @readonly
        * @type {ISize}
        */
        public size : ISize;
        /**
        * The item's internal div element.
        * @readonly
        * @type {HTMLDivElement}
        */
        public element : HTMLDivElement;
        /**
        * Create the item's internal div element. This is a
        * no-op if the element has already been created.
        */
        public create(): void;
        /**
        * Destroy the item's internal div element. This is a
        * no-op if the element has already been destroyed.
        */
        public destroy(): void;
        private _element;
    }
}
