/**
  初始状态下，数组的第 1 个元素已完成排序。
  选取数组的第 2 个元素作为 base ，将其插入到正确位置后，数组的前 2 个元素已排序。
  选取第 3 个元素作为 base ，将其插入到正确位置后，数组的前 3 个元素已排序。
  以此类推，在最后一轮中，选取最后一个元素作为 base ，将其插入到正确位置后，所有元素均已排序。
 */
function insertion(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let base = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > base) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = base;
  }
  return arr;
}
console.log(insertion([4, 1, 3, 1, 5, 2]));

/**
 * [1, 3, 4, 1, 5, 2] 开始  base=1; i = 3; j = 2
 *        j base
 * [1, 3, 4, 4, 5, 2] base = 1 < arr[j] 下一步 j-- 
 *        j j+1
 * [1, 3, 3, 4, 5, 2] base = 1
 *     j j+1
 * [1, 3, 3, 4, 5, 2] base = 1
 *  j j+1
 */
