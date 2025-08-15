function fn(num) {
  // return num.toLocaleString();
  // return num.replace(/\B(?=(\d{3})+$)/g,',')
  let result = '';
  while (num) {
    result = (num % 1000).toString().padStart(3, '0') + ',' + result;
    num = Math.floor(num / 1000);
  }
  return result.slice(0, -1);
}

console.log(fn('123456789'));
