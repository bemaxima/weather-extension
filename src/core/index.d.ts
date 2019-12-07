interface Location {
	latitude: number;
	longitude: number;
}

interface ILocationProvider {
	getCurrentLocation: () => Promise<Location>;
}

type WeatherData = {
	name: string;
	units: Unit;
	max_temp: number;
	min_temp: number;
	condition: string;
	icon: string;
	temp: number;
}

interface IWeatherForecaster {
	getWeatherInfo: (request: {
		latitude: number,
		longitude: number,
		units: Unit
	}) => Promise<WeatherData>;
}

type Unit = 'celsius' | 'fahrenheit';