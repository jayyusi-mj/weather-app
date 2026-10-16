import WeatherContext from '../components/weatherContext';
import { useEffect, useContext } from 'react';
import GlobalVariables from '../assets/global-variables';
import { buildWeatherData } from './weatherDataBuilder';

export const useFetchGeolocation = (url) => {
  const context = useContext(WeatherContext);

  const getGeolocation = async () => {
    try {
      const res = await fetch(url);
      const geo_loc = await res.json();
      const lat = geo_loc.latitude;
      const lon = geo_loc.longitude;
      const key = GlobalVariables.API_KEY;

      const [currentRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        ),
      ]);

      if (!currentRes.ok || !forecastRes.ok) {
        throw new Error(
          `Weather API error: ${currentRes.status}/${forecastRes.status}`
        );
      }

      const current = await currentRes.json();
      const forecast = await forecastRes.json();

      if (current.cod !== 200 || forecast.cod !== '200') {
        throw new Error('Weather API returned an error response');
      }

      context.setWeather(buildWeatherData(current, forecast));
      context.setMinutelyIsMissing(true);
      context.setAlert('No alerts available.');
      context.setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
      context.setIsError(true);
      context.setIsLoading(false);
    }
  };

  useEffect(() => {
    getGeolocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
};
