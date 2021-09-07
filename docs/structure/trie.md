# 字典树/前缀树

## 经典例题

-   [LeetCode208 实现 Trie（前缀树）](#leetcode208-实现-trie-前缀树)
-   [LeetCode648 单词替换](#leetcode648-单词替换)

## [LeetCode208 实现 Trie（前缀树）](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

### 用 HashMap 来表示 children

```java
class Trie {

    private final TrieNode root;

    /**
     * Initialize your data structure here.
     */
    public Trie() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a word into the trie.
     */
    public void insert(String word) {
        int length = word.length();
        TrieNode node = root;
        for (int i = 0; i < length; i++) {
            node = node.children.computeIfAbsent(word.charAt(i), x -> new TrieNode());
        }
        node.isEnd = true;
    }

    /**
     * Returns if the word is in the trie.
     */
    public boolean search(String word) {
        int length = word.length();
        TrieNode node = root;
        for (int i = 0; i < length; i++) {
            node = node.children.get(word.charAt(i));
            if (node == null) {
                return false;
            }
        }
        return node.isEnd;
    }

    /**
     * Returns if there is any word in the trie that starts with the given prefix.
     */
    public boolean startsWith(String prefix) {
        int length = prefix.length();
        TrieNode node = root;
        for (int i = 0; i < length; i++) {
            node = node.children.get(prefix.charAt(i));
            if (node == null) {
                return false;
            }
        }
        return true;
    }

    private static class TrieNode {
        private final Map<Character, TrieNode> children = new HashMap<>();
        private boolean isEnd = false;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
```

:::tip 执行结果：通过
-   执行用时：43 ms, 在所有 Java 提交中击败了 34.85%的用户
-   内存消耗：50.3 MB, 在所有 Java 提交中击败了 5.78%的用户
:::

### 用数组来表示 children

```java
class Trie {

    private final TrieNode root;

    public Trie() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a word into the trie.
     */
    public void insert(String word) {
        int length = word.length();
        TrieNode node = root;
        for (int i = 0; i < length; i++) {
            int idx = word.charAt(i) - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new TrieNode();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    /**
     * Returns if the word is in the trie.
     */
    public boolean search(String word) {
        int length = word.length();
        TrieNode node = root;
        for (int i = 0; i < length; i++) {
            int idx = word.charAt(i) - 'a';
            node = node.children[idx];
            if (node == null) {
                return false;
            }
        }
        return node.isEnd;
    }

    /**
     * Returns if there is any word in the trie that starts with the given prefix.
     */
    public boolean startsWith(String prefix) {
        int length = prefix.length();
        TrieNode node = root;
        for (int i = 0; i < length; i++) {
            int idx = prefix.charAt(i) - 'a';
            node = node.children[idx];
            if (node == null) {
                return false;
            }
        }
        return true;
    }

    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
```

:::tip 执行结果：通过
-   执行用时：33 ms, 在所有 Java 提交中击败了 80.98%的用户
-   内存消耗：47.3 MB, 在所有 Java 提交中击败了 79.71%的用户
:::

### 去除 TrieNode，直接用 Trie 表示节点

```java
class Trie {

    private final Trie[] children = new Trie[26];
    private boolean isEnd = false;

    /**
     * Inserts a word into the trie.
     */
    public Trie() {
    }

    /**
     * Inserts a word into the trie.
     */
    public void insert(String word) {
        int length = word.length();
        Trie node = this;
        for (int i = 0; i < length; i++) {
            int idx = word.charAt(i) - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new Trie();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    /**
     * Returns if the word is in the trie.
     */
    public boolean search(String word) {
        int length = word.length();
        Trie node = this;
        for (int i = 0; i < length; i++) {
            int idx = word.charAt(i) - 'a';
            node = node.children[idx];
            if (node == null) {
                return false;
            }
        }
        return node.isEnd;
    }

    /**
     * Returns if there is any word in the trie that starts with the given prefix.
     */
    public boolean startsWith(String prefix) {
        int length = prefix.length();
        Trie node = this;
        for (int i = 0; i < length; i++) {
            int idx = prefix.charAt(i) - 'a';
            node = node.children[idx];
            if (node == null) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
```

:::tip 执行结果：通过
-   执行用时：32 ms, 在所有 Java 提交中击败了 90.46%的用户
-   内存消耗：47.6 MB, 在所有 Java 提交中击败了 49.50%的用户
:::

## [LeetCode648 单词替换](https://leetcode-cn.com/problems/replace-words/)

```java
class Solution {
    public String replaceWords(List<String> dictionary, String sentence) {
        Trie trie = new Trie();
        for (String root : dictionary) {
            trie.insert(root);
        }
        StringBuilder builder = new StringBuilder();
        String[] words = sentence.split(" ");
        for (int i = 0; i < words.length; i++) {
            if (i != 0) {
                builder.append(" ");
            }
            builder.append(trie.getPrefix(words[i]));
        }

        return builder.toString();
    }

    private static class Trie {
        private final Trie[] children;
        private boolean isEnd;
        private String root;

        public Trie() {
            this.children = new Trie[26];
            this.isEnd = false;
            this.root = null;
        }

        public void insert(String root) {
            int length = root.length();
            Trie node = this;
            for (int i = 0; i < length; i++) {
                int idx = root.charAt(i) - 'a';
                if (node.children[idx] == null) {
                    node.children[idx] = new Trie();
                }
                node = node.children[idx];
            }
            node.isEnd = true;
            node.root = root;
        }

        public String getPrefix(String word) {
            Trie node = this;
            int length = word.length();
            for (int i = 0; i < length; i++) {
                if (node.isEnd) {
                    return node.root;
                }
                int idx = word.charAt(i) - 'a';
                if (node.children[idx] == null) {
                    break;
                }
                node = node.children[idx];
            }
            return word;
        }
    }
}
```

:::tip 执行结果：通过
-   执行用时：7 ms, 在所有 Java 提交中击败了 95.50%的用户
-   内存消耗：49 MB, 在所有 Java 提交中击败了 41.08%的用户
:::
