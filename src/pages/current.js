import CurrentWeather from '../components/current-weather';
import WeatherContext from '../components/weatherContext';
import { useEffect, useState, useContext } from 'react';
import GlobalVariables from '../assets/global-variables';
import initial_weather_data from '../response.json';
import { useFetchGeolocation } from '../functions/useFetchGeolocation';

const CurrentWeatherPage = () => {
  const context = useContext(WeatherContext);
  //console.log('context = ', context);
  const weather = context.weather;

  //useFetchGeolocation(GlobalVariables.GEOLOCATION_DATABASE_CDN);

  //console.log('weather inside current.js =', weather);

  if (context.isLoading) {
    return (
      <div className="text-center">
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (context.isError) {
    return (
      <div className="text-center">
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <CurrentWeather
      timezone={weather.timezone.replace(/_/g, ' ')}
      todays_date={new Date(weather.current.dt * 1e3).toLocaleDateString(
        undefined,
        GlobalVariables.OPTIONS
      )}
      time={new Date(weather.current.dt * 1e3).toLocaleTimeString()}
      temp={Math.trunc(weather.current.temp)}
      feels_like={Math.trunc(weather.current.feels_like)}
      icon={
        process.env.PUBLIC_URL +
        '/icons/' +
        weather.current.weather[0].icon +
        '.svg'
      }
      description={weather.current.weather[0].main}
      alerts={context.alert}
    />
  );
};

export default CurrentWeatherPage;
