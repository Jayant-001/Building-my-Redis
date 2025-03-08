class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    // Helper method to get the index of the parent node
    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    // Helper method to get the index of the left child node
    leftChild(index) {
        return 2 * index + 1;
    }

    // Helper method to get the index of the right child node
    rightChild(index) {
        return 2 * index + 2;
    }

    // Helper method to swap two elements in the heap
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // Push new item into the priority queue
    push(time, value) {
        const item = { time, value };
        this.heap.push(item);
        this._heapifyUp(this.heap.length - 1);
    }

    // Pop the item with the smallest time (top of the heap)
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);
        return root;
    }

    // Ensure the heap property is maintained after adding an item
    _heapifyUp(index) {
        let currentIndex = index;
        while (currentIndex > 0 && this.heap[currentIndex].time < this.heap[this.parent(currentIndex)].time) {
            this.swap(currentIndex, this.parent(currentIndex));
            currentIndex = this.parent(currentIndex);
        }
    }

    // Ensure the heap property is maintained after removing the top element
    _heapifyDown(index) {
        let currentIndex = index;
        let left = this.leftChild(currentIndex);
        let right = this.rightChild(currentIndex);
        let smallest = currentIndex;

        if (left < this.heap.length && this.heap[left].time < this.heap[smallest].time) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right].time < this.heap[smallest].time) {
            smallest = right;
        }

        if (smallest !== currentIndex) {
            this.swap(currentIndex, smallest);
            this._heapifyDown(smallest);
        }
    }

    // Peek at the top element
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    // Size of the heap
    size() {
        return this.heap.length;
    }

    // Remove expired items from the queue
    removeExpiredItems() {
        const currentTime = Date.now();
        while (this.heap.length > 0 && this.peek().time < currentTime) {
            this.pop();
        }
    }
}

module.exports = PriorityQueue;