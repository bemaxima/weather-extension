import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import serviceFactory from './core/serviceFactory';
import { UNITS, LOCALSTORAGE_KEY } from './core/constants';
import { reducer } from './stateManagement/reducer';
import * as actionCreators from './stateManagement/actionCreators';
import Error from './components/error';
import Spinner from './components/spinner';
import Viewer from './components/viewer';

function App() {
  const [{ weather, loading, error, units }, dispatch] = useReducer(reducer, {
    weather: {
      temp: null,
      max_temp: null,
      min_temp: null,
      name: 'Unavailable',
      condition: 'Unavailable',
      units: null,
      icon: null
    },
    loading: true,
    error: false,
    units: (localStorage.getItem(LOCALSTORAGE_KEY) || UNITS.Celsius) as Unit
  });

  const service = useRef(serviceFactory());

  function updateWeatherData(units) {
    service.current
      .getWeatherInfo(units)
      .then(response => {
        dispatch(actionCreators.updateWeatherData(response));
      })
      .catch(() => dispatch(actionCreators.errorOccured()));
  }

  function changeUnits(units: Unit) {
    localStorage.setItem(LOCALSTORAGE_KEY, units);
    dispatch(actionCreators.changeUnits(units));
  }

  useEffect(
    () => {
      updateWeatherData(units);
    },
    [units]
  );

  return (
    <div className={`app ${loading ? 'loading' : ''}`}>
      {
        (() => {
          if (error) {
            return <Error />
          }
          else if (loading) {
            return <Spinner />
          }
          else {
            return <Viewer {...weather} onUnitsChange={changeUnits} />
          }
        })()
      }
    </div>
  );
}

export default App;
