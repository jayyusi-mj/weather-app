import { useContext, useState, useEffect } from 'react';
import WeatherContext from '../components/weatherContext';
import GlobalVariables from '../assets/global-variables';

export const useFetch = (e) => {
  e.preventDefault();
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=new york,new york,USA&limit=5&appid=${GlobalVariables.API_KEY}`;
  console.log('inside useFetch ');
  const [geolocation, setGeolocation] = useState();
  const [weather, setWeather] = useState();
  const context = useContext(WeatherContext);

  const getWeather = async () => {
    const response = await fetch(url);
    const geolocation = await response.json();
    setGeolocation(geolocation[0]);
    const weather_api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${geolocation[0].lat}&lon=${geolocation[0].lon}&appid=${GlobalVariables.API_KEY}&units=metric`;
    const res = await fetch(weather_api_url);
    const data = await res.json();
    //setWeather(data);
    context.setWeather(data);
    context.setIsLoading(false);

    if (data.hasOwnProperty('alerts')) {
      context.weather_alert = data.alerts[0].description;
    }
  };

  useEffect(() => {
    getWeather();
  }, []);
  //return geolocation;
  //weatherContext.setGeolocation(geolocation);
  //weatherContext.setWeather(weather);
  //console.log('weatherContext.geolocation =', weatherContext.geolocation);
};
