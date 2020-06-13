// 10.1a
type Unit = 'EUR' | 'GBP' | 'JPY' | 'USD'
namespace Currency {
    export function from(value: number, unit: Unit): Currency {
        return {
            unit: unit,
            value
        }
    }
}

interface Currency {
    unit: Unit,
    value: number
}

let yen = Currency.from(2000, 'JPY')

// 10.1b
enum Language {
    JavaScript,
    TypeScript,
    Java,
}
namespace Language {
    export function fromExtention(ext: string): null | Language {
        switch (ext) {
            case 'js': return Language.JavaScript
            case 'ts': return Language.TypeScript
            case 'java': return Language.Java
        }
        return null
    }
}
let lang = Language.fromExtention('java')
