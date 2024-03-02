var arr = [1, 2, 3, 4];
var obj = { };
[ ].push.apply(obj, arr);
console.log(obj);
