/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A layout item for use with a Panel component.
     *
     * This layout item ensures that the panel's layout is updated
     * when the size of the panel is changed.
     *
     * @class
     */
    export
    class PanelItem extends ComponentItem {

        /**
         * Construct a new PanelItem.
         *
         * @param panel The Panel to manage with the item.
         */
        constructor(panel: Panel) { super(panel); }

        /**
         * Returns the Panel managed by this item.
         *
         * This is a type-safe equivalent to 'component()'.
         */
        panel(): Panel {
            return <Panel>this.component();
        }
    }

}
