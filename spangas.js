class SpanGas {    
//    static id = 0 // don't work

    constructor(conc, limit, name) {
        this.conc = conc
        this.limit = limit
        SpanGas.id++ 
        this.name = name || `SpanGas#${SpanGas.id}`
    }

    get min() {
        return this.conc - this.limit
    }

    get max() {
        return this.conc + this.limit
    }

    get len() {
        return this.max - this.min
    }

    static sort(gas1, gas2) {
        return gas1.min - gas2.min
    }

    isIntersect(gas1, gas2) {
        let temp = sort(gas1, gas2)
        if (temp[0].max >= temp[1].min) {
            return true
        }
        return false
    }
}

SpanGas.id = 0


const g1 = new SpanGas(2.2, 0.1)
const g2 = new SpanGas(1.1, 0.05)
const g3 = new SpanGas(4.4, 0.1)
console.log(g1, g2, g3)
console.log([g1, g2, g3].sort(SpanGas.sort))

module.exports = SpanGas
