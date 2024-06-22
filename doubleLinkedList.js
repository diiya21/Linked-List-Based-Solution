class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.size++;
    }

    printForward() {
        let current = this.head;
        let str = 'null <-> ';
        while (current) {
            str = str + current.data + ' <-> ';
            current = current.next;
        }
        console.log(str + 'null');
    }

    deleteNthFromEnd(n) {
        if (n <= 0 || n > this.size) {
            return false;
        }

        let fast = this.head;
        let slow = this.head;

        for (let i = 0; i < n; i++) {
            fast = fast.next;
        }

        if (!fast) {
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
            this.size--;
            return true;
        }

        while (fast.next) {
            fast = fast.next;
            slow = slow.next;
        }

        let nodeToDelete = slow.next;
        slow.next = nodeToDelete.next;
        if (nodeToDelete.next) {
            nodeToDelete.next.prev = slow;
        } else {
            this.tail = slow;
        }

        this.size--;
        return true;
    }
}

function mergeSortedLists(list1, list2) {
    let dummy = new Node(0);
    let tail = dummy;
    let l1 = list1.head;
    let l2 = list2.head;

    while (l1 && l2) {
        if (l1.data < l2.data) {
            tail.next = l1;
            l1.prev = tail;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2.prev = tail;
            l2 = l2.next;
        }
        tail = tail.next;
    }

    tail.next = l1 || l2;
    if (tail.next) {
        tail.next.prev = tail;
    }

    let mergedList = new DoublyLinkedList();
    mergedList.head = dummy.next;
    if (mergedList.head) {
        mergedList.head.prev = null;
    }

    let current = mergedList.head;
    while (current && current.next) {
        current = current.next;
    }
    mergedList.tail = current;

    return mergedList;
}


const list1 = new DoublyLinkedList();
list1.append(1);
list1.append(3);
list1.append(5);

const list2 = new DoublyLinkedList();
list2.append(2);
list2.append(4);
list2.append(6);

const mergedList = mergeSortedLists(list1, list2);
mergedList.printForward();

const list = new DoublyLinkedList();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

list.deleteNthFromEnd(2);
list.printForward();
