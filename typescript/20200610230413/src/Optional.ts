
interface Optional<T> {
    filter(predicate: (v: T) => boolean): Optional<T>
    flatMap<U>(mapper: (v: T) => Optional<U>): Optional<U>
    get(): T
    ifPresent(consumer: (v: T) => void): void
    ifPresent(): boolean
    map<U>(mapper: (v: T) => U): Optional<U>
    ofElse(other: T): T
    orElseGet(other: () => T): T
    orElseThrow(supplier: () => Error): T
}

class Some<T> implements Optional<T>{
    constructor(private value: T) {
        if (value === null) {
            throw new TypeError()
        }
    }

    filter(predicate: (v: T) => boolean): Optional<T> {
        if (predicate(this.value)) {
            return new None()
        }
        return new Some(null)
    }

    flatMap<U, V extends Optional<U>>(mapper: (v: T) => V): V {
        return mapper(this.value)
    }

    get(): T {
        return this.value
    }

    ifPresent(consumer: (v: T) => void): void
    ifPresent(): boolean
    ifPresent(consumer?: (v: T) => void): boolean {
        if (consumer !== undefined) {
            consumer(this.value)
            return
        }
        return true
    }

    map(mapper: (v: T) => null): None
    map<U>(mapper: (v: T) => U): Optional<U> {
        return Optional.ofNullable(mapper(this.value))
    }

    ofElse(other: T): T {
        return this.value
    }

    orElseGet(other: () => T): T {
        return this.value
    }

    orElseThrow(supplier: () => Error): T {
        return this.value
    }

}

class None implements Optional<null>{
    constructor() { }

    filter<T>(predicate: (v: T) => boolean): None {
        return this
    }

    flatMap<T, U>(mapper: (v: T) => Optional<U>): None {
        return this
    }

    get(): never {
        throw new TypeError();
    }

    ifPresent<T>(consumer: (v: T) => void): void
    ifPresent(): boolean
    ifPresent<T>(consumer?: (v: T) => void): boolean {
        if (consumer !== undefined) {
            return
        }
        return false
    }

    map<T, U>(mapper: (v: T) => U): None {
        return this
    }

    ofElse<T>(other: T): T {
        return other
    }

    orElseGet<T>(other: () => T): T {
        return other()
    }

    orElseThrow(supplier: () => Error): never {
        throw supplier()
    }

}

type OfNullable = {
    ofNullable<T>(value: T): Optional<T>
    ofNullable(value: null): None
}

let Optional = {
    empty(): None {
        return new None()
    },
    of<T>(value: T): Some<T> {
        if (value == null) {
            throw new TypeError()
        }
        return new Some(value)
    },
    ofNullable<T>(value: T): Optional<T> {
        if (value == null) {
            return new None()
        }
        return new Some(value)
    }
}