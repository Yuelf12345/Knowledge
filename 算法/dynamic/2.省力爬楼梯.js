/**
 * 数组的每个下标作为一个阶梯，第i个阶梯对应着一个非负数的体力花费值 cost[i] （下标从 0 开始）。每当爬上一个阶梯，都要花费对应的体力值，一旦支付了相应的体力值，就可以选择 向上爬一个阶梯 或者 爬两个阶梯。求找出达到楼层顶部的最低花费。在开始时，可以选择从下标为 0 或 1 的元素作为初始阶梯。
  样例输入： cost=[1,99,1,1,1,99,1,1,99,1]
  样例输出： 6
  样例输入：cost = [2,2,4,2,2,4,2,4,2]
  样例输出： 10

  [1,2,3,...,i-1,i,...,n]
  dp[i] = Math.min(dp[i-1],dp[i-2]) + cost[i]
  即：要么从i-1跳到i，要么从i-2跳到i
 */

function minCost(cost) {
  let len = cost.length
  if (len <= 1) return 0
  if (len === 2) return Math.min(cost[0], cost[1])
  // const dp = [cost[0], Math.min(cost[0], cost[1])]
  // for (let i = 2; i < len; i++) {
  //   dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i]
  // }
  // return dp[len - 1]
  /**空间优化 */
  let a = cost[0], b = Math.min(cost[0], cost[1])
  for (let i = 2; i < len; i++) {
    let temp = Math.min(a, b) + cost[i]
    a = b
    b = temp
  }
  return b

}
console.log(minCost([1, 99, 1, 1])); // 2
console.log(minCost([1, 99, 1, 1, 1, 99, 1, 1, 99, 1])); // 6
console.log(minCost([2, 2, 4, 2, 2, 4, 2, 4, 2])); // 10