# 回溯算法

## 解题套路

1. 针对所给问题，定义问题的解空间（解空间必须完整）；
2. 确定易于搜索的解空间结构；
3. 以**深度优先**方式搜索解空间，并在搜索过程中用剪枝函数避免无效搜索。

### 递归回溯

```java
class Solution {
  // n：用来控制递归深度
  private int n;

  // t：当前递归深度
  void backtrack(int t) {
    // t > n：此时已搜索到解空间的叶子节点
    if (t > n) {
      // 输出可行解x
      output(x);
      return;
    }

    // f(n,t): 当前扩展节点处x[t]未搜索过的子树的起始编号
    // g(n,t)：当前扩展节点处x[t]未搜索过的子树的结束编号
    for(int i = f(n, t); i <= g(n, t); ++i) {
      // h(i)：当前扩展节点处x[t]的第i个可选值
      x[t] = h(i);
      // 剪枝函数由约束函数constraint和限界函数bound组成
      if(constraint(t) && bound(t)) {
        backtrack(t + 1);
      }
    }
  }
}
```

### 迭代回溯

```java
class Solution {
  void backtrack() {
    int t = 1;
    while(t > 0) {
      if (f(n, t) <= g(n, t)) {
        for(int i = f(n, t); i <= g(n, t); ++i) {
          x[t] = h(i);
          if (constraint(t) && bound(t)) {
            if (solution(t)) {
              output(t);
            } else {
              ++t;
            }
          }
        }
      } else {
        --t;
      }
    }
  }
}
```

## 经典例题

