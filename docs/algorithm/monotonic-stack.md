# 单调栈

-   单调递减栈：

    -   定义：栈内元素数值大小从栈底到栈顶按顺序单调递减。
    -   作用：可以找到右边第一个比当前元素大的元素。

-   单调递增栈
    -   定义：栈内元素数值大小从栈底到栈顶按顺序单调递增。
    -   作用：可以找到右边第一个比当前元素小的元素；

## 单调递减栈

单调递减栈，栈内元素数值大小从栈底到栈顶按顺序单调递减。所以**栈顶元素最小**。

为保证单调性，当前元素入栈前，须与栈顶元素比较，若**大于**栈顶元素，则将所有比当前元素数值大的栈内元素弹**出栈**。

### 通用代码

```java
Deque<Integer> monoStack = new LinkedList();
for (int idx = 0; idx < array.length; ++idx) {
  // 如果当前要入栈的元素大于栈顶元素，那么需要将所有比当前元素小的栈内元素弹出来。
  while(!monoStack.isEmpty() && array[idx] > array[monoStack.peek()]) {
    monoStack.pop();
  }
  monoStack.push(idx);
}
```

### [每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

#### 题目描述

请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用`0`来代替。

例如，给定一个列表`temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`，你的输出应该是 `[1, 1, 4, 2, 1, 1, 0, 0]`。

提示：气温 列表长度的范围是`[1, 30000]`。每个气温的值的均为华氏度，都是在`[30, 100]` 范围内的整数。

#### 解题思路

本问题其实是找到数值中每一个元素右边第一个比自身大的数值。

所以我们可以使用**单调递减栈**的思路来处理。

我们从左到右依次遍历数组，将数组元素推入单调栈中。

若当前处理元素大于栈顶元素，为保证单调递减栈的单调性，须将所有比当前元素小的栈内元素弹出栈。

由于我们是从左到右遍历的数组，所以此时当前元素就是右边第一个比所有出栈元素大的元素。

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
	    Deque<Integer> monoStack = new LinkedList<>();
        int days[] = new int[temperatures.length];
        for (int idx = 0; idx < temperatures.length; ++idx) {
            while(!monoStack.isEmpty() && temperatures[idx] > temperatures[monoStack.peek()]) {
                int top = monoStack.pop();
                days[top] = idx - top;
            }
            monoStack.push(idx);
        }
        return days;
    }
}
```

### [下一个更大元素 1](https://leetcode-cn.com/problems/next-greater-element-i/)

#### 题目描述

给你两个**没有重复元素**的数组`nums1`和`nums2`，其中`nums1`是`nums2`的子集。

请你找出`nums1`中每个元素在`nums2`中的下一个比其大的值。

nums1 中数字 x 的下一个更大元素是指`x`在`nums2`中对应位置的右边的第一个比`x`大的元素。如果不存在，对应位置输出`-1`。

**示例 1：**

```
输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
解释:
    对于 num1 中的数字 4 ，你无法在第二个数组中找到下一个更大的数字，因此输出 -1 。
    对于 num1 中的数字 1 ，第二个数组中数字1右边的下一个较大数字是 3 。
    对于 num1 中的数字 2 ，第二个数组中没有下一个更大的数字，因此输出 -1 。
```

**示例 2：**

```
输入: nums1 = [2,4], nums2 = [1,2,3,4].
输出: [3,-1]
解释:
    对于 num1 中的数字 2 ，第二个数组中的下一个较大数字是 3 。
    对于 num1 中的数字 4 ，第二个数组中没有下一个更大的数字，因此输出 -1 。
