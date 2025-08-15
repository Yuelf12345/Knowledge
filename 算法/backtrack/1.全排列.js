function backtrack(state, choices, selected, res) {
    // 检查是否为解
    if(state.length === choices.length){
      res.push([...state])
      return
    }
    // 遍历所有选择
    choices.forEach((choice,index)=>{
      // 剪枝：检查选择是否合法
      if(!selected[index]){
        // 尝试：做出选择，更新状态
        selected[index] = true
        state.push(choice)
        // 进行下一轮选择
        backtrack(state,choices,selected,res)
        // 回退
        selected[index] = false
        state.pop()
      }
    })
}

function permutations(arr) {
  let res = [];
  // 直至目前已被选择的元素，输入数组中的所有元素，频道是否已选过，返回结果
  backtrack([], arr, Array(arr.length).fill(false), res);
  return res;
}

console.log(permutations([1]));
console.log(permutations([1, 2]));
console.log(permutations([1, 2, 3]));
