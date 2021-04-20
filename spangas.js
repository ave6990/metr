class SpanGas {	
	constructor(c, t) {
		this.conc = c
		this.tolerance = t
	}

	get min() {
		return this.conc - this.tolerance
	}

	get max() {
		return this.conc + this.tolerance
	}

	get len() {
		return this.max - this.min
	}
}

const sort = (...span) => {
	return span.sort((x, y) => {
			return _fsort(x.min, y.min)
		})
}

const intersect = (gas1, gas2) = > {
	let temp = sort(gas1, gas2)
	if (temp[0].max >= temp[1].min) {
		return true
	}
	return false
}

const intersection = (...rng) => {
	temp = sort(rng)
}

const _fsort = () => {
	return (x, y) => {
		if (x<y) {
			return -1
		}
		else if (x>y) {
			return 1
		}
		else {
			return 0
		}
	}
}
