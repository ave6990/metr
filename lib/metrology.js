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

const sko = (values, osko = false) => {
    const n = values.length
    const nc = average(values)

    let vals = values.map((val) => {
        return (val - average(values)) ** 2
    })

    const sko = (vals.reduce((res, val) => {
        return res + val
    }) / (n - 1)) ** 0.5

    if (osko) {
        return precision(sko / nc * 100)
    } else {
        return precision(sko)
    }
}

const average = (vals) => {
    const n = vals.length
    return precision(vals.reduce((res, val) => {
        return Number(res) + Number(val)
    }) / n)
}

/** Осталась для обратной совместимости с существующим кодом
* использовать вместо нее функцию `round()`
*/
const precision = (val, prec = 12) => {
    // precision set to 12 signs after comma.
    return parseFloat(val.toFixed(prec)) 
}

const round = (val, prec = 0) => {
    return Math.round(val * (10 ** prec)) / (10 ** prec)
}

const discrete = (val, discrete_val) => {
    let exp = Math.log10(discrete_val)

    if (exp > 0) {
        exp = -(Math.ceil(exp) + 1)
    } else {
        exp = -(Math.floor(exp) + 1)
    }

    let diff = val - round(val, exp)
    diff = round(diff / discrete_val) * discrete_val

    return round(val, exp) + diff
}

export { average, rangeConverter, relativeError, reducedError,
    sko, precision, round, discrete }
