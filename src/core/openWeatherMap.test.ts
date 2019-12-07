import { getWeatherInfo, API_URL } from './openWeatherMap';
import { UNITS } from './constants';
describe('open weather map weather service provider', () => {
	it('should send request to get data in celsius units', async () => {
		const SAMPLE_WEATHER_DATA: any = {
			json: () => ({
				weather: [{
					main: 'Clouds',
					description: 'Partly cloudy'
				}],
				main: {
					temp: 10,
					temp_max: 20,
					temp_min: 5,
				},
				name: 'Unavailable',
				icon: '2dx'
			})
		};
		const fetchGetSpy = jest.spyOn(window, 'fetch').mockResolvedValueOnce(SAMPLE_WEATHER_DATA);
		await getWeatherInfo({
			latitude: 2,
			longitude: 3,
			units: UNITS.Celsius
		});

		expect(fetchGetSpy).toHaveBeenCalled();
		expect(fetchGetSpy).toBeCalledWith(`${API_URL}&lon=${3}&lat=${2}&units=metric`);

		fetchGetSpy.mockRestore();
	});

	it('should send request to get data in fahrenheit units', async () => {
		const SAMPLE_WEATHER_DATA: any = {
			json: () => ({
				weather: [{
					main: 'Clouds',
					description: 'Partly cloudy'
				}],
				main: {
					temp: 10,
					temp_max: 20,
					temp_min: 5,
				},
				name: 'Unavailable',
				icon: '2dx'
			})
		};
		const fetchGetSpy = jest.spyOn(window, 'fetch').mockResolvedValueOnce(SAMPLE_WEATHER_DATA);
		await getWeatherInfo({
			latitude: 2,
			longitude: 3
		});

		expect(fetchGetSpy).toHaveBeenCalled();
		expect(fetchGetSpy).toBeCalledWith(`${API_URL}&lon=${3}&lat=${2}&units=imperial`);

		fetchGetSpy.mockRestore();
	});
});