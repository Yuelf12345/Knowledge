/**
 * 
    将该方法挂载到函数原型上
    当指向对象不存在时,默认指向window
    用一个临时方法fn保存当前函数this
    调用该方法(隐式改变this指向),获取返回值res
    删除临时方法fn
    返回res
 */
Function.prototype.myCall = function myCall(context, ...args) {
    context = context || window;
    context.temporary = this;
    let res = context.temporary(...args);
    delete context.temporary;
    return res;
}
Function.prototype.myApply = function myApply(context, argsArr) {
    context = context || window;
    argsArr = argsArr || [];
    context.temporary = this;
    let res = context.temporary(...argsArr);
    delete context.temporary;
    return res;
}

Function.prototype.myBind = function myBind(context, ...args) {
    context = context || window;
    context.temporary = this;
    return function (...args) {
        let res = context.temporary(...args);
        delete context.temporary;
        return res;
    }
}

function greet(message) {
    console.log(`${message}, ${this.name}`);
}
const person = {
    name: 'Carol'
};

greet.myCall(person, 'Hello'); // 输出 "Hi, Bob"
greet.myApply(person, ['Hi']); // 输出 "Hi, Bob"
const greetPerson = greet.myBind(person);
greetPerson('Hey'); // 输出 "Hey, Carol"