```

**提示：**

-   `1 <= nums1.length <= nums2.length <= 1000`
-   `0 <= nums1[i], nums2[i] <= 104`
-   `nums1和nums2中所有整数 互不相同`
-   `nums1 中的所有整数同样出现在 nums2 中`

#### 解题思路

利用单调递减栈，可以计算出数组`nums2`中每一个元素的下一个更大的元素。当前即将入栈的元素是当前出栈元素的下一个更大的元素。

所以，只要出栈时，找到当前出栈元素在`nums1`中的位置，对应更新一下答案即可。

```java
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int[] answer = new int[nums1.length];
        Deque<Integer> stack = new LinkedList<>();
        Arrays.fill(answer, -1);
        for (int num : nums2) {
            while (!stack.isEmpty() && num > stack.peek()) {
                int top = stack.pop();
                for (int i = 0; i < nums1.length; i++) {
                    if (nums1[i] == top) {
                        answer[i] = num;
                      break;
                    }
                }
            }
            stack.push(num);
        }
        return answer;
    }
}
```

使用 Map 优化一下代码：

```java
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int[] answer = new int[nums1.length];
        Deque<Integer> stack = new LinkedList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for (int num : nums2) {
            while (!stack.isEmpty() && num > stack.peek()) {
                map.put(stack.pop(), num);
            }
            stack.push(num);
        }
        for (int i = 0; i < nums1.length; i++) {
            answer[i] = map.getOrDefault(nums1[i], -1);
        }
        return answer;
    }
}
```

### [下一个更大元素 2](https://leetcode-cn.com/problems/next-greater-element-ii/)

#### 题目描述

给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），输出每个元素的下一个更大元素。数字`x`的下一个更大的元素是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出`-1`。

**示例 1：**

```
输入: [1,2,1]
输出: [2,-1,2]
解释: 第一个 1 的下一个更大的数是 2；
数字 2 找不到下一个更大的数；
第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
```

**注意：**输入数组的长度不会超过 10000。

#### 解题思路

经过上述问题的讲解，我们很容易地就可以想到利用单调递减栈就可以计算出每个元素的下一个更大元素。但比较特殊的是题目给定的是**循环数组**。

我们如何来表示**循环数组**呢？将数组**长度翻遍**！

```java
class Solution {
    public int[] nextGreaterElements(int[] nums) {
        if (nums == null || nums.length == 0) {
            return nums;
        }
        int length = nums.length;
        int[] answer = new int[length];
        Arrays.fill(answer, -1);
        Deque<Integer> monoStack = new LinkedList<>();
        for(int i = 0; i < length * 2; ++i) {
            while(!monoStack.isEmpty() && nums[i % length] > nums[monoStack.peek() % length]) {
              answer[monoStack.pop() % length] = nums[i % length];
            }
            monoStack.push(i);
        }
        return answer;
    }
}
```

### [股票价格跨度](https://leetcode-cn.com/problems/online-stock-span/)

#### 题目描述

编写一个`StockSpanner`类，它收集某些股票的每日报价，并返回该股票当日价格的跨度。

今天股票价格的跨度被定义为股票价格小于或等于今天价格的最大连续日数（从今天开始往回数，包括今天）。

例如，如果未来 7 天股票的价格是`[100, 80, 60, 70, 60, 75, 85]`，那么股票跨度将是 `[1, 1, 1, 2, 1, 4, 6]`。

**示例：**

```
输入：["StockSpanner","next","next","next","next","next","next","next"], [[],[100],[80],[60],[70],[60],[75],[85]]
输出：[null,1,1,1,2,1,4,6]
解释：
首先，初始化 S = StockSpanner()，然后：
S.next(100) 被调用并返回 1，
S.next(80) 被调用并返回 1，
S.next(60) 被调用并返回 1，
S.next(70) 被调用并返回 2，
S.next(60) 被调用并返回 1，
S.next(75) 被调用并返回 4，
S.next(85) 被调用并返回 6。

注意 (例如) S.next(75) 返回 4，因为截至今天的最后 4 个价格
(包括今天的价格 75) 小于或等于今天的价格。
```

**提示：**

-   调用`StockSpanner.next(int price)`时，将有`1 <= price <= 10^5`。

-   每个测试用例最多可以调用`10000`次`StockSpanner.next`。

-   在所有测试用例中，最多调用`150000`次`StockSpanner.next`。

-   此问题的总时间限制减少了`50%`。

#### 解题思路

我们维护一个单调递减栈，当要入栈的股票价格大于或等于栈顶股票价格时，为保证单调性就需要让栈顶股票出栈。所有出栈的股票跨度累加，就是当前要入栈的股票跨度。

所以，单调栈的元素格式需要同时存储股票的价格和股票的跨度。

```java
class StockSpanner {

