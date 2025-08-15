class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function insert(val, node) {
  const n = val.next;
  val.next = node;
  node.next = n;
}

function remove(node) {
  if (!node.next) return;
  const nextNode = node.next;
  const n = nextNode.next;
  node.next = n;
}

function access(node, index) {
  while (index--) {
    node = node.next;
  }
  return node;
}

function find(node, val) {
  let index = 0;
  while (node) {
    if (node.val === val) return index;
    node = node.next;
    index += 1;
  }
  return -1;
}
/**
  步骤	pre	cur	next	操作后链表片段
  1	null	1	2	1 -> null, 2 -> 3 -> 4
  2	1	2	3	2 -> 1 -> null, 3 -> 4
  3	2	3	4	3 -> 2 -> 1 -> null, 4
  4	3	4	null	4 -> 3 -> 2 -> 1 -> null
 */
// function reverse(node) {
//   let pre = null;
//   let cur = node;
//   while (cur) {
//     let next = cur.next;
//     cur.next = pre;
//     pre = cur;
//     cur = next;
//   }
//   return pre;
// }
/**
  将下一个节点的 next 指向当前节点
  将当前节点的 next 设为 null
 */
function reverse(node) { 
  if(!node || !node.next) return node;
  const newHead = reverse(node.next);
  node.next.next = node;
  node.next = null
  return newHead;  
}

const n1 = new ListNode(1);
n2 = new ListNode(2);
n3 = new ListNode(3);
n4 = new ListNode(4);
n1.next = n2;
n2.next = n3;
n3.next = n4;
console.log(n1);

const n5 = new ListNode(5);
insert(n1, n5);
remove(n1);
console.log(n1);
console.log(find(n1, 3));
console.log(access(n1, 2));
console.log(reverse(n1));
