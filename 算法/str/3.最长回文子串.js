function longCycleStr(str) {
  let maxLen = 0;
  let maxStr = "";
  const hander = (str, left, righr) => {
    while (left >= 0 && righr < str.length && str[left] === str[righr]) {
      left--;
      righr++;
    }
    return str.slice(left + 1, righr);
  }
  for (let i = 0; i < str.length; i++) {
    const len1 = hander(str, i, i)
    const len2 = hander(str, i, i + 1)
    if(len1.length > maxLen || len2.length > maxLen){
      maxLen = Math.max(len1.length, len2.length)
      maxStr = len1.length > len2.length ? len1 : len2
    }
  }
  return {
    maxLen,
    maxStr
  }
}

console.log(longCycleStr("abcbcdcbd")); // bcdcb 5
console.log(longCycleStr("uvuvvuvw")); // vuvvuv 6
