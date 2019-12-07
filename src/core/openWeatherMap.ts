import { UNITS } from './constants';

const API_KEY = 'dc4daee96e9f1b3485584c79657f779e';
export const API_URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}`;
export function getWeatherInfo(
	{
		latitude,
		longitude,
		units
	}:
		{
			latitude: number,
			longitude: number,
			units?: Unit
		}) {
	let unitsTemp: string | null = null;
	switch (units) {
		case UNITS.Celsius:
			unitsTemp = 'metric';
			break;
		default:
		case UNITS.Fahrenheit:
			unitsTemp = 'imperial'
			break;
	}
	return new Promise(executor => {
		window
			.fetch(`${API_URL}&lon=${longitude}&lat=${latitude}&units=${unitsTemp}`)
			.then(response => response.json())
			.then(response => {
				const [weather] = response.weather;
				executor({
					temp: response.main.temp,
					max_temp: response.main.temp_max,
					min_temp: response.main.temp_min,
					name: response.name,
					condition: `${weather.main} - ${weather.description}`,
					icon: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
					units
				});
			});
	});
}