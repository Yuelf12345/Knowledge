function add(x) {
    let sum = x;

    const innerAdd = function (y) {
        sum += y;
        // 返回innerAdd函数自身以支持连续调用
        return innerAdd;
    };

    // 添加一个终止方法或者检查是否有传入参数来返回最终结果
    innerAdd.toString = function () {
        // 当调用toString时（如console.log()）返回计算后的结果
        return sum;
    };

    // 当没有传入参数时，返回累计的结果
    innerAdd.valueOf = function () {
        return sum;
    };

    // 在函数内部返回innerAdd函数
    return innerAdd;
}

// 连续调用并获取结果
console.log(add(1)(2)(3));  // 输出6