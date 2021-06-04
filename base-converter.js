const report = (val) => {
    const base_list = [2, 8, 10, 16]

    for (const base of base_list) {
        console.log(`${base}:\t${val.toString(base)}`)
    }
}

module.exports = { report }
