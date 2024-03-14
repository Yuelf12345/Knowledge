/**
 * @description 原型式继承
 * 优点：简单直观；内存优化
 * 缺点：引用类型的属性共享；无法向父类构造函数传参
 */

function object(o) {
    function F() { }
    F.prototype = o
    return new F()
}

let parent = {
    show: true,
    info: {
        name: '张三',
        age: 30
    },
    showInfo() {
        console.log(this.info)
        console.log(this.show);
    }
}

const child1 = object(parent)   // 可以使用Object.create()方法代替(ES5)
child1.show = false
child1.info.gender = '男'
child1.showInfo()

const child2 = object(parent)
child2.showInfo()