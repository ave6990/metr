class AirVolume {
    constructor( {temperature = 20, pressure = 101.3} ) {
        this.setConditions( {temperature: temperature, pressure: pressure, } )
    }

    setConditions( {temperature, pressure} ) {
        this.temperature = temperature
        this.pressure = pressure
    }

    toNC(val) {
        return val * this.pressure * 293.2 /
            ((273.2 + this.temperature) * 101.3)
    }

    fromNC(val) {
        return val * (273.2 + this.temperature) * 101.3 / (this.pressure * 293.2)
    }
}

export { AirVolume }
