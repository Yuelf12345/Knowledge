/**
 * 给定一个正整数数组 nums 和一个目标正整数 target ，请找出所有可能的组合，使得组合中的元素和等于 target 。给定数组无 重复元素，每个元素可以被选取多次。请以列表形式返回这些组合，列表中不应包含重复组合。
 * 输入 nums = [3,4,5] target = 9
 * 输出 [3,3,4],[4,5]
 */

function sum(nums) {
  if (!nums.length) return 0;
  return nums.reduce((pre, cur) => pre + cur);
}
function backtrack(state, choices, target, res,start = 0) {
  if (sum(state) === target) {
    res.push([...state]);
    return;
  }
  // choices.forEach((choice, index) => {
  //   if (sum(state) < target) {
  //     state.push(choice);
  //     backtrack(state, choices, target, res);
  //     state.pop();
  //   }
  // });
  for(let i = start; i < choices.length; i++){
    if(sum(state) < target){
      state.push(choices[i])
      backtrack(state, choices, target, res,i)
      state.pop()
    }
  }
}

function subsetSumINaive(nums, target) {
  const res = [];
  backtrack([], nums, target, res);
  return res;
}
console.log(subsetSumINaive([3, 4, 5], 9));
