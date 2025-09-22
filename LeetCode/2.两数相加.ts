/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 *  输入：l1 = [2,4,3], l2 = [5,6,4] 输出：[7,0,8] 解释：342 + 465 = 807
    输入：l1 = [0], l2 = [0]  输出：[0]
    输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9] 输出：[8,9,9,9,0,0,0,1]
 */

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let pot = 0;
    let sum = new ListNode(0);
    let head = sum;
    while (pot || l1 || l2) {
        const add = (l1?.val || 0) + (l2?.val || 0) + pot
        pot = add >= 10 ? 1 : 0
        sum.next = new ListNode(add % 10)
        sum = sum.next
        if (l1) l1 = l1.next
        if (l2) l2 = l2.next
    }
    return head.next
    // return JSON.stringify(head.next)
};

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}
const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)))
// console.log(addTwoNumbers(l1, l2));
// console.log(addTwoNumbers(new ListNode(0), new ListNode(0)));
console.log(addTwoNumbers(new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))))), new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))))));
