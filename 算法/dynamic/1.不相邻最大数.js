/**
 * 不相邻的最大值
 * [2,6,9,8] // 6 + 8 = 14
 * [4,7,3,6,5] // 7 + 6 = 13
 * [7,5,8,3,4,5] // 7 + 8 + 5 = 20
 */

/**
 * [1,2,3,...,i-1,i,...]
 * dp[i] = Math.max(arr[i] + dp(i-2), dp[i-1])
 * 即：要么保留当前的数，要么不保留当前数
 */
function maxSum(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return Math.max(arr[0], arr[1]);
  let dp = [arr[0], Math.max(arr[0], arr[1])];
  for (let i = 2; i < arr.length; i++) {
    dp[i] = Math.max(arr[i] + dp[i - 2], dp[i - 1]);
  }
  return dp[arr.length - 1];
}
console.log(maxSum([2, 6, 9, 8]));
console.log(maxSum([4, 7, 3, 6, 5]));
console.log(maxSum([7, 5, 8, 3, 4, 5]));
