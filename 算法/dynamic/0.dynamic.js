/**
 * 动态规划的解题流程会因问题的性质和难度而有所不同，
 * 但通常遵循以下步骤：
 *  描述决策，
 *  定义状态，
 *  建立 \(dp\) 表，
 *  推导状态转移方程，
 *  确定边界条件等。
 */

/**
 * 
function dynamic(arr1, arr2) {
  const row = arr1.length + 1;
  const col = arr2.length + 1;
  const dp = new Array(row).fill().map(() => new Array(col).fill(0));
  // 初始第一项dp数据
  for (let j = 0; j < col; j++) {
    let n
    dp[0][j] = n;
  }
  for (let i = 1; i < length; i++) {
    for (let j = 1; j < length; j++) {
      // 状态转移方程
      // dp[i][j] = 
    }
  }
}
 */
