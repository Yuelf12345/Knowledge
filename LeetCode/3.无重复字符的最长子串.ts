function lengthOfLongestSubstring(s: string): number {
    const map = new Map()
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            maxLen = Math.max(maxLen, (i - map.get(s[i])))
        }
        map.set(s[i], i)
    }
    return maxLen
};

console.log(lengthOfLongestSubstring("pwwkew"));