-   [leetcode51 N 皇后](#leetcode51-n-皇后)
-   [leetcode78 子集](#leetcode78-子集)
-   [leetcode46 全排列](#leetcode46-全排列)
-   [leetcode47 全排列 II](#leetcode47-全排列-ii)
-   [leetcode39 组合总和](#leetcode39-组合总和)

## [leetcode51 N 皇后](https://leetcode-cn.com/problems/n-queens/)

### 题目描述

**n 皇后问题**研究的是如何将`n`个皇后放置在`n×n`的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数`n`，返回所有不同的**n 皇后问题**的解决方案。

每一种解法包含一个不同的`n`皇后问题 的棋子放置方案，该方案中`'Q'`和`'.'`分别代表了皇后和空位。

**示例 1：**

![img](../asserts/queens.jpg)

```
输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释：如上图所示，4 皇后问题存在两个不同的解法
```

**示例 2：**

```
输入：n = 1
输出：[["Q"]]
```

### 解题思路

```java
class Solution {
	public List<List<String>> solveNQueens(int n) {
        int[] rows = new int[n];
        List<List<String>> answers = new ArrayList<>();
        backtrack(0, n, rows, answers);
        return answers;
    }

    public void backtrack(int row, int capacity, int[] rows, List<List<String>> answers) {
        if (row == capacity) {
            List<String> answer = new ArrayList<>();
            for (int r = 0; r < capacity; r++) {
                StringBuilder builder = new StringBuilder();
                for (int c = 0; c < capacity; c++) {
                    if (c == rows[r]) {
                        builder.append("Q");
                    } else {
                        builder.append(".");
                    }
                }
                answer.add(builder.toString());
            }
            answers.add(answer);
            return;
        }

        for (int col = 0; col < capacity; col++) {
            if (placable(row, col, rows)) {
                rows[row] = col;
                backtrack(row + 1, capacity, rows, answers);
            }
        }
    }

    private boolean placable(int row, int col, int[] rows) {
        for (int r = 0; r < row; r++) {
            int c = rows[r];
            if (c == col || row + col == r + c || row - col == r - c) {
                return false;
            }
        }
        return true;
    }
};
```

## [leetcode78 子集](https://leetcode-cn.com/problems/subsets/)

### 解法一

```java
class Solution {
    private List<List<Integer>> answers = new LinkedList<>();
    private List<Integer> answer = new LinkedList<>();
    public List<List<Integer>> subsets(int[] nums) {
        backtrack(nums, 0);
        return answers;
    }
    private void backtrack(int[] nums, int start) {
        answers.add(new LinkedList<>(answer));
        for (int idx = start; idx < nums.length; idx++) {
            answer.add(nums[idx]);
            backtrack(nums, idx + 1);
            answer.remove(answer.size() - 1);
        }
    }
}
```

### 解法二

```java
class Solution {
    private List<List<Integer>> answers = new LinkedList<>();
    private List<Integer> answer = new LinkedList<>();
    public List<List<Integer>> subsets(int[] nums) {
        dfs(nums, 0);
        return answers;
    }
    private void dfs(int[] nums, int i) {
       if (i == nums.length) {
           answers.add(new LinkedList<>(answer));
           return;
       }

       answer.add(nums[i]);
       dfs(nums, i + 1);
       answer.remove(answer.size() - 1);
       dfs(nums, i + 1);
   }
}
```

### 解法三

```java
class Solution {
    private List<List<Integer>> answers = new LinkedList<>();
    private List<Integer> answer = new LinkedList<>();
    public List<List<Integer>> subsets(int[] nums) {
        int size = nums.length;
        int maxMask = 1 << size;
        for (int mask = 0; mask < maxMask; ++mask) {
            answer.clear();
            for (int i = 0; i < size; i++) {
                if ((mask & (1 << i)) != 0) {
                    answer.add(nums[i]);
                }
            }
            answers.add(new LinkedList<>(answer));
        }
        return answers;
    }
}
```

## [leetcode46 全排列](https://leetcode-cn.com/problems/permutations/)

### 解法一

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> answers = new LinkedList<>();
        List<Integer> answer = new LinkedList<>();
        backtrack(answers, answer, nums, 0);
        return answers;
    }

    private void backtrack(List<List<Integer>> answers, List<Integer> answer, int[] numbers, int index) {
        if (index == numbers.length) {
            answers.add(new LinkedList<>(answer));
            return;
        }

        for (int number : numbers) {
            if (answer.contains(number)) {
                continue;
            }

            answer.add(number);
            backtrack(answers, answer, numbers, index + 1);
            answer.remove(index);
        }
    }
}
```

### 解法二

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> answers = new ArrayList<>();
        List<Integer> answer = new ArrayList<>();
        for (int num : nums) {
            answer.add(num);
        }
        backtrack(answers, answer, nums.length, 0);
        return answers;
    }

    private void backtrack(List<List<Integer>> answers, List<Integer> answer, int size, int start) {
        if (start == size) {
            answers.add(new ArrayList<>(answer));
            return;
        }
        for (int i = start; i < answer.size(); ++i) {
            Collections.swap(answer, start, i);
            backtrack(answers, answer, size, start + 1);
            Collections.swap(answer, i, start);
        }
    }
}
```

## [leetcode47 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

[全排列](#leetcode46-全排列)的变种，需要去除重复记录。只需要将数组先排序一下，然后只保留从左到右第一个元素即可。

```java
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> answers = new LinkedList<>();
        List<Integer> answer = new LinkedList<>();
        boolean[] visits = new boolean[nums.length];
        Arrays.sort(nums);
        backtrack(answers, answer, nums, visits, 0);
        return answers;
    }

    private void backtrack(List<List<Integer>> answers, List<Integer> answer, int[] numbers, boolean[] visits, int index) {
        if (index == numbers.length) {
            answers.add(new LinkedList<>(answer));
            return;
        }

        for (int i = 0; i < numbers.length; i++) {
            if (visits[i] || isRepeatNumber(numbers, visits, i)) {
                continue;
            }

            answer.add(numbers[i]);
            visits[i] = true;
            backtrack(answers, answer, numbers, visits, index + 1);
            visits[i] = false;
            answer.remove(index);
        }
    }

    private boolean isRepeatNumber(int[] numbers, boolean[] visits, int index) {
        return index > 0 && numbers[index] == numbers[index - 1] && visits[index - 1];
    }
}
```

:::tip

-   执行结果：通过
-   执行用时：4 ms, 在所有 Java 提交中击败了 23.30%的用户
-   内存消耗：38.8 MB, 在所有 Java 提交中击败了 93.68%的用户
:::

```java
class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> answers = new LinkedList<>();
        List<Integer> answer = new LinkedList<>();
        boolean[] visits = new boolean[nums.length];
        Arrays.sort(nums);
        backtrack(answers, answer, nums, visits, 0);
        return answers;
    }

    private void backtrack(List<List<Integer>> answers, List<Integer> answer, int[] numbers, boolean[] visits, int index) {
        if (index == numbers.length) {
            answers.add(new LinkedList<>(answer));
            return;
        }

        for (int i = 0; i < numbers.length; i++) {
            if (visits[i] || isRepeatNumber(numbers, visits, i)) {
                continue;
            }

            answer.add(numbers[i]);
            visits[i] = true;
            backtrack(answers, answer, numbers, visits, index + 1);
            visits[i] = false;
            answer.remove(index);
        }
    }

    private boolean isRepeatNumber(int[] numbers, boolean[] visits, int index) {
        return index > 0 && numbers[index] == numbers[index - 1] && !visits[index - 1];
    }
}
```

:::tip

-   执行结果：通过
-   执行用时：2 ms, 在所有 Java 提交中击败了 70.02%的用户
-   内存消耗：39.2 MB, 在所有 Java 提交中击败了 53.61%的用户
:::

> 可以发现，剪枝函数`isRepeatNumber`的实现不同，时间开销也不同。具体差异，见[leetcode 分析](https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liwe-2/)

## [leetcode39 组合总和](https://leetcode-cn.com/problems/combination-sum/)

第一反应是套用回溯算法通用公式，由于可以元素可以重复计算，所以就不维护`visits[i]`来表示元素是否访问过。于是可以得到如下代码：

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> answers = new LinkedList<>();
        List<Integer> answer = new LinkedList<>();
        backtrack(answers, answer, candidates, target, 0);
        return answers;
    }

    private void backtrack(List<List<Integer>> answers, List<Integer> answer, int[] candidates, int target, int index) {
        if (target < 0) {
            return;
        }

        if (target == 0) {
            answers.add(new LinkedList<>(answer));
            return;
        }

        for (int i = 0; i < candidates.length; ++i) {
            answer.add(candidates[i]);
            backtrack(answers, answer, candidates, target - candidates[i], index + 1);
            answer.remove(index);
        }
    }
}
```

:::danger
但上述代码并非正确答案，会出现重复解，如:

-   输入：`candidates = [2,3,6,7]`, `target = 7`
-   输出：`[[2, 2, 3], [2, 3, 2], [3, 2, 2], [7]]`
:::

遇到这一类**相同元素不计算顺序**的问题，为了剔除重复解，我们在搜索时需要**按某种顺序搜索**。具体的做法就是在搜索时设置**下一轮搜索的起始坐标**`start`。

```java
public class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> answers = new LinkedList<>();
        List<Integer> answer = new LinkedList<>();
        backtrack(answers, answer, candidates, target, 0);
        return answers;
    }

    private void backtrack(List<List<Integer>> answers, List<Integer> answer, int[] candidates, int target, int start) {
        if (target < 0) {
            return;
        }
        if (target == 0) {
            answers.add(new LinkedList<>(answer));
            return;
        }
        for (int i = start; i < candidates.length; ++i) {
            answer.add(candidates[i]);
            backtrack(answers, answer, candidates, target - candidates[i], i);
            answer.remove(answer.size() - 1);
        }
    }
}
```

:::tip
-   执行结果：通过
-   执行用时：5 ms, 在所有 Java 提交中击败了 31.60%的用户
-   内存消耗：38.9 MB, 在所有 Java 提交中击败了 16.46%的用户
:::

```java
class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> answers = new LinkedList<>();
        List<Integer> answer = new LinkedList<>();
        backtrack(answers, answer, candidates, target, 0);
        return answers;
    }

    private void backtrack(List<List<Integer>> answers, List<Integer> answer, int[] candidates, int target, int start) {
        if (target == 0) {
            answers.add(new LinkedList<>(answer));
            return;
        }
        for (int i = start; i < candidates.length; ++i) {
            if (target - candidates[i] < 0) {
                continue;
            }
            answer.add(candidates[i]);
            backtrack(answers, answer, candidates, target - candidates[i], i);
            answer.remove(answer.size() - 1);
        }
    }
}
```

:::tip

-   执行结果：通过
-   执行用时：3 ms, 在所有 Java 提交中击败了 79.52%的用户
-   内存消耗：38.7 MB, 在所有 Java 提交中击败了 46.65%的用户
:::

## 迷宫路径

```java
public class Maze {
    private int count;
    private int rows;
    private int cols;
    private int[][] maze;
    private int[][] directions;
    private boolean[][] visited;

