const arr = [1, 2, 3, 4];

const a = new Proxy(arr, {
  get(target, key, receiver) {
    console.log("get", target, key, receiver);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", target, key, value, receiver);
    return Reflect.set(target, key, value, receiver);
  },
});

a.length = 0;
