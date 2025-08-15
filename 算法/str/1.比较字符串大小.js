/**
 * 比较用-链接的字符串，如 1-2---33--4
 * s1>s2 返回1
 * s1<s2 返回-1
 * s1=s2 返回0
 */
function compare(s1, s2) {
    const s1Arr = s1.split('-').filter(v => v)
    const s2Arr = s2.split('-').filter(v => v)
    const len = Math.max(s1Arr.length, s2Arr.length)
    for (let i = 0; i < len; i++) {
        if (s1Arr[i] > s2Arr[i]) {
            return 1
        }
        if (s1Arr[i] < s2Arr[i]) {
            return -1
        }
        if (i === len - 1 && s1Arr.length === s2Arr.length && s1Arr[i] == s2Arr[i]) {
            return 0
        }
    }
    if (s1Arr.length > s2Arr.length) return 1
    return -1
}
console.log(compare('1-2---33--4', '1-2---3--4'));





function fn(s1, s2) {
    function* walk(path) {
        let num = ''
        for (let c of path) {
            if (c != '-') {
                num += c
            } else {
                if (num) {
                    yield num
                    num = ''
                }
            }
        }
        if (num) {
            yield num
        }
    }
    let iter1 = walk(s1)
    let iter2 = walk(s2)
    while (true) {
        let { value: v1, done: d1 } = iter1.next()
        let { value: v2, done: d2 } = iter2.next()
        if (d1 && d2) return 0
        if (d1) return -1
        if (d2) return 1
        if (v1 > v2) return 1
        if (v1 < v2) return -1
    }
}
console.log(fn('1-2---33--4', '1-2---3--4-5'));