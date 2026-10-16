import NextSevenDays from '../components/next-7-days';
import { useContext } from 'react';
import WeatherContext from '../components/weatherContext';
import GlobalVariables from '../assets/global-variables';
import { useFetchGeolocation } from '../functions/useFetchGeolocation';
const SevenDaysPage = () => {
  const context = useContext(WeatherContext);
  //console.log('context = ', context);
  const weather = context.weather;
  //useFetchGeolocation(GlobalVariables.GEOLOCATION_DATABASE_CDN);
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
	let days = [];
	const dayCount = Math.min(7, weather.daily.length - 1);
	for (let i = 1; i <= dayCount; i++) {
	  
    days.push({
      date: new Date(weather.daily[i].dt * 1e3).toLocaleDateString(
        undefined,
        GlobalVariables.OPTIONS
      ),
      condition: weather.daily[i].weather[0].main,
      icon:
        process.env.PUBLIC_URL +
        '/icons/' +
        weather.daily[i].weather[0].icon +
        '.svg',
      temp: Math.trunc(weather.daily[i].temp.day),
      feels_like: Math.trunc(weather.daily[i].feels_like.day),
      wind_speed: Math.trunc(weather.daily[i].wind_speed),
      wind_deg: weather.daily[i].wind_deg,
    });
  }

  return <NextSevenDays days={days} />;
};

export default SevenDaysPage;
