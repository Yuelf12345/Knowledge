/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
    你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
    你可以按任意顺序返回答案。
    nums = [2,7,11,15], target = 9  ==> [0, 1]
    nums = [3,2,4], target = 6  ==> [1, 2]
   nums = [3,3], target = 6  ==> [0,1]
 */

function twoSum(nums: number[], target: number): number[] {
  const map = new Map();
  let res: number[] = []
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      res = [map.get(target - nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return res
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));
