/**
 * @description: 组合继承
 * 优点： 避免了实例共享;复用了父类的方法;可以父类传递参数
 * 缺点： 两次调用父类构造函数;代码相对复杂
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
    Parent.call(this, name) //构造函数继承, 通过call方法将父类的this指向子类
}
Child.prototype = new Parent()  //原型链继承, 将父类实例挂载到子类原型上

const child1 = new Child('张三')
child1.info.gender = '男'
child1.show = false
child1.showInfo()

const child2 = new Child('李四')
child2.info.gender = '女'
child2.showInfo()