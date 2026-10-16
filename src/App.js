//css
import './App.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery';
import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
//page elements
import Header from './components/header';
import EmptyRow from './components/empty-row';
// import CurrentWeather from './components/current-weather';
// import Conditions from './components/conditions';
// import NextSevenDays from './components/next-7-days';
import CelsiusFahrenheit from './components/celsius-fahrenheit';
//router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//pages
import Current from './pages/current';
import Hourly from './pages/hourly';
import SevenDays from './pages/seven-days';
import Error from './pages/error';
//nav
import Navbar from './pages/navbar';
//context
import WeatherContext from './components/weatherContext';

//for development
//import initial_weather_data from './response.json';

function App() {
  const [weather, setWeather] = useState([]);
  const [geolocation, setGeolocation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [minutelyIsMissing, setMinutelyIsMissing] = useState(false);
  const [hourlyIsMissing, setHourlyIsMissing] = useState(false);
  const [paginationStartIndex, setPaginationStartIndex] = useState(0);
  const [paginationEndIndex, setPaginationEndIndex] = useState(4);
  const [alert, setAlert] = useState('No alerts available.');

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        geolocation,
        setGeolocation,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        minutelyIsMissing,
        setMinutelyIsMissing,
        hourlyIsMissing,
        setHourlyIsMissing,
        alert,
        setAlert,
        paginationStartIndex,
        setPaginationStartIndex,
        paginationEndIndex,
        setPaginationEndIndex,
      }}
    >
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
        {/* Signature */}
        <Row className="text-center mt-3 p-3">
          <Col>
            Designed and Developed by:
            <a
		href="https://www.upwork.com/freelancers/~01a212d2cd4aa3c294"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp;&nbsp;Mohamad Jayyusi
            </a>
            &nbsp;&nbsp;&#169;&nbsp;&nbsp;
            <span>{new Date().toLocaleDateString()} </span>
          </Col>
        </Row>
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
