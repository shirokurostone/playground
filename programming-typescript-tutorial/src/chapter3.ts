// 1
{
    let a = 1024 // number
    let b = 'apples and oranges' // string
    const c = 'pineapples' // 'pineapples'
    let d = [true, true, false] // boolean[]
    let e = { type: 'ficus' } // {type: string}
    let f = [1, false] // (number | boolean)[]
    const g = [3] // number[]
    let h = null // any
}

// 2
{
    //a
    let i: 3 = 3 // リテラル型3にリテラル型4を代入しようとしているのでNG
    i = 4

    //b
    let j = [1, 2, 3] // number[]にリテラル型'5'を追加しようとしているのでNG
    j.push(4)
    j.push('5')

    //c
    let k: never = 4 // never型には代入できない

    //d
    let l: unknown = 4 // unknown型を参照するときには型の判定が必要
    let m = l * 2
}
