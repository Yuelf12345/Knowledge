const deepCopy = (obj) => {
    let newObj;
    if(Array.isArray(obj)){
        newObj = [];
        obj.forEach((i)=>{
            newObj.push(i)
        })
    }else if(typeof obj === 'object'){
        newObj = {};
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                if(typeof obj[key] === 'object'){
                    newObj[key] = deepCopy(obj[key]);
                }else{
                    newObj[key] = obj[key];
                }
            }
        }
    }
    return newObj;
}


let obj0 = {
    arr:['x','y'],
    obj:{
        a:1,
        b:2
    },
    fn:function(){
        console.log('obj0')
    }
}

let obj1 = deepCopy(obj0)

 obj0.obj.a = 10

console.log(obj0);
console.log(obj1);