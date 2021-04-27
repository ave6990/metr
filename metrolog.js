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

const volumeToNC = (temp, pres) => {
    return (val) => {
        return val * pres * 293.2 /
            ((273.2 + temp) * 101.3)
    }
}

const v100nc = (temp, pres) => {
    return 100 * (273.2 + temp) * 101.3 / (pres * 293.2)
}

const sko = (values) => {
    const n = values.length
    const nc = average(values)
    let vals = values.map((val) => {
        return (val - average(values)) ** 2
    })
    return precision((vals.reduce((res, val) => {
        return res + val
    }) / (n - 1)) ** 0.5)
}

const average = (vals) => {
    return precision(vals.reduce((res, val) => {
        return Number(res) + Number(val)
    }) / n)
}

const precision = (val) => {
    // precision set to 12 signs after comma.
    parseFloat(val.toFixed(12)) 
}

module.exports = { average, v100nc, rangeConverter, relativeError, reducedError, volumeToNc, sko }
