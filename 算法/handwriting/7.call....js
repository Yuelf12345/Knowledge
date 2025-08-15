const obj = {
  name: "张三",
  say: function (...arg) {
    console.log(this.name, arg);
  },
};
const obj2 = {
  name: "李四",
};
// obj.say.call(obj2, 1, 2, 3);
// obj.say.apply(obj2, [1, 2, 3]);
// const cb = obj.say.bind(obj2, 1, 2, 3);
// cb()

Object.prototype.myCall = function (content, ...args) {
  content = content || window;
  const temp = Symbol();
  content[temp] = this;
  content[temp](...args);
  delete content[temp];
};

Object.prototype.myApply = function (content, args) {
  content = content || window;
  const temp = Symbol();
  content[temp] = this;
  let res = content[temp](...args);
  delete content[temp];
  return res;
};

Object.prototype.myBind = function (content, ...args) {
  content = content || window;
  const temp = Symbol();
  content[temp] = this;
  return function (...args2) {
    let res = content[temp](...[...args, ...args2]);
    delete content[temp];
    return res;
  };
};

// obj.say.myCall(obj2, 1, 2, 3);
// obj.say.myApply(obj2, [1, 2, 3]);
const cb = obj.say.myBind(obj2, 1, 2, 3);
cb(4, 5);
