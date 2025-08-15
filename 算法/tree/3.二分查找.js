function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    }
    if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
}

console.log(binarySearch([1, 3, 6, 8, 12, 15, 23, 25, 31, 25], 6));
console.log(binarySearch([1, 3, 6, 8, 12, 15, 23, 25, 31, 25], 7));
