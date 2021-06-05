# Tree

## 相关定义

+ 节点的度：一个节点包含子节点的个数。
+ 树的度：一棵树中，最大的节点的度称之为树的度。

## 二叉树（Binary-Tree）

定义：二叉树是指树中节点的度不大于2的有序树，即每个节点有2个子节点。

```java
public class TreeNode {
    private int value;

    private TreeNode left;

    private TreeNode right;

    public TreeNode(int value) {
        this.value = value;
    }

    public TreeNode(int value, TreeNode left, TreeNode right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    public int getValue() {
        return this.value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public TreeNode getLeft() {
        return this.left;
    }

    public void setLeft(TreeNode left) {
        this.left = left;
    }

    public TreeNode getRight() {
        return this.right;
    }

    public void setRight(TreeNode right) {
        this.right = right;
    }
}
```

### 深度优先遍历（DFS）

```java
public class BinaryTreeTraversal {
    public void dfs(TreeNode root) {
        Deque<TreeNode> stack = new LinkedList<>();
        stack.push(root);
        while(!stack.isEmpty()) {
            TreeNode node = stack.pop();
            System.out.println(node.getValue());

            TreeNode right = node.getRight();
            if (right != null) {
                stack.push(right);
            }

            TreeNode left = node.getLeft();
            if (left != null) {
                stack.push(left);
            }
        }
    }
}
```

### 广度优先遍历（BFS）

```java
public class BinaryTreeTraversal {
    public void bfs(TreeNode root) {
        Deque<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while(!queue.isEmpty()) {
            TreeNode node = queue.poll();
            System.out.println(node.getValue());

            TreeNode left = node.getLeft();
            if (left != null) {
                queue.offer(left);
            }

            TreeNode right = node.getRight();
            if (right != null) {
                queue.offer(right);
            }
        }
    }
}
```

### 层序遍历

```java
public class BinaryTreeTraversal {
    public void levelTraversal(TreeNode root) {
        Deque<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while(!queue.isEmpty()) {
            int size = queue.size();
            for(int idx = 0; idx < size; ++idx) {
                TreeNode node = queue.poll();
                System.out.println(node.getValue());

                TreeNode left = node.getLeft();
                if (left != null) {
                    queue.offer(left);
                }

                TreeNode right = node.getRight();
                if (right != null) {
                    queue.offer(right);
                }
            }
        }
    }
}
```
