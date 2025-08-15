/**
初始状态下，所有元素未排序，即未排序（索引）区间为 [0,n-1]。
选取区间 [0,n-1]中的最小元素，将其与索引 0 处的元素交换。完成后，数组前 1 个元素已排序。
选取区间 [1,n-1]中的最小元素，将其与索引 1处的元素交换。完成后，数组前 2 个元素已排序。
以此类推。经过 n-1 轮选择与交换后，数组前 n-1个元素已排序。
仅剩的一个元素必定是最大元素，无须排序，因此数组排序完成。
 */
function selection(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let minIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

console.log(selection([4, 1, 3, 1, 5, 2]));
