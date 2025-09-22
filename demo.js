
Promise.resolve().then(() => {
    console.log(3);
})
setTimeout(() => {
    console.log(4);
})
console.log(1);
(async () => {
    console.log(2);
})()