/// <reference path="../thirdparty/lodash.d.ts" />
/// <reference path="../thirdparty/tsutils.d.ts" />
/// <reference path="../thirdparty/kiwi.d.ts" />
declare module porcelain {
    /**
    * An interface defining point in Cartesian space.
    */
    interface IPoint {
        x: number;
        y: number;
    }
    /**
    * A class which represents a point in Cartesian space.
    *
    * @class
    */
    class Point implements IPoint {
        /**
        * The X-coordinate of the point, in pixels.
        */
        public x: number;
        /**
        * The Y-coordinate of the point, in pixels.
        */
        public y: number;
        /**
        * Construct a new Point.
        */
        constructor();
        constructor(point: IPoint);
        constructor(x: number, y: number);
        /**
        * Returns true if both X AND Y coordinates are zero.
        */
        public isNull(): boolean;
        /**
        * Returns the sum of the abs X and Y distances to the origin.
        */
        public manhattanLength(): number;
        /**
        * Returns true if this point is equivalent to another.
        */
        public equals(other: Point): boolean;
        /**
        * Returns a new point which is the sum of the two points.
        */
        public add(other: Point): Point;
        /**
        * Returns a new point which is the difference of the two points.
        */
        public subtract(other: Point): Point;
        /**
        * Returns a new point scaled by the given factor.
        */
        public multiply(factor: number): Point;
        /**
        * Returns a new point scaled by the given divisor.
        */
        public divide(divisor: number): Point;
    }
}
declare module porcelain {
    /**
    * An interface defining a size in Cartesian space.
    */
    interface ISize {
        width: number;
        height: number;
    }
    /**
    * A class representing a size in Cartesian space.
    *
    * @class
    */
    class Size {
        /**
        * The width, in pixels.
        */
        public width: number;
        /**
        * The height, in pixels.
        */
        public height: number;
        /**
        * Construct a new Size.
        */
        constructor();
        constructor(size: ISize);
        constructor(width: number, height: number);
        /**
        * Returns true if the width OR height is zero.
        */
        public isEmpty(): boolean;
        /**
        * Returns true if the height width AND height are zero.
        */
        public isNull(): boolean;
        /**
        * Returns true if the width AND height are non-negative.
        */
        public isValid(): boolean;
        /**
        * Returns a new size limited in each dimension by another size.
        */
        public boundedTo(other: Size): Size;
        /**
        * Returns a new size expaned in each dimension to another size.
        */
        public expandedTo(other: Size): Size;
        /**
        * Swap the width and height values.
        */
        public transpose(): void;
        /**
        * Returns a new size with width and height swapped.
        */
        public transposed(): Size;
        /**
        * Returns true if this size is equivalent to another.
        */
        public equals(other: Size): boolean;
        /**
        * Returns a new size which is the sum of two sizes.
        */
        public add(other: Size): Size;
        /**
        * Returns a new size which is the difference of two sizes.
        */
        public subtract(other: Size): Size;
        /**
        * Returns a new size scaled by the given factor.
        */
        public multiply(factor: number): Size;
        /**
        * Returns a new size scaled by the given divisor.
        */
        public divide(divisor: number): Size;
    }
}
declare module porcelain {
    /**
    * An interface defining a rectangle in Cartesian space.
    */
    interface IRect {
        left: number;
        top: number;
        right: number;
        bottom: number;
    }
    /**
    * A class represeting a rectangle in Cartesian space.
    *
    * @class
    */
    class Rect implements IRect {
        /**
        * The left edge of the rect, in pixels.
        *
        * Modifying this value will change the width, but will not
        * change the right edge.
        */
        public left: number;
        /**
        * The top edge of the rect, in pixels.
        *
        * Modifying this value will change the height, but will not
        * change the bottom edge.
        */
        public top: number;
        /**
        * The right edge of the rect, in pixels.
        *
        * Modifying this value will change the width, but will not
        * change the left edge.
        */
        public right: number;
        /**
        * The bottom edge of the rect, in pixel.
        *
        * Modifying this value will change the height, but will not
        * change the bottom edge.
        */
        public bottom: number;
        /**
        * Construct a new Rect.
        */
        constructor();
        constructor(rect: IRect);
        constructor(topLeft: IPoint, bottomRight: IPoint);
        constructor(x: number, y: number, width: number, height: number);
        /**
        * Returns the width of the rect.
        *
        * This is equivalent to `right - left`
        */
        public width(): number;
        /**
        * Set the width of the rect.
        *
        * This will move the right edge.
        */
        public setWidth(width: number): void;
        /**
        * Returns the height of the rect.
        *
        * This is Equivalent to `bottom - top`.
        */
        public height(): number;
        /**
        * Set the height of the rect.
        *
        * This will move the bottom edge.
        */
        public setHeight(height: number): void;
        /**
        * Returns the size of the rect.
        */
        public size(): Size;
        /**
        * Set the size of the rect.
        *
        * This will move the left and right edges.
        */
        public setSize(size: Size): void;
        /**
        * Returns the top left corner of the rect.
        */
        public topLeft(): Point;
        /**
        * Set the top left corner of the rect.
        *
        * This will change the width and height, but will not change
        * change the right or bottom edges.
        */
        public setTopLeft(point: Point): void;
        /**
        * Returns the top right corner of the rect.
        */
        public topRight(): Point;
        /**
        * Set the top right corner of the rect.
        *
        * This will change the width and height, but will not change
        * the left or bottom edges.
        */
        public setTopRight(point: Point): void;
        /**
        * Returns bottom left corner of the rect.
        */
        public bottomLeft(): Point;
        /**
        * Set the bottom left corner of the rect.
        *
        * This will change the width and height, but will not change
        * the right or top edges.
        */
        public setBottomLeft(point: Point): void;
        /**
        * Returns bottom right corner of the rect.
        */
        public bottomRight(): Point;
        /** Set the bottom right corner of the rect.
        *
        * This will change the width and height, but will not change
        * the left or top edges.
        */
        public setBottomRight(point: Point): void;
        /**
        * Returns the center point of the rect.
        */
        public center(): Point;
        /**
        * Move the left edge of the rect.
        *
        * This will change the right edge, but will not change
        * the width.
        */
        public moveLeft(pos: number): void;
        /**
        * Move the top edge of the rect.
        *
        * This will change the bottom edge, but will not change
        * the height.
        */
        public moveTop(pos: number): void;
        /**
        * Move the right edge of the rect.
        *
        * This will change the left edge, but will not change
        * the width.
        */
        public moveRight(pos: number): void;
        /**
        * Move the bottom edge of the rect.
        *
        * This will change the top edge, but will not change the
        * height.
        */
        public moveBottom(pos: number): void;
        /**
        * Move the top left corner of the rect.
        *
        * This is equivalent to moving the top and left edges.
        */
        public moveTopLeft(point: Point): void;
        /**
        * Move the top right corner of the rect.
        *
        * This is equivalent to moving the top and right edges.
        */
        public moveTopRight(point: Point): void;
        /**
        * Move the bottom left corner of the rect.
        *
        * This is equivalent to moving the bottom and left edges.
        */
        public moveBottomLeft(point: Point): void;
        /**
        * Move the bottom right corner of the rect.
        *
        * This is equivalent to moving the bottom and right edges.
        */
        public moveBottomRight(point: Point): void;
        /**
        * Move the center point of the rect.
        *
        * This will not change the width or height.
        */
        public moveCenter(point: Point): void;
        /**
        * Returns true if the width OR height is zero or negative.
        */
        public isEmpty(): boolean;
        /**
        * Returns true if the width AND height are zero.
        */
        public isNull(): boolean;
        /**
        * Returns true the width AND height are positive non-zero.
        */
        public isValid(): boolean;
        /**
        * Returns true if this rect is equivalent to another.
        */
        public equals(other: Rect): boolean;
        /**
        * Adjust the rect edges by the given deltas.
        */
        public adjust(dx1: number, dy1: number, dx2: number, dy2: number): void;
        /**
        * Returns a new rect adjusted by the given deltas.
        */
        public adjusted(dx1: number, dy1: number, dx2: number, dy2: number): Rect;
        /**
        * Normalize the rect so that right >= left and bottom >= top.
        */
        public normalize(): void;
        /**
        * Returns a new rect with normalized edges.
        */
        public normalized(): Rect;
        /**
        * Translate the rect by the given deltas.
        */
        public translate(dx: number, dy: number): void;
        /**
        * Returns a new rect translated by the given deltas.
        */
        public translated(dx: number, dy: number): Rect;
        /**
        * Returns true if this rect contains the given point.
        */
        public contains(point: Point): boolean;
        /**
        * Returns true if this rect intersects the given rect.
        */
        public intersects(rect: Rect): boolean;
        /**
        * Returns the bounding rect of this rect and the given rect.
        */
        public intersectected(rect: Rect): Rect;
        /**
        * Returns the bounding rect of this rect and the given rect.
        */
        public united(rect: Rect): Rect;
    }
}
declare module porcelain {
    /**
    * CSS classes common to various components.
    */
    var CommonClass: {
        Pressed: string;
        Minimized: string;
        Maximized: string;
        SmallText: string;
        LargeText: string;
    };
}
declare module porcelain {
    /**
    * Create an array of values defined an enum object.
    */
    function enumValues<T extends number>(enumObj: any): T[];
}
declare module porcelain {
    /**
    * An object which provides viewport measurement functions.
    */
    var Viewport: {
        left: () => number;
        top: () => number;
        clientRight: () => number;
        clientBottom: () => number;
        clientWidth: () => number;
        clientHeight: () => number;
        windowRight: () => number;
        windowBottom: () => number;
        windowWidth: () => number;
        windowHeight: () => number;
    };
}
declare module porcelain {
    class EventBinder {
        /**
        * Construct a new event binder.
        *
        * @param type The event type to bind for the target.
        * @param target The target of the event.
        */
        constructor(type: string, target: EventTarget);
        /**
        * Destroy the event binder.
        */
        public destroy(): void;
        /**
        * Returns the event type for the binder.
        */
        public type(): string;
        /**
        * Returns the event target for the binder.
        */
        public target(): EventTarget;
        /**
        * Bind a listener to the event.
        *
        * If the listener is already attached, this is a no-op.
        *
        * @param listener The event listener to bind to the event.
        * @param [context] The 'this' context to pass to the listener.
        */
        public bind(listener: EventListener, context?: any): void;
        /**
        * Unbind a listener from the event.
        *
        * If the listener is not attached, this is a no-op. If
        * no listener is supplied, all listeners will be unbound.
        *
        * @param [listener] The event listener to bind to the event.
        * @param [context] The 'this' context to pass to the listener.
        */
        public unbind(listener?: EventListener, context?: any): void;
        private _type;
        private _target;
        private _proxies;
    }
}
declare module porcelain {
    /**
    * The Slot interface.
    *
    * This interface can be extended to create custom strongly typed slots.
    */
    interface ISlot {
        (): void;
    }
    /**
    * The Signal interface.
    *
    * This interface can be extended to create custom strongly typed signals.
    */
    interface ISignal {
        connect(slot: ISlot, context?: any): void;
        disconnect(slot: ISlot, context?: any): void;
        emit(...args: any[]): void;
    }
    /**
    * The Signal class.
    *
    * A Signal provides a type-safe one-to-many notification mechanism.
    * It allows objects to broadcast information without regard as to
    * whether or not anything is listening.
    *
    * @class
    */
    class Signal implements ISignal {
        /**
        * Construct a new Signal.
        */
        constructor();
        /**
        * Connect a slot to the signal.
        *
        * The slot will be invoked when the signal is emitted. The
        * arguments emitted by the signal will be passed to the slot.
        * If the slot is already connected, this is a no-op.
        *
        * @param slot The function to connect to the signal.
        * @param [context] The context to bind to the function call.
        */
        public connect(slot: ISlot, context?: any): void;
        /**
        * Disconnect a slot from the signal.
        *
        * If the slot is not connected to the signal, this is a no-op.
        * If no slot is provided, all slots will be disconnected.
        *
        * @param slot - the function to disconnect from the signal.
        * @param [context] The context object provided with the slot.
        */
        public disconnect(slot?: ISlot, context?: any): void;
        /**
        * Emit the signal with the given parameters.
        *
        * This will invoke all slots with the provided parameters in
        * the order in which they were connected. It is safe to
        * connect and disconnect slots while the signal is emitting.
        */
        public emit(...args: any[]): void;
        private _connections;
    }
}
declare module porcelain {
    /**
    * The most base class of porcelain objects.
    *
    * @class
    */
    class Component {
        /**
        * The CSS class added to Component instances.
        */
        static Class: string;
        /**
        * A signal emitted when the component is destroyed.
        *
        * @readonly
        */
        public destroyed: Signal;
        /**
        * Construct a new Component.
        */
        constructor();
        /**
        * Destroy the component and its children.
        */
        public destroy(): void;
        /**
        * Returns the parent Component of this component.
        */
        public parent(): Component;
        /**
        * Returns the array of child Components of this component.
        */
        public children(): Component[];
        /**
        * Unparent the Component and detach its element from the DOM.
        *
        */
        public detach(): void;
        /**
        * Append children to the end of this component.
        *
        * If a component is already a child, it will be moved to the
        * end of the child array. The children *must* be unique.
        *
        * @param [...] The child Components to append.
        */
        public append(...children: Component[]): void;
        /**
        * Prepend children to the beginning of this component.
        *
        * If a component is already a child, it will be moved to the
        * beginning of the child array. The children *must* be unique.
        *
        * @param [...] The child Components to prepend.
        */
        public prepend(...children: Component[]): void;
        /**
        * Insert children before the given child.
        *
        * If a component is already a child, it will be moved to the
        * new location in the child array. The before child *must* be
        * a current child. The children *must* be unique.
        *
        * @param before The child marking the insert location.
        * @param [...] The child Components to insert.
        */
        public insertBefore(before: Component, ...children: Component[]): void;
        /**
        * Returns the component's internal DOM element.
        */
        public element(): HTMLElement;
        /**
        * Returns the id of the component's DOM element.
        */
        public id(): string;
        /**
        * Set the id of the component's DOM element.
        *
        * @param id The id string to apply to the element.
        */
        public setId(id: string): void;
        /**
        * Add a name or names to the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to add to the element.
        */
        public addClass(className: string): void;
        /**
        * Remove a name or names from the element's CSS class name.
        *
        * Multiple names should be separated by whitespace.
        *
        * @param className - the class name(s) to remove from the element.
        */
        public removeClass(className: string): void;
        /**
        * Returns the inline style object for the component element.
        */
        public style(): CSSStyleDeclaration;
        /**
        * Returns the computed style object for the component element.
        */
        public computedStyle(): CSSStyleDeclaration;
        /**
        * Returns the CSS display value for the component element.
        */
        public display(): string;
        /**
        * Set the CSS display value for the component element.
        *
        * @param value The display value to apply to the element.
        */
        public setDisplay(value: string): void;
        /**
        * Returns CSS position value for the component element.
        */
        public position(): string;
        /**
        * Set the CSS position value for the component element.
        *
        * @param value The position value to apply to the element.
        */
        public setPosition(value: string): void;
        /**
        * Returns the cached geometry data for the object.
        *
        * This is intended for internal use by the framework. It is
        * subject to change without notice and should not be used
        * directly by user code.
        */
        public cachedGeometry(): IGeometryCache;
        /**
        * Returns the preferred size of the component.
        *
        * This computes the natural size of the component and is used
        * by the procedural layout system. The default implementation
        * of this method returns an invalid size.
        *
        * This should be implemented by subclasses which wish to be
        * used effectively by the procedural layout system.
        *
        * @protected
        */
        public sizeHint(): Size;
        /**
        * Create the underlying element for the component.
        *
        * The default implementation creates a div.
        *
        * @protected.
        */
        public createElement(): HTMLElement;
        /**
        * A helper method for preparing children to be inserted.
        *
        * @private
        */
        private _prepareChildren(children);
        /**
        * A helper method to detach the DOM element.
        *
        * @private
        */
        private _detachElement();
        /**
        * A helper method for destroying the component children.
        *
        * @private
        */
        private _destroyChildren();
        /**
        * A helper method for de-parenting the component.
        *
        * @private
        */
        private _deparent();
        private _element;
        private _parent;
        private _children;
        private _geometryCache;
    }
    /**
    * An interface which defines the component geometry cache.
    *
    * This is intended for internal use by the framework. It is
    * subject to change without notice and should not be used
    * directly by user code.
    */
    interface IGeometryCache {
        rect: Rect;
        sizeHint: Size;
        minimumSize: Size;
        maximumSize: Size;
    }
}
declare module porcelain {
    /**
    * The maximimum allowed layout width or height of an object.
    */
    var MAX_LAYOUT_DIM: number;
    /**
    * The minimum allowed layout size of an object.
    */
    var MIN_LAYOUT_SIZE: Size;
    /**
    * The maximum allowed layout size of an object.
    */
    var MAX_LAYOUT_SIZE: Size;
    /**
    * An interface for objects which can be procedurally layed out.
    */
    interface ILayoutItem {
        /**
        * Returns the computed minimum size of the object.
        */
        minimumSize(): Size;
        /**
        * Returns the computed maximum size of the object.
        */
        maximumSize(): Size;
        /**
        * Returns the computed preferred size of the object.
        */
        sizeHint(): Size;
        /**
        * Returns the object's current layout rect.
        */
        rect(): Rect;
        /**
        * Set the object's layout rect.
        *
        * @param rect The desired layout rect of the object.
        */
        setRect(rect: Rect): void;
    }
    /**
    * The interface definition for a layout object.
    */
    interface ILayout {
        /**
        * Update the layout of the managed components.
        *
        * This method is called automatically by the framework at
        * the appropriate times, and will not typically need to be
        * invoked by user code.
        */
        update(): void;
        /**
        * Invalidate any cached information in the layout.
        *
        * This method is called automatically by the framework at
        * the appropriate times, and will not typically need to be
        * invoked by user code.
        */
        invalidate(): void;
        /**
        * Compute the preferred size of the layout area.
        */
        sizeHint(): Size;
        /**
        * Compute the minimum required size of the layout area.
        */
        minimumSize(): Size;
        /**
        * Compute the maximum allowed size of the layou area.
        */
        maximumSize(): Size;
    }
}
declare module porcelain {
    /**
    * A class which implements ILayoutItem for a Component.
    *
    * @class
    */
    class ComponentItem implements ILayoutItem {
        /**
        * Construct a new ComponentItem.
        *
        * @param component The component to manipulate.
        */
        constructor(component: Component);
        /**
        * Returns the component handled by this item.
        */
        public component(): Component;
        /**
        * Returns the computed minimum size of the component.
        */
        public minimumSize(): Size;
        /**
        * Compute the maximum size of the component.
        */
        public maximumSize(): Size;
        /**
        * Compute the preferred size of the component.
        */
        public sizeHint(): Size;
        /**
        * Returns the layout rect of the component.
        */
        public rect(): Rect;
        /**
        * Set the layout rect of the component.
        *
        * @param rect The layout rect to apply to the component.
        */
        public setRect(rect: Rect): void;
        private _component;
    }
}
declare module porcelain {
    /**
    * A class for managing the Z-order of a collection of Items.
    *
    * @class
    */
    class ZStack {
        /**
        * Construct a new ZStack.
        *
        * @param minIndex The minimum Z-index of the stack.
        */
        constructor(minIndex: number);
        /**
        * Returns the component on the top of the stack.
        */
        public top(): Component;
        /**
        * Returns the component on the bottom of the stack.
        */
        public bottom(): Component;
        /**
        * Returns true if the stack contains the given component.
        *
        * @param component The component of interest.
        */
        public contains(component: Component): boolean;
        /**
        * Add a component to the top of the stack.
        *
        * If the stack already contains the component, this is a no-op.
        *
        * @param component The component to add to the stack.
        */
        public add(component: Component): void;
        /**
        * Remove a component from the stack and clear its Z-index.
        *
        * If the stack does not contain the component, this is a no-op.
        */
        public remove(component: Component): void;
        /**
        * Raise the specified components to the top of the stack.
        *
        * The relative stacking order of the components will be maintained.
        */
        public raise(...components: Component[]): void;
        /**
        * Lower the specified components to the bottom of the stack.
        *
        * The relative stacking order of the components will be maintained.
        */
        public lower(...components: Component[]): void;
        /**
        * Classify the given and current components into old and new.
        *
        * @private
        */
        private _classify(components);
        /**
        * Update the Z-indices for the current stack components.
        *
        * @private
        */
        private _updateIndices();
        private _minIndex;
        private _stack;
    }
    /**
    * A predefinined Z-stack for normal window components.
    */
    var normalWindowStack: ZStack;
    /**
    * A predefined Z-stack for top-most window components.
    */
    var topMostWindowStack: ZStack;
    /**
    * A predefined Z-stack for popup window components.
    */
    var popupWindowStack: ZStack;
}
declare module porcelain {
    /**
    * A basic push button class.
    *
    * This class serves as a base class for more concrete button types.
    *
    * @class
    */
    class Button extends Component {
        /**
        * The CSS class added to Button instances.
        */
        static Class: string;
        /**
        * A signal emitted when the button is clicked.
        *
        * @readonly
        */
        public clicked: Signal;
        /**
        * A signal emitted when the button is pressed.
        *
        * @readonly
        */
        public pressed: Signal;
        /**
        * A signal emitted when the button is released.
        *
        * @readonly
        */
        public released: Signal;
        /**
        * The mousedown event binder.
        *
        * @readonly
        */
        public evtMouseDown: EventBinder;
        /**
        * The mouseup event binder.
        *
        * @readonly
        */
        public evtMouseUp: EventBinder;
        /**
        * Construct a new Button instance.
        */
        constructor();
        /**
        * Destroy the button instance.
        */
        public destroy(): void;
        /**
        * The mousedown event handler.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        /**
        * The mouseup event handler.
        *
        * @protected
        */
        public onMouseUp(event: MouseEvent): void;
    }
}
declare module porcelain {
    /**
    * A component for displaying readonly text.
    *
    * @class
    */
    class Label extends Component {
        /**
        * The CSS class added to Label instances.
        */
        static Class: string;
        /**
        * Construct a new Label.
        */
        constructor(text?: string);
        /**
        * Get the text content of the label.
        */
        public text(): string;
        /**
        * Set the text content of the label.
        */
        public setText(value: string): void;
    }
}
declare module porcelain {
    /**
    * A component which serves as a move grip for a component.
    *
    * @class
    */
    class MoveGrip extends Component {
        /**
        * The CSS class added to MoveGrip instances.
        */
        static Class: string;
        /**
        * The mousedown event binder.
        *
        * @readonly
        */
        public evtMouseDown: EventBinder;
        /**
        * The mouseup event binder.
        *
        * @readonly
        */
        public evtMouseUp: EventBinder;
        /**
        * The mousemove event binder.
        *
        * @readonly
        */
        public evtMouseMove: EventBinder;
        /**
        * Construct a new MoveGrip.
        *
        * @param item The layout item to manipulate with the grip.
        */
        constructor(target: ILayoutItem);
        /**
        * Destroy the MoveGrip.
        */
        public destroy(): void;
        /**
        * The target layout item manipulated by the grip.
        */
        public target(): ILayoutItem;
        /**
        * The mousedown handler.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        /**
        * The mouseup handler.
        *
        * @protected
        */
        public onMouseUp(event: MouseEvent): void;
        /**
        * The mousemove handler.
        *
        * @protected
        */
        public onMouseMove(event: MouseEvent): void;
        private _target;
        private _offsetX;
        private _offsetY;
    }
}
declare module porcelain {
    /**
    * A component which renders like a canonical push button.
    */
    class PushButton extends Button {
        /**
        * The CSS class added to PushButton instances.
        */
        static Class: string;
        /**
        * The CSS class added to a PushButton text element.
        */
        static TextClass: string;
        /**
        * The CSS class added to PushButton image element.
        */
        static ImageClass: string;
        /**
        * Construct a new PushButton.
        */
        constructor(text?: string, image?: string);
        /**
        * Destroy the PushButton.
        */
        public destroy(): void;
        /**
        * Returns the text displayed in the push button.
        */
        public text(): string;
        /**
        * Set the text displayed in the push button.
        */
        public setText(value: string): void;
        /**
        * Returns the source url of the button image.
        */
        public image(): string;
        /**
        * Set the source url of the button image.
        */
        public setImage(image: string): void;
        /**
        * The element creation method.
        *
        * @protected
        */
        public createElement(): HTMLElement;
        /**
        * A helper method for clearing the text element.
        *
        * @private
        */
        private _clearText();
        /**
        * A helper method for creating the text element.
        *
        * @private
        */
        private _ensureText();
        /**
        * A helper method for clearing the image element.
        *
        * @private
        */
        private _clearImage();
        /**
        * A helper method for creating the image element.
        *
        * @private
        */
        private _ensureImage();
        private _textElement;
        private _imageElement;
    }
}
declare module porcelain {
    /**
    * The areas which define the behavior of a size grip.
    */
    enum GripArea {
        Left = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
        TopLeft = 4,
        TopRight = 5,
        BottomLeft = 6,
        BottomRight = 7,
    }
    /**
    * A widget which enables mouse resizing of an adjustable item.
    *
    * @class
    */
    class SizeGrip extends Component {
        /**
        * The CSS class added to SizeGrip instances.
        */
        static Class: string;
        /**
        * The CSS class prefix for GripArea values.
        */
        static GripAreaPrefix: string;
        /**
        * The mousedown event binder.
        */
        public evtMouseDown: EventBinder;
        /**
        * The mouseup event binder.
        */
        public evtMouseUp: EventBinder;
        /**
        * The mousemove event binder.
        */
        public evtMouseMove: EventBinder;
        /**
        * Construct a new SizeGrip.
        *
        * @param gripArea The grip area defining the size grip behavior.
        * @param target The layout item to resize with the grip.
        */
        constructor(gripArea: GripArea, target: ILayoutItem);
        /**
        * Destroy the SizeGrip.
        */
        public destroy(): void;
        /**
        * Returns the grip area defining the size grip behavior.
        */
        public gripArea(): GripArea;
        /**
        * Returns the target layout item resized by the size grip.
        */
        public target(): ILayoutItem;
        /**
        * The mousedown handler.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        /**
        * The mouseup handler.
        *
        * @protected
        */
        public onMouseUp(event: MouseEvent): void;
        /**
        * The mousemove handler.
        *
        * @protected
        */
        public onMouseMove(event: MouseEvent): void;
        private _gripArea;
        private _target;
        private _offsetX;
        private _offsetY;
    }
}
declare module porcelain {
    /**
    * An enum defining the available title bar buttons.
    */
    enum TitleBarButton {
        NoButton = 0,
        Close = 1,
        Maximize = 2,
        Minimize = 4,
        Restore = 8,
        Mask = 15,
    }
    /**
    * A simple title bar widget for use in a typical window.
    *
    * The title bar is a dumb container widget. The window is
    * responsible for interacting directly with its sub items.
    *
    * @class
    */
    class TitleBar extends MoveGrip {
        /**
        * The CSS class added to TitleBar instances.
        */
        static Class: string;
        /**
        * The CSS class added to a TitleBar icon element.
        */
        static IconClass: string;
        /**
        * The CSS class added to a TitleBar label element.
        */
        static LabelClass: string;
        /**
        * The CSS class added to a TitleBar button box.
        */
        static ButtonBoxClass: string;
        /**
        * The CSS class added to a TitleBar close button.
        */
        static CloseButtonClass: string;
        /**
        * The CSS class added to a TitleBar minimize button.
        */
        static MinimizeButtonClass: string;
        /**
        * The CSS class added to a TitleBar maximize button.
        */
        static MaximizeButtonClass: string;
        /**
        * The CSS class added to a TitleBar restore button.
        */
        static RestoreButtonClass: string;
        /**
        * Construct a new TitleBar
        *
        * @param target The layout item to move with the title bar.
        */
        constructor(target: ILayoutItem);
        /**
        * Destroy the title bar.
        */
        public destroy(): void;
        /**
        * A signal emitted when the close button is clicked.
        */
        public closeButtonClicked : Signal;
        /**
        * A signal emitted when the maximize button is clicked.
        */
        public maximizeButtonClicked : Signal;
        /**
        * A signal emitted when the minimize button is clicked.
        */
        public minimizeButtonClicked : Signal;
        /**
        * A signal emitted when the restore button is clicked.
        */
        public restoreButtonClicked : Signal;
        /**
        * Returns the title text of the title bar.
        */
        public title(): string;
        /**
        * Set the title text of the title bar.
        */
        public setTitle(title: string): void;
        /**
        * Returns an OR'd combination of visible TitleBarButtons.
        */
        public buttons(): number;
        /**
        * Set the OR'd combination of visible TitleBarButtons.
        */
        public setButtons(buttons: number): void;
        /**
        * The mousedown handler.
        *
        * This is a reimplemented parent class method. The mouse press
        * is ignored when clicking within the bounds of the button box.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        private _icon;
        private _label;
        private _minimizeButton;
        private _maximizeButton;
        private _restoreButton;
        private _closeButton;
        private _buttonBox;
        private _buttons;
    }
}
declare module porcelain {
    /**
    * A top-level Window component.
    *
    * A Window looks and behaves much like its desktop counterpart.
    * It should never be added as the child of another component.
    */
    class Window extends Component {
        /**
        * The CSS class added to Window instances.
        */
        static Class: string;
        /**
        * The CSS class added to the Window body.
        */
        static BodyClass: string;
        /**
        * The CSS class added to a Window size grip.
        */
        static SizeGripClass: string;
        /**
        * The CSS class added to a Window title bar.
        */
        static TitleBarClass: string;
        /**
        * The CSS class added to the Window content.
        */
        static ContentClass: string;
        /**
        * The mousedown event handler.
        */
        public evtMouseDown: EventBinder;
        /**
        * Construct a new Window.
        */
        constructor();
        /**
        * Destroy the Window component.
        */
        public destroy(): void;
        /**
        * Returns the title text in the Window title bar.
        */
        public title(): string;
        /**
        * Set the title text in the Window title bar.
        */
        public setTitle(title: string): void;
        /**
        * Returns the central content component of the window.
        */
        public content(): Component;
        /**
        * Set the central content component of the window.
        *
        * The old window content will be detached from the window.
        *
        * @param content The component to add to the window.
        */
        public setContent(content: Component): void;
        /**
        * Attach the Window to the given DOM element.
        *
        * If not provided, it will be attached to the document body.
        */
        public attach(elem?: HTMLElement): void;
        /**
        * Raise the window to the top of the Z order.
        */
        public raise(): void;
        /**
        * Lower the window to the bottom of the Z order.
        */
        public lower(): void;
        /**
        * Maximize the window to fit the browser page.
        */
        public maximize(): void;
        /**
        * Restore the window to its normal size.
        */
        public restore(): void;
        /**
        * Minimize the window to the task bar.
        */
        public minimize(): void;
        /**
        * Close the window.
        *
        * This will hide the window and then destroy it.
        */
        public close(): void;
        /**
        * The mousedown event handler.
        *
        * @protected
        */
        public onMouseDown(event: MouseEvent): void;
        /**
        * An internal helper method for setting the window state.
        */
        private _setWindowState(state);
        private _stored;
        private _item;
        private _titleBar;
        private _body;
        private _content;
        private _windowState;
    }
}
declare module porcelain {
}
