# 动态规划

动态规划是经典的以空间换时间的算法。

将之前的计算结果存储起来，来避免重复计算。这些存储起来的结算结果一般用**一维数组**或者**二维数组**来存储。

## 经典例题

+ 计数问题
  + [不同路径](#不同路径)
+ 最值问题
  + [最小路径和](#最小路径和)
  + [最大子序列和](#最大子序列和)
  + [零钱兑换](#零钱兑换)
+ 存在性问题

## 解题套路

1. 定义数组下标与数组元素之间的含义，即定义**最优子结构**；
2. 找出数组元素之间的关系，即确定**转移方程**；
3. 找出初始值，即确定**边界条件**。
4. 自底向上进行计算求解。

## 计数问题

### [不同路径](https://leetcode-cn.com/problems/unique-paths/)

#### 题目描述

一个机器人位于一个`m x n`网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？



**示例1：**

![img](../asserts/robot_maze.png)

```
输入：m = 3, n = 7
输出：28
```

**示例2：**

```
输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
```

**示例3：**

```
输入：m = 7, n = 3
输出：28
```

**示例4：**

```
输入：m = 3, n = 3
输出：6
```

**提示：**

+ `1 <= m, n <= 100`
+ 题目数据保证答案小于等于`2 * 109`

#### 解题思路

##### 定义最优子结构

假设`dp[i][j]`为从起始点到坐标点`(i,j)`的不同路径数。

##### 确定转移方程

则机器人要走到坐标点`(i, j)`有两种情况：

  + 从坐标点`(i-1, j)`向右走一步
  + 从坐标点`(i, j-1)`向下走一步

可以得到转移方程：`dp[i][j] = dp[i-1][j] + dp[i][j-1]`

##### 确定边界条件

由于`i-1`和`j-1`不可能为`0`，结合题目描述机器人每次只能向下或者向右移动一步，因此：

+ 当`i-1=0`时，机器人只能向下走，所以`dp[0][0,1,2,...,n]=1`；
+ 当`j-1=0`时，机器人只能向右走，所以`dp[0,1,2,...,n][0]=1`。

##### 自底向上求解

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int i = 0; i < n; i++) {
            dp[0][i] = 1;
        }
        for (int x = 1; x < m; x++) {
            for (int y = 1; y < n; y++) {
                dp[x][y] = dp[x][y - 1] + dp[x - 1][y];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

## 最值问题

### [最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)

#### 题目描述

给定一个包含非负整数的 `*m* x *n*` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：**每次只能向下或者向右移动一步。

**示例 1：**

![img](../asserts/minpath.jpg)

```
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
```

**示例2：**

```
输入：grid = [[1,2,3],[4,5,6]]
输出：12
```

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 100`

#### 解题思路

##### 定义最优子结构

假设`dp[i][j]`是从起始坐标点到坐标点`(i,j)`的最小路径和。

##### 确定转移方程

由于每次只能向下或者向右移动一步，所以走到坐标点`(i,j)`的可能性有2种：

+ 从坐标点`(i-1,j)`向右移动一步，此时`dp[i][j]=dp[i-1][j]+grid[i][j]`
+ 从坐标点`(i, j-1)`向下移动一步，此时`dp[i][j]=dp[i][j-1]+grid[i][j]`

所以转移方程为`dp[i][j]=min(dp[i-1][j], dp[i][j-1])`

##### 确定条件边界

由于`i-1`和`j-1`不可能为`0`，结合题目描述每次只能向下或者向右移动一步，所以：

+ 当`i-1=0`时，`dp[0][j]=dp[0][j-1]+grid[0][j]`
+ 当`j-1=0`时，`dp[i][0]=dp[i-1][0]+grid[0][j]`

##### 代码

```java
class Solution {
    public int minPathSum(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int[][] dp = new int[rows][cols];
        dp[0][0] = grid[0][0];
        for (int row = 1; row < rows; row++) {
            dp[row][0] = dp[row - 1][0] + grid[row][0];
        }
        for (int col = 1; col < cols; col++) {
            dp[0][col] = dp[0][col - 1] + grid[0][col];
        }
        for (int row = 1; row < rows; row++) {
            for (int col = 1; col < cols; col++) {
                dp[row][col] = Math.min(dp[row - 1][col], dp[row][col - 1]) + grid[row][col];
            }
        }
        return dp[rows - 1][cols - 1];
    }
}
```

### [最大子序列和](https://leetcode-cn.com/problems/maximum-subarray/)

#### 题目描述

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

 **示例1：**

```
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```

 **示例2：**

```
输入：nums = [1]
输出：1
```

 **示例3：**

```
输入：nums = [0]
输出：0
```

 **示例4：**

```
输入：nums = [-1]
输出：-1
```

 **示例5：**

```
输入：nums = [-100000]
输出：-100000
```

**提示：**

- `1 <= nums.length <= 3 * 104`
- `-105 <= nums[i] <= 105`

#### 解题思路

##### 定义最优子结构

假设`dp[i]`是以第`i`个元素结尾的最大子序列和，题目答案为`max{dp[i]} 0<=i<=n`。

##### 确定转移方程

此时我们需要确定`dp[i]`、`dp[i-1]`和`nums[i]`之间的关系。

由于题目要求的是连续的子序列，如果舍弃第`i`个元素，那么在计算`dp[i+1]`时，子序列可能不连续。所以第`i`个元素是必填的。

+ 如果第`i`个元素与以第`i-1`个元素结尾的子序列组成了新的子序列，那么`dp[i]=dp[i-1]+nums[i]`；
+ 如果组成不了新的子序列，**为了保证连续性**，那么`dp[i]=nums[i]`

所以转移方程为：`dp[i]=max(dp[i-1]+nums[i], nums[i])`

##### 确定边界条件

`i`表述数组下标，不可能为`0`。所以`dp[0]`必然是边界条件。此时`dp[0]=nums[0]`。

##### 代码

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        int max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
            max = Math.max(max, dp[i]);
        }
        return max;
    }
}
```

分析代码可以发现，实际上只需要缓存`dp[i-1]`即可。再次精简代码，可得：

``` java
class Solution {
    public int maxSubArray(int[] nums) {
        int sum = nums[0];
        int max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            sum = Math.max(sum + nums[i], nums[i]);
            max = Math.max(max, sum);
        }
        return max;
    }
}
```

### [零钱兑换](https://leetcode-cn.com/problems/coin-change/)

#### 题目描述

给定不同面额的硬币 `coins`和一个总金额`amount`。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 `-1`。

你可以认为每种硬币的数量是无限的。

**示例1：**

```
输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1
```

**示例2：**

```
输入：coins = [2], amount = 3
输出：-1
```

**示例3：**

```
输入：coins = [1], amount = 0
输出：0
```

**示例4：**

```
输入：coins = [1], amount = 1
输出：1
```

**示例5：**

```
输入：coins = [1], amount = 2
输出：2
```



#### 解题思路

##### 定义最优子结构

假设`dp[i]`为凑成总金额`i`所需要的最少硬币个数。

##### 确定转移方程

为方便分析问题，我们先假定`coins=[1, 2, 5]`。`dp[i]`的可能性有：

+ `dp[i] = dp[i-5]+1`  `i-5 >= 0`且`dp[i-5]`有解
+ `dp[i] = dp[i-2]+1`  `i-2 >= 0`且`dp[i-2]`有解
+ `dp[i] = dp[i-1]+1`  `i-1 >= 0`且`dp[i-1]`有解

所以转移方程为

+ 如果`i>=5`，那么`dp[i]=min(dp[i-5], dp[i-2], dp[i-1])+1`
+ 如果`5>i>=2`，那么`dp[i]=min(dp[i-2], dp[i-1])+1`
+ 如果`2>i>=1`，那么`dp[i]=dp[i-1]+1`

##### 确定条件边界

显然`i=0`时，`dp[0]=0`

##### 代码

```java
class Solution {
    public int coinChange(int[] coins, int amount) {
        if (amount == 0) {
            return 0;
        }
        int[] dp = new int[amount + 1];
        for (int i = 1; i <= amount; ++i) {
            dp[i] = Integer.MAX_VALUE;
            for (int coin : coins) {
                // dp[i - coin] != Integer.MAX_VALUE表示dp[i - coin]有解
                if (i - coin >= 0 && dp[i - coin] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
                }
            }
        }
        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }
}
```

