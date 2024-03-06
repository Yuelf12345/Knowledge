//1. 普通函数中的this指向谁？
// "use strict"
function foo() {
    console.log(this);
}

foo() // undefined 严格模式下，this为undefined
foo()  // window/global  非严格模式下，this为window/global

//2. 构造函数中的this指向谁？   
class Foo {
    constructor(name) {
        this.name = name
        console.log(this); // Foo { name: '张三' } this指向实例对象
    }
}
let f = new Foo('张三')

//3. 箭头函数中的this指向谁？
const bar = () => {
    console.log(this); // 不创建自己的this,继承父级的this
}
bar()
let obj = {
    name: 'object',
    regularMethod: function () {
        console.log(this.name); // 输出 "object"
        const arrowFunction = () => {
            console.log(this.name); // 依然输出 "object"，因为它继承了外部 this 的指向
        };
        arrowFunction();
    }
};
obj.regularMethod(); // 在这里，箭头函数内部的 this 指向与常规函数相同，都是指向 obj

//4. 对象方法中的this指向谁？
let obj2 = {
    name: 'object',
    method: function () {
        console.log(this.name); // 输出 "object",this 指向该对象实例。
    }
};
obj2.method();

// 5. call,apply,bind中的this指向谁？
function printContext() {
    console.log(this);
}
let obj3 = { name: 'explicit' };
printContext.call(obj); // 输出：{name: "explicit"},第一个参数将作为调用该函数时的 this 值。