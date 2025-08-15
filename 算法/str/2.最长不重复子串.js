function lengthOfLongestSubstring(str) {
  let maxLength = 0;
  let left = 0;
  let map = new Map();
  let maxStr = '';
  for (let right = 0; right < str.length; right++) {
    const char = str[right];
    if (map.has(char)) {
      left = Math.max(left, map.get(char) + 1);
    }
    map.set(char, right);
    if (right - left + 1 > maxLength) {
      maxStr = str.slice(left, right + 1);
    }
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return {
    maxLength,
    maxStr
  };
}

console.log(lengthOfLongestSubstring("abcabcbb")); // abc 3
console.log(lengthOfLongestSubstring("abadefcbb")); // badefc 6
