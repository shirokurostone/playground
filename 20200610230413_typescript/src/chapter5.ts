
// 5.2
class ProtectedClass {
    protected constructor() {
    }
    static create(): ProtectedClass {
        return new ProtectedClass()
    }
}

class ChildProtectedClass extends ProtectedClass {
    constructor() {
        super()
    }
}

let a = new ProtectedClass() // MG
let b = ProtectedClass.create()
let c = new ChildProtectedClass()

// 5.3
type Shoe = { purpose: string }
class BalletFlat implements Shoe {
    purpose = 'dancing'
}
class Boot implements Shoe {
    purpose = 'woodcutting'
}
class Sneaker implements Shoe {
    purpose = 'walking'
}

type ShoeCreator = {
    create(type: 'balletFlat'): BalletFlat,
    create(type: 'woodcutting'): Boot,
    create(type: 'walking'): Sneaker,
}

let Shoe: ShoeCreator = {
    create: (type: 'balletFlat' | 'woodcutting' | 'walking') => {
        switch (type) {
            case 'balletFlat':
                return new BalletFlat()
            case 'woodcutting':
                return new Boot()
            case 'walking':
                return new Sneaker()
        }
    },
}

// 5.4
type MethodType = 'GET' | 'POST'
class RequestBuilder {
    protected data: object | null = null
    protected method: MethodType | null = null
    protected url: string | null = null

    setURL(url: string): RequestBuilderWithUrl {
        return new RequestBuilderWithUrl(url)
    }
}

class RequestBuilderWithUrl extends RequestBuilder {
    constructor(url: string) {
        super()
        this.url = url
    }

    setMethod(method: MethodType) {
        return new RequestBuilderWithUrlMethod(this.url, method)
    }
}

class RequestBuilderWithUrlMethod extends RequestBuilder {
    constructor(url: string, method: MethodType) {
        super()
        this.url = url
        this.method = method
    }

    setData(data: object): this {
        this.data = data
        return this
    }

    send(): void {
    }
}

let builder: RequestBuilder = new RequestBuilder()
builder.setURL('http://example.com/').setMethod("GET").send()