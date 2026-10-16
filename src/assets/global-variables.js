const global_variables = {
  API_KEY: process.env.REACT_APP_OPENWEATHER_API_KEY,
  GEOLOCATION_DATABASE_CDN: 'https://geolocation-db.com/json/',
  METRE_SECOND_TO_KM_HR: 3.6,
  HOURS_PER_PAGE: 5,
  DUMMY_URL: 'test',
  DAYS: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  OPTIONS: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  //WEATHER_API_REQUEST_BY_CITY_STATE_COUNTRY: 0,
  //WEATHER_API_REQUEST_BY_LATITUDE_LONGITUDE: 1,
  DUMMY_LAT: '43.6532',
  DUMMY_LON: '79.3832',
};

export default global_variables;
