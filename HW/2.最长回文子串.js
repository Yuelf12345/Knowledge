const str1 = 'abcbc'
const str2 = 'abccba'
const str3 = 'acabbaui'

const s = (str) => {
    if (str.length <= 1) return str;
    let start = 0;
    let end = 0;
    for (let i = 0; i < str.length; i++) {
        let len1 = u(i, i, str)
        let len2 = u(i, i + 1, str)
        let len = Math.max(len1, len2)
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2)
            end = i + Math.ceil(len / 2)
        }
    }
    return str.substring(start, end + 1)
}

const u = (left, right, str) => {
    while (left >= 0 && right < str.length && str[left] == str[right]) {
        left--;
        right++;
    }
    return right - left - 1
}

console.log(s(str1));
console.log(s(str2));
console.log(s(str3));