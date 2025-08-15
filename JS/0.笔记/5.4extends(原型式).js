/**
 * 原型式继承:原型式继承是创建一个空对象作为中介，将父类实例作为该空对象的原型，从而实现继承。
 * 优点：
    简单易用，代码量少
  缺点：
    所有子对象共享父对象的属性和方法，对父对象的修改会影响到所有子对象
 */

function createObj(o, props = {}) {
  function Parent() {}
  Parent.prototype = o;
  const instance = new Parent();  // instance.__proto__ 指向 o instance 可以访问 o 上的所有属性和方法
  Object.assign(instance, props);
  return instance;
}

var parent = {
  name: "张三",
  age: 18,
  say: function () {
    console.log(this.name);
  },
};

const c = createObj(parent);
console.log(c);
c.say();
const c2 = createObj(parent, { name: "李四" });
