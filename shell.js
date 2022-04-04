/** Shell для выполнения метрологических расчетов.
 * @version 0.2.1
 * @author ave6990
 * @email ave6990@ya.ru
 * @license: MIT
 */

import repl from 'repl'
import * as metrology from './lib/metrology.js'
import { AirVolume } from './lib/air-volume.js'
import { report } from './scripts/base-converter.js'
import { calcRange } from './scripts/report.js'
import * as concConverter from './lib/converter.js'
import * as gs from './lib/gs2000.js'
import * as am5 from './scripts/am5.js'

const initializeContext = (context) => {
    Object.assign(context, {
        rangeConverter: metrology.rangeConverter,
        relativeError: metrology.relativeError,
        reducedError: metrology.reducedError,
        sko: metrology.sko,
        average: metrology.average,
        precision: metrology.precision,
        round: metrology.round,
        discrete: metrology.discrete,
        airVolume: AirVolume,
        baseConverter: report,
        calcRange: calcRange,
        concConverter: concConverter,
        print: console.log,
        gs: {
            calc: (s_val, diluent) => {
                return (val) => {
                    return gs.calculate({coeff: gs.coefficients[diluent],
                        sourceConc: s_val,
                        targetConc: val, } )
                }
            },
            rCalc: (s_val, diluent) => {
                return (valves) => {
                    return gs.reCalculate( {coeff: gs.coefficients[diluent],
                        sourceConc: s_val,
                        valves: valves,
                    } )
                }
            },
        },
        am5: am5,
        conditions: {
            temperature: 20,
            pressure: 101.3,
            hummidity: 50,
            voltage: 220,
            frequency: 50,
        },
    } )
}

const r = repl.start( {
    prompt: 'metrology > ',
} ) 

initializeContext(r.context)
r.on('reset', initializeContext)

const print = r.context.console.log

print('Conditions:')
print(r.context.conditions)
