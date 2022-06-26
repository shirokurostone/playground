// 8.1
type Promisify = {
    <A, T>(target: (arg: A, callback: (err: any, data: T) => void) => void): (arg: A) => Promise<T>
}

let promisify: Promisify = (target) => {
    return (arg) => {
        return new Promise((resolutionFunc, rejectionFunc) => {
            target(arg, (err, data) => {
                if (err) {
                    rejectionFunc(err)
                } else {
                    resolutionFunc(data)
                }
            })
        })
    }
}
