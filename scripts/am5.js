import { AirVolume } from '../lib/air-volume.js'
import { discrete } from '../lib/metrology.js'

const genVals = (real_temp, real_press, prot_temp, prot_press) => {
    return (m_val, limit = 0.5) => {
        const r_converter = new AirVolume( {
            temperature: real_temp,
            pressure: real_press,
        } )
        const p_converter = new AirVolume( {
            temperature: prot_temp,
            pressure: prot_press,
        } )

        let res = _gen(m_val, limit)
        res.val = m_val
        res.nc = r_converter.toNC(res.avg)

        const s_val = discrete(p_converter.fromNC(res.nc), 0.5)
        let res_prot = _gen(s_val, limit)
        res_prot.val = s_val
        res_prot.nc = p_converter.toNC(res_prot.avg)

        return [res, res_prot]
    }
}

const _gen = (m_val, limit) => {
    const vals = []
    let avg = 0
    
    for (let i = 0; i < 3; i++) {
        let val = 0
        val = Math.round(Math.random() * 2 * limit) * 0.5 + m_val - limit
        avg += val
        vals.push(val)
    }

    avg /= 3

    return {
        vals: vals,
        avg: avg,
    }
}

export { genVals }
