import React from 'react';
import { UNITS } from '../core/constants';

type Unit = 'celsius' | 'fahrenheit';

interface ViewerProps {
	name: string;
	units: Unit;
	max_temp: number;
	min_temp: number;
	condition: string;
	icon: string;
	temp: number;
	onUnitsChange: (unit: Unit) => void;
}

export default function Viewer(
	{
		name,
		units,
		max_temp,
		min_temp,
		temp,
		condition,
		icon,
		onUnitsChange
	}: ViewerProps) {
	const celsiusMode = units === UNITS.Celsius;
	const fahrenheitMode = units === UNITS.Fahrenheit;
	return (
		<>
			<div className='action-bar'>
				{!celsiusMode && <a className='settings' href='#' onClick={() => onUnitsChange(UNITS.Celsius)} data-testid='celsius-btn'>&deg;C</a>}
				{celsiusMode && <span>&deg;C</span>}
				{!fahrenheitMode && <a className='settings' href='#' onClick={() => onUnitsChange(UNITS.Fahrenheit)} data-testid='fahrenheit-btn'>&deg;F</a>}
				{fahrenheitMode && <span>&deg;F</span>}
			</div>
			<div className='module-header'>{name}</div>
			<div className='module-header temp-detail'>{Math.round(max_temp)}/{Math.round(min_temp)}</div>
			{icon && <img className='weather-icon' src={icon} />}
			<div className='temp'>
				{Math.round(temp)}
				<span data-testid='units' dangerouslySetInnerHTML={{ __html: units === UNITS.Celsius ? '&deg;C' : '&deg;F' }}></span>
			</div>
			<div className='weather'>{condition}</div>
		</>
	);
}