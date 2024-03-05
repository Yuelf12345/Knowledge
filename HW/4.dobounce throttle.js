function debounce(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn().call(this, ...args);
        }, delay);
    }
}

function throttle(fn, delay) {
    let timer;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn.call(this, ...args);
                timer = null;
            }, delay);
        }
    }
}

function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function () {
    console.log(this.name + " makes a sound.");
}

console.log(Animal.prototype.constructor == Animal);

let cat = new Animal("Kitty");
cat.speak(); // 输出 "Kitty makes a sound."