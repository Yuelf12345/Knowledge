/**
 * 组合继承 组合继承是将原型链继承和构造函数继承结合起来，既能继承父类原型上的方法，又能继承父类的属性。
 * 优点：
    可以继承父类的属性和方法
    可以传参给父类构造函数
  缺点：
    子类的原型上会存在一份父类实例的属性和方法，浪费内存
 */

function Parent(name){
  this.name = name;
  this.age = 18;
}

Parent.prototype.say = function(){
  console.log(this.name);
}

function Child(name){
  Parent.call(this,name)
  // this.name = '张三丰';
  this.gender = '男'
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

const c = new Child('张三')
console.log(c);
c.say()
const c2 = new Child('李四')
console.log(c2);