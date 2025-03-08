
class Store {
    constructor() {
        this.data = new Map();
    }

    set(key, value) {
        this.data.set(key, value);
    }

    get(key) {
        return this.data.get(key);
    }

    delete(key) {
        return this.data.delete(key);
    }

    clear() {
        this.data = new Map();
    }
}

module.exports = Store;