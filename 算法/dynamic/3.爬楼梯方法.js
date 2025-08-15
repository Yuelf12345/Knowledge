/**
 * 给定一个共有n阶的楼梯，你每步可以上 1 阶或者 2 阶，请问有多少种方案可以爬到楼顶？
 * 
 * dp[n] = dp[n-2]+dp[n-1]
 * 
 */

function climbingStairsBacktrack(n) {
    if (n <= 2) return n;
    const dp = [1, 2]
    for (let i = 2; i < n; i++) {
        dp[i] = dp[i - 2] + dp[i - 1]
    }
    return dp[n - 1]
}
// 空间复杂度从 O(n) --> O(1)
function climbingStairsBacktrack1(n) {
    if (n <= 2) return n;
    let a = 1, b = 2
    for (let i = 2; i < n; i++) {
        const temp = b
        b = a + b
        a = temp
    }
    return b
}

console.log(climbingStairsBacktrack1(3)); // 3
console.log(climbingStairsBacktrack1(4)); // 5
console.log(climbingStairsBacktrack1(5)); // 8
console.log(climbingStairsBacktrack1(10)); // 89
