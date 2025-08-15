/* 数组表示下的二叉树类 */
class ArrayBinaryTree {
  #tree;

  /* 构造方法 */
  constructor(arr) {
    this.#tree = arr;
  }

  /* 层序遍历 */
  levelOrder() {
    let res = [];
    for (let i = 0; i < this.#tree.length; i++) {
      if (this.#tree[i] !== null) res.push(this.#tree[i]);
    }
    return res;
  }

  // 当前节点值
  val(i) {
    if (i >= this.#tree.length || this.#tree[i] === null) return;
    return this.#tree[i];
  }
  left(i) {
    return i * 2 + 1;
  }
  right(i) {
    return i * 2 + 2;
  }

  #dfs(i, order, res) {
    if (this.#tree[i] === null) return;
    if (order === "pre") res.push(this.#tree[i]); // 前
    this.#dfs(this.left(i), order, res);
    if (order === "in") res.push(this.#tree[i]); // 中
    this.#dfs(this.right(i), order, res);
    if (order === "post") res.push(this.#tree[i]); // 后
  }

  /* 前序遍历 */
  preOrder() {
    let res = [];
    this.#dfs(0, "pre", res);
    return res;
  }

  /* 中序遍历 */
  inOrder() {
    let res = [];
    this.#dfs(0, "in", res);
    return res;
  }

  /* 后序遍历 */
  postOrder() {
    let res = [];
    this.#dfs(0, "post", res);
    return res;
  }
}

// 创建一个测试用的二叉树数组
// 对应的二叉树结构如下：
//       1
//      / \
//     2   3
//    / \   \
//   4   5   6
//  /
// 7

const arr = [1, 2, 3, 4, 5, null, 6, 7];
const tree = new ArrayBinaryTree(arr);
// 测试遍历
console.log("\n遍历测试:");
console.log("层序遍历:", tree.levelOrder()); // [1, 2, 3, 4, 5, 6, 7]
console.log("前序遍历:", tree.preOrder()); // [1, 2, 4, 7, 5, 3, 6]
console.log("中序遍历:", tree.inOrder()); // [7, 4, 2, 5, 1, 3, 6]
console.log("后序遍历:", tree.postOrder()); // [7, 4, 5, 2, 6, 3, 1]
