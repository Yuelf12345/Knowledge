/**
 * @description: 原型链继承
 * 优点：简单易实现；内存高效
 * 缺点：所有子类实例共享父类原型，子类实例修改父类引用类型属性，将影响所有子类实例；无法向父类构造函数传参
 */

function Parent() {
    this.show = true
    this.info = {
        name: '张三',
        age: 35
    }
}
Parent.prototype.showInfo = function () {
    console.log(this.info)
    console.log(this.show);
}

function Child() { }
Child.prototype = new Parent()

const child1 = new Child()
child1.info.gender = '男'
child1.show = false
child1.showInfo()

const child2 = new Child()
child2.showInfo()