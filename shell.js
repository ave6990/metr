#! /usr/bin/env node
/** Shell для выполнения метрологических расчетов.
 * @version 0.4.0
 * @author Aleksandr Ermolaev
 * @email ave6990@ya.ru
 * @license: MIT
 */

import repl from 'repl'
import * as metrology from './lib/metrology.js'
import { AirVolume } from './lib/air-volume.js'
import * as date from './lib/date.js'
import { report } from './scripts/base-converter.js'
import * as converter from './lib/converter.js'
import { mi, tsk, ptsk } from './models/midb.js'
import { Generator } from './scripts/gen-values.js'

const initializeContext = (context) => {
    Object.assign(context, {
        rangeConverter: metrology.rangeConverter,
        relativeError: metrology.relativeError,
        reducedError: metrology.reducedError,
        sko: metrology.sko,
        average: metrology.average,
        round: metrology.round,
        discrete: metrology.discrete,
        // генерирует случайные числа в пределах погрешности для измерений
        gen: new Generator(mi),
        airVolume: AirVolume,
        baseConverter: report,
        converter: converter,
        print: console.log,
        date: date,
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
        tsk: tsk,
        ptsk: ptsk,
    } )
}

const r = repl.start( {
    prompt: 'M> ',
} ) 

initializeContext(r.context)
r.on('reset', initializeContext)

const print = r.context.console.log
