// 原始的多参数函数
function add(a, b, c) {
    return a + b + c;
  }
  
  // 使用柯里化技术改造后的函数
  function curriedAdd(a) {
    return function(b) {
      return function(c) {
        return a + b + c;
      };
    };
  }
  
  // 使用柯里化后的函数
  let add5 = curriedAdd(1);
  let result1 = add5(2)(3); // 输出6
  console.log(result1);
  let addFrom5 = curriedAdd(5)(/* 省略第二个参数 */);
  let result2 = addFrom5(3); // 输出8