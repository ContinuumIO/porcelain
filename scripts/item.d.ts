declare module porcelain {
    /**
    * The most base class of visible porcelain objects.
    *
    * Instances are represented by a single <div>.
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
        private _element;
    }
}
