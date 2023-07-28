import { discrete } from '../lib/metrology.js'

class Generator {
   
    constructor(db) {
        this.db = db
        this._getCharacteristicsQuery = `
            select
                m.id,
                m.ref_value,
                met.value,
                met.r_from,
                met.r_to,
                met.type_id,
                ch.low_unit,
                ch.view_range_from,
                ch.view_range_to
            from
                measurements as m
            inner join
                metrology as met
                on met.id = m.metrology_id
            inner join
                channels as ch
                on ch.id = met.channel_id
            where
        `
    }

    _updateMeasurementsQuery(id, value) {
        return `
            update
                measurements
            set
                value = ${value}
            where
                id = ${id}
        `
    }

    /** Генерирует случайное значение в пределах погрешности.
    obj = {
        ref_value,  // опорное значение
        r_from,     // начало диапазона
        r_to,       // конец диапазона
        value,      // значение основной погрешности
        type_id,    // тип погрешности
        low_unit    // дискретность показаний
    } */
    _genValue(obj, limit = 0.75) {
        const rand = Math.random()
        let ref = obj.ref_value == null ? 0 : obj.ref_value
        let lowUnit = obj.low_unit == null ? 0.1 : obj.low_unit
        let diff = 0

        if (obj.type_id == 0) {
            diff = obj.value
        } else if (obj.type_id == 1) {
            diff = obj.value * ref / 100
        } else if (obj.type_id == 2) {
            diff = obj.value * (obj.r_to - obj.r_from) / 100
        } else if (obj.type_id == 6) {
            diff = Math.round(obj.value * 0.15)
            ref = Math.round(obj.value * 0.8)
            lowUnit = 1
        }

        diff = diff * limit

        let value = ref + rand * 2 * diff - diff

        if (obj.view_range_from != null) {
            value = value < obj.view_range_from ? obj.view_range_from : value
        }

        if (obj.view_range_to != null) {
            value = value > obj.view_range_to ? obj.view_range_to : value
        }
        
        return discrete(value, lowUnit)
    }

    async genValues(where = '') {
        if (where != '') {
            const query = `${this._getCharacteristicsQuery} ${where}`
            const m = await this.db.sql(query) 
            const res = m.map((o) => {
                return { 'id': o.id, 'value': this._genValue(o)}
            })
            const queries = res.map(o => this._updateMeasurementsQuery(o.id, o.value))
            queries.map(async (q) => {
                this.db.run(q)
            })
        }
    }
}

export { Generator }
