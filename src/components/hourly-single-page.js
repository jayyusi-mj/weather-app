import HourlyWeather from '../components/hourly-weather';
import GlobalVariables from '../assets/global-variables';

const HourlySinglePage = (props) => {
  const weather = props.weather;
  let hourly = [];
  for (let i = props.begin; i <= props.end && i < weather.hourly.length; i++) {
    hourly.push({
      day: GlobalVariables.DAYS[new Date(weather.hourly[i].dt * 1e3).getDay()],
      time: new Date(weather.hourly[i].dt * 1e3).toLocaleTimeString(),
      description: weather.hourly[i].weather[0].description,
      icon:
        process.env.PUBLIC_URL +
        '/icons/' +
        weather.hourly[i].weather[0].icon +
        '.svg',
      temp: Math.trunc(weather.hourly[i].temp),
      main: weather.hourly[i].weather[0].main,
      // sep: '_________',
      feels_like: Math.trunc(weather.hourly[i].feels_like),
      pressure: weather.hourly[i].pressure,
      humidity: weather.hourly[i].humidity,
      dew_point: weather.hourly[i].dew_point,
      uvi: weather.hourly[i].uvi,
      clouds: weather.hourly[i].clouds,
      visibility: weather.hourly[i].visibility / 1000,
      wind_speed: Math.trunc(weather.hourly[i].wind_speed),
      wind_deg: weather.hourly[i].wind_deg,
      pop: weather.hourly[i].pop,
    });
  }

  return <HourlyWeather hourly={hourly} />;
};

export default HourlySinglePage;
