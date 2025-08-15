const arr = [1, [2, [3, 4, [11]]], [5, 6], 7];

function myFlat(arr, depth) {
  if (depth === 0) {
    return arr;
  }
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      return pre.concat(myFlat(cur, depth - 1));
    } else {
      return pre.concat(cur);
    }
  }, []);
}

console.log(myFlat(arr, 1)); // 输出: [1, 2, [3, 4]]
console.log(myFlat(arr, 2)); // 输出: [1, 2, 3, 4]
console.log(myFlat(arr, Infinity)); // 输出: [1, 2, 3, 4]
