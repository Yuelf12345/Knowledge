/**
 * @description 为什么data和methods中的定义可以直接用this访问
 * @example
 */
class Vue {
    constructor(options) {
        this._data = options.data;
        this._methods = options.methods;
        // 1.将data中的数据代理到实例上
        Object.keys(this._data).forEach((key) => {
            proxy(this, "_data", key);
        });
        // 2.将methods中的方法绑定到实例上
        Object.keys(this._methods).forEach((key) => {
            this[key] = this._methods[key].bind(this);
        });
    }
}
const vm = new Vue({
    data: {
        msg: "hello world",
    },
    methods: {
        say() {
            console.log(this.msg);
        },
    },
});
// 模拟this访问
console.log(vm.msg);
vm.say();

/**
 * @description initMethods 里 通过bind将methods中的this绑定到vm实例上并返回一个函数挂载到vm上
 *              vm[key] = bind(methods[key], vm)
 * @param {*} fn 方法
 * @param {*} ctx 实例
 * @returns
 */
function polyfillBind(fn, ctx) {
    function boundFn(a) {
        var l = arguments.length;
        // 判断参数的个数来分别使用call/apply进行调用
        return l
            ? l > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx);
    }
    boundFn._length = fn.length;
    return boundFn;
}
function nativeBind(fn, ctx) {
    return fn.bind(ctx);
}
// 判断是否支持原生的bind方法
const bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * @description initData 里 使用 proxy(vm, `_data`, key) 将data中的数据绑定至实例vm
 * @param {*} target vm
 * @param {*} sourceKey _data
 * @param {*} key key
 */

function proxy(target, sourceKey, key) {
    const sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: {},
        set: {},
    };
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
