/**
 * @description: 寄生继承
 * 优点：独立性；扩展性，克隆对象的基础上添加新的方法或属性，而不会影响原始对象的定义
 * 缺点：不直接支持向父类构造函数传递参数；仍然依赖于原型链；代码相对复杂
 */

function createAnother(o) {
    const clone = Object.create(o)
    clone.showInfo = function () {
        console.log(this.info)
        console.log(this.show)
    }
    return clone
}

const parent = {
    show: true,
    info: {
        name: '张三',
        age: 30
    }
}

const child1 = createAnother(parent)
child1.info.gender = '男'
child1.show = false
child1.showInfo()

const child2 = createAnother(parent)
child2.showInfo()