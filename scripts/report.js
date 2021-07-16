const calcRange = (init, end, step = 1, func = val => { return val }) => {
    for (let i = init; i <= end; i += step) {
        console.log(`${i}\t->\t${func(i)}`)
    }
}

export { calcRange }
