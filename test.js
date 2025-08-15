// function Person(name) {
//   console.log(new.target);
//   console.log(this instanceof Person);
//   this.name = name;
//   // return 123
// }

// const p1 = new Person("zhangsan");
// console.log(p1);

// function myNew(fn, ...args) {
//   const obj = {};
//   obj.__proto__ = fn.prototype;
//   const res = fn.apply(obj, args);
//   return typeof res === "object" ? res : obj;
// }

// const p2 = myNew(Person, "lisi");
// console.log(p2);

// const obj = {
//   name: "zhangsan",
//   say: function (...args) {
//     console.log(this.name, args);
//   },
// };
// const obj2 = {
//   name: "lisi",
// };
// // obj.say.call(obj2, 18, "nan");

// Object.prototype.myCall = function (content, ...args) {
//   content = content || window;
//   const temp = Symbol();
//   content[temp] = this;
//   const res = content[temp](...args);
//   delete content[temp];
//   return res;
// };
// obj.say.myCall(obj2, 18, "nan");

// Object.prototype.myApply = function (content, args) {
//   content = content || window;
//   const temp = Symbol();
//   content[temp] = this;
//   const res = content[temp](...args);
//   delete content[temp];
//   return res;
// };
// obj.say.myApply(obj2, [18, "nan"]);

// Object.prototype.myBind = function (content, ...args1) {
//   content = content || window;
//   const temp = Symbol();
//   content[temp] = this;
//   return function (...args2) {
//     const res = content[temp](...args1, ...args2);
//     delete content[temp];
//     return res;
//   };
// };
// const b = obj.say.myBind(obj2, 18, "nan");
// b("123");

// function debounce(fn, delay, immediate) {
//   let timer = null;
//   return function (...args) {
//     clearTimeout(timer);
//     if (immediate && !timer) {
//       fn.apply(this, args);
//       timer = null;
//       return;
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, args);
//       timer = null;
//     }, delay);
//   };
// }
// function throttle(fn, delay) {
//   let timer = null;
//   return function (...args) {
//     if (!timer) {
//       timer = setTimeout(() => {
//         fn.apply(this, args);
//         timer = null;
//       }, delay);
//     }
//   };
// }

// function flat(arr, deep = 1) {
//   if (deep <= 0) return arr;
//   return arr.reduce((pre, cur) => {
//     return pre.concat(Array.isArray(cur) ? flat(cur, deep - 1) : cur);
//   }, []);
// }

// console.log(flat([1, [2, [3, [4]]], 5, [6, [7]], 8], 2));

// const m = new Map();
// m.set("a", 1);
// const obj = {
//   a: 1,
//   b: "2",
//   c: true,
//   d: [1, 2, 3, , 5, { obj: { x: 1, y: 2, arr: [1, 2, 3] } }],
//   e: { a: 1, b: 2 },
//   f: function () {
//     return "f";
//   },
//   g: Symbol(),
//   h: new Date(),
//   i: /\d+/,
//   m: m,
//   s: new Set([1, 2, 3]),
//   n: null,
//   u: undefined,
//   v: NaN,
//   w: Infinity,
//   o: {
//     x: {
//       y: {
//         arr: [1, 2, 3],
//         z: 1,
//       },
//     },
//   },
// };

// function deepClone(obj) {
//   if (typeof obj !== "object") return obj;
//   if (obj === null) return obj;

//   if (obj instanceof Date) return new Date(obj);
//   if (obj instanceof RegExp) return new RegExp(obj);
//   if (obj instanceof Set) return new Set(obj);
//   if (obj instanceof Map) return new Map(obj);

//   const res = Array.isArray(obj) ? [] : {};
//   for(let key in obj){
//     if(obj.hasOwnProperty(key)){
//       if(obj[key] && typeof obj[key] === 'object'){
//          res[key] = deepClone(obj[key])
//       }else{
//         res[key] = obj[key]
//       }
//     }
//   }
//   return res;
// }

