import React from 'react';
import { render, act, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { UNITS, LOCALSTORAGE_KEY } from './core/constants';

const mockGeolocation_v1 = {
  getCurrentPosition: function (succeedCallback) {
    succeedCallback({
      coords: {
        latitude: 2,
        longitude: 1
      }
    });
  },
};

const mockGeolocation_v2 = {
  getCurrentPosition: function (succeedCallback, failureCallback) {
    failureCallback();
  },
};

afterAll(() => {
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
});

describe('App component', () => {

  const SAMPLE_WEATHER_DATA_CELSIUS: any = {
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
      icon: '2dx',
      units: 'celsius'
    })
  };

  const SAMPLE_WEATHER_DATA_FAHRENHEIT: any = {
    json: () => ({
      weather: [{
        main: 'Clouds',
        description: 'Partly cloudy'
      }],
      main: {
        temp: 15,
        temp_max: 30,
        temp_min: 11,
      },
      name: 'Unavailable',
      icon: '2dx',
      units: 'fahrenheit'
    })
  };

  it('shows a complete test scenario which user click on fahrenheit link', async () => {
    (global as any).navigator.geolocation = mockGeolocation_v1;
    let component;
    let fetchGetSpy = jest.spyOn(window, 'fetch').mockResolvedValueOnce(SAMPLE_WEATHER_DATA_CELSIUS);

    await act(async () => {
      component = render(<App />);
      component.getByTestId('loading');
      expect(component.asFragment()).toMatchSnapshot();
    });

    component.getByText('10');
    component.getByText(/20/i);
    component.getByText(/5/i);
    component.getByText('Clouds - Partly cloudy');
    component.getByText('Unavailable');
    expect(component.getByTestId('units').innerHTML).toBe('°C');

    fetchGetSpy = jest.spyOn(window, 'fetch').mockResolvedValueOnce(SAMPLE_WEATHER_DATA_FAHRENHEIT);
    const fahrenheitButton = component.getByTestId('fahrenheit-btn');
    fireEvent.click(fahrenheitButton);

    await act(async () => {
      component = render(<App />);
      expect(component.asFragment()).toMatchSnapshot();
    });

    component.getByTestId('celsius-btn');
    expect(component.getByTestId('units').innerHTML).toBe('°F');
    component.getByText('15');
    component.getByText(/11/i);
    component.getByText(/30/i);
    expect(fetchGetSpy).toHaveBeenCalled();

  });

  it('shows a complete test scenario which user click on celsius link', async () => {
    (global as any).navigator.geolocation = mockGeolocation_v1;
    let component;
    window.localStorage.setItem(LOCALSTORAGE_KEY, UNITS.Fahrenheit);
    let fetchGetSpy = jest.spyOn(window, 'fetch').mockResolvedValueOnce(SAMPLE_WEATHER_DATA_FAHRENHEIT);

    await act(async () => {
      component = render(<App />);
      component.getByTestId('loading');
      expect(component.asFragment()).toMatchSnapshot();
    });

    component.getByText('15');
    component.getByText(/30/i);
    component.getByText(/11/i);
    component.getByText('Clouds - Partly cloudy');
    component.getByText('Unavailable');
    expect(component.getByTestId('units').innerHTML).toBe('°F');

    fetchGetSpy = jest.spyOn(window, 'fetch').mockResolvedValueOnce(SAMPLE_WEATHER_DATA_CELSIUS);

    const celsiusButton = component.getByTestId('celsius-btn');
    fireEvent.click(celsiusButton);

    await act(async () => {
      component = render(<App />);
      expect(component.asFragment()).toMatchSnapshot();
    });

    component.getByTestId('fahrenheit-btn');
    expect(component.getByTestId('units').innerHTML).toBe('°C');
    component.getByText('10');
    component.getByText(/20/i);
    component.getByText(/5/i);
    expect(fetchGetSpy).toHaveBeenCalled();
  });

  it('render in a state that user does not allow browser to acquire location info', async () => {
    (global as any).navigator.geolocation = mockGeolocation_v2;
    let component;
    window.localStorage.setItem(LOCALSTORAGE_KEY, UNITS.Celsius);

    await act(async () => {
      component = render(<App />);
      component.getByTestId('loading');
      expect(component.asFragment()).toMatchSnapshot();
    });
    component.getByText('Location is not available.');
  });
});

