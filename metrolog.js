const range_converter = (s_min, s_max, d_min, d_max) => {
    return (value) => {
		return (value -s_min) * (d_max - d_min) / (s_max - s_min) + d_min;
    };
}

const relative_error = (d_val, s_val) => {
    return (d_val - s_val) / s_val * 100;
}

const reduced_error = (d_val, s_val, n_val) => {
    return (d_val - s_val) / n_val * 100;
}

const converter_to_nc = (temp, pres) => {
	return (val) => {
		return val * pres * 293.2 /
			((273.2 + temp) * 101.3);
	};
}

const v100nc = (temp, pres) => {
	return 100 * (273.2 + temp) * 101.3 / (pres * 293.2);
}

module.exports = { v100nc, range_converter, relative_error, reduced_error, converter_to_nc }
