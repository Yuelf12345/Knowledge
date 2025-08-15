/**
 * 构造函数继承 构造函数继承是在子类构造函数内部调用父类构造函数来继承父类的属性和方法。
 * 优点：
    可以传参给父类构造函数
    实现了属性的继承
  缺点：
    无法继承父类原型上的方法
 */

function Parent(name) {
  this.name = name;
  this.age = 18;
}

Parent.prototype.say = function () {
  console.log(this.name);
};

 function Child(name){
  Parent.call(this,name)
  // this.name = '张三丰';
  this.gender = '男'
 }

const c = new Child('张三');
console.log(c);
// c.say();
const c2 = new Child('李四');
console.log(c2);
