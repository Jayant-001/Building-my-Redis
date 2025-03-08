const fs = require("fs");
const PriorityQueue = require("./priority_queue.js");

class Database {
    constructor() {
        this.store = new Map();
        this.queue = new PriorityQueue();
    }

    setKeyExpire(key, expire) {
        const currentTime = Date.now();
        const expirationTime = currentTime + expire * 1000; // Convert seconds to milliseconds
        this.queue.push(expirationTime, key);
    }

    removeExpiredItems() {
        const currentTime = Date.now();
        while (this.queue.size() > 0 && this.queue.peek().time < currentTime) {
            this.store.delete(this.queue.peek().value);
            this.queue.pop();
        }
    }

    set(key, value) {
        this.store.set(key, value);
    }

    get(key) {
        return this.store.get(key);
    }

    delete(key) {
        this.store.delete(key);
    }

    exists(key) {
        return this.store.has(key);
    }

    clear() {
        this.store.clear();
    }

    saveSnapshot(filePath) {
        const data = JSON.stringify(Array.from(this.store.entries()), null, 2);
        fs.writeFileSync(filePath, data);
    }

    loadSnapshot(filePath) {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            const entries = JSON.parse(data);
            this.store = new Map(entries);
        }
    }
}

module.exports = Database;
