const rangeConverter = (s_min, s_max, d_min, d_max) => {
    return (value) => {
		return (value -s_min) * (d_max - d_min) / (s_max - s_min) + d_min
    }
}

const relativeError = (d_val, s_val) => {
    return (d_val - s_val) / s_val * 100
}

const reducedError = (d_val, s_val, n_val) => {
    return (d_val - s_val) / n_val * 100
}

const volumeToNc = (temp, pres) => {
	return (val) => {
		return val * pres * 293.2 /
			((273.2 + temp) * 101.3)
	}
}

const v100nc = (temp, pres) => {
	return 100 * (273.2 + temp) * 101.3 / (pres * 293.2)
}

const sko = (values) => {
	let n = values.length
	let nc = 0
	nc = values.reduce((res, val) => {
		return Number(res) + Number(val)
	}) / n
	let vals = values.map((val) => {
		return (val - nc) ** 2
	})
	return precision((vals.reduce((res, val) => {
		return res + val
	}) / (n - 1)) ** 0.5)
}

const precision = (val) => {
    // precision set to 12 signs after comma.
    parseFloat(val.toFixed(12)) 
}

module.exports = { v100nc, rangeConverter, relativeError, reducedError, volumeToNc, sko }
