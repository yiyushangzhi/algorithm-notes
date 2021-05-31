# 单调栈

- 单调递减栈：

  - 定义：栈内元素数值大小从栈底到栈顶按顺序单调递减。
  - 作用：可以找到右边第一个比当前元素大的元素。

- 单调递增栈
  - 定义：栈内元素数值大小从栈底到栈顶按顺序单调递增。
  - 作用：可以找到右边第一个比当前元素小的元素；

## 单调递减栈

单调递减栈，栈内元素数值大小从栈底到栈顶按顺序单调递减。所以**栈顶元素最小**。

为保证单调性，当前元素入栈前，须与栈顶元素比较，若**大于**栈顶元素，则将所有比当前元素数值大的栈内元素弹**出栈**。

通用代码如下所示：

```java
Deque<Integer> monoStack = new LinkedList();
for (int idx = 0; idx < array.length; ++idx) {
  while(!monoStack.isEmpty() && array[idx] > array[monoStack.peek()]) {
    monoStack.pop();
  }
  monoStack.push(idx);
}
```

### [每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

**题目描述**：请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用`0`来代替。

例如，给定一个列表`temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`，你的输出应该是 `[1, 1, 4, 2, 1, 1, 0, 0]`。

提示：气温 列表长度的范围是`[1, 30000]`。每个气温的值的均为华氏度，都是在`[30, 100]` 范围内的整数。

**解题思路**：本问题其实是找到数值中每一个元素右边第一个比自身大的数值。所以我们可以使用单调递减栈的思路来处理。首先，我们从左到右依次遍历数组，将数组元素推入单调栈中。若当前处理元素大于栈顶元素，为保证单调递减栈的单调性，须将所有比当前元素小的栈内元素弹出栈。由于我们是从左到右遍历的数组，所以此时当前元素就是右边第一个比所有出栈元素大的元素。

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
	    Deque<Integer> monoStack = new LinkedList<>();
        int days[] = new int[temperatures.length];
        for (int idx = 0; idx < temperatures.length; ++idx) {
            // 单调递减栈，栈顶元素最小。如果当前要入栈的元素大于栈顶元素，那么需要将所有比当前元素小的栈内元素弹出来。
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

## 单调递增栈

单调递增栈，栈内元素数值大小从栈底到栈顶按顺序单调递增。所以**栈顶元素最大**。

为保证单调性，当前元素入栈前，须与栈顶元素比较，若**小于**栈顶元素，则将所有比当前元素数值大的栈内元素弹**出栈**。

#### [柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

**题目描述**：给定 _n_ 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

![img](./asserts/monoStack1.png)

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 `[2,1,5,6,2,3]`。

![img](./asserts/monoStack2.png)

图中阴影部分为所能勾勒出的最大矩形面积，其面积为 `10` 个单位。

**解题思路**：`矩形面积=宽度*高度`。当我们以某个柱子的高度为矩形高度时，我们需要分别找到左右两边第一个高度小于该柱子的柱子。两个柱子之间的间隔，就是矩形的宽度。

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
