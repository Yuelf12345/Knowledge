/**
 * 给定一个 \(n \times m\) 的二维网格 grid ，网格中的每个单元格包含一个非负整数，表示该单元格的代价。机器人以左上角单元格为起始点，每次只能向下或者向右移动一步，直至到达右下角单元格。请返回从左上角到右下角的最小路径和。
 * 
 * dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1])+grid[i][j]
 */

function minPathSumDP(grid) {
    const row = grid.length
    const column = grid[0].length
    const dp = new Array(row).fill(0).map(() => new Array(column).fill(0))
    dp[0][0] = grid[0][0]
    // 处理第一行
    for (let j = 1; j < column; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }
    // 处理第一列
    for (let i = 1; i < row; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    // 动态转换方程
    for (let i = 1; i < row; i++) {
        for (let j = 1; j < column; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }
    }
    console.log(dp);
    return dp[row - 1][column - 1]

}
console.log(minPathSumDP([
    [1, 3, 1, 5],
    [2, 2, 4, 2],
    [5, 3, 2, 1],
    [4, 3, 5, 2]
])); // 1->2->2->3->2->1->2 = 13


/**空间优化 */

function minPathSumDP1(grid) {
    const row = grid.length
    const column = grid[0].length
    let cur = []
    cur[0] = grid[0][0]
    for (let j = 1; j < column; j++) {
        cur[j] = cur[j - 1] + grid[0][j]
    }
    for (let i = 1; i < row; i++) {
        cur[0] = cur[0] + grid[i][0];
        for (let j = 1; j < column; j++) {
            cur[j] = Math.min(cur[j - 1], cur[j]) + grid[i][j];
        }
    }
    console.log(cur);
    return cur[column - 1]
}

console.log(minPathSumDP1([
    [1, 3, 1, 5],
    [2, 2, 4, 2],
    [5, 3, 2, 1],
    [4, 3, 5, 2]
])); // 1->2->2->3->2->1->2 = 13