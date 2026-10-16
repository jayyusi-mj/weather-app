//css
import './App.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery';
// import { Row, Col, Nav } from 'react-bootstrap';
import { useState } from 'react';
//page elements
import Header from './components/header';
import EmptyRow from './components/empty-row';
import CurrentWeather from './components/current-weather';
import Conditions from './components/conditions';
import NextSevenDays from './components/next-7-days';
import CelsiusFahrenheit from './components/celsius-fahrenheit';
//router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//pages
import Current from './pages/current';
import Minute from './pages/minute';
import Hourly from './pages/hourly';
import SevenDays from './pages/seven-days';
import Error from './pages/error';
//nav
import Navbar from './pages/navbar';
//Define weather context to be accessed by all components
import WeatherContext from './components/Weather';

function App() {
  //Variables
  const API_KEY = '104365204d3b86e56e9c346f13a91466';
  const METRE_SECOND_TO_KM_HR = 3.6;
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const [weather, setWeather] = useState([]);
  const [geolocation, setGeolocation] = useState([]);

  async function fetchData(e) {
    const city = e.target.elements.city.value;
    const state = e.target.elements.state.value;
    const country = e.target.elements.country.value;

    e.preventDefault();
    //fetch request with city, state and country - to get a latitude and longitude based on city name.
    const geolocation_api_request_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API_KEY}`;
    await fetch(geolocation_api_request_url)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (city && state && country) {
          //set the latitude and longitude of the location
          setGeolocation({
            data: data,
            lat: data[0].lat,
            lon: data[0].lon,
          });
          //make a second fetch call, this time with latitude and longitude
          const weather_api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${geolocation.lat}&lon=${geolocation.lon}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`;
          return fetch(weather_api_url);
        }
      })
      //parse response
      .then(function (response) {
        return response.json();
      })
      //save weather data
      .then(function (data) {
        //check if there are any alerts
        let weather_alert = 'No alerts available.';
        if (data.hasOwnProperty('alerts')) {
          weather_alert = data.alerts[0].description;
        }
        setWeather({
          data: data,
          temp: Math.trunc(data.current.temp),
          icon:
            process.env.PUBLIC_URL +
            '/icons/' +
            data.current.weather[0].icon +
            '.svg',
          time: new Date(data.current.dt * 1e3).toLocaleTimeString(),
          todays_date: new Date().toLocaleDateString(undefined, options),
          timezone: data.timezone,
          feels_like: Math.trunc(data.current.feels_like),
          wind_speed:
            Math.trunc(data.current.wind_speed * METRE_SECOND_TO_KM_HR) +
            ' km/h',
          humidity: data.current.humidity + ' %',
          visibility: data.current.visibility / 1000 + ' km',
          sunrise: new Date(data.current.sunrise * 1e3).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          wind_deg: data.current.wind_deg,
          pressure: data.current.pressure / 10 + ' kPa',
          dew_point: data.current.dew_point,
          sunset: new Date(data.current.sunset * 1e3).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          description: data.current.weather[0].main,
          alerts: weather_alert,

          //Next 7 days weather forecast
          //day 1
          day1_description: data.daily[0].weather[0].description,
          day1_name: DAYS[(new Date().getDay() + 1) % 7],
          day1_date:
            new Date().getMonth() + 1 + '/' + (new Date().getDate() + 1),
          day1_icon:
            process.env.PUBLIC_URL +
            '/icons/' +
            data.daily[0].weather[0].icon +
            '.svg',
          day1_temp: Math.trunc(data.daily[0].temp.day),
          day1_feels_like: Math.trunc(data.daily[0].feels_like.day),
          day1_wind_speed: Math.trunc(data.daily[0].wind_speed),
          day1_wind_deg: data.daily[0].wind_deg,

          //day 2
          day2_description: data.daily[1].weather[0].description,
          day2_name: DAYS[(new Date().getDay() + 2) % 7],
          day2_date:
            new Date().getMonth() + 1 + '/' + (new Date().getDate() + 2),
          day2_icon:
            process.env.PUBLIC_URL +
            '/icons/' +
            data.daily[1].weather[0].icon +
            '.svg',
          day2_temp: Math.trunc(data.daily[1].temp.day),
          day2_feels_like: Math.trunc(data.daily[1].feels_like.day),
          day2_wind_speed: Math.trunc(data.daily[1].wind_speed),
          day2_wind_deg: data.daily[1].wind_deg,

          //day 3
          day3_description: data.daily[2].weather[0].description,
          day3_name: DAYS[(new Date().getDay() + 3) % 7],
          day3_date:
            new Date().getMonth() + 1 + '/' + (new Date().getDate() + 3),
          day3_icon:
            process.env.PUBLIC_URL +
            '/icons/' +
            data.daily[2].weather[0].icon +
            '.svg',
          day3_temp: Math.trunc(data.daily[2].temp.day),
          day3_feels_like: Math.trunc(data.daily[2].feels_like.day),
          day3_wind_speed: Math.trunc(data.daily[2].wind_speed),
          day3_wind_deg: data.daily[2].wind_deg,

          //day 4
          day4_description: data.daily[3].weather[0].description,
          day4_name: DAYS[(new Date().getDay() + 4) % 7],
          day4_date:
            new Date().getMonth() + 1 + '/' + (new Date().getDate() + 4),
          day4_icon:
            process.env.PUBLIC_URL +
            '/icons/' +
            data.daily[3].weather[0].icon +
            '.svg',
          day4_temp: Math.trunc(data.daily[3].temp.day),
          day4_feels_like: Math.trunc(data.daily[3].feels_like.day),
          day4_wind_speed: Math.trunc(data.daily[3].wind_speed),
          day4_wind_deg: data.daily[3].wind_deg,

          //day 5
          day5_description: data.daily[4].weather[0].description,
          day5_name: DAYS[(new Date().getDay() + 5) % 7],
          day5_date:
            new Date().getMonth() + 1 + '/' + (new Date().getDate() + 5),
          day5_icon:
            process.env.PUBLIC_URL +
            '/icons/' +
            data.daily[4].weather[0].icon +
            '.svg',
          day5_temp: Math.trunc(data.daily[4].temp.day),
          day5_feels_like: Math.trunc(data.daily[4].feels_like.day),
          day5_wind_speed: Math.trunc(data.daily[4].wind_speed),
          day5_wind_deg: data.daily[4].wind_deg,

          //day 6
          day6_description: data.daily[5].weather[0].description,
          day6_name: DAYS[(new Date().getDay() + 6) % 7],
          day6_date:
            new Date().getMonth() + 1 + '/' + (new Date().getDate() + 6),
          day6_icon:
            process.env.PUBLIC_URL +
            '/icons/' +
            data.daily[5].weather[0].icon +
            '.svg',
          day6_temp: Math.trunc(data.daily[5].temp.day),
          day6_feels_like: Math.trunc(data.daily[5].feels_like.day),
          day6_wind_speed: Math.trunc(data.daily[5].wind_speed),
          day6_wind_deg: data.daily[5].wind_deg,

          //day 7
          day7_description: data.daily[6].weather[0].description,
          day7_name: DAYS[(new Date().getDay() + 7) % 7],
          day7_date:
            new Date().getMonth() + 1 + '/' + (new Date().getDate() + 7),
          day7_icon:
            process.env.PUBLIC_URL +
            '/icons/' +
            data.daily[6].weather[0].icon +
            '.svg',
          day7_temp: Math.trunc(data.daily[6].temp.day),
          day7_feels_like: Math.trunc(data.daily[6].feels_like.day),
          day7_wind_speed: Math.trunc(data.daily[6].wind_speed),
          day7_wind_deg: data.daily[6].wind_deg,
        });
      })
      .catch(function (error) {
        console.log('fetchData function failed');
        console.log(error);
      });
  }

  return (
    <WeatherContext.Provider value={weather}>
      <div className="App">
        <CelsiusFahrenheit />
        <Header />
        <EmptyRow />
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Current />
            </Route>
            <Route exact path="/weather_app">
              <Current />
            </Route>
            <Route path="/current">
              <Current />
            </Route>
            <Route path="/minute">
              <Minute />
            </Route>
            <Route path="/hourly">
              <Hourly />
            </Route>
            <Route path="/seven-days">
              <SevenDays />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
        {/* <CurrentWeather
        function_name={fetchData}
        timezone={weather.timezone}
        todays_date={weather.todays_date}
        time={weather.time}
        temp={weather.temp}
        feels_like={weather.feels_like}
        icon={weather.icon}
        description={weather.description}
        alerts={weather.alerts}
      />
      <EmptyRow />
      <Conditions
        wind_speed={weather.wind_speed}
        humidity={weather.humidity}
        visibility={weather.visibility}
        sunrise={weather.sunrise}
        wind_deg={weather.wind_deg}
        pressure={weather.pressure}
        dew_point={weather.dew_point}
        sunset={weather.sunset}
      />
      <EmptyRow />
      <NextSevenDays
        //day 1
        day1={weather.day1_name}
        date1={weather.day1_date}
        description1={weather.day1_description}
        icon1={weather.day1_icon}
        temp1={weather.day1_temp}
        feels_like1={weather.day1_feels_like}
        wind_speed1={weather.day1_wind_speed}
        wind_deg1={weather.day1_wind_deg}
        //day 2
        day2={weather.day2_name}
        date2={weather.day2_date}
        description2={weather.day2_description}
        icon2={weather.day2_icon}
        temp2={weather.day2_temp}
        feels_like2={weather.day2_feels_like}
        wind_speed2={weather.day2_wind_speed}
        wind_deg2={weather.day2_wind_deg}
        //day 3
        day3={weather.day3_name}
        date3={weather.day3_date}
        description3={weather.day3_description}
        icon3={weather.day3_icon}
        temp3={weather.day3_temp}
        feels_like3={weather.day3_feels_like}
        wind_speed3={weather.day3_wind_speed}
        wind_deg3={weather.day3_wind_deg}
        //day 4
        day4={weather.day4_name}
        date4={weather.day4_date}
        description4={weather.day4_description}
        icon4={weather.day4_icon}
        temp4={weather.day4_temp}
        feels_like4={weather.day4_feels_like}
        wind_speed4={weather.day4_wind_speed}
        wind_deg4={weather.day4_wind_deg}
        //day 5
        day5={weather.day5_name}
        date5={weather.day5_date}
        description5={weather.day5_description}
        icon5={weather.day5_icon}
        temp5={weather.day5_temp}
        feels_like5={weather.day5_feels_like}
        wind_speed5={weather.day5_wind_speed}
        wind_deg5={weather.day5_wind_deg}
        //day 6
        day6={weather.day6_name}
        date6={weather.day6_date}
        description6={weather.day6_description}
        icon6={weather.day6_icon}
        temp6={weather.day6_temp}
        feels_like6={weather.day6_feels_like}
        wind_speed6={weather.day6_wind_speed}
        wind_deg6={weather.day6_wind_deg}
        //day 7
        day7={weather.day7_name}
        date7={weather.day7_date}
        description7={weather.day7_description}
        icon7={weather.day7_icon}
        temp7={weather.day7_temp}
        feels_like7={weather.day7_feels_like}
        wind_speed7={weather.day7_wind_speed}
        wind_deg7={weather.day7_wind_deg}
      /> */}
        {/* Signature */}
        {/* <Row className="text-center mt-3 p-3">
        <Col>
          Designed and Developed by:
          <a
            href="https://www.linkedin.com/in/mohamad-jayyusi/"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp;&nbsp;Mohamad Jayyusi
          </a>
          &nbsp;&nbsp;&#169;&nbsp;&nbsp;
          <span>{new Date().toLocaleDateString()} </span>
        </Col>
      </Row> */}
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
