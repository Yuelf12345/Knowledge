// 带缓存的斐波那契数列
{
    function fibonacciCache() {
        var cache = {};
        function fib(n) {
            if (n <= 1) return n;
            if (cache[n]) return cache[n];
            const res = fib(n - 1) + fib(n - 2);
            cache[n] = res;
            return res
        }
        return fib
    }
    const fibonacci = fibonacciCache();
    // console.log(fibonacci(10));
}

// 防抖
{
    function debounce(fn, delay) {
        let timer
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
}

// 节流
{
    function throttle(fn, delay) {
        let timer
        return function (...args) {
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(this, args)
                    timer = null
                }, delay)
            }
        }
    }
}

// 数组扁平化
{
    function flat(arr, deep) {
        if (deep <= 0) return arr
        return arr.reduce((pre, cur) => {
            return pre.concat(Array.isArray(cur) ? flat(cur, deep - 1) : cur)
        }, [])
    }
    const arr = [1, [2, [3, [4]]], 5, [6, [7]], 8]
    // console.log(arr.flat(2));
    // console.log(flat(arr, 2));
}

// new方法
{
    function Person(name) {
        this.name = name
    }
    function myNew(fn, ...args) {
        const obj = {}
        obj.__proto__ = fn.prototype
        const res = fn.apply(obj, args)
        return typeof res === 'object' ? res : obj
    }
    const p1 = new Person('张三')
    const p2 = myNew(Person, '李四')
    // console.log(p1);
    // console.log(p2);
}

// apply,call,bind
{
    const obj = {
        name: '张三',
        fn: function (...arg) {
            console.log(this.name, arg);
        }
    }
    const obj2 = {
        name: '李四'
    }
    Object.prototype.myCall = function (ctx, ...args) {
        ctx = ctx || window
        const temp = Symbol()
        ctx[temp] = this
        const res = ctx[temp](...args)
        delete ctx[temp]
        return res
    }
    Object.prototype.myApply = function (ctx, args) {
        ctx = ctx || window
        const temp = Symbol()
        ctx[temp] = this
        const res = ctx[temp](...args)
        delete ctx[temp]
        return res
    }
    Object.prototype.myBind = function (ctx, ...args) {
        ctx = ctx || window
        const temp = Symbol()
        ctx[temp] = this
        return function (...args2) {
            const res = ctx[temp](...args, ...args2)
            delete ctx[temp]
            return res
        }
    }
    const fn = obj.fn.myBind(obj2, 18, '男')
    // fn(1)
}

// 深拷贝
{
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

    function deepClone(obj) {
        if (typeof obj !== 'object') return obj
        if (obj === null) return obj
        if (obj instanceof Map) return new Map(obj)
        if (obj instanceof Set) return new Set(obj)
        if (obj instanceof Date) return new Date(obj)
        if (obj instanceof RegExp) return new RegExp(obj)

        const newObj = Array.isArray(obj) ? [] : {}
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    newObj[key] = deepClone(obj[key])
                } else {
                    newObj[key] = obj[key]
                }
            }
        }
        return newObj
    }
    // console.log(deepClone(obj));
}

// 链表
{
    class ListNode {
        constructor(value, next) {
            this.value = value != undefined ? value : 0
            this.next = next != undefined ? next : null
        }
    }

    function reverse(node) {
        let pre = null
        let cur = node
        while (cur) {
            const next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        }
        return pre
    }
    // pre cur next
    // null 1   2    1->null,2
    //  1   2   3    2->1, 3
    const n1 = new ListNode(1);
    n2 = new ListNode(2);
    n3 = new ListNode(3);
    n4 = new ListNode(4);
    n1.next = n2;
    n2.next = n3;
    n3.next = n4;
    // console.log(n1);
    // console.log(reverse(n1));
}

// 树
{
    class Tree {
        constructor(value) {
            this.value = value
            this.left = null
            this.right = null
        }

        levelOrder() {
            let res = []
            let queue = [this];
            while (queue.length) {
                const node = queue.shift()
                res.push(node.value)
                if (node.left) queue.push(node.left)
                if (node.right) queue.push(node.right)
            }
            return res
        }

        dfs(node, type, res) {
            if (!node) return
            if (type === 'pre') res.push(node.value)
            this.dfs(node.left, type, res)
            if (type === 'in') res.push(node.value)
            this.dfs(node.right, type, res)
            if (type === 'post') res.push(node.value)
        }

        preOrder() {
            const res = []
            this.dfs(this, 'pre', res)
            return res
        }
        inOrder() {
            const res = []
            this.dfs(this, 'in', res)
            return res
        }
        postOrder() {
            const res = []
            this.dfs(this, 'post', res)
            return res
        }
        reverse() {
            function handler(node) {
                if (!node) return
                const temp = node.right
                node.right = node.left
                node.left = temp
                handler(node.left)
                handler(node.right)
            }
            handler(this)
            return this
        }
    }
    /**
     *       1
     *     2   3
     *    4 5 6
     */
    const tree = new Tree(1);
    tree.left = new Tree(2);
    tree.right = new Tree(3);
    tree.left.left = new Tree(4);
    tree.left.right = new Tree(5);
    tree.right.left = new Tree(6);
    // console.log(tree);
    // console.log(tree.levelOrder()); // [ 1, 2, 3, 4, 5, 6 ]
    // console.log(tree.preOrder()); // [ 1, 2, 4, 5, 3, 6 ]
    // console.log(tree.inOrder());    // [ 4, 2, 5, 1, 6, 3 ]
    // console.log(tree.postOrder());  //[ 4, 5, 2, 6, 3, 1 ]
    // console.log(tree.reverse());
}

// promise
{
    Promise.myAll = function (arr) {
        return new Promise((reslove, reject) => {
            let index = 0
            let result = []
            for (let promise of arr) {
                Promise.resolve(promise).then((res) => {
                    result[index] = res
                    index++
                    if (index === arr.length) {
                        reslove(result)
                    }
                }, reject)
            }
            if (index === 0) {
                reslove(result)
            }
        })
    }

    Promise.myAll([
        1,
        2,
        Promise.resolve(3),
        // MyPromise.reject(4),
        new Promise((resolve) =>
            setTimeout(() => {
                resolve(5);
            }, 1000)
        ),
    ]).then(
        (resolve) => {
            // console.log("[MyPromise.all([1, 2, 3]).resolve]:", resolve);
        },
        (reject) => {
            // console.log("[MyPromise.all([1, 2, 3]).reject]:", reject);
        }
    );
}

// 排序算法
{ }

// 大数相加
{
    function addBigNumbers(a, b) {
        let newA = BigInt(a);
        let newB = BigInt(b);
        return newA + newB;
    }
    function sum(a,b){
        let len = Math.max(a.length, b.length);
        a = a.padStart(len, '0');
        b = b.padStart(len, '0');
        let carry = 0;
        let result = '';
        for(let i = len - 1; i >= 0; i--){
            const sum = +a[i] + +b[i] + carry;
            const r = sum % 10; // 个位
            carry = Math.floor(sum / 10); // 十位
            result = r + result;
        }
        return carry ? carry + result : result;
    }
    // console.log(sum("12345678901234567890", "98765432109876543210"));//111111111011111111100n(正确)
    // console.log(addBigNumbers("12345678901234567890", "98765432109876543210"));//111111111011111111100n(正确)
    // console.log(12345678901234567890 + 98765432109876543210);//111111111011111110000(不正确)

}