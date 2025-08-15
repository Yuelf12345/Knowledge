const m = new Map();
m.set("a", 1);
const obj = {
  a: 1,
  b: "2",
  c: true,
  d: [1, 2, 3, , 5, { obj: { x: 1, y: 2, arr: [1, 2, 3] } }],
  e: { a: 1, b: 2 },
  f: function () {
    return "f";
  },
  g: Symbol(),
  h: new Date(),
  i: /\d+/,
  m: m,
  s: new Set([1, 2, 3]),
  n: null,
  u: undefined,
  v: NaN,
  w: Infinity,
  o: {
    x: {
      y: {
        arr: [1, 2, 3],
        z: 1,
      },
    },
  },
};
obj.self = obj;

/**
 * 浅拷贝：只复制对象的第一层属性
 *    1.Object.assign({}, original)
 *    2.{ ...original }
 *    3.Array.prototype.slice()
 *    3.Array.prototype.slice()
 * 深拷贝：递归复制对象的所有层级属性
 *    1.JSON.parse(JSON.stringify())
 */

/**
 *  函数丢失、Symbol 类型丢失、 undefined 值丢失
 *  Date 对象序列化问题、RegExp 对象序列化问题
 *  NaN/Infinity/稀疏数组 变成 null
 *  Map、Set 等复杂数据结构丢失
 */
// const obj2 = JSON.parse(JSON.stringify(obj));
// console.log(obj2);

/**
 * 
 * @param {*} obj 源对象
 * @param {*} wm 缓存对象
 * @returns 
 */
function deepClone(obj, wm = new WeakMap()) {
  // 基础数据类型
  if(obj && typeof obj !== 'object') return obj;

   // 处理循环引用 - 防止栈溢出
  if (wm.has(obj)) {
    return wm.get(obj); // 返回已拷贝的对象引用
  }

  // 特殊数据类型
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof RegExp) return new RegExp(obj)
  // if(obj instanceof Set) return new Set(obj)
  if(obj instanceof Set){
    const res = new Set();
    wm.set(obj, res)
    for (const item of obj) {
      res.add(deepClone(item, wm))
    }
    return res
  }
  // if(obj instanceof Map) return new Map(obj)
  if(obj instanceof Map){
    const res = new Map()
    wm.set(obj, res)
    for (const [key, value] of obj) {
      res.set(key, deepClone(value, wm))
    }
    return res
  }
  // 引用数据类型
  const res = Array.isArray(obj) ? [] : {};
  wm.set(obj, res);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if(obj[key] && typeof obj[key] === 'object'){
        res[key] = deepClone(obj[key], wm)
      }else{
        res[key] = obj[key]
      }
    }
  }
  return res
}
const obj3 = deepClone(obj);
console.log('obj3',obj3);
console.log('obj',obj);

