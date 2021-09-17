# 前缀和与差分

## 前缀和

**前缀和**，可以用来求连续子区间的和。

-   前缀和：`pres[i] = numbers[0] + numbers[1] + ... + numbers[i]`
-   性质：`sum(i, j) = pres[j + 1] - pres[i]`

```java
class Solution {
    int getSum(int[] numbers, int start, int end) {
        int[] pres = new int[numbers.length];
        for(int i = 0; i < numbers.length; i++) {
            pres[i + 1] = pres[i] + numbers[i];
        }
        return pres[end + 1] - pres[start];
    }
}
```

## 差分

-   差分数组：
    -   当`i == 0`时，差分数组`diffs[0] = numbers[0]`；
    -   当`i > 0`时，差分数组`diffs[i] = numbers[i] - numbers[i - 1]`；
-   性质：`numbers[i] = diffs[0] + diffs[1] + ... + diffs[i]`
-   作用：可以用来求解数组N次连续子区间变换后的新数组。**注意：先变再查**。

```java {14-15}
class Solution {
    int[] update(int[] numbers, int[][] changes) {
        int[] answer = new int[numbers.length];
        answer[0] = numbers[0];
        // 求差分
        for (int i = 1; i < numbers.length; i++) {
            answer[i] = numbers[i] - numbers[i - 1];
        }
        // 在差分数组上做变化
        for (int[] change : changes) {
            int value = change[0];
            int start = change[1];
            int end = change[2];
            answer[start] += value;
            answer[end + 1] -= value;
        }
        // 求前缀和
        for (int i = 1; i < answer.length; i++) {
            answer[i] = answer[i - 1] + answer[i];
        }
        return answer;
    }

}
```

### [leetcode1904 拼车](https://leetcode-cn.com/problems/car-pooling/)

```java
class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        int m = trips.length;
        if (m == 0) {
            return false;
        }

        int[] diffs = new int[1001];
        for (int[] trip : trips) {
            int human = trip[0];
            int start = trip[1];
            int end = trip[2];
            diffs[start] += human;
            diffs[end] -= human;
        }

        int sum = 0;
        for (int diff : diffs) {
            sum += diff;
            if (sum > capacity) {
                return false;
            }
        }

        return true;
    }
}
```

:::tip 执行结果：通过
-   执行用时：1 ms, 在所有 Java 提交中击败了 96.32%的用户
-   内存消耗：38.4 MB, 在所有 Java 提交中击败了 34.09%的用户
:::

### [leetcode1109 航班预定统计](https://leetcode-cn.com/problems/corporate-flight-bookings/)

```java
class Solution {
    public int[] corpFlightBookings(int[][] bookings, int n) {
        int[] answer = new int[n];
        for (int[] booking : bookings) {
            int first = booking[0];
            int last = booking[1];
            int seats = booking[2];
            answer[first - 1] += seats;
            if (last < n) {
                answer[last] -= seats;
            }
        }
        for (int i = 1; i < n; i++) {
            answer[i] = answer[i - 1] + answer[i];
        }
        return answer;
    }
}
```

:::tip 执行结果：通过
-   执行用时：2 ms, 在所有 Java 提交中击败了100.00%的用户
-   内存消耗：53.6 MB, 在所有 Java 提交中击败了30.36%的用户
:::
