import { reducer } from './reducer';
import { UNITS } from '../core/constants';
import * as actionCreators from './actionCreators';

describe('app reducer', () => {
	const INITIAL_STATE: any = {
		weather: {
			temp: null,
			max_temp: null,
			min_temp: null,
			name: 'Unavailable',
			condition: 'Unavailable',
			units: null
		},
		loading: true,
		error: false,
		units: UNITS.Celsius
	};

	const SAMPLE_WEATHER_DATA: any = {
		temp: 10,
		max_temp: null,
		min_temp: null,
		name: 'Unavailable',
		condition: 'Unavailable',
		units: UNITS.Celsius
	};
	
	let nextState = null;

	it('should return the initial state', () => {
		expect(reducer(INITIAL_STATE, {} as any)).toEqual(INITIAL_STATE);
	});

	it('should handle updateWeatherData action', () => {
		nextState = reducer(nextState, actionCreators.updateWeatherData(SAMPLE_WEATHER_DATA));
		expect(nextState.weather.temp)
			.toEqual(10);
		expect(nextState.loading).toEqual(false);
	});

	it('should handle change unit action', () => {
		nextState = reducer(nextState, actionCreators.changeUnits(UNITS.Fahrenheit));
		expect(nextState.units).toEqual(UNITS.Fahrenheit);
	});

	it('should handle error', () => {
		nextState = reducer(nextState, actionCreators.errorOccured());
		expect(nextState.error).toEqual(true);
	});
});