    private Deque<int[]> stack = new LinkedList<>();

    public StockSpanner() {
    }

    public int next(int price) {
        int weight = 1;
        while (!stack.isEmpty() && price >= stack.peek()[0]) {
            weight += stack.pop()[1];
        }
        stack.push(new int[]{price, weight});
        return weight;
    }
}
```

## 单调递增栈

单调递增栈，栈内元素数值大小从栈底到栈顶按顺序单调递增。所以**栈顶元素最大**。

为保证单调性，当前元素入栈前，须与栈顶元素比较，若**小于**栈顶元素，则将所有比当前元素数值大的栈内元素弹**出栈**。

### 通用代码

```java
Deque<Integer> monoStack = new LinkedList<>();
for(int idx = 0; idx < array.length; ++idx) {
  while(!monoStack.isEmpty() && array[idx] < array[monoStack.peek()]) {
    monoStack.pop();
  }
  monoStack.push(idx);
}
```

### [柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

#### 题目描述

给定 _n_ 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

![img](../asserts/monotonic-stack1.png)

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 `[2,1,5,6,2,3]`。

![img](../asserts/monotonic-stack2.png)

图中阴影部分为所能勾勒出的最大矩形面积，其面积为 `10` 个单位。

#### 解题思路

##### 暴力解法 1

暴力解法就是遍历每一根柱子，分别求出以该柱子高度作为矩形高度的矩形面积。再求出最大面积的矩形。

此时矩形高度固定。若以某个柱子的高度作为矩形高度，为保证矩形面积最大，则需要分别找到柱子两边第一根比它矮的柱子。所找到的两根柱子之间的间隔就是这个矩形的宽度。

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        int area = 0;
        for (int idx = 0; idx < heights.length; idx++) {
            int height = heights[idx];
            int left = idx - 1;
            int right = idx + 1;
            while (left >= 0) {
                if (heights[left] < height) {
                    break;
                }
                --left;
            }
            while (right < heights.length) {
                if (heights[right] < height) {
                    break;
                }
                ++right;
            }
            area = Math.max(area, height * (right - left - 1));
        }
        return area;
    }
}
```

:::danger
此方法时间复杂度为`O(n^2)`，超时！
:::

##### 暴力解法 2

除了固定高度外，还可以固定宽度。只要找到两根柱子之间，最短的一个柱子就可以计算出矩形面积。再求出最大面积的矩形。

:::danger

此方法时间复杂度为`O(n^2)`，超时！此处就贴出代码了，大家可以自己试试。

:::

##### 单调栈解法

从暴力解法 1 中，可以知道只需要找到柱子两边第一根比它矮的柱子就可以算出矩形面积。那么我们维护一个单调递增栈（柱子高度单调递增），利用单调递增栈的特性，我们可以找到右边第一根比它矮的柱子。又由于栈是单调递增的，栈顶元素出栈后的新栈顶元素必然比出栈的元素小。也就是说新栈顶元素是出栈元素左边第一根比它矮的柱子，要入栈的元素是出栈元素右边第一根比它矮的柱子。此时，我们就可以计算以出栈元素对应柱子高度为高度的矩形的面积。

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        Deque<Integer> monoStack = new LinkedList<>();
        int area = 0;
        int[] tempHeights = new int[heights.length + 2];
        for (int i = 0; i < heights.length; i++) {
            tempHeights[i + 1] = heights[i];
        }
        monoStack.push(0);
        for (int index = 1; index < tempHeights.length; index++) {
            while (tempHeights[index] < tempHeights[monoStack.peek()]) {
                int height = tempHeights[monoStack.pop()];
                int width = index - monoStack.peek() - 1;
                area = Math.max(area, width * height);
            }
            monoStack.push(index);
        }
        return area;
    }
}
```

:::tip
上述代码使用了哨兵简化边界条件的处理。
:::