// const cloneObj = deepClone(obj);
// console.log("cloneObj", cloneObj);

// class ListNode {
//   constructor(value, next) {
//     this.value = value !== undefined ? value : 0;
//     this.next = next !== undefined ? next : null;
//   }
// }

// function reverse(node) {
//   let pre = null;
//   let cur = node;
//   while (cur) {
//     const nextNode = cur.next;
//     cur.next = pre;
//     pre = cur;
//     cur = nextNode;
//   }
//   return pre;
// }

// const n1 = new ListNode(1);
// n2 = new ListNode(2);
// n3 = new ListNode(3);
// n4 = new ListNode(4);
// n1.next = n2;
// n2.next = n3;
// n3.next = n4;
// console.log(n1);
// console.log(reverse(n1));

// class Tree {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }

//   // bfs
//   levelOrder() {
//     let res = [];
//     let queue = [this];
//     while (queue.length) {
//       const n = queue.shift();
//       res.push(n.value);
//       if (n.left) queue.push(n.left);
//       if (n.right) queue.push(n.right);
//     }
//     return res;
//   }

//   #dfs(node, order, res) {
//     if (!node) return;
//     if (order === "pre") res.push(node.value);
//     this.#dfs(node.left, order, res);
//     if (order === "in") res.push(node.value);
//     this.#dfs(node.right, order, res);
//     if (order === "post") res.push(node.value);
//   }

//   preOrder() {
//     const res = [];
//     this.#dfs(this, "pre", res);
//     return res;
//   }
//   inOrder() {
//     const res = [];
//     this.#dfs(this, "in", res);
//     return res;
//   }
//   postOrder() {
//     const res = [];
//     this.#dfs(this, "post", res);
//     return res;
//   }

//   reverse(){
//     function handler(node){
//       if(!node) return
//       const temp = node.right
//       node.right = node.left
//       node.left = temp
//       handler(node.left)
//       handler(node.right)
//     }
//     handler(this)
//     return this
//   }
// }

// const tree = new Tree(1);
// tree.left = new Tree(2);
// tree.right = new Tree(3);
// tree.left.left = new Tree(4);
// tree.left.right = new Tree(5);
// tree.right.left = new Tree(6);
// console.log(tree);
// console.log(tree.levelOrder()); // [ 1, 2, 3, 4, 5, 6 ]
// console.log(tree.preOrder()); // [ 1, 2, 4, 5, 3, 6 ]
// console.log(tree.inOrder());    // [ 4, 2, 5, 1, 6, 3 ]
// console.log(tree.postOrder());  //[ 4, 5, 2, 6, 3, 1 ]
// console.log(tree.reverse());

// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   while (left <= right) {
//     let mid = Math.floor((left + right) / 2);
//     if (arr[mid] > target) {
//       right = mid - 1;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       return mid;
//     }
//   }
//   return -1;
// }

// console.log(binarySearch([1, 3, 6, 8, 12, 15, 23, 25, 31, 25], 8));

// function selection(arr) {
//   let len = arr.length;
//   for (let i = 0; i < len; i++) {
//     let minIndex = i;
//     for (let j = i; j < len; j++) {
//       if (arr[j] < arr[minIndex]) {
//         minIndex = j;
//       }
//     }
//     let temp = arr[minIndex];
//     arr[minIndex] = arr[i];
//     arr[i] = temp;
//   }
//   return arr;
// }

// console.log(selection([4, 1, 3, 1, 5, 2]));

// function bubble(arr) {
//   const len = arr.length;
//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j < len - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         const temp = arr[j + 1];
//         arr[j + 1] = arr[j];
//         arr[j] = temp;
//       }
//     }
//   }
//   return arr;
// }

// console.log(bubble([4, 1, 3, 1, 5, 2]));

