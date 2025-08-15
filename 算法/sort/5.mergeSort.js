function merge(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  function handler(left, right) {
    const res = [];
    while (left.length && right.length) {
      let min;
      if (left[0] < right[0]) {
        min = left.shift();
      } else {
        min = right.shift();
      }
      res.push(min);
    }
    // 将剩余元素添加到结果中
    return res.concat(left).concat(right);
  }
  return handler(merge(left), merge(right));
}

console.log(merge([4, 1, 3, 1, 5, 2]));
