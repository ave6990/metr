/* Библиотека расчета режимов работы генератора ГС-2000.
* @author: ave6990
* @email: ave6990@ya.ru
* @version: 1.3.0
* @license: MIT
*/

/* Коэффициенты разбавления (паспортные значения) */
const coefficients = {'воздух': [1176, 513, 253, 134, 70.4, 46.8, 36.3, 24.3, 14, 10.5],
    'азот': [1196, 522, 267, 136, 71.6, 47.6, 36.9, 24.7, 14.2, 10.7],
}

const calculate = ({coeff, source_conc, target_conc}) => {
    let temp_coeff = [...coeff]
    let variants = {}
    let res = 0
    let k_list = []

    while (temp_coeff.length > 0) {
        const target_k = source_conc / (target_conc - res)
        temp_coeff = spliceList(target_k, temp_coeff)

        const k = temp_coeff.pop()
        const temp_res = source_conc / calc_k([k, ...k_list])

        if (sortFunc(target_conc)(res, temp_res) > 0 || res == 0) {
            if (temp_res > target_conc) {
                variants[temp_res] = [k, ...k_list]
            } else {
                k_list.push(k)
                res = temp_res
            }
        }
    }

    if (k_list.length > 0) {
        variants[res] = [...k_list]
    }

    const results = Object.keys(variants).map((val) => parseFloat(val))
    res = results.sort(sortFunc(target_conc))[0]
    k_list = variants[res]

    const index_list = k_list.map( (val) => {
        return coeff.indexOf(val) + 1
    } )

    return {conc: res, valves: index_list, }
}

/* Расчет коэффициента разбавления, при включении
нескольких клапанов */
const calc_k = (list) => {
    const divider = list.map( (val) => {
        return 1 / (val -1)
    } )
    .reduce( (a, b) => {
        return a + b
    } )

    return 1 / divider + 1
}

/* Функция сравнения чисел по признаку их близости к некоторому заданному значению */
const sortFunc = (value) => {
    return (a, b) => {
        if (Math.abs(a - value) > Math.abs(b - value)) {
            return 1
        }
        if (Math.abs(a - value) < Math.abs(b - value)) {
            return -1
        }
        else {
            return 0
        }
    }
}

const spliceList = (value, list) => {
    let temp_list = [...list]

    const [first, second] = temp_list.sort(sortFunc(value))
    const index = list.indexOf(Math.min(first, second))

    console.log(`index: ${index}`)
    if (index >= 0) {
        temp_list = [...list]
        temp_list.splice(index + 1)
    }

    return temp_list
}

const r_calculate = ( {coeff, source_conc, valves} ) => {
    const k_list = valves.map( (val) => {
        return coeff[val - 1]
    } )

    return { conc: source_conc / calc_k(k_list),
        valves: valves,
    }
}

const calc = (s_val, diluent) => {
    return (val) => {
        return calculate({coeff: coefficients[diluent],
            source_conc: s_val,
            target_conc: val, } )
    }
}

const r_calc = (s_val, diluent) => {
    return (valves) => {
        return r_calculate( {coeff: coefficients[diluent],
            source_conc: s_val,
            valves: valves,
        } )
    }
}

export { calculate, r_calculate, calc, r_calc }