    public int solve(int[][] maze) {
        this.count = 0;
        this.maze = maze;
        this.rows = maze.length;
        this.cols = maze[0].length;
        this.directions = new int[][]{{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
        this.visited = new boolean[rows][cols];
        this.visited[0][0] = true;
        this.move(0, 0);


        return this.count;
    }

    private void move(int x, int y) {
        if (x == this.rows - 1 && y == this.cols - 1) {
            ++this.count;
            return;
        }

        for (int[] direction : this.directions) {
            int nextX = x + direction[0];
            int nextY = y + direction[1];
            if (nextX < 0 || nextY < 0 || nextX >= this.rows || nextY >= this.cols) {
                continue;
            }
            if (this.visited[nextX][nextY]) {
                continue;
            }
            if (this.maze[nextX][nextY] == 1) {
                continue;
            }
            visited[nextX][nextY] = true;
            this.move(nextX, nextY);
            visited[nextX][nextY] = false;
        }
    }


    public static void main(String[] args) {
        Maze solution = new Maze();
        System.out.println(solution.solve(new int[][]{
                {0, 1, 1, 1, 0},
                {0, 0, 1, 0, 1},
                {1, 0, 0, 0, 1},
                {0, 0, 1, 0, 0},
                {1, 0, 0, 0, 0}
        }));
    }
}



```
