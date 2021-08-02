/* Библиотека расчета режимов работы генератора ГС-2000.
* @author: ave6990
* @email: ave6990@ya.ru
* @version: 1.1.0
* @license: MIT
*/

/* Коэффициенты разбавления (паспортные значения) */
const coefficients = {'воздух': [1176, 513, 253, 134, 70.4, 46.8, 36.3, 24.3, 14, 10.5],
    'азот': [1196, 522, 267, 136, 71.6, 47.6, 36.9, 24.7, 14.2, 10.7],
}

/* Принимает строку, выводит ее и результат ее выполнения `eval()` в консоль 
 * @debug не видит переменные определенные во внешней области видимости. */
const dpr = (context, ...list) => {
    list.forEach( (s) => {
        console.log(`${s}: ${eval(context.s)}`)
    } )
}

const calculate1 = ({coeff, source_conc, target_conc}) => {
    let temp_coeff = [...coeff]
    let target_k = source_conc / target_conc
    let diff = source_conc
    let k_list = []

    while (temp_coeff.length > 1) {
        let k = getClosest(target_k, temp_coeff)
        temp_coeff.splice(temp_coeff.indexOf(k), 1)
        let res_k = calc_k([...k_list, k])
        let res_conc = source_conc / res_k

        if (Math.abs(res_conc - target_conc) < diff) {
            diff = Math.abs(res_conc - target_conc)
            k_list.push(k)
            target_k = source_conc / (target_conc - res_conc)
        } else {
            temp_coeff = []
        }
    }

    const res = source_conc / calc_k(k_list)
    const index_list = k_list.map( (val) => {
        return coeff.indexOf(val) + 1
    } )

    return { conc: res, valves: index_list, }
}

const calculate2 = ({coeff, source_conc, target_conc}) => {
    let temp_coeff = [...coeff]
    let k_list = []
    let res = 0
    let variants = []
    let temp_k = 1

    const _sort = sortFunc(target_conc)

    const _calcRes = (list) => {
        return source_conc / calc_k(list)
    }

    while (temp_coeff.length > 0) {
        let target_k = source_conc / (target_conc - res)
        temp_coeff = spliceList(target_k, temp_coeff)
        let k = 1
        let alt_k = 1

        if (temp_coeff.length > 1) {
            alt_k = temp_coeff.pop()
            k = temp_coeff.pop()
        } else {
            k = temp_coeff.pop()
        }

        let temp_res = _calcRes([k, ...k_list])
        let alt_res = _calcRes([alt_k, ...k_list])

        if (_sort(temp_res, alt_res) > 0) {
            if (alt_res > target_conc) {
                variants.push([alt_k, ...k_list])
            } else {
                temp_res = alt_res
                k = alt_k
            }
        }

        if (_sort(res, temp_res) > 0) {
            res = temp_res
            k_list.push(k)
        }
    }

    variants.push(k_list)

    const results = variants.map( (list) => {
        return source_conc / calc_k(list)
    } )

    res = results.sort(_sort)[0]
    k_list = variants[results.indexOf(res)]

    const index_list = k_list.map( (val) => {
        return coeff.indexOf(val) + 1
    } )

    return {conc: res, valves: index_list, }
}

const calculate = ({coeff, source_conc, target_conc}) => {
    const data = {
        coeff: coeff, 
        source_conc: source_conc,
        target_conc: target_conc,
    } 

    const res1 = calculate1(data)
    const res2 = calculate2(data)

    if (Math.abs(res1.conc - target_conc) < Math.abs(res2.conc - target_conc)) {
        return res1
    }
    return res2
}

const test = (value) => {
    console.log(calculate1({coeff: coefficients['воздух'],
        source_conc: 509,
        target_conc: value,
    }))
    console.log(calculate2({coeff: coefficients['воздух'],
        source_conc: 509,
        target_conc: value,
    }))
    console.log(calculate({coeff: coefficients['воздух'],
        source_conc: 509,
        target_conc: value,
    }))
 
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

    temp_list = [...list]
    temp_list.splice(index + 1)

    return temp_list
}

/* Возвращает значение из массива `list` ближайшее большее
заданному значению `value` */
const getClosest = (value, list) => {
    let temp_list = [...list]

    temp_list.sort(sortFunc(value))

    const filtered_list = temp_list.filter( (val) => {
        if (val >= value) {
            return true
        }

        return false
    } )

    if (filtered_list.length == 0) {
        return list[0]
    }

    return filtered_list[0]
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

export { calculate, r_calculate, calc, r_calc, test }
