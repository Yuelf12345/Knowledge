   class GenericNumber2<T extends {age:number}> {
    zeroValue: T;
    constructor(zero: T) {
        this.zeroValue = zero;
    }
    }
    let myGenericNumber2 = new GenericNumber2<{age:number}>({age:1});