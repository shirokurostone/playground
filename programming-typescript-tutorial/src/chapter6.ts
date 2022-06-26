// 6.1
{
    let a: number = 1
    let b: 1 = 2 as number
    let c: number | string = "string" as string
    let d: number = true as boolean
    let e: (number | string)[] = [1, 2, 3] as number[]
    let f: number[] = [1, 2, "str"] as (number | string)[]
    let g: { a: boolean } = { a: true }
    let h: { a: { b: [string] } } = { a: { b: [1] } } as { a: { b: [number | string] } }
    let i: (a: number) => string = ((b: number) => "str") as ((b: number) => string)
    let j: (a: number) => string = ((a: string) => "str") as ((a: string) => string)
    let k: (a: number | string) => string = ((a: string) => "str") as ((a: string) => string)
    enum E { X = 'X' }
    enum F { X = 'X' }
    let l: E.X = F.X
}

// 6.2
{
    type O = { a: { b: { c: string } } }
    type T1 = keyof O // "a"
    type T2 = keyof O['a']['b'] // "c"
}

// 6.3
{
    type Exclusive<T, U> = (T extends T & U ? never : T) | (U extends T & U ? never : U)
    type a = Exclusive<1 | 2 | 3, 2 | 3 | 4>
    // = (1|2|3) extends ((1|2|3) & (2|3|4)) ? never : T | (2|3|4) extends ((1|2|3) & (2|3|4)) ? never : U
    // = (1|2|3) extends (2|3) ? never : T | (2|3|4) extends (2|3) ? never : U
    // =  (1 extends (2|3) ? never : 1 |
    //     2 extends (2|3) ? never : 2 |
    //     3 extends (2|3) ? never : 3 )
    //   |(2 extends (2|3) ? never : 2 |
    //    (3 extends (2|3) ? never : 3 |
    //    (4 extends (2|3) ? never : 4)
    // = ( 1 | never | never ) | ( never | never | 4 )
    // = 1 | 4
}

