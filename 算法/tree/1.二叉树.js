class Tree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // 广度优先
  levelOrder() {
    let res = [];
    let queue = [this];
    while (queue.length) {
      let node = queue.shift(); // 取出队列的第一个节点
      if (node) {
        res.push(node.value);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
    return res;
  }

  // 前序遍历
  preOrder() {
    let res = [];
    function dfs(node) {
      if (!node) return;
      res.push(node.value);
      dfs(node.left);
      dfs(node.right);
    }
    dfs(this);
    return res;
  }
  // 中序遍历
  inOrder() {
    let res = [];
    function dfs(node) {
      if (!node) return;
      dfs(node.left);
      res.push(node.value);
      dfs(node.right);
    }
    dfs(this);
    return res;
  }
  // 后序遍历
  postOrder() {
    let res = [];
    function dfs(node) {
      if (!node) return;
      dfs(node.left);
      dfs(node.right);
      res.push(node.value);
    }
    dfs(this);
    return res;
  }

  // 翻转
  reverse() {
    function handler(node) {
      if (!node) return;
      let temp = node.left;
      node.left = node.right;
      node.right = temp;
      // 递归翻转左右子树
      handler(node.left);
      handler(node.right);
    }
    handler(this);
    return this;
  }
}
/**
 *       1
 *      / \
 *    2    3
 *   / \    \
 *  4   5    6
 */
const tree = new Tree(1);
tree.left = new Tree(2);
tree.right = new Tree(3);
tree.left.left = new Tree(4);
tree.left.right = new Tree(5);
tree.right.left = new Tree(6);
console.log(tree);
console.log(tree.levelOrder()); // [ 1, 2, 3, 4, 5, 6 ]
console.log(tree.preOrder());   // [ 1, 2, 4, 5, 3, 6 ]
console.log(tree.inOrder());    // [ 4, 2, 5, 1, 6, 3 ]
console.log(tree.postOrder());  //[ 4, 5, 2, 6, 3, 1 ]
console.log(tree.reverse());
