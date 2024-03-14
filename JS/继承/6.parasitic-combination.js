/**
 * @description 寄生组合继承
 * 优点：避免构造函数多次调用；独立的原型对象；子类能够通过原型链继承父类的方法，从而实现了方法的共享，节省内存空间。
 * 缺点：实现相对复杂
 */

function inheritPrototype(child, parent) {
    // 创建一个空函数作为中介，其原型指向父类原型
    let prototype = Object.create(parent.prototype);
    // 将中介函数的原型赋值给子类原型
    child.prototype = prototype;
    // 恢复子类构造函数的引用，防止构造函数内部的this引用丢失
    child.prototype.constructor = child;
}


function Parent(name) {
    this.show = true
    this.info = {
        name: name,
        age: 30
    }
}
Parent.prototype.showInfo = function () {
    console.log(this.info)
    console.log(this.show)
}

function Child(name) {
    // 继承属性
    Parent.call(this, name);
}

// 使用寄生组合继承
inheritPrototype(Child, Parent);


let child1 = new Child("张三");
child1.info.gender = '男'
child1.show = false
child1.showInfo();

let child2 = new Child("李四");
child2.showInfo();