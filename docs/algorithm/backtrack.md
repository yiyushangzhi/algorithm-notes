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

-   [N 皇后](#N皇后)

## [N 皇后](https://leetcode-cn.com/problems/n-queens/)

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
