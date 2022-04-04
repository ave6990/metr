const calc_list = (k, list) => {
    let variants = {}

    while (sum(list) >= k) {
        let res_list = [list.pop()]
        let cur_list = [...list]
        let acc = Math.abs(sum(res_list) - k)
        let loc_variants = {}

        while (cur_list.length > 0) {
            const loc_res = k - sum(res_list)
            cur_list = cur_list.sort(sortFunc(loc_res))
            const val = cur_list.pop()

            if (sum(cur_list) >= loc_res) {
            }

            const cur_acc = Math.abs(k - sum([val, ...res_list]))
            
            if (cur_acc < acc) {
                res_list.push(val)
                acc = cur_acc
            }
        }

        variants[sum(res_list) - k] = [...res_list]
    }

    return variants[Math.min(...Object.keys(variants).map(Number))]
}
