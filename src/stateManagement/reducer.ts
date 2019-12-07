import * as actions from './actions';

interface AppState {
	weather: WeatherData;
	loading: boolean;
	error: boolean;
	units: Unit;
}

interface AppAction {
	type: string;
	payload: unknown
}

export function reducer(state: AppState, action: AppAction): AppState {
	switch (action.type) {
		case actions.changeUnits:
			return { ...state, units: action.payload as Unit };
		case actions.updateWeatherData:
			return { ...state, weather: action.payload as WeatherData, loading: false };
		case actions.errorOccured:
			return { ...state, error: true };
		default:
			return state;
	}
}

