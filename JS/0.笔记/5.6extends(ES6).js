/**
 * ES6 Class 继承 ES6中引入了Class来实现继承，使用extends关键字来继承父类，使用super关键字来调用父类的构造函数。
 * 优点：
    语法更加简洁易读
  缺点：
    无法多继承，只能单继承
    兼容性较差，在低版本浏览器中无法使用
 */
class Parent {
  constructor(name) {
    this.name = name;
    this.age = 18;
  }
  say() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(name) {
    super(name);
    this.gender = '男'
  }
}

const c = new Child('张三');
console.log(c);
c.say();