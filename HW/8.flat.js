function myFlat(arr, depth = 1) {
    let result = [];
    const flatten = (array,dep) =>{
        for(let i=0;i<array.length;i++){
            if(Array.isArray(array[i]) && dep>0){
                flatten(array[i],dep-1)
            }else{
                result.push(array[i])
            }
        }
    }

    flatten(arr,depth)
    return result
};

// 使用示例：
let arr = [1, [2, [3, [4]], 5]];
console.log(myFlat(arr));