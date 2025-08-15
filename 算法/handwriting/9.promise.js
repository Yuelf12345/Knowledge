// const p1 = new Promise((resolve, reject) => {
//   // resolve("p1 成功");
//   // reject("p1 失败");
//   setTimeout(() => reject("p1 延时 失败"), 1000);
// });
// console.log(p1);
// p1.then(
//   (res) => {
//     console.log("p1 then:==>", res);
//   },
//   (rej) => {
//     console.log("p1 catch:==>", rej);
//   }
// ).then((res) => {
//   console.log("p1 then2:==>", res);
// });

// then 穿透测试
// Promise.resolve('成功')
// .then()
// .then(null,undefined)
// // .then(()=>{return 123})
// .then((res) => {
//   console.log("then 穿透测试:==>", res);
// });

PENDING = "pending";
FUFILLED = "fufilled";
REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.result = undefined;
    this.onFufilledCbs = [];
    this.onRejectedCbs = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.changeState(REJECTED, error);
    }
  }
  changeState(newState, value) {
    if (this.state !== PENDING) return;
    this.state = newState;
    this.result = value;
    if (this.state === FUFILLED) {
      // 实际要放在微任务中，这里为了方便，直接放在同步代码中
      this.onFufilledCbs.forEach((cb) => cb(this.result));
      // this.asyncTask(() => this.onFufilledCbs.forEach((cb) => cb(this.result)));
    }
    if (this.state === REJECTED) {
      // this.onRejectedCbs.forEach((cb) => cb(this.result));
      this.asyncTask(() => this.onRejectedCbs.forEach((cb) => cb(this.result)));
    }
  }
  resolve(value) {
    this.changeState(FUFILLED, value);
  }
  reject(reason) {
    this.changeState(REJECTED, reason);
  }
  then(onFufilled, onRejected) {
    onFufilled =
      typeof onFufilled === "function" ? onFufilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    return new MyPromise((resolve, reject) => {
      const handler = (fn, arg) => {
        try {
          const res = fn(arg);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      };
      if (this.state === FUFILLED) {
        handler(onFufilled, this.result);
      } else if (this.state === REJECTED) {
        handler(onRejected, this.result);
      } else {
        console.log("pending数据");
        this.onFufilledCbs.push((value) => handler(onFufilled, value));
        this.onRejectedCbs.push((reason) => handler(onRejected, reason));
      }
    });
  }
  catch(onRejected) {
    this.then(null, onRejected);
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let result = [];
      for (const promise of promises) {
        MyPromise.resolve(promise).then((res) => {
          result[count] = res;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        }, reject);
      }
      if (count === 0) {
        resolve(result);
      }
    });
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (const promise of promises) {
        MyPromise.resolve(promise).then(resolve, reject);
      }
    });
  }
  asyncTask(fn) {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(fn);
    } else if (
      typeof MutationObserver === "function" &&
      typeof document === "object"
    ) {
      const observer = new MutationObserver(fn);
      const hiddenDiv = document.createElement("div");
      hiddenDiv.style.display = "none";
      observer.observe(hiddenDiv, { attributes: true });
      hiddenDiv.setAttribute("data-dummy", 1);
    } else {
      setTimeout(fn, 0);
    }
  }
}

function test1() {
  // 测试1: 异步then
  const m1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("异步 成功");
    }, 500);
  });
  console.log("m1", m1);
  m1.then((res) => {
    console.log("[测试1异步then]:", res);
  });

  // 测试2: 穿透then
  m1.then()
    .then(null, undefined)
    .then((res) => {
      console.log("[测试2穿透then]:", res);
    });

  // 其他属性
  MyPromise.resolve(1).then((res) => {
    console.log("[MyPromise.resolve(1).then]:", res);
  });
  MyPromise.all([
    1,
    2,
    MyPromise.resolve(3),
    // MyPromise.reject(4),
    new MyPromise((resolve) =>
      setTimeout(() => {
        resolve(5);
      }, 1000)
    ),
  ]).then(
    (resolve) => {
      console.log("[MyPromise.all([1, 2, 3]).resolve]:", resolve);
    },
    (reject) => {
      console.log("[MyPromise.all([1, 2, 3]).reject]:", reject);
    }
  );
  MyPromise.race([
    new MyPromise((resolve) =>
      setTimeout(() => {
        resolve(1);
      }, 1000)
    ),
    new MyPromise((resolve) =>
      setTimeout(() => {
        resolve(2);
      }, 500)
    ),
    // 3,
    // MyPromise.reject(4),
  ]).then(
    (resolve) => {
      console.log("[MyPromise.race([1, 2, 3]).resolve]:", resolve);
    },
    (reject) => {
      console.log("[MyPromise.race([1, 2, 3]).reject]:", reject);
    }
  );
}
// test1()

const p1 = new MyPromise((resolve) => resolve(1));
console.log("异步", p1);
