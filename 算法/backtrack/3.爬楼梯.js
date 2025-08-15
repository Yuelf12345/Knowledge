/**
 * 给定一个共有n阶的楼梯，你每步可以上 1 阶或者 2 阶，请问有多少种方案可以爬到楼顶？
 * 
 */



function climbingStairsBacktrack(n) {
    const state = 0
    const choices = [1, 2]
    let res = 0
    function backtrack(state, choices) {
        // 符合，记录结果
        if (state === n) {
            res++
            return

        }
        for (let choice of choices) {
            if (state + choice > n) continue;
            backtrack(state + choice, choices)
        }
    }
    backtrack(state, choices)
    return res
}

console.log(climbingStairsBacktrack(3)); // 3
console.log(climbingStairsBacktrack(4)); // 5
console.log(climbingStairsBacktrack(5)); // 8
console.log(climbingStairsBacktrack(10)); // 89
/**
 * 在典型的回溯算法中，我们会：
    做选择（修改状态）
    递归处理
    撤销选择（恢复状态）
 */

/**
 * 为什么不需要显式回溯
    值传递特性：
        JavaScript中基本类型（数字）是值传递
        backtrack(state + choice, choices) 中的 state + choice 只是计算结果，不会修改当前作用域的 state 变量
    无状态修改：
        算法中没有对共享状态进行修改
        每次递归调用都传递新的值，而不是修改原有变量
    自动回溯：
        当递归返回时，自动回到之前的状态
        不需要手动撤销操作，因为根本没有修改任何需要撤销的状态
    对比：需要显式回溯的情况
        如果使用全局状态或引用类型，就需要显式回溯：
        javascript
        let path = []; // 全局路径数组
        function backtrack(n, currentState) {
            if (currentState === n) {
                res++; // 找到一种方案
                return;
            }
            
            for (let choice of [1, 2]) {
                if (currentState + choice <= n) {
                    path.push(choice); // 做选择
                    backtrack(n, currentState + choice);
                    path.pop(); // 显式回溯，撤销选择
                }
            }
        }
    总结
        当前实现中没有显式回溯操作是因为：
        使用的是值传递而非引用传递
        没有修改任何需要恢复的状态
        状态通过函数参数传递，递归返回时自然恢复
        这种实现方式实际上是回溯算法的一种简化形式，有时也称为"隐式回溯"。
 */
