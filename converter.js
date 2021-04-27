// must return a function

const quantity_units = {
    pressure: {
        Pa: {
            from: (val) => val,
            to: (val) => val
        },
        atm: {
            from: (val) => val * 101.325,
            to: (val) => val / 101.325
        }
    },
    volume: {
        'm^3': {
            from: (val) => val,
            to: (val) => val
        },
        'dm^3': {
            from: (val) => val / 10 ** 3,
            to: (val) => val * 10 ** 3
        },
        'cm^3': {
            from: (val) => val / 10 ** 6,
            to: (val) => val * 10 ** 6
        },
        'mm^3': {
            from: (val) => val / 10 ** 9,
            to: (val) => val * 10 ** 9
        },
        l: {
            from: (val) => val / 10 ** 3,
            to: (val) => val * 10 ** 3
        },
        ml: {
            from: (val) => val / 10 ** 6,
            to: (val) => val * 10 ** 6
        }
    },
    distance: {
        m: (val) => val,
        dm: (val) => val * 10,
        cm: (val) => val * 100,
        mm: (val) => val * 10 ** 3
    },
    concentration: {
        'ppm': (val) => val * 1,
        '%': (val) => val / (10 ** 4),
        'g/m^3' : (val) => val * 1,
        'mg/m^3': (val) => val * 10 ** 3
    }
}

const molar_mass = {
    N2: 28.016, NH3: 17.031, Ar: 39.944, C2H2: 26.04,
    C3H6O: 58.08, C4H10: 58.12, C4H9OH: 74.12, H2O: 18.016,
    H2: 2.0156, air: 28.96, C6H14: 86.17, He: 4.003,
    C7H16: 100.19, CO2: 44.01, C10H22: 142.30, C12H10: 154.08,
    C12H10O: 168.8, CH2Cl2: 84.94, C4H10O: 74.12, N2O: 44.016,
    HJ: 127.93, O2: 32, Kr: 83.7, Xe: 131.3, CH4: 16.04,
    CH5N: 31.06, CH4O: 32.04, Ne: 20.183, NOCl: 65.465,
    O3: 48.00, NO: 30.008, CO: 28.01, C8H18: 114.22,
    C5H12: 72.14, C3H8: 44.09, C3H6: 42.08, H2Se: 80.968,
    SO2: 64.06, SO3: 80.06, H2S: 34.08, PH3: 34.04,
    CF3Cl: 137.40, CF2Cl2: 120.92, CFCl3: 114.47, F2: 38,
    SiF4: 104.06, CH3F: 34.03, Cl2: 70.914, HCl: 36.465,
    CH3Cl: 50.49, CHCl3: 119.39, C2N2: 52.04, HCN: 27.026,
    C2H6: 30.07, C2H7N: 45.08, C2H4: 28.05, C2H6O: 46.07,
    C2H5Cl: 64.52
}

const is_gas = (gas_name) => {
    if (Object.keys(molar_mass).some(x => x == gas_name)) {
        return true
    }
    else {
        return false
    }
}

const coefficient = (gas, temp = 20, press = 101.325) => {
    if (is_gas(gas)) {
        return press * molar_mass[gas] / 8.314463 / (temp + 273.15)
    }
    else {
        throw new Error('Unknown gas')
    }
}

const _k = (k) => {
    return (val) => val * k
}

/*
Object.keys(u).filter(q =>
    Object.keys(u[q]).some(u =>
        u == 'm3' ))
*/

module.exports.quantity_units = quantity_units
module.exports.molar_mass = molar_mass
module.exports.is_gas = is_gas
module.exports.coefficient = coefficient
