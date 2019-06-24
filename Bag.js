const items = new WeakMap();
const iteratorRef = Symbol("ref");

// export default class Bag {
class Bag {
    constructor(iterable) {
        if(iterable) item[this] = [...iterable];
    }

    static get [Symbol.species]() { return Bag; } // WHAT!?

    add(value) {
        item[this].push(value);
        return true;
    }

    delete(value) {
        const index = item[this].indexOf(value);
        if(index === -1) return false;

        item[this].splice(index, 1);
        return true;
    }

    forEach(callback, thisArg) {
        item[this].forEach(v => {
            callback.call(thisArg, v, v, this);
        });
    }

    clear() {
        item[this] = [];
    }

    has(value) {
        return item[this].indexOf(value) !== -1;
    }

    values() {
        const iter = new BagIterator();
        iter[iteratorRef] = this;
        return iter;
    }

    size() {
        return item[this].length;
    }
}

Bag.prototype[Symbol.iterator] = Bag.prototype.values;
Bag.prototype[Symbol.toStringTag] = "Bag";

class BagIterator {
    constructor() {
        this.count = 0;
        this._infoObj = {done: false};
    }

    next() {
        const bag = this[iteratorRef];
        if(this.count < bag.size()) {
            this._infoObj.value = bag[items][this.count++];
        } else {
            this._infoObj.done = true;
            this._infoObj.value = undefined;
        }
        return this._infoObj;
    }
}

BagIterator.prototype[Symbol.toStringTag] = "Bag Iterator";
