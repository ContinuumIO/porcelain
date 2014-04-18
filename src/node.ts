/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/
module porcelain {

    /**
     * A class which represents a node in a tree.
     *
     * This class provides the base tree structure for porcelain
     * components. It will not normally be instantiated directly.
     *
     * @class
     */
    export
    class Node {

        constructor() { }

        /**
         * Destroy this node and the nodes of its subtree.
         */
        destroy(): void {
            var children = this.children();
            this._lastChild = null;
            this._firstChild = null;
            for (var i = 0, n = children.length; i < n; ++i) {
                var child = children[i];
                child._parent = null;
                child._nextSibling = null;
                child._previousSibling = null;
                child.destroy();
            }
            this.remove();
        }

        /**
         * Returns the parent node of this node.
         */
        parent(): Node {
            return this._parent;
        }

        /**
         * Returns the first child node of this node.
         */
        firstChild(): Node {
            return this._firstChild;
        }

        /**
         * Returns the last child node of this node.
         */
        lastChild(): Node {
            return this._lastChild;
        }

        /**
         * Returns the previous sibling node of this node.
         */
        previousSibling(): Node {
            return this._previousSibling;
        }

        /**
         * Returns the next sibling node of this node.
         */
        nextSibling(): Node {
            return this._nextSibling;
        }

        /**
         * Returns an array of child nodes of this node.
         */
        children(): Node[] {
            var nodes: Node[] = [];
            var child = this._firstChild;
            while (child) {
                nodes.push(child);
                child = child._nextSibling;
            }
            return nodes;
        }

        /**
         * Remove this node and its subtree from the tree.
         *
         * The child nodes of this node will remain intact.
         */
        remove(): void {
            var parent = this._parent;
            if (!parent) {
                return;
            }
            this._remove();
            parent.onChildRemoved(this);
        }

        /**
         * Append child nodes to this node.
         *
         * If a node is already a child, it will be moved.
         *
         * @param [...] The nodes to append to the child nodes.
         */
        append(...nodes: Node[]): void;
        append(): void {
            for (var i = 0, n = arguments.length; i < n; ++i) {
                var node: Node = arguments[i];
                if (node === this._lastChild) {
                    continue;
                }
                if (node._parent === this) {
                    node._remove();
                    this._append(node);
                    this.onChildMoved(node);
                } else {
                    node.remove();
                    this._append(node);
                    this.onChildAdded(node);
                }
            }
        }

        /**
         * Prepend child nodes to this node.
         *
         * If a node is already a child, it will be moved.
         *
         * @param [...] The nodes to prepend to the child nodes.
         */
        prepend(...nodes: Node[]): void;
        prepend(): void {
            for (var i = arguments.length - 1, n = 0; i >= n; --i) {
                var node: Node = arguments[i];
                if (node === this._firstChild) {
                    continue;
                }
                if (node._parent === this) {
                    node._remove();
                    this._prepend(node);
                    this.onChildMoved(node);
                } else {
                    node.remove();
                    this._prepend(node);
                    this.onChildAdded(node);
                }
            }
        }

        /**
         * Insert child nodes before the given refence node.
         *
         * If a node is already a child, it will be moved. The given
         * reference node *must* be a current child.
         *
         * @param before The child before which nodes are inserted.
         * @param [...] The child nodes to insert.
         */
        insert(before: Node, ...nodes: Node[]): void;
        insert(): void {
            var before: Node = arguments[0];
            if (before._parent !== this) {
                throw new Error("'before' is not a child of this node");
            }
            for (var i = 1, n = arguments.length; i < n; ++i) {
                var node: Node = arguments[i];
                if (node === before || node === before._previousSibling) {
                    continue;
                }
                if (node._parent === this) {
                    node._remove();
                    this._insert(before, node);
                    this.onChildMoved(node);
                } else {
                    node.remove();
                    this._insert(before, node);
                    this.onChildAdded(node);
                }
            }
        }

        /**
         * A method invoked when a child is added to the node.
         *
         * This must *never* be called directly by user code. The
         * default implementation is a no-op.
         *
         * @param node The child node which was added.
         *
         * @protected
         */
        onChildAdded(node: Node): void { }

        /**
         * A method invoked when a child is removed from the node.
         *
         * This must *never* be called directly by user code. The
         * default implementation is a no-op.
         *
         * @param node The child node which was removed.
         *
         * @protected
         */
        onChildRemoved(node: Node): void { }

        /**
         * A method invoked when a child is moved among its siblings.
         *
         * This must *never* be called directly by user code. The
         * default implementation is a no-op.
         *
         * @param child The child component which was removed.
         *
         * @protected
         */
        onChildMoved(node: Node): void { }

        /**
         * The internal node append method.
         *
         * The node *must not* have a parent.
         *
         * @private
         */
        private _append(node: Node): void {
            var oldLast = this._lastChild;
            this._lastChild = node;
            node._parent = this;
            if (!oldLast) {
                this._firstChild = node;
            } else {
                oldLast._nextSibling = node;
                node._previousSibling = oldLast;
            }
        }

        /**
         * The internal node prepend method.
         *
         * The node *must not* have a parent.
         *
         * @private
         */
        private _prepend(node: Node): void {
            var oldFirst = this._firstChild;
            this._firstChild = node;
            node._parent = this;
            if (!oldFirst) {
                this._lastChild = node;
            } else {
                oldFirst._previousSibling = node;
                node._nextSibling = oldFirst;
            }
        }

        /**
         * The internal node insert method.
         *
         * The node *must not* have a parent and *must not* be the
         * same node as 'before'.
         *
         * @private
         */
        private _insert(before: Node, node: Node): void {
            if (this._firstChild === before) {
                this._firstChild = node;
            } else {
                node._previousSibling = before._previousSibling;
                node._previousSibling._nextSibling = node;
            }
            node._parent = this;
            node._nextSibling = before;
            before._previousSibling = node;
        }

        /**
         * The internal node removal method.
         *
         * The node *must* have a parent.
         *
         * @private
         */
        private _remove(): void {
            var parent = this._parent;
            var next = this._nextSibling;
            var prev = this._previousSibling;
            this._parent = null;
            this._nextSibling = null;
            this._previousSibling = null;
            if (parent._firstChild === this) {
                parent._firstChild = next;
            }
            if (parent._lastChild === this) {
                parent._lastChild = prev;
            }
            if (prev) {
                prev._nextSibling = next;
            }
            if (next) {
                next._previousSibling = prev;
            }
        }

        private _parent: Node = null;
        private _lastChild: Node = null;
        private _firstChild: Node = null;
        private _nextSibling: Node = null;
        private _previousSibling: Node = null;
    }

}
