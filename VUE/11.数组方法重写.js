const obj = {
    _arr: [1, 2, 3]
};

const originalArrayMethods = Array.prototype;
const arrayMethods = Object.create(originalArrayMethods);

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

methodsToPatch.forEach(method => {
    const originalMethod = originalArrayMethods[method];
    Object.defineProperty(arrayMethods, method, {
        value: function (...args) {
            console.log(`Array method ${method} called with arguments:`, args);
            const result = originalMethod.apply(this, args);
            console.log('Array after modification:', this);
            // vue 中处理
            // const ob = this.__ob__
            // let inserted
            // switch (method) {
            //     case 'push':
            //     case 'unshift':
            //         inserted = args
            //         break
            //     case 'splice':
            //         inserted = args.slice(2) // 获取插入的元素
            //         break
            // }
            // console.log('插入的数据', inserted);
            // if (inserted) ob.observeArray(inserted) // 将新增的数据变成响应式数据
            // if (__DEV__) {  // 触发数组更新
            //     ob.dep.notify({
            //         type: TriggerOpTypes.ARRAY_MUTATION,
            //         target: this,
            //         key: method
            //     })
            // } else {
            //     ob.dep.notify()
            // }
            return result;
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
});

Object.defineProperty(obj, 'arr', {
    get() {
        console.log('getter');
        return this._arr;
    },
    set(newValue) {
        console.log('setter', newValue);
        this._arr = newValue;
        // 重新绑定数组方法
        this._arr.__proto__ = arrayMethods;
    }
});

// 初始化时绑定数组方法
obj.arr.__proto__ = arrayMethods;

// 测试
// obj.arr.push(4);
obj.arr.splice(1, 1, a, b, c)


// 以下不会触发重写的数组方法 vue也是
obj.arr[0] = 7;
obj.arr.length = 5;

