/**
 * 给定 n个物品，第 i 个物品的重量为 w[i-1、价值为 v[i-1] ，和一个容量为 cap 的背包。
    每个物品可以重复选取，问在限定背包容量下能放入物品的最大价值。
    列：
    输入：
        w:[10,20,30,40,50]
        v:[50,120,150,210,240]
        cap: 50
    输出：50+120+120 = 290
 */

function knapsackDFS(weight, value, cap) {
    if (!cap || !weight || !value) return 0
    const dp = new Array(weight.length).fill(0).map(() => new Array(cap + 1).fill(0))
    // 处理第一行
    for (let j = 0; j < cap + 1; j++) {
        dp[0][j] = j >= weight[0] ? value[0] : 0
    }
    // 动态转换方程
    for (let i = 1; i < weight.length; i++) {
        for (let j = 0; j <= cap; j++) {
            if (j < weight[i]) {
                dp[i][j] = dp[i - 1][j]
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weight[i]] + value[i]); // value[i] 当前价值
            }
        }
    }

    console.log(dp);
    return dp[value.length - 1][cap]
}

console.log(knapsackDFS([1, 2, 3, 4, 5], [50, 120, 150, 210, 240], 5)); // 50+120+120 = 290

// 空间优化
function knapsackDFS1(weight, value, cap) {
    if (!cap || !weight || !value) return 0
    const dp = new Array(cap + 1).fill(0)
    for (let i = 1; i <= weight.length; i++) {
        for (let j = weight[i - 1]; j <= cap; j++) {
            dp[j] = Math.max(dp[j], dp[j - weight[i - 1]] + value[i - 1]);
        }
    }
    console.log(dp);
    return dp[cap]
}
console.log(knapsackDFS1([1, 2, 3, 4, 5], [50, 120, 150, 210, 240], 5)); // 50+120+120 = 290
