/** Shell для выполнения метрологических расчетов.
 * @version 0.3.0
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
import * as am5 from './scripts/am5.js'
import { mi } from './models/midb.js'

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
        am5: am5,
        conditions: {
            id: 0,
            date: new Date(),
            temperature: 20,
            humidity: 50,
            pressure: 101.3,
            voltage: 220,
            frequency: 50,
            other: null,
            location: null,
            comment: null
        },
        mi: mi,
    } )
}

const r = repl.start( {
    prompt: 'M> ',
} ) 

initializeContext(r.context)
r.on('reset', initializeContext)

const print = r.context.console.log

print('')
print('Conditions:')
//r.context.conditions = await mi.sql('select * from conditions order by id desc limit 1')
print(r.context.conditions)
print('')
