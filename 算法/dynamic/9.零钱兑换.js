/**
 * 给定 n 种硬币，第i 种硬币的面值为 coins[i-1] ，目标金额为 amt ，
 * 每种硬币可以重复选取，问能够凑出目标金额的最少硬币数量。
 * 如果无法凑出目标金额，则返回 -1
 * coins: [1,2,5]
 * amt: 11
 * 输出: 3 // 1 + 5 + 5
 */

function coinChangeDP(coins, amt) {
  const row = coins.length;
  const dp = new Array(row).fill(Infinity).map(() => {
    return new Array(amt + 1).fill(Infinity);
  });
  // 填充第一行
  for (let j = 0; j <= amt; j++) {
    if (j % coins[0] === 0) {
      dp[0][j] = j / coins[0];
    }
  }
  // 动态转换方程
  for (let i = 1; i < row; i++) {
    for (let j = 0; j <= amt; j++) {
      if (j < coins[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - coins[i]] + 1); // 1：当前数量
      }
    }
  }
  console.log(dp);
  return dp[row - 1][amt] === Infinity ? -1 : dp[row - 1][amt];
}
console.log(coinChangeDP([1, 2, 5], 11));

// 空间优化
function coinChangeDP1(coins, amt) {
  const row = coins.length;
  const col = amt + 1;
  const dp = new Array(col).fill(0);
  // 初始化第一项
  dp[0] = 1;
  for (let i = 1; i <= row; i++) {
    for (let j = coins[i - 1]; j < col; j++) {
      dp[j] = dp[j] + dp[j - coins[i - 1]];
    }
  }
  console.log(dp);
  return dp[col - 1];
}
