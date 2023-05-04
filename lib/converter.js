// must return a function

const quantityUnits = {
    pressure: {
        Pa: {
            from: (val) => val,
            to: (val) => val
        },
        atm: {
            from: (val) => val * 101.325,
            to: (val) => val / 101.325
        },
        mmhg: {
            from: (val) => val * 0.1333223684,
            to: (val) => val / 0.1333223684
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

const molar_mass = (s) => {
    let res = 0

    /** IUPAC Periodic Table 150-04May22
    *   atomic weight */
    const ar = {
        H: 1.008,
        He: 4.0026,
        C: 12.011,
        N: 14.007,
        O: 15.999,
        F: 18.998,
        Ne: 20.18,
        Si: 28.085,
        P: 30.974,
        S: 32.06,
        Cl: 35.45,
        Ar: 39.95,
        Se: 78.971,
    }

    const elements = s.match(/[A-Z][a-z]?[0-9]{0,2}/g)
    
    for(const el of elements) {
        const v = ar[el.match(/[A-Z][a-z]?/g)]
        const k = el.replace(/[A-Z][a-z]?/g, '')
        if(k) {
            res += v * k
        } else {
            res += v
        }
    }

    return res
}

const molar_volume = {
    'air': 24.06,
    'n2': 24.04,
}

const lel = {C3H8: 17000, C3H6: 20000, C4H10: 13000, C5H12: 15000, C6H14: 10000,
    C6H6: 12000, C2H4: 23000, C2H2: 23000, C2H6: 25000, H2: 40000, H2S: 40000}

const gases = [ 'N2', 'NH3', 'Ar', 'C2H2', 'C3H6O', 'C4H10', 'C4H9OH', 'H2O',
    'H2', 'C6H14', 'He', 'C7H16', 'CO2', 'C10H22', 'C12H10',
    'C12H10O', 'CH2Cl2', 'C4H10O', 'N2O', 'HJ', 'O2', 'Kr', 'Xe', 'CH4',
    'CH5N', 'CH4O', 'Ne', 'NOCl', 'O3', 'NO', 'NO2', 'CO', 'C8H18',
    'C5H12', 'C3H8', 'C3H6', 'H2Se', 'SO2', 'SO3', 'H2S', 'PH3',
    'CF3Cl', 'CF2Cl2', 'CFCl3', 'F2', 'SiF4', 'CH3F', 'Cl2', 'HCl',
    'CH3Cl', 'CHCl3', 'C2N2', 'HCN', 'C2H6', 'C2H7N', 'C2H4', 'C2H6O',
    'C2H5Cl', 'CH3SH', 'CS2', 'CH3OCH3', 'C2H4O', 'C2H5SH', 'C2H6S'
    //'air'
]

const isGas = (gas_name) => {

    if (gases.some(x => x.toUpperCase() == gas_name.toUpperCase())) {
        return true
    }
    else {
        return false
    }
}

const coefficient = (gas, temp = 20, press = 101.325) => {
    if (isGas(gas)) {
        return molar_mass(gas) * press * 273.15 / (22.41 * 101.325 * (temp + 273.15))
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
export { molar_mass, molar_volume, isGas, coefficient, lel }
