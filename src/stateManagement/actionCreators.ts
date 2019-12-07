import * as actions from './actions';

export function changeUnits(units: Unit) {
	return {
		type: actions.changeUnits,
		payload: units
	};
}

export function updateWeatherData(data: WeatherData) {
	return {
		type: actions.updateWeatherData,
		payload: data
	};
}

export function errorOccured() {
	return {
		type: actions.errorOccured,
		payload: null
	};
}