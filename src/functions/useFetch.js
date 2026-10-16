import WeatherContext from '../components/weatherContext';
import { useEffect, useContext } from 'react';
import GlobalVariables from '../assets/global-variables';

export const useFetch = (url) => {
  //context
  //e.preventDefault();
  //const context = useContext(WeatherContext);
  // const city = e.target.elements.city.value;
  // const state = e.target.elements.state.value;
  // const country = e.target.elements.country.value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const country = document.getElementById('country').value;
  console.log('city = ', city);
  console.log('state = ', state);
  console.log('country = ', country);

  const getData = async () => {
    //pass city, state, country, get back the latitude and longitude
    const url1 = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${GlobalVariables.API_KEY}`;
    try {
      const response = await fetch(url1);
      const geolocation = await response.json();
      if (response && geolocation) {
        console.log('success');

        //pass latitude and longitude , get back the weather data
        const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${geolocation[0].lat}&lon=${geolocation[0].lon}&exclude=minutely,hourly&appid=${GlobalVariables.API_KEY}&units=metric`;
        const res = await fetch(url2);
        const data = await res.json();
        // context.setWeather(data);
        // context.setIsLoading(false);

        //console.log('context insie useFetch = ', context);
        console.log('data = ', data.current.dt);
      } else {
        console.log('Error in useFetch function #line 23');
      }

      // console.log('geolocation = ', geolocation);
      // console.log('geolocation[0].lat = ', geolocation[0].lat);
      // console.log('geolocation[0].lat = ', geolocation[0].lon);
    } catch {
      console.log('Error in useFetch() function #line 30');
    }
  };

  useEffect(() => {
    getData();
  }, [url]);
};
