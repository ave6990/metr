const volumeToNC = ( { temperature, pressure }) => {
    return (val) => {
        return val * pressure * 293.2 /
            ((273.2 + temperature) * 101.3)
    }
}

const v100nc = ( { temperature, pressure } ) => {
    return 100 * (273.2 + temperature) * 101.3 / (pressure * 293.2)
}

export { volumeToNC, v100nc }
