const items = Symbol("items");
const iteratorRef = Symbol("ref");

// export default class Bag {
class Bag {
    constructor(iterable) {
        if(iterator) this[items] = [...iterable];
    }

    static get [Symbol.species]() { return Set; }

    add(value) {
        this[items].push(value);
        return true;
    }

    delete(value) {
        const index = this[items].indexOf(value);
        if(index === -1) return false;

        this[items].splice(index, 1);
        return true;
    }

    forEach(callback, thisArg) {
        this[items].forEach(v => {
            callback.call(thisArg, v, v, this);
        });
    }

    clear() {
        this[items] = [];
    }

    has(value) {
        return this[items].indexOf(value) !== -1;
    }

    values() {
        return this[Symbol.iterator]();
    }

    size() {
        return this[items].length;
    }

    [Symbol.iterator]() {
        const iter = new BagIterator();
        iter[iteratorRef] = this;
        return iter;
    }

    toString() {
        return "[object Bag]"
    }
}


class BagIterator {
    constructor() {
        this.count = 0;
    }

    next() {
        if(this.count < this[iteratorRef].size()) {
            return { done: false, value: this[iteratorRef][items][this.count++] };
        } else {
            return { done: true };
        }
    }
}
