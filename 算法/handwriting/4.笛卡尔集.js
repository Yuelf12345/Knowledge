const keybordMap = (digits) => {
    const _compose = (str1, str2) => {
        if(!str1){
            return str2.split('')
        }
        const res = []
        for (let i = 0; i < str1.length; i++) {
            for (let j = 0; j < str2.length; j++) {
                res.push(str1[i] + str2[j])
            }
        }
        return res
    }
    const map = ['', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    const result = digits.split('').map((d) => map[d]).reduce(_compose, '')
    console.log(result);
    return result
}

keybordMap('234')
