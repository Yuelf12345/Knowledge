/**
 * @description: 构造函数继承
 * 优点：独立性；向父类传递参数
 * 缺点：子类无法继承父类的静态方法；方法重复
 * 
 */

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
    Parent.call(this, name)
}

const child1 = new Child('张三')
child1.show = false
child1.info.gender = '男'
console.log(child1)
// child1.showInfo() 报错

const child2 = new Child('李四')
child2.info.gender = '女'
console.log(child2)