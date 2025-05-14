const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N;
let arr = [];

rl.on("line", (line) => {
    if (!N) N = Number(line);
    else {
        arr.push(Number(line));
        if (arr.length === N) {
            solution(N, arr);
            rl.close();
        }
    }
});

class Heap {
    constructor() {
        this.heap = [null];
    }
    getParentIndex(index) {
        return Math.floor(index / 2);
    }
    getLeftIndex(index) {
        return index * 2;
    }
    getRightIndex(index) {
        return index * 2 + 1;
    }
    getSize() {
        return this.heap.length - 1;
    }
    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    push(value) {
        this.heap.push(value);
        this.up();
    }
    up() {
        let index = this.getSize();
        while (index > 1) {
            let parent = this.getParentIndex(index);
            if (this.heap[index] < this.heap[parent]) {
                this.swap(index, parent);
                index = parent;
            } else {
                break;
            }
        }
    }
    pop() {
        if (this.getSize() === 0) return null;
        if (this.getSize() === 1) return this.heap.pop();
        const value = this.heap[1];
        const lastNode = this.heap.pop();
        this.heap[1] = lastNode;
        this.down();
        return value;
    }
    down() {
        let index = 1;
        while (index <= this.getSize()) {
            let left = this.getLeftIndex(index);
            let right = this.getRightIndex(index);
            let min = index;

            if (left <= this.getSize() && this.heap[min] > this.heap[left]) {
                min = left;
            }
            if (right <= this.getSize() && this.heap[min] > this.heap[right]) {
                min = right;
            }
            if (min !== index) {
                this.swap(index, min);
                index = min;
            } else {
                break;
            }
        }
    }
}

function solution(N, arr) {
    if (N === 1) {
        console.log(0);
        return;
    }
    const heap = new Heap();

    for (const a of arr) {
        heap.push(a);
    }
    const temp = [];
    while (heap.getSize() > 1) {
        const m1 = heap.pop();
        const m2 = heap.pop();

        const newValue = m1 + m2;
        temp.push(newValue);
        heap.push(newValue);
    }
    let answer = temp.reduce((res, cur) => res + cur, 0);
    console.log(answer);
}
