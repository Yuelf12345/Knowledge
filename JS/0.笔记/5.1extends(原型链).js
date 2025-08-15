/**
 * 原型链继承 原型链继承是将父类的实例作为子类的原型，使子类能够访问父类的属性和方法。
 * 优点：
    简单易用，代码量少
    子类能够访问父类原型上的方法和属性
  缺点：
    多个子类实例会共享父类实例，对父类实例的修改会影响到所有子类实例
    子类无法向父类构造函数传参
 */

function Parent() {
    this.name = '张三';
    this.age = 18;
}
Parent.prototype.say = function(){
  console.log(this.name);
}

function Child() {
  this.name = '张三丰';
  this.gender = '男'
}

Child.prototype = new Parent();
Child.prototype.constructor = Child

const c = new Child();
console.log(c);
c.say();
