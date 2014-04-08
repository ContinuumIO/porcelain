/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain.old {

    /**
     * An internal interface for storing the spy elements.
     */
    interface IResizeSpyElements {
        expandable: HTMLDivElement;
        expandableInner: HTMLDivElement;
        collapsible: HTMLDivElement;
        collapsibleInner: HTMLDivElement;
    }


    /** 
     * A class for listening for resizes on a component.
     *
     * An instance of this class can be added as the child of any
     * component. It's `resized` signal will be emitted whenever
     * the parent element is resized.
     *
     * @class
     */
    export class ResizeSpy extends Component {

        /**
         * The CSS class added to ResizeSpy instances.
         */
        static Class = "p-ResizeSpy";

        /** 
         * The CSS class added to the expandable div.
         */
        static ExpandableClass = "p-ResizeSpy-expandable";

        /** 
         * The CSS class added to the collapsible div.
         */
        static CollapsibleClass = "p-ResizeSpy-collapsible";

         /**
         * The CSS class added to the expandable inner div.
         */
        static ExpandableInnerClass = "p-ResizeSpy-expandable-inner";

        /**
         * The CSS class added to the collapsible inner div.
         */
        static CollapsibleInnerClass = "p-ResizeSpy-collapsible-inner";

        /**
         * A signal emmited when the parent div is resized.
         */
        resized = new Signal();

        /**
         * Construct a new ResizeSpy.
         */
        constructor() {
            super();
            this.addClass(ResizeSpy.Class);

            var expandable = document.createElement("div");
            var expandableInner = document.createElement("div");
            var collapsible = document.createElement("div");
            var collapsibleInner = document.createElement("div");

            expandable.className = ResizeSpy.ExpandableClass;
            collapsible.className = ResizeSpy.CollapsibleClass;
            expandableInner.className = ResizeSpy.ExpandableInnerClass;
            collapsibleInner.className = ResizeSpy.CollapsibleInnerClass;

            expandable.appendChild(expandableInner);
            collapsible.appendChild(collapsibleInner);

            var element = this.element();
            element.appendChild(expandable);
            element.appendChild(collapsible);

            this._evtExpandScroll = new EventBinder("scroll", expandable);
            this._evtCollapseScroll = new EventBinder("scroll", collapsible);

            this._evtExpandScroll.bind(this._onScroll, this);
            this._evtCollapseScroll.bind(this._onScroll, this);

            this._elements = {
                expandable: expandable,
                expandableInner: expandableInner,
                collapsible: collapsible,
                collapsibleInner: collapsibleInner,
            }
        }

        /**
         * Destroy the ResizeSpy.
         */
        destroy(): void {
            super.destroy();
            this._elements = null;
        }

        /**
         * Perform initialization which requires a live DOM tree.
         */
        afterAttach(): void {
            this._resetScrollPositions();
        }

        /**
         * The internal scroll event handler. 
         * 
         * If the size of the element has not changed, this is a no-op.
         * Otherwise, the scroll positions are reset and the resized
         * signal is emitted.
         *
         * @private
         */
        private _onScroll(): void {
            var size = this.size();
            if (size.equals(this._lastSize)) {
                return;
            }
            this._lastSize = size;
            this._resetScrollPositions();
            this.resized.emit();
        }

        /**
         * A helper method to reset the internal scroll items.
         *
         * This method resets the scroll positions of the internal
         * div elements so that the next resize triggers a scroll.
         *
         * @private
         */
        private _resetScrollPositions(): void {
            var elements = this._elements;
            var expandable = elements.expandable;
            var collapsible = elements.collapsible;
            var width = expandable.offsetWidth + 100;
            var height = expandable.offsetHeight + 100;
            var style = elements.expandableInner.style;
            style.width = width + "px";
            style.height = height + "px";
            expandable.scrollTop = height;
            expandable.scrollLeft = width;
            collapsible.scrollLeft = collapsible.scrollWidth;
            collapsible.scrollTop = collapsible.scrollHeight;
        }

        private _lastSize: Size = new Size();
        private _elements: IResizeSpyElements;
        private _evtExpandScroll: EventBinder;
        private _evtCollapseScroll: EventBinder;
    }

}
