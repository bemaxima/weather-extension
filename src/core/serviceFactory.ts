import { ForecastWeather } from './forecastWeather';
import * as openWeatherService from './openWeatherMap';
import * as locationService from './locationProvider';

/* 
	In this module we can use any other weather services. 
	Just import the module and pass through `ForecastWeather` class constructor.
*/
export default () => new ForecastWeather(locationService as ILocationProvider, openWeatherService as IWeatherForecaster);