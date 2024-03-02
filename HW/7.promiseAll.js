// promiseAll是一个函数，返回一个Promise实例，接受参数是一个数组。
const promiseAll = function (promises) {
    if (!Array.isArray(promises)) {
        return Promise.reject(new Error('参数必须是一个数组'));
    }
    return new Promise((resolve, reject) => {
        let len = promises.length; // 缓存一下有多少个promise
        let count = 0; // 用于记录resolve的数量
        let values = [];// 用于存储resolve返回的值
        for (let i = 0; i < len; i++) {
            if (promises[i] instanceof Promise) {  // 判断数组的每一项，如果是promise，就进入then，不是就直接放进values数组中返回
                promises[i].then(res => {
                    count++; // 记录promise完成的数量
                    values[i] = res; // values存储每一个promise的res

                    // 由于异步代码在最后执行，我们需要在then里面判断promise的完成数量，全部完成就resolve
                    // 在for外面判断，是防止它全部都不是promise实例
                    if (count === len) {
                        resolve(values);
                    }
                }).catch(err => {
                    // 当有一个promise实例reject，我们就直接reject
                    reject(err);
                })
            } else {
                // 针对不是promise实例
                count++;
                values[i] = promises[i];
            }
        }
        // 当数据的所有项都不是promise实例，我们就在这判断多一次，然后resolve
        if (count === len) {
            resolve(values);
        }
    });
}

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 100));

promiseAll([promise1, promise2, promise3]).then(values => {
    console.log(values); // 输出：[1, 2, 3]
}, error => {
    console.error(error); // 当有任何一个Promise reject时，这里会输出错误信息
});

promiseAll([new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200)
    }, 1000);
}), 1]).then(data => {
    console.log("then", data)
}).catch(err => {
    console.log('catch', err)
})