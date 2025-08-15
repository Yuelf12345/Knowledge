/**
 * 给定几种硬币，第i种硬币的面值为 coins[i-1] ，目标金额为 amt，每种硬币可以重复选取，
 * 问能够凑出目标金额的最少硬币数量。如果无法凑出目标金额，则返回 -1。
    列： 
    输入 coins = [1, 2, 5], amt = 11
    输出 count = 3 // 1 + 5 + 5
    前 i 种硬币能够凑出金额a的最少硬币数量，记为 dp[i,a]。
        0 1 2 3 
    0   0 0 0 0
    1   0 1 2 3
    2   0 0
    5   0 0

    两道题可以相互转换，“物品”对应“硬币”、“物品重量”对应“硬币面值”、“背包容量”对应“目标金额”。
 */

function coinChangeDP(coins, amt) {
    const len = coins.length
    const dp = new Array(len+1).fill(-1).map(() => new Array(amt + 1).fill(0))

    console.log(dp);
}

console.log(coinChangeDP([1, 2, 5], 11));
