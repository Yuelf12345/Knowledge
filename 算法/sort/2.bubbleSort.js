/**
 * 首先，对 n 个元素执行“冒泡”，将数组的最大元素交换至正确位置。
接下来，对剩余 n-1 个元素执行“冒泡”，将第二大元素交换至正确位置。
以此类推，经过 n-1 轮“冒泡”后，前 n-1  大的元素都被交换至正确位置。
仅剩的一个元素必定是最小元素，无须排序，因此数组排序完成。
 */

function bubble(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

console.log(bubble([4, 1, 3, 1, 5, 2]));
