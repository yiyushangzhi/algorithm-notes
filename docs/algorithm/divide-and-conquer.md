# 分治法

分治法，即分而治之。是将一个复杂问题拆分成若干个**相互独立**的子问题。子问题又可以拆分成若干个更小的子问题，直至最后的子问题可以直接求解。则原问题的解即这些子问题解得合并。

**分治法**：

1. **分**：将问题分解成规模更小的子问题；
2. **治**：将分解后得到的子问题逐一解决；
3. **合**：将已解决的子问题解进行合并，最终得到原问题的解。

**分治法的要求**

1. 子问题与原问题性质相同；
2. 子问题之间相互独立。


## 快速排序

```java
class Solution {
    public void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int idx = getPartition(arr, low, high);
            quickSort(arr, low, idx - 1);
            quickSort(arr, idx + 1, high);
        }
    }

    private int getPartition(int arr[], int low, int high) {
        int pivot = low;
        int left = low;
        int right = high;
        while(left < right) {
            if (arr[right] > arr[pivot]) {
                right--;
            } else if (arr[left] < arr[pivot]) {
                left++;
            } else {
                swap(arr, left, right);
            }
        }
        swap(arr, left, pivot);
        return left;
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```
