/**
 * for...of... 主要用于遍历可迭代对象 只会遍历对象自身的可迭代属性
 * 如果一个对象满足下面条件，则该对象是可迭代对象，内置迭代器对象有 Array, TypedArray, String, Map, Set
 * 1.实现 Symbol.iterator 方法
 * 2.迭代器对象必须实现 next() 方法，该方法返回一个包含以下属性的对象：
 *  a: value: 当前迭代的值
 *  b: done: 布尔值，表示是否完成迭代
 */

Array.prototype[3] = 4;
const arr = [1, 2, 3];
arr[Symbol.iterator] = function* () {
  for (let i = 0; i < this.length; i++) {
    if (i === 2) return;
    yield this[i];
  }
};
for (let i of arr) {
  console.log(i);
}

console.log("========================");

const obj = {
  a: 1,
  b: 2,
  c: 3,
  // [Symbol.iterator]: function () {
  //   const keys = Object.keys(this);
  //   let index = 0;
  //   return {
  //     next: () => {
  //       if (index < keys.length) {
  //         const value = this[keys[index]];
  //         index++;
  //         return { value: value, done: false };
  //       } else {
  //         return { done: true };
  //       }
  //     },
  //   };
  // },

  // function* yield 语法糖
  [Symbol.iterator]: function* () {
    for (let key in this) {
      yield this[key];
    }
  },
};

for (let i of obj) {
  console.log(i);
}

{
  Object.prototype[Symbol.iterator] = function* () {
    console.log(this);
    for (let key in this) {
      yield this[key];
    }
  };
  // 实现
  const [a, b] = { a: 1, b: 2 };
  console.log(a); // 1
  console.log(b); // 2
}
