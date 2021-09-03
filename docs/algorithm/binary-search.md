# 二分搜索

## 经典例题

-   [LeetCode704 二分查找](#leetcode704-二分查找)
-   [LeetCode34 在排序数组中查找元素的第一个和最后一个位置](#leetcode34-在排序数组中查找元素的第一个和最后一个位置)
-   [LeetCode410 分割数组的最大值](#LeetCode410-分割数组的最大值)
-   [LeetCode33 搜索旋转排序数组](#leetcode33-搜索旋转排序数组)

## [LeetCode704 二分查找](https://leetcode-cn.com/problems/binary-search/)

```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while(left <= right) {
            int middle = left + ((right - left) >> 1);
            if (nums[middle] == target) {
                return middle;
            }
            if (target > nums[middle]) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return -1;
    }
}
```

:::tip 执行结果：通过

-   执行用时：0 ms, 在所有 Java 提交中击败了 100.00%的用户
-   内存消耗：39.3 MB, 在所有 Java 提交中击败了 76.21%的用户
    :::

## [LeetCode34 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

```java
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int middle = left + ((right - left) >> 1);
            if (nums[middle] == target) {
                int[] answer = new int[]{middle, middle};
                for (int i = middle - 1; i >= 0 && nums[i] == target; --i) {
                    answer[0] = i;
                }
                for (int i = middle + 1; i < nums.length && nums[i] == target; ++i) {
                    answer[1] = i;
                }
                return answer;
            }
            if (nums[middle] > target) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        return new int[]{-1, -1};
    }
}
```

:::tip 执行结果：通过

-   执行用时：0 ms, 在所有 Java 提交中击败了 100.00%的用户
-   内存消耗：41.6 MB, 在所有 Java 提交中击败了 49.97%的用户
    :::

## [LeetCode410 分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)

**使...最大值尽可能小**是二分搜索题目的经典问法。

```java
class Solution {
    public int splitArray(int[] nums, int m) {
        int left = 0;
        int right = 0;
        for (int i = 0; i < nums.length; i++) {
            right += nums[i];
            if (left < nums[i]) {
                left = nums[i];
            }
        }
        while (left < right) {
            // 求middle的方法有很多。但为了避免溢出，推荐使用middle = left + ((right - left) >> 1)
            int middle = (right - left) / 2 + left;
            if (check(nums, middle, m)) {
                right = middle;
            } else {
                left = middle + 1;
            }
        }

        return left;
    }

    private boolean check(int[] nums, int x, int m) {
        int sum = 0; // 当前分割子数组的和
        int count = 1; // 已经分割出去的子数组的数量
        for (int i = 0; i < nums.length; i++) {
            if (sum + nums[i] > x) {
                count++;
                sum = nums[i]; // 新的分割子数组的开头
            } else {
                sum += nums[i];
            }
        }
        return count <= m;
    }
}
```

:::tip

-   执行结果：通过
-   执行用时：0 ms, 在所有 Java 提交中击败了 100.00%的用户
-   内存消耗：35.9 MB, 在所有 Java 提交中击败了 70.57%的用户
    :::

## [LeetCode1004 最大连续 1 的个数 III](https://leetcode-cn.com/problems/max-consecutive-ones-iii/)

思路：先将 0 变成 1，1 变成 0。求不超过 k 个 1 的连续子数组的最大长度。为方便计算，可以使用**前缀和**简化连续子数组区间内 1 的个数。

```java
class Solution {
    public int longestOnes(int[] nums, int k) {
        int[] pres = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            // 1 - nums[i]：0变1，1变0
            pres[i + 1] = 1 - nums[i] + pres[i];
        }

        int max = 0;
        for (int right = 0; right < nums.length; right++) {
            int left = binarySearch(pres, pres[right + 1] - k);
            max = Math.max(max, right - left + 1);
        }
        return max;
    }

    private int binarySearch(int[] pres, int target) {
        int left = 0;
        int right = pres.length - 1;
        while (left <= right) {
            int middle = ((right - left) >> 1) + left;
            if (pres[middle] < target) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return left;
    }
}
```

:::tip 执行结果：通过

-   执行用时：17 ms, 在所有 Java 提交中击败了 7.25%的用户
-   内存消耗：40.6 MB, 在所有 Java 提交中击败了 9.32%的用户
    :::

## [LeetCode33 搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

```java
class Solution {
    public int search(int[] nums, int target) {
        if (nums.length == 0) {
            return -1;
        }
        if (nums.length == 1) {
            return nums[0] == target ? 0 : -1;
        }
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int middle = left + ((right - left) >> 1);
            if (nums[middle] == target) {
                return middle;
            }
            if (nums[middle] >= nums[0]) {
                if (target >= nums[0] && target < nums[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            } else {
                if (target > nums[middle] && target <= nums[nums.length - 1]) {
                    left = middle + 1;
                } else {
                    right = middle - 1;
                }
            }
        }
        return -1;
    }
}
```

:::tip 执行结果：通过

-   执行用时：0 ms, 在所有 Java 提交中击败了 100.00%的用户
-   内存消耗：37.7 MB, 在所有 Java 提交中击败了 67.71%的用户
    :::
