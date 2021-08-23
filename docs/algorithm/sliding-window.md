# 滑动窗口

**滑动窗口算法**，通过不断调整区间（窗口）的起始位置（start）和结束位置（end），以获取满足条件的结果。可以用来求解数组、链表或字符串**连续的子串**相关问题。

## 经典例题

-   [LeetCode3 无重复字符的最长子串](#leetcode3-无重复字符的最长子串)
-   [LeetCode76 最小覆盖子串](#leetcode76-最小覆盖子串)
-   [LeetCode209 长度最小的子数组](#leetcode209-长度最小的子数组)

## [LeetCode3 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int max = 0;
        int right = 0;
        int size = s.length();
        Deque<Character> exists = new LinkedList<>();
        while (right < size) {
            if (!exists.contains(s.charAt(right))) {
                exists.addLast(s.charAt(right));
                max = Math.max(max, exists.size());
                ++right;
            } else {
                exists.removeFirst();
            }
        }

        return max;
    }
}
```

:::tip

-   执行结果：通过
-   执行用时：19 ms, 在所有 Java 提交中击败了 17.30%的用户
-   内存消耗：38.6 MB, 在所有 Java 提交中击败了 34.38%的用户
:::

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int max = 0;
        int size = s.length();
        int end = 0;
        Deque<Character> occ = new LinkedList<>();
        for (int start = 0; start < size; start++) {
            if (start != 0) {
                occ.removeFirst();
            }
            while (end < size) {
                char letter = s.charAt(end);
                if (occ.contains(letter)) break;
                occ.addLast(letter);
                ++end;
            }

            max = Math.max(max, occ.size());
        }
        return max;
    }
}
```

:::tip

-   执行结果：通过
-   执行用时：18 ms, 在所有 Java 提交中击败了17.60%的用户
-   内存消耗：38.4 MB, 在所有 Java 提交中击败了77.82%的用户
:::

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int max = 0;
        int size = s.length();
        int end = 0;
        Set<Character> occ = new HashSet<>();
        for (int start = 0; start < size; start++) {
            if (start != 0) {
                occ.remove(s.charAt(start - 1));
            }
            while (end < size) {
                char letter = s.charAt(end);
                if (occ.contains(letter)) break;
                occ.add(letter);
                ++end;
            }
            max = Math.max(max, occ.size());
        }
        return max;
    }
}
```

:::tip
-   执行结果：通过
-   执行用时：6 ms, 在所有 Java 提交中击败了79.95%的用户
-   内存消耗：38.4 MB, 在所有 Java 提交中击败了78.88%的用户
:::

## [LeetCode76 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

```java
class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) {
            return "";
        }
        Map<Character, Integer> counter = new HashMap<>();
        int tSize = t.length();
        for (int i = 0; i < tSize; i++) {
            char letter = t.charAt(i);
            counter.put(letter, counter.getOrDefault(letter, 0) + 1);
        }
        int sSize = s.length();
        int start = 0;
        int end = 0;
        int answerSize = Integer.MAX_VALUE;
        int answerStart = -1;
        int answerEnd = -1;
        while (end < sSize) {
            char letter = s.charAt(end);
            if (counter.containsKey(letter)) {
                counter.put(letter, counter.get(letter) - 1);
            }
            while (check(counter)) {
                char ch = s.charAt(start);
                if (end - start + 1 < answerSize) {
                    answerSize = end - start + 1;
                    answerStart = start;
                    answerEnd = start + answerSize;
                }
                if (counter.containsKey(ch)) {
                    counter.put(ch, counter.get(ch) + 1);
                }
                ++start;
            }
            ++end;
        }
        return answerSize == Integer.MAX_VALUE ? "" : s.substring(answerStart, answerEnd);
    }

    private boolean check(Map<Character, Integer> counter) {
        Iterator<Map.Entry<Character, Integer>> iterator = counter.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<Character, Integer> entry = iterator.next();
            if (entry.getValue() > 0) {
                return false;
            }
        }
        return true;
    }
}
```

:::tip
-   执行结果：通过
-   执行用时：55 ms, 在所有 Java 提交中击败了27.83%的用户
-   内存消耗：39 MB, 在所有 Java 提交中击败了51.33%的用户
:::


## [LeetCode209 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int min = Integer.MAX_VALUE;
        int size = nums.length;
        int[] pres = new int[size + 1];
        for (int i = 0; i < size; i++) {
            pres[i + 1] = pres[i] + nums[i];
        }
        if (pres[size] < target) {
            return 0;
        }
        int end = 0;
        for (int start = 0; start < size; start++) {
            while (end < size && pres[end + 1] - pres[start] < target) {
                ++end;
            }
            if (end >= size) {
                break;
            }
            min = Math.min(min, end - start + 1);
        }
        return min == Integer.MAX_VALUE ? 0 : min;
    }
}
```

:::tip
-   执行结果：通过
-   执行用时：1 ms, 在所有 Java 提交中击败了99.98%的用户
-   内存消耗：38.4 MB, 在所有 Java 提交中击败了52.87%的用户
:::

官方答案：
```java
class Solution {
    public int minSubArrayLen(int s, int[] nums) {
        int n = nums.length;
        if (n == 0) {
            return 0;
        }
        int ans = Integer.MAX_VALUE;
        int start = 0, end = 0;
        int sum = 0;
        while (end < n) {
            sum += nums[end];
            while (sum >= s) {
                ans = Math.min(ans, end - start + 1);
                sum -= nums[start];
                start++;
            }
            end++;
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```
> 作者：LeetCode-Solution
>
> 链接：https://leetcode-cn.com/problems/minimum-size-subarray-sum/solution/chang-du-zui-xiao-de-zi-shu-zu-by-leetcode-solutio/
>
> 来源：力扣（LeetCode）
>
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
