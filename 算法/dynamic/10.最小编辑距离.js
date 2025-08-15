/**
 * 输入两个字符串 s 和 t ，返回将s 转换为 t所需的最少编辑步数。
  你可以在一个字符串中进行三种编辑操作：插入一个字符、删除一个字符、将字符替换为任意一个字符。
  列如将 kitten 转成 sitting 需要编辑 3 步
  kitten -> sitting // 3
  kitten ->sitten (替换一个字符)
  sitten ->sittin (替换一个字符)
  sitten ->sitting (插入一个字符)
  hello -> algo // 3
  hello -> ello (删除一个字符)
  ello -> algo (替换两个字符)
 dp 表
    i\j 0 a l g o
    0   0 1 2 3 4 
    h   1 1
    e   2
    l   3
    l   4
    o   5
 */

function editDistanceDP(s, t) {
  const row = s.length + 1;
  const col = t.length + 1;
  if (row === 0) return col;
  if (col === 0) return row;
  const dp = new Array(row).fill(0).map(() => new Array(col).fill(0));
  // 初始化第一行
  for (let j = 0; j < col; j++) {
    dp[0][j] = j;
  }
  // 初始化第一列
  for (let i = 0; i < row; i++) {
    dp[i][0] = i;
  }
  // dp转换方程
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  console.log(dp);
  return dp[row - 1][col - 1];
}

console.log(editDistanceDP("hello", "algo")); // 3

function editDistanceDP1(s, t) {
  const row = s.length + 1;
  const col = t.length + 1;
  if (row === 0) return col;
  if (col === 0) return row;
  const dp = new Array(col).fill(0);

  // 初始化第一行
  for (let j = 0; j < col; j++) {
    dp[j] = j;
  }
  // dp转换方程
  for (let i = 1; i < row; i++) {
    let pre = dp[0];
    dp[0] = i;
    for (let j = 1; j < col; j++) {
      const temp = dp[j];
      if (s[i - 1] === t[j - 1]) {
        dp[j] = pre;
      } else {
        dp[j] = Math.min(dp[j], dp[j - 1], pre) + 1;
      }
      pre = temp;
    }
  }
  console.log(dp);
  return dp[col - 1];
}

console.log(editDistanceDP1("hello", "algo")); // 3
