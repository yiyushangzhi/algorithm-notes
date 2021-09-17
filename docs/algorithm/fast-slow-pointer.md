# 快慢指针

使用两个不同速度的指针解决问题。例如：

-   [求链表的倒数第n个节点](#求链表的倒数第n个节点)；
-   [判断链表中是否存在环](#判断链表中是否存在环)；
-   [求有环链表中环路的起始位置](#求有环链表中环路的起始位置)

经典例题：

-   [leetcode27 移除元素](#leetcode27-移除元素)


## 求链表的倒数第n个节点

构造快、慢2个指针，快指针先走n步后，慢指针和快指针以相同的速度往后走，直到快指针指向`null`。

```java
class Solution {
    public int last(Node head, int n) {
        int count = 0;
        Node fast = head;
        Node slow = head;
        while (fast != null) {
            if (count >= n) {
                slow = slow.next;
            }
            ++count;
            fast = fast.next;
        }
        return count < n ? -1 : slow.data;
    }
}
```

## 判断链表中是否存在环

如果链表中存在环，那么一定可以无限遍历。

然后，构造快、慢2个指针。快指针的速度是慢指针的2倍。

若在遍历过程中，若快指针追上了慢指针，则表示存在环。

```java
class Solution {
    public bool hasCircle(Node head) {
        Node fast = head;
        Node slow = head;
        while (fast != null && fast.next != null) {
            fast.next = fast.next.next;
            slow.next = slow.next;
            if (fast == slow) {
                return true;
            }
        }
        return false;
    }
}
```

## 求有环链表中环路的起始位置

```java
class solution {
    public Node detectCycle(Node head) {
        Node fast = head;
        Node slow = head;
        boolean hasCycle = false;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) {
                hasCycle = true;
                break;
            }
        }
        if (!hasCycle) {
            return null;
        }
        Node node1 = head;
        Node node2 = fast;
        while (node1 != node2) {
            node1 = node1.next;
            node2 = node2.next;
        }
        return node1;
    }
}
```

## [leetcode27 移除元素](https://leetcode-cn.com/problems/remove-element/)

### 解法一：快慢指针

构造快、慢2个指针（数组下标），优先移动快指针。

若快指针指向的元素等于`val`值，则快指针继续往后移动。否则，先将快指针指向的元素值赋给慢指针指向的元素，然后快指针和慢指针同时往后移动。

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        int fast = 0;
        int slow = 0;
        while(fast < nums.length) {
            if (nums[fast] != val) {
                nums[slow] = nums[fast];
                ++slow;
            }
            ++fast;
        }
        return slow;
    }
}
```

:::tip
-   执行结果：通过
-   执行用时：0 ms, 在所有 Java 提交中击败了100.00%的用户
-   内存消耗：37.1 MB, 在所有 Java 提交中击败了31.48%的用户
:::

### 解法二：双指针优化

若要移除的元素刚好是数组的第1个元素，则需要将从第2个元素及其之后的所有元素都往前移动1位。

注意到题目中提到**修改后的数组元素可以是任意顺序**，所以针对上述情况可以直接将最后1个元素赋值给第1个元素。

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        int left = 0;
        int right = nums.length;
        while (left < right) {
            if (nums[left] == val) {
                nums[left] = nums[--right];
            } else {
                ++left;
            }
        }
        return left;
    }
}
```

:::tip
-   执行结果：通过
-   执行用时：0 ms, 在所有 Java 提交中击败了100.00%的用户
-   内存消耗：37 MB, 在所有 Java 提交中击败了41.32%的用户
:::