// function insertion(arr) {
//   const len = arr.length;
//   for (let i = 1; i < len; i++) {
//     let base = arr[i];
//     let j = i - 1;
//     while (base < arr[j]) {
//       arr[j + 1] = arr[j];
//       j--;
//     }
//     arr[j + 1] = base;
//   }
//   return arr;
// }

// console.log(insertion([4, 1, 3, 1, 5, 2]));

// function quick(arr) {
//   if (arr.length <= 1) return arr;
//   const pivot = Math.floor(arr.length / 2);
//   const left = arr.filter((v) => v < arr[pivot]);
//   const right = arr.filter((v) => v > arr[pivot]);
//   const equal = arr.filter((v) => v == arr[pivot]);
//   return [...quick(left), ...equal, ...quick(right)];
// }

// console.log(quick([4, 1, 3, 1, 5, 2]));

// function merge(arr) {
//   if (arr.length <= 1) return arr;
//   const mid = Math.floor(arr.length / 2);
//   const left = arr.slice(0, mid);
//   const right = arr.slice(mid);
//   function handler(left, right) {
//     const res = [];
//     while (left.length && right.length) {
//       let min;
//       if (left[0] < right[0]) {
//         min = left.shift();
//       } else {
//         min = right.shift();
//       }
//       res.push(min);
//     }
//     return res.concat(left).concat(right);
//   }
//   return handler(merge(left), merge(right));
// }

// console.log(merge([4, 1, 3, 1, 5, 2]));

// function Parent(){
//   this.name = 'zhangsan'
//   this.sayName = function(){
//     console.log(this.name, this);
//   }
// }
// Parent.prototype.age = 18

// function Child(name){
//   this.name = name
//   this.gender = '男'
// }
// Child.prototype = new Parent()
// Child.prototype.constructor = Child
// const c1 = new Child('lisi')
// c1.sayName()
// console.log(c1.age);

// function Parent(name){
//   this.name = name
//   this.sayName = function(){
//     console.log(this.name, this);
//   }
// }
// Parent.prototype.age = 18

// function Child(name){
//   Parent.call(this,name)
//   this.gender = '男'
// }
// const c1 = new Child('lisi')
// c1.sayName()
// console.log(c1.age);

// function Parent(name){
// this.name = name
// this.sayName = function(){
//   console.log(this.name,this);
// }
// }
// Parent.prototype.age = 18
// function Child(name){
//   Parent.call(this,name)
//   this.gender = 'nan'
// }
// Child.prototype = new Parent()
// Child.prototype.constructor = Child
// const c1 = new Child('lisi')
// c1.sayName()
// console.log(c1.age);

// const parent = {
//   name:'zhangsan',
//   sayName:function(){
//     console.log(this.name,this);
//   }
// }

// function createObj(obj,props={}){
//   function Parent(){}
//   Parent.prototype = obj
//   const p = new Parent()
//   Object(p,props)
//   return p
// }
// const c1 = createObj(parent);
// c1.sayName()

// const parent = {
//   name:'zhangsan',
//   sayName:function(){
//     console.log(this.name,this);
//   }
// }

// function createObj(obj,props={}){
//   const cloneObj = Object.create(obj)
//   Object(cloneObj,props)
//   cloneObj.age = 18
//   return cloneObj
// }
// const c1 = createObj(parent);
// c1.sayName()
// console.log(c1.age);

/* 回溯算法框架 */
// state 表示问题的当前状态，choices 表示当前状态下可以做出的选择：
function backtrack(state, choices, res) {
    // 判断是否为解
    if (isSolution(state)) {
        // 记录解
        recordSolution(state, res);
        // 不再继续搜索
        return;
    }
    // 遍历所有选择
    for (let choice of choices) {
        // 剪枝：判断选择是否合法
        if (isValid(state, choice)) {
            // 尝试：做出选择，更新状态
            makeChoice(state, choice);
            backtrack(state, choices, res);
            // 回退：撤销选择，恢复到之前的状态
            undoChoice(state, choice);
        }
    }
}

