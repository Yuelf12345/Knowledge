/**
 * 数组合并
 * 输入：[1, 2, 3, 4, 7, 8, 9, 11]
 * 输出：['1->4', '7->9', '11']
 */

function merge(arr) {
    const res = []
    let start = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] + 1 !== arr[i + 1]) {
            res.push(start === arr[i] ? start : start + '->' + arr[i])
            start = arr[i + 1]
        }
    }
    return res
}

console.log(merge([1, 2, 3, 4, 7, 8, 9, 11]));
