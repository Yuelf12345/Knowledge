let obj = {
    name: '张三',
    age: 18
}

let p = new Proxy(obj, {
    get(target, prop) {
        console.log(target, prop);
        return target[prop]
    },
    set(target, prop, value) {
        console.log(target, prop, value);
        target[prop] = value
        return true
    },
    deleteProperty(target, prop) {
        console.log(target, prop);
    }
})

console.log(p.name);
// p.age = 19
// p.denger = '男'
// delete p.age