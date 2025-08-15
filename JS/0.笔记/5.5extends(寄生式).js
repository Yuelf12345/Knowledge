/**
 * 寄生式继承:寄生式继承在原型式继承的基础上，对继承的对象进行了扩展，返回一个新的对象。
 * 优点：
    可以对继承的对象进行扩展
  缺点：
    所有子对象共享扩展的方法，对原型的修改会影响到所有子对象
 */

function createObj(o, props = {}) {
  const clone = Object.create(o);
  Object.assign(clone, props);
  clone.say = function () {
    console.log(this.name);
  };
  return clone;
}

const parent = {
  // 父对象
  name: "张三",
  age: 18,
  // say() {
  //   console.log(this.name);
  // },
};

const c = createObj(parent, { gender: "男" });
console.log(c);
c.say();
