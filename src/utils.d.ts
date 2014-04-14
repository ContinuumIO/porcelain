declare module porcelain {
    /**
    * Create an array of values defined an enum object.
    */
    function enumValues<T extends number>(enumObj: any): T[];
}
