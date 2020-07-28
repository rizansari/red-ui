import { Node } from './node';

export class Tree {
    public root: Node;

    public traverseDF(callback) {
        (function recurse(currentNode) {
            for (var i = 0, length = currentNode.Children.length; i < length; i++) {
                recurse(currentNode.Children[i]);
            }

            callback(currentNode);

        })(this.root);
    }

    public contains(callback, traversal) {
        traversal.call(this, callback);
    }

    public add(data: Node, toData: string, traversal) {
        var child: Node = new Node(data.Key, data.FullKey, data.Selected, data.keyObject),
            parent: Node = null,
            callback = function (node: Node) {
                if (node.FullKey === toData) {
                    parent = node;
                }
            };

        this.contains(callback, traversal);

        if (parent) {
            parent.Children.push(child);
            child.Parent = parent;

            if (child.Selected) {
                var temp = child.Parent;
                while (temp) {
                    temp.Selected = true;
                    temp = temp.Parent;
                }
            }
        } else {
            // todo: throw error
        }
    }

    remove(data, traversal) {
        var parent: Node = null,
            childToRemove: Node = null,
            index;

        var callback = function (node: Node) {
            if (node.FullKey === data) {
                parent = node.Parent;
            }
        };

        this.contains(callback, traversal);

        if (parent) {
            index = this.findIndex(parent.Children, data);


            if (index === undefined) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.Children.splice(index, 1)[0];

                this.clearSelection();

                if (parent.Children.length > 0) {
                    if (parent.Children[index - 1]) {
                        parent.Children[index - 1].Selected = true;
                    } else {
                        parent.Children[0].Selected = true;
                    }
                } else {
                    parent.Selected = true;
                }
                // if selected then make whole tree selected
                if (parent) {
                    var temp = parent;
                    while (temp) {
                        temp.Selected = true;
                        temp = temp.Parent;
                    }
                }
            }
        } else {
            throw new Error('Parent does not exist.');
        }

        return childToRemove;
    };

    private clearSelection() {
        this.root.Selected = false;
        this.root.Children.forEach(element => {
            this.clearSelectionRecursive(element);
        });

    }

    private clearSelectionRecursive(node: Node) {
        node.Selected = false;

        node.Children.forEach(element => {
            this.clearSelectionRecursive(element);
        });
    }

    private findIndex(arr: Array<Node>, data) {
        var index;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].FullKey === data) {
                index = i;
            }
        }

        return index;
    }
}