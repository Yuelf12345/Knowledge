/**
 *  给定一个整数数组nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 样例输入: nums=[−2,1,−3,4,−1,2,1,−5,−7]
 * 样例输出: 6，即[4,−1,2,1]。
 * [1,2,3,...,i-1,i,...]
 *  dp[i] = Math.max(arr[i],arr[i]+dp[i-1])
 *  即：要么从当前元素重新开始，要么将当前元素加入之前的子数组
 */
function maxSubArray(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let dp = [nums[0]];
  let maxSum = dp[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
    maxSum = Math.max(maxSum, dp[i]);
  }
  console.log(dp);
  return maxSum;
}

console.log(maxSubArray([-2, 1, -3, 4])); // 4 [4]
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, -7])); // 6 [4,-1,2,1]
console.log(maxSubArray([-2, 1, -3, 4, -1, 4, -2])); // 7 [4,-1,4]
