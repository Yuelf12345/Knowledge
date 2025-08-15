/**
 * value: [5,10,3,6,3]
 * weight:[2,5,1,4,3]
 *  6 // 13
 * 下标\重量
 *   0 1 2 3 4 5 6
 * 0 0 0 5 5 5 5 5
 * 1 0 0 5 5 5 10 10
 * 2 0 3 5 8
 * 3 0
 * 4 0
 */
function max(value, weight, maxWeight) {
  if (!maxWeight) return 0;
  const dp = new Array(value.length)
    .fill()
    .map(() => new Array(maxWeight + 1).fill(0));
  // 填充第一行
  for (let i = 0; i < maxWeight + 1; i++) {
    dp[0][i] = i < weight[0] ? 0 : value[0];
  }
  // 状态转移方程
  for (let i = 1; i < value.length; i++) {
    for (let j = 0; j <= maxWeight; j++) {
      // 容量不够时，不放入物品，取出上一次相同重量的值
      if (j < weight[i]) {
        dp[i][j] = dp[i - 1][j]
      } else {
        // 容量够时，放入当前物品【i】，剩余容量为【[j - weight[i]]】,取出上一次相同剩余容量的值
        // // Math.max 保证得到放入物品【i】时和不放入物品【i】时的最大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }
  console.log(dp);
  return dp[value.length - 1][maxWeight];
}

const res = max([5, 10, 3, 6, 3], [2, 5, 1, 4, 3], 6); // 10 + 3 = 13
console.log(res);
