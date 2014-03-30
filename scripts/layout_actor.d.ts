declare module porcelain {
    /**
    * An interface for objects which enable procedural layout.
    */
    interface ILayoutActor {
        /**
        * The minimum allowed size of the object.
        */
        minimumSize(): Size;
        /**
        * The maximum allowed size of the object.
        */
        maximumSize(): Size;
        /**
        * The preferred size of the object.
        */
        sizeHint(): Size;
        /**
        * The rect describing the object geometry.
        */
        geometry(): Rect;
        /**
        * Set the objects geometry.
        */
        setGeometry(rect: Rect): any;
    }
}
