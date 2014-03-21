declare module porcelain {
    /**
    * The most base class of visible porcelain objects.
    *
    * Instances are represented by a single <div>. The internal
    * div contents and the div layout are provided by subclasses.
    *
    * @class
    */
    class Item {
        /**
        * Construct a new Item.
        */
        constructor();
        /**
        * Destroy the item and remove its element from the DOM.
        *
        * Manipulating an Item after it has been destroyed will
        * result in undefined behavior.
        */
        public destroy(): void;
        /**
        * The item's internal div element.
        *
        * @readonly
        */
        public element : HTMLDivElement;
        /**
        * The width of the item in pixels.
        *
        * @readonly
        */
        public width : number;
        /**
        * The height of the item in pixels.
        *
        * @readonly
        */
        public height : number;
        /**
        * The size of the item, in pixels.
        *
        * This is more efficient than accessing `width` and `height`
        * separately.
        *
        * @readonly
        */
        public size : ISize;
        private _element;
    }
}
