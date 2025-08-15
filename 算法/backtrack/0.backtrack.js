/**
 * 回溯的解题流程会因问题的性质和难度而有所不同，
 * 但通常遵循以下步骤：
 * 1. 定义递归函数，确定递归函数的参数和返回值。
 * 2. 符合条件时，记录结果。
 * 3. 遍历所有选择
 * 4. 剪枝：检查选择是否合法
 * 5. 尝试：做出选择，更新状态
 * 6. 进行下一轮选择
 * 7. 回退：撤销选择，恢复到之前状态
 *
 */
/**
 * @description 回溯算法 代码结构
 * @param {*} state 直至目前已被选择的元素
 * @param {*} choices 输入数组中的所有元素
 * @param {*} res 返回结果
 */
function backtrack(state, choices, res) {
  // 检查是否为解
  if (isSolution(state)) {
    // 记录解
    recordSolution(state, res);
  }
  // 遍历所有选择
  for (const choice of choices) {
    // 剪枝：检查选择是否合法
    if (isValid(state, choice)) {
      // 尝试：做出选择，更新状态
      makeChoice(state, choice);
      // 进行下一轮选择
      backtrack(state, [choice.left, choice.right], res);
      // 回退：撤销选择，恢复到之前的状态
      undoChoice(state);
    }
  }
}

/* 判断当前状态是否为解 */
function isSolution(state) {
  return state && state[state.length - 1]?.val === 7;
}

/* 记录解 */
function recordSolution(state, res) {
  res.push([...state]);
}

/* 判断在当前状态下，该选择是否合法 */
function isValid(state, choice) {
  return choice !== null && choice.val !== 3;
}

/* 更新状态 */
function makeChoice(state, choice) {
  state.push(choice);
}

/* 恢复状态 */
function undoChoice(state) {
  state.pop();
}

class Tree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  preOrder() {
    let res = [];
    // this.#dfs1(this, res);
    // this.#dfs2(this, [], res);
    this.#dfs3(this, [], res);
    return res;
  }

  #dfs1(node, res) {
    if (!node) return;
    if (node.value === 7) {
      res.push(node.value);
    }
    this.#dfs1(node.left, res);
    this.#dfs1(node.right, res);
  }

  #dfs2(node, path, res) {
    if (!node) return;
    path.push(node.value);
    if (node.value === 7) {
      res.push([...path]);
    }
    this.#dfs2(node.left, path, res);
    this.#dfs2(node.right, path, res);
    // 到达树底时 回退
    path.pop();
  }

  #dfs3(node, path, res) {
    if (!node || node?.value === 3) return;
    path.push(node.value);
    if (node.value === 7) {
      res.push([...path]);
    }
    this.#dfs3(node.left, path, res);
    this.#dfs3(node.right, path, res);
    // 到达树底时 回退
    path.pop();
  }
}
/**
 *       1
 *      / \
 *    2    3
 *   / \    \
 *  4   5    6
 *      \(7)/
 */
const tree = new Tree(1);
tree.left = new Tree(2);
tree.right = new Tree(3);
tree.left.left = new Tree(4);
tree.left.right = new Tree(5);
tree.right.left = new Tree(6);
tree.left.right.right = new Tree(7);
tree.right.left.left = new Tree(7);
console.log(tree);
console.log(tree.preOrder()); // [ 1, 2, 4, 5, 3, 6 ]

// 1. 搜索所有值为7的节点，请返回结果
// 2. 搜索所有值为7的节点，请返回根节点到这些节点的路径。
// 3. 搜索所有值为7的节点，请返回根节点到这些节点的路径，并要求路径中不包含值为3的节点。
