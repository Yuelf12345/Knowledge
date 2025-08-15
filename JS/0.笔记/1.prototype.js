/**
 * 在js中，构造函数
 */

function A() {}
const a = new A();
console.group("a");
console.log(a.__proto__ === A.prototype);
console.log(A.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);
console.groupEnd();
console.group("Function");
console.log(A.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Function.__proto__ === Function.prototype);
console.groupEnd();
console.group("Object");
console.log(
  Object.__proto__ === Function.prototype,
  Object.__proto__ === Function.__proto__
);
console.groupEnd();
//
A.prototype.a = 1;
Object.prototype.b = 2;
console.log("a", a.a, a.b);

Function.prototype.x = 3;
console.log("A", A.x, A.b);

console.log("Function", Function.b);

/**
 *      a             A          Function
 *      |             |             |
 *   __proto__     __proto__    __proto__
 *      |             |             |
 * 【   A     】  【Function 】 【Function 】 --- Object.__proto__
 * 【prototype】  【prototype】 【prototype】
 *      |             |             |
 *   __proto__     __proto__    __proto__
 *      |             |             |
 *  【 Object  】  【Object 】   【 Object 】
 *  【prototype】  【prototype】 【prototype】
 *      |             |             |
 *  __proto__      __proto__    __proto__
 *      |             |             |
 *  【 null 】    【 null 】     【 null 】
 */

/**
 * 判断一个函数是否是通过new调用
 */
function B() {
  console.log(new.target);
  if (new.target) {
    console.log("是 new 调用的");
  } else {
    console.log("不是");
  }
}
const b1 = new B();
const b2 = B();

function C() {
  // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
  console.log(this instanceof C);
  if (this instanceof C) {
    console.log("是 new 调用的");
  } else {
    console.log("不是");
  }
}
const c1 = new C();
const c2 = C();
