// 作用域
// 1.全局作用域
var a = 1;
const obj = {
    show: () => {
        console.log(a);
    }
}
function show() {
    console.log(a);
}
// 全局作用域内的变量和函数可以在程序的任何地方被访问。
obj.show()
show()

// 2.局部作用域
function show2() {
    var b = 3;
    console.log(b);
}
// 函数内部声明的变量只能在这个函数内部访问
show2()
// console.log(b);

// 3.块级作用域
if (true) {
    let c = 4;
}
// 使用 let 和 const 声明的变量具有块级作用域，这意味着它们只在声明它们的块（如 {} 内部）内可见。
// console.log(c);

// 作用域链
function foo() {
    var c = 1;
    function bar() {
        console.log(c);
    }
    bar();
}
foo()
//JavaScript 引擎在某个作用域中寻找一个变量时，它首先会在该作用域的变量对象中查找，如果没找到，则会沿着作用域链向上一级作用域继续查找，直至全局作用域或者查找结束。