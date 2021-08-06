/** Shell для выполнения метрологических расчетов.
 * @version 0.2.0
 * @author ave6990
 * @email ave6990@ya.ru
 */

import repl from 'repl'
/** @debug не работает `import * from './metrology.js'` */
import { rangeConverter, relativeError, round, discrete, 
    reducedError, sko, average, precision } from './lib/metrology.js'
import { AirVolume } from './lib/air-volume.js'
import { report } from './scripts/base-converter.js'
import { calcRange } from './scripts/report.js'
import * as concConverter from './lib/converter.js'
import * as gs from './lib/gs2000.js'
import * as am5 from './scripts/am5.js'

const initializeContext = (context) => {
    Object.assign(context, {
        rangeConverter: rangeConverter,
        relativeError: relativeError,
        reducedError: reducedError,
        sko: sko,
        average: average,
        precision: precision,
        round: round,
        discrete: discrete,
        airVolume: AirVolume,
        baseConverter: report,
        calcRange: calcRange,
        concConverter: concConverter,
        print: console.log,
        gs: gs,
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
