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
     * This class servers as the foundational tree structure for
     * porcelain components. It will not normally be instantiated
     * directly.
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
            var next: Node;
            var child = this._firstChild;
            this._firstChild = null;
            this._lastChild = null;
            while (child) {
                next = child._nextSibling;
                child._parent = null;
                child._previousSibling = null;
                child._nextSibling = null;
                child.destroy();
                child = next;
            }
            if (this._parent) {
                this.remove();
            }
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
         * Append a child node to the end of the child nodes.
         *
         * If the node is already a child, it will be moved.
         *
         * @param node The node to append to the child nodes.
         */
        appendChild(node: Node): void {
            if (this._lastChild === node) {
                return;
            }
            if (node._parent === this) {
                node._removeInternal();
                this._appendInternal(node);
                this.onChildMoved(node);
            } else {
                node.remove();
                this._appendInternal(node);
                this.onChildAdded(node);
            }
        }

        /**
         * Prepend a child node to the front of the child nodes.
         *
         * If the node is already a child, it will be moved.
         *
         * @param node The node to prepend to the child nodes.
         */
        prependChild(node: Node): void {
            if (this._firstChild === node) {
                return;
            }
            if (node._parent === this) {
                node._removeInternal();
                this._prependInternal(node);
                this.onChildMoved(node);
            } else {
                node.remove();
                this._prependInternal(node);
                this.onChildAdded(node);
            }
        }

        /**
         * Insert a child node before the given refence node.
         *
         * If the node is already a child, it will be moved.
         * The reference node *must* be a current child.
         *
         * @param node The child node to insert.
         * @param reference The child before which 'node' is inserted.
         */
        insertChild(node: Node, reference: Node): void {
            if (reference._parent !== this) {
                throw new Error("reference node is not a child node");
            }
            if (node === reference) {
                return;
            }
            if (reference._previousSibling === node) {
                return;
            }
            if (node._parent === this) {
                node._removeInternal();
                this._insertInternal(node, reference);
                this.onChildMoved(node);
            } else {
                node.remove();
                this._insertInternal(node, reference);
                this.onChildAdded(node);
            }
        }

        /**
         * Remove this node and its subtree from the tree.
         *
         * The child nodes of this node will remain intact.
         */
        remove(): void {
            var parent = this._parent;
            if (parent) {
                this._removeInternal();
                parent.onChildRemoved(this);
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
         * The node being appending *must not* have a parent.
         *
         * @private
         */
        private _appendInternal(node: Node): void {
            var last = this._lastChild;
            this._lastChild = node;
            node._parent = this;
            if (!last) {
                this._firstChild = node;
            } else {
                last._nextSibling = node;
                node._previousSibling = last;
            }
        }

        /**
         * The internal node prepend method.
         *
         * The node being prepending *must not* have a parent.
         *
         * @private
         */
        private _prependInternal(node: Node): void {
            var first = this._firstChild;
            this._firstChild = node;
            node._parent = this;
            if (!first) {
                this._lastChild = node;
            } else {
                first._previousSibling = node;
                node._nextSibling = first;
            }
        }

        /**
         * The internal node insert method.
         *
         * The node being inserted *must not* have a parent.
         * The reference node *must* be a current child.
         * The node *must not* be the reference node.
         *
         * @private
         */
        private _insertInternal(node: Node, reference: Node): void {
            node._parent = this;
            node._previousSibling = reference._previousSibling;
            reference._previousSibling = node;
            node._nextSibling = reference;
            if (this._firstChild === reference) {
                this._firstChild = node;
            }
        }

        /**
         * The internal node removal method.
         *
         * The node *must* have a parent.
         *
         * @private
         */
        private _removeInternal(): void {
            var parent = this._parent;
            var prev = this._previousSibling;
            var next = this._nextSibling;
            this._parent = null;
            this._previousSibling = null;
            this._nextSibling = null;
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
        private _firstChild: Node = null;
        private _lastChild: Node = null;
        private _previousSibling: Node = null;
        private _nextSibling: Node = null;
    }

}
