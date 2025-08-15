/**
选取数组最左端元素作为基准数，初始化两个指针 i 和 j 分别指向数组的两端。
设置一个循环，在每轮中使用 i（j）分别寻找第一个比基准数大（小）的元素，然后交换这两个元素。
循环执行步骤 2. ，直到 i 和 j 相遇时停止，最后将基准数交换至两个子数组的分界线。
 */
function quick(arr) {
  if(arr.length <= 1) return arr;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex]
  const left = arr.filter(v=>v<pivot)
  const right = arr.filter(v=>v>pivot)
  const equal  = arr.filter(v=>v===pivot)
  return [...quick(left),...equal,...quick(right)]
}

console.log(quick([4, 1, 3, 1, 5, 2]));
