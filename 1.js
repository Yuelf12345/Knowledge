const flat = (arr, depth) => {
    let res = [];
    helper = (arr, depth = 1) => {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i]) && depth > 0) {
                helper(arr[i], depth - 1);
            } else {
                res.push(arr[i]);
            }
        }
    }
    helper(arr, depth)
    return res;
}



console.log(flat([1, [2, [3, [4]]]], 2));
console.log(flat([1, [2, [3, [4]]]], 4));