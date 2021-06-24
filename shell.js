/** Shell для выполнения метрологических расчетов.
 * @version 0.1.0
 * @author ave6990
 * @email ave6990@ya.ru
 */

import repl from 'repl'
import { rangeConverter, relativeError, 
    reducedError, sko, average, precision } from './metrology.js'
import { volumeToNC } from './air-volume.js'
import { report } from './base-converter.js'

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
    } )
}

const r = repl.start( {
    prompt: 'metrology > ',
} ) 
initializeContext(r.context)

r.on('reset', initializeContext)
