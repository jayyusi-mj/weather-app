// Reshape free 2.5/weather + 2.5/forecast into One Call-like structure
export const buildWeatherData = (current, forecast) => {
  const hourly = forecast.list.map((item) => ({
    dt: item.dt,
    temp: item.main.temp,
    feels_like: item.main.feels_like,
    pressure: item.main.pressure,
    humidity: item.main.humidity,
    dew_point: null,
    uvi: null,
    clouds: item.clouds.all,
    visibility: item.visibility,
    wind_speed: item.wind.speed,
    wind_deg: item.wind.deg,
    pop: item.pop ?? 0,
    weather: item.weather,
  }));

  const daysMap = {};
  forecast.list.forEach((item) => {
    const dayKey = new Date(item.dt * 1000).toDateString();
    if (!daysMap[dayKey]) daysMap[dayKey] = [];
    daysMap[dayKey].push(item);
  });

  const daily = Object.values(daysMap).map((items) => {
    const mid = items[Math.floor(items.length / 2)];
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    return {
      dt: mid.dt,
      temp: { day: avg(items.map((i) => i.main.temp)) },
      feels_like: { day: avg(items.map((i) => i.main.feels_like)) },
      pressure: mid.main.pressure,
      humidity: mid.main.humidity,
      wind_speed: avg(items.map((i) => i.wind.speed)),
      wind_deg: mid.wind.deg,
      weather: mid.weather,
      pop: Math.max(...items.map((i) => i.pop ?? 0)),
    };
  });

  return {
    timezone: current.name || 'Unknown location',
    current: {
      dt: current.dt,
      temp: current.main.temp,
      feels_like: current.main.feels_like,
      pressure: current.main.pressure,
      humidity: current.main.humidity,
      dew_point: null,
      uvi: null,
      clouds: current.clouds.all,
      visibility: current.visibility,
      wind_speed: current.wind.speed,
      wind_deg: current.wind.deg,
      sunrise: current.sys.sunrise,
      sunset: current.sys.sunset,
      weather: current.weather,
    },
    hourly,
    daily,
  };
};
