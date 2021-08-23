# 二分搜索

## 经典例题

-   [LeetCode410 分割数组的最大值](#LeetCode410-分割数组的最大值)

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
