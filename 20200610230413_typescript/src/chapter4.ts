// 4.1
// 戻り値の型
// 4.2
// 型安全ではない。レストパラメータが使用可能

// 4.3
type Reserversion = {
    from: Date,
    to: Date,
    destination: string
} | null

type Reserve = {
    (from: Date, to: Date, destination: string): Reserversion
    (from: Date, destination: string): Reserversion
    (destination: string): Reserversion
}

let reserve: Reserve = (fromOrDestination: Date | string, toOrDestination?: Date | string, destination?: string) => {
    if (fromOrDestination instanceof Date && toOrDestination instanceof Date && destination !== undefined) {
        return { from: fromOrDestination, to: toOrDestination, destination: destination }
    } else if (fromOrDestination instanceof Date && typeof toOrDestination === 'string') {
        return { from: fromOrDestination, to: fromOrDestination, destination: toOrDestination }
    } else if (typeof fromOrDestination === 'string') {
        let now = new Date()
        return { from: now, to: now, destination: fromOrDestination }
    }
    return null
}

// 4.4
function call<T, U extends unknown[], R>(
    f: (arg1: T, arg2: string, ...args: U) => R,
    arg1: T,
    arg2: string,
    ...args: U
): R {
    return f(arg1, arg2, ...args)
}

function fill(length: number, value: string): string[] {
    return Array.from({ length }, () => value)
}

call(fill, 10, 'a')

// 4.5
type assert = <T>(...args: T[]) => boolean
let is: assert = <T>(...args: T[]) => {
    return args.every((i) => args[0] === i);
}

is('string', 'otherstring')
is(true, false)
is(42, 42)
is(10, 'foo')
