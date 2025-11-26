function longestPalindrome(s: string): string {
    let res = '';
    for (let i = 0; i < s.length; i++) {
        const s1 = h(i, i, s)
        const s2 = h(i, i + 1, s)
        const r = (s1.length > s2.length) ? s1 : s2
        res = (res.length > r.length) ? res : r
    }
    return res
};

function h(l: number, r: number, s: string): string {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        l--;
        r++
    }
    return s.slice(l + 1, r)
}

console.log(longestPalindrome("babad")); // bab aba
// console.log(longestPalindrome("cbbd")); // bb
