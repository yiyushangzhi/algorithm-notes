# 分治法

分治法，即分而治之。是将一个复杂问题拆分成若干个**相互独立**的子问题。子问题又可以拆分成若干个更小的子问题，直至最后的子问题可以直接求解。则原问题的解即这些子问题解得合并。

**分治法**：

1. **分**：将原问题分割成规模更小的若干个**相互独立**的子问题分别进行求解；
2. **治**：若子问题规模足够小，则直接求解。否则，将该问题进一步分割成规模更小的子问题。
3. **合**：将已解决的子问题解进行合并，最终得到原问题的解。

**分治法的要求**

1. 子问题与原问题性质相同；
2. 子问题之间相互独立。

## 经典例题

-    [合并排序](#合并排序)
-    [合并排序](#合并排序)

## 合并排序

**合并排序**是分治法的典型应用。

**分**：将原数组对半分成左右两个子数组分别进行排序。
**治**：如果子数组长度为1，则直接排序。否则，将子数组再进一步对半分成规模更小的两个子数组。
**合**：将排序好的左右两个子数组进行合并。

```java
class Solution {
    /**
     * 合并排序。
     *
     * @param arr 待排序的数组。
     */
    public void sort(int[] arr) {
        sort(arr, 0, arr.length - 1, new int[arr.length]);
    }

    /**
     * 合并排序。
     *
     * @param arr  待排序的数组。
     * @param low  起始位置。
     * @param high 结束位置。
     * @param tmp  临时数组，避免频繁地创建销毁数组。
     */
    private void sort(int[] arr, int low, int high, int[] tmp) {
        if (low < high) {
            // 将数组从中间分成两块区域，分别进行排序。
            int middle = low + ((high - low) >> 1);
            // 对左半部分区域进行排序。
            sort(arr, low, middle, tmp);
            // 对右半部分区域进行排序。
            sort(arr, middle + 1, high, tmp);
            // 将已经排序好的两块区域进行合并。
            merge(arr, low, middle, high, tmp);
        }
    }

    /**
     * 合并两块已排序的区间。
     *
     * @param arr    待排序的数组。
     * @param low    待合并部分的起始位置。
     * @param middle 待合并的两个区间的分割位置，区间[low, middle]已排序，区间(middle, high]已排序。
     * @param high   待合并部分的结束位置。
     * @param tmp    临时数组，避免频繁地创建销毁数组。
     */
    private void merge(int[] arr, int low, int middle, int high, int[] tmp) {
        int left = low;
        int right = middle + 1;
        int idx = low;
        // 从第1段的开始位置和第2段的开始位置自左向右取最小值，依次放到临时数组中。
        while (left <= middle && right <= high) {
            if (arr[left] <= arr[right]) {
                tmp[idx] = arr[left++];
            } else {
                tmp[idx] = arr[right++];
            }
            idx++;
        }
        // 代码运行到这里有2种情况：
        // 1. 要嘛第一个区间[low, middle]已经遍历结束；
        // 2. 要嘛第二个区间(middle, hide]已经遍历结束。
        // 但无论那种情况，都还有一个区间没有遍历结束。需要把未遍历到的剩余数据也依次放到临时数组中。
        while (left <= middle) {
            // 如果区间[low, middle]数据有剩余，那么剩余数据必然落在[left, middle]区间内。
            tmp[idx++] = arr[left++];
        }
        while (right <= high) {
            // 如果区间(middle, high]数据有剩余，那么剩余数据必然落在[right, high]区间内。
            tmp[idx++] = arr[right++];
        }
        // 将临时数组中的数据更新到待排序的数组中，更新的数据为合并以后的数据。
        idx = low;
        while (idx <= high) {
            arr[idx] = tmp[idx];
            idx++;
        }
    }
}
```

## 快速排序

**快速排序**是分治法的另一典型应用。

**分**：取数组第一个元素作为标记元素，将数组分割成左右两个子数组。若元素小于标记元素，则将其移动到标记元素的左边的子数组中。否则移动到标记元素的右边子数组中。
**治**：如果子数组的长度不为1，继续将子数组分割成规模更小的两个子数组。
**合**：当数组分割得足够小时，已经完成排序。无需再合并。

```java
class Solution {
    /**
     * 快速排序。
     *
     * @param arr 待排序的数组。
     */
    public void sort(int[] arr) {
        sort(arr, 0, arr.length - 1);
    }

    /**
     * 快速排序。
     *
     * @param arr  待排序的数组。
     * @param low  起始位置。
     * @param high 结束位置。
     */
    private void sort(int[] arr, int low, int high) {
        if (low < high) {
            int idx = partition(arr, low, high);
            sort(arr, low, idx - 1);
            sort(arr, idx + 1, high);
        }
    }

    /**
     * 按一定规则取数组某个元素作为标记元素，将数组分割成2个部分。
     * 左半部分的元素大小都小于标记元素，有半部分元素都大于标记元素。
     *
     * @param arr  待排序的数组。
     * @param low  起始位置。
     * @param high 结束位置。
     * @return 标记元素的位置。
     */
    private int partition(int arr[], int low, int high) {
        // 取起始位置的元素作为标记元素。
        int pivot = low;
        int left = low;
        int right = high;
        while (left < right) {
            if (arr[right] > arr[pivot]) {
                // right指针从右往左找到第一个比标记元素小的元素。
                right--;
            } else if (arr[left] < arr[pivot]) {
                // left指针从左往右找到第一个比标记元素大的元素。
                left++;
            } else {
                // 将右边比标记元素小的元素与左边比标记元素大的元素进行交换，
                // 确保标记元素的左半部分都比他小，右半部分元素都比他大。
                swap(arr, left, right);
            }
        }
        // 更新标记元素的位置。
        swap(arr, left, pivot);
        return left;
    }

    /**
     * 交换数组元素。
     *
     * @param arr 待交换元素的数组。
     * @param i   第一个待交换元素的位置。
     * @param j   第二个待交换元素的位置。
     */
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```
