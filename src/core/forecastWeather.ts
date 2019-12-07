export class ForecastWeather {
	locationProvider: ILocationProvider;
	forecaster: IWeatherForecaster;

	constructor(locationProvider: ILocationProvider, forecaster: IWeatherForecaster) {
		this.locationProvider = locationProvider;
		this.forecaster = forecaster;
	}

	getWeatherInfo(units: Unit) {
		return new Promise<WeatherData>((executor, reject) => {
			this.locationProvider.getCurrentLocation()
				.then(({ latitude, longitude }) => {
					this.forecaster.getWeatherInfo({
						latitude,
						longitude,
						units
					})
						.then(executor);
				})
				.catch(reject);
		});
	}
}