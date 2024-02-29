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