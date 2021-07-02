/** Shell для выполнения метрологических расчетов.
 * @version 0.2.0
 * @author ave6990
 * @email ave6990@ya.ru
 */

import repl from 'repl'
/** @debug не работает `import * from './metrology.js'` */
import { rangeConverter, relativeError, 
    reducedError, sko, average, precision } from './metrology.js'
import { volumeToNC } from './air-volume.js'
import { report } from './base-converter.js'
import { calcRange } from './report.js'
import * as concConverter from './converter.js'

const initializeContext = (context) => {
    Object.assign(context, {
        rangeConverter: rangeConverter,
        relativeError: relativeError,
        reducedError: reducedError,
        sko: sko,
        average: average,
        precision: precision,
        volumeToNC: volumeToNC,
        baseConverter: report,
        calcRange: calcRange,
        concConverter: concConverter,
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
