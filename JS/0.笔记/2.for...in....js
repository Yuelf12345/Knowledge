/**
 * for...in... 遍历对象的可枚举属性 包括从原型链继承的属性
 */

// 对象
Object.prototype.d = 4;

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

Object.defineProperty(obj, "c", {
  enumerable: false,
});

for (let i in obj) {
  console.log(i);
}

// 数组
Array.prototype[3] = 4;

const arr = [1, 2, 3];

Object.defineProperty(arr, "2", {
  enumerable: false,
});

for (let i in arr) {
  console.log(i);
